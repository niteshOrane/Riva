import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as icons from "../../../common/Icons/Icons";
import Products from "./components/Products/Products";
import { Link, useHistory } from "react-router-dom";
import styles from "./OrderReview.module.scss";
import { showSnackbar } from "../../../../store/actions/common";
import { toggleCart } from "../../../../store/actions/cart";
import { deliveryCheck } from "../../../../services/address/address.service";
import { getFreeShippingInfo } from "../../../../services/cart/cart.service";
import { getCartId } from "../../../../util";
import TagManager from "react-gtm-module";
import ReactPixel from "react-facebook-pixel";

function OrderReview({
  deliverySpeed,
  cartPayment,
  callBackAfterApplyCoupan,
  addressItem,
  translate,
}) {
  const history = useHistory();
  // console.log({cartPayment})

  const { currency_symbol, language } = useSelector(
    (state) => state?.common?.store
  );
  const { data: items = [] } = useSelector((state) => state.cart);
  const { cart_id } = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.auth.customer);
  const dispatch = useDispatch();
  const [activeDelivery, setActiveDelivery] = React.useState(null);
  const [news, setNews] = React.useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [discount, setDiscount] = useState(null);
  const customerid = customer.customerID;
  const [totalAmout, setTotalAmout] = useState(0);
  const [paymentFee, setPaymentFee] = useState(0);
  const [freeShippingInfo, setFreeShippingInfo] = useState("");
  const [totalDC, setTotalDC] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (customerid && couponCode !== "") {
      const coupon = new FormData();
      coupon.append("customerid", customerid);
      coupon.append("couponcode", couponCode);
      const config = {
        method: "post",
        url: `${process.env.REACT_APP_DEV}/applyCoupon`,
        silent: true,
        data: coupon,
      };
      const res = await axios(config);
      if (res.data.success) {
        dispatch(showSnackbar(res.data.message, "success"));
        setCouponDiscount(true);
        callBackAfterApplyCoupan();
        setDiscount(res.data.data.discount);
      } else if (!res.data.success) {
        dispatch(showSnackbar(res.data.message, "error"));
      }
    }
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (activeDelivery && activeDelivery != null) {
      ReactPixel.init(process.env.REACT_APP_FACEBOOK);
      const data = {
        currency: currency_symbol,
        value: discount
          ? parseFloat(totalDC + totalTax + totalAmout + discount).toFixed(2)
          : parseFloat(totalDC + totalTax + totalAmout).toFixed(2),
      };
      ReactPixel.track("Purchase", data);
      history.push("/cart-payment");
    } else {
      dispatch(showSnackbar("Please select Delivery Speed ", "error"));
    }
  };
  const getShippingInfo = async () => {
    const res = await getFreeShippingInfo(getCartId());
    if (
      res &&
      res.status === 200 &&
      res?.data &&
      res?.data?.length &&
      res?.data?.[0]
    ) {
      setFreeShippingInfo(res?.data?.[0]?.message);
    }
  };
  useEffect(() => {
    dispatch(toggleCart(false));
    const amount =
      items.reduce(
        (total, item) => parseFloat(total + item.price * item.qty),
        0
      ) || 0;
    setTotalAmout(amount);
    setCouponCode(cartPayment?.coupon_code || "");
    // setPaymentFee(cartPayment?.)
    setCouponDiscount(Boolean(cartPayment?.coupon_code));
    setDiscount(cartPayment?.discount_amount || 0);
    setTotalDC(
      cartPayment?.total_segments?.find((e) => e.code === "shipping")?.value
    );
    setTotalTax(cartPayment?.tax_amount);
    setTotalAmout(
      cartPayment?.total_segments?.find((e) => e.code === "subtotal")?.value
    );
    getShippingInfo();
  }, [cartPayment]);
  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    if (customerid) {
      const removeCoupon = new FormData();
      removeCoupon.append("customerid", customerid);
      const config = {
        method: "post",
        url: `${process.env.REACT_APP_DEV}/removeCoupon`,
        silent: true,
        data: removeCoupon,
      };
      const res = await axios(config);
      if (res.status === 200) {
        dispatch(showSnackbar("Coupon removed successfully", "success"));
        setCouponDiscount(false);
        callBackAfterApplyCoupan();
        setCouponCode("");
        setDiscount(null);
      }
    }
  };

  const onSpeedDeliveryRadio = async (val) => {
    if (addressItem?.name) {
      const code = `${val?.carrier_code}_${val?.method_code}`;
      const price = val?.amount || 0;
      const firstName = addressItem?.name?.split(" ")[0] || "";
      const lastName = addressItem?.name?.split(" ")[1] || "";
      const street = addressItem?.street || "";
      const city = addressItem?.city || "";
      const postcode = addressItem?.postcode || "";
      const phone = addressItem?.phone || "";
      const country = addressItem?.country || "";
      const region = addressItem?.region || "";
      const res = await deliveryCheck(
        cart_id,
        code,
        price,
        firstName,
        lastName,
        street,
        city,
        postcode,
        phone,
        country,
        region
      );
      if (res.status === 200) {
        setActiveDelivery(`${val?.carrier_code}_${val?.method_code}`);
        setTotalDC(val?.price_incl_tax);
        dispatch(showSnackbar("Delivery speed added successfully", "success"));
        callBackAfterApplyCoupan();
      } else {
        dispatch(showSnackbar("Something went wrong", "error"));
      }
    } else {
      dispatch(showSnackbar("Add a delivery address first", "error"));
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className={styles.title}>{translate?.deliveryAddress?.ORDER}</div>
        <Link to="/shopping-cart" className="c-pointer">
          <div className="d-flex align-items-center c-pointer">
            <span className="material-icons-outlined">edit</span>
            <span className="underline underline-hovered c-pointer">Edit</span>
          </div>
        </Link>
      </div>
      <div className="mt-20px d-flex align-items-center">
        <span
          style={{
            margin: "4px",
            marginLeft: language === "Arabic" ? "10px" : "0px",
          }}
        >
          <icons.CouponIcon />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          {translate?.deliveryAddress?.ENTER}
        </span>
      </div>
      <div className={styles.applyCoupon}>
        <input
          name="coupon"
          onChange={(event) => setCouponCode(event.target.value)}
          type="text"
          readOnly={couponDiscount}
          value={couponCode}
        />
        {!couponDiscount ? (
          <button
            type="button"
            onClick={handleApplyCoupon}
            className={`${styles.applyBtn} c-pointer`}
          >
            {translate?.deliveryAddress?.APPLY}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className={`${styles.applyBtn} c-pointer`}
            style={{ marginLeft: "0.5rem" }}
          >
            {translate?.deliveryAddress?.REMOVE}
          </button>
        )}
      </div>
      <div className={styles.loyaltyCash}>
        <div className="d-flex align-items-center">
          <span style={{ marginLeft: language === "Arabic" ? "10px" : "0px" }}>
            <icons.Loyalty />
          </span>
          <strong>{translate?.deliveryAddress?.USE}</strong>
        </div>
        <p className={`${styles.greyText} ${styles.smallText}`}>
          {translate?.deliveryAddress?.YOU}
        </p>
      </div>
      <h4 className="font-weight-normal mt-12px">
        {translate?.deliveryAddress?.CHOOSE}
      </h4>
      {deliverySpeed?.map((item) => {
        return (
          <div
            onClick={() => onSpeedDeliveryRadio(item)}
            className={styles.chooseShipping}
          >
            <div>
              <input
                type="radio"
                checked={
                  activeDelivery
                    ? `${item?.carrier_code}_${item?.method_code}` ===
                      activeDelivery
                    : false
                }
                name={item.method_code}
                id={item.method_code}
              />
            </div>
            <label htmlFor="twoDays">
              <h5>{item?.method_title}</h5>
              <span className={styles.greyText}>
                {currency_symbol} {item.amount} - {item.carrier_title}
              </span>
            </label>
          </div>
        );
      })}

      <Products
        products={items}
        currency_symbol={currency_symbol}
        language={language}
        translate={translate}
      />
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.SUB}
        </span>

        <strong>
          {" "}
          {currency_symbol} {parseFloat(totalAmout || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.DEL}
        </span>
        <strong>
          {" "}
          {currency_symbol} {parseFloat(totalDC || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.TAX}
        </span>
        <strong>
          {" "}
          {currency_symbol} {parseFloat(totalTax || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.COUPON}
        </span>
        <strong>
          {" "}
          {currency_symbol} {parseFloat(discount || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className="color-black">{translate?.deliveryAddress?.GRAND} </h4>
        <strong>
          {currency_symbol}{" "}
          {discount
            ? parseFloat(totalDC + totalTax + totalAmout + discount).toFixed(2)
            : parseFloat(totalDC + totalTax + totalAmout).toFixed(2)}
        </strong>
      </div>
      <div className="d-flex align-items-center mt-12px">
        <input
          checked={news}
          type="checkbox"
          name=""
          className={styles.inp}
          id=""
          onChange={() => setNews((prev) => !prev)}
        />
        <span
          style={{ paddingRight: language === "Arabic" ? "10px" : "0px" }}
          onClick={() => setNews(!news)}
          className="c-pointer"
        >
          {translate?.deliveryAddress?.SIGN}
        </span>
      </div>
      <br />
      <div style={{ color: "#ff0000" }}> {freeShippingInfo}</div>
      <button
        onClick={(e) => {
          handlePlaceOrder(e);
        }}
        className={styles.placeOrderBtn}
      >
        Continue
      </button>
      <div className={`${styles.borderBottom} my-12px`}>
        <img
          src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/da0d5827-4617-454f-ab2f-e4e970ae73e3.png"
          width="47%"
          className="object-fit-contain"
          alt=""
        />
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span
          style={{
            marginRight: "12px",
            marginLeft: language === "Arabic" ? "10px" : "0px",
          }}
        >
          <icons.Return />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          {translate?.deliveryAddress?.WE}
        </span>
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span
          style={{
            marginRight: "12px",
            marginLeft: language === "Arabic" ? "10px" : "0px",
          }}
        >
          <icons.Secure />
        </span>
        <div>
          <h4 className={styles.greyText}>
            {translate?.deliveryAddress?.SECURE}
          </h4>
          <p className={`${styles.greyText} ${styles.smallText}`}>
            {translate?.deliveryAddress?.SECURITY}
          </p>
          <p></p>
        </div>
      </div>
      <p className={`${styles.greyText} ${styles.smallText} my-12px`}>
        {translate?.deliveryAddress?.EXPRESS}
      </p>
    </div>
  );
}

export default OrderReview;
