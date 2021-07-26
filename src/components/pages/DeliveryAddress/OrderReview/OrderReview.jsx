import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as icons from "../../../common/Icons/Icons";
import Products from "./components/Products/Products";
import { Link, useHistory } from 'react-router-dom';
import styles from "./OrderReview.module.scss";
import { showSnackbar } from "../../../../store/actions/common";
import { toggleCart } from '../../../../store/actions/cart';



function OrderReview({ deliverySpeed, cartPaymentInfo, callBackAfterApplyCoupan }) {
  const history = useHistory();


  const { data: items = [] } = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.auth.customer);
  const dispatch = useDispatch();
  const [activeDelivery, setActiveDelivery] = React.useState(null);
  const [news, setNews] = React.useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [discount, setDiscount] = useState(null)
  const customerid = customer.customerID;
  const [totalAmout, setTotalAmout] = useState(0);
  const [totalDC, setTotalDC] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  console.log('deliverySpeed0', deliverySpeed);
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
      if (res.data.success === 200) {
        dispatch(showSnackbar(res.data.message, "success"));
        setCouponDiscount(true);

        callBackAfterApplyCoupan();
        setDiscount(res.data.data.discount)
      } else if (res.data.success === 201) {
        dispatch(showSnackbar(res.data.message, "success"));
        setCouponDiscount(true)
      }
    }
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (activeDelivery != null) {
      history.push("/cart-payment");
    }
    else {
      dispatch(showSnackbar("Please select Delivery Speed ", "error"));
    }
  };
  useEffect(() => {
    dispatch(toggleCart(false));
    const amount = items.reduce((total, item) => total + item.price * item.qty, 0) || 0;
    setTotalAmout(amount);
    setCouponCode(cartPaymentInfo?.coupon_code || '');
    setCouponDiscount(Boolean(cartPaymentInfo?.coupon_code));
    setDiscount(cartPaymentInfo?.discount_amount || 0);
    setActiveDelivery(cartPaymentInfo?.total_segments?.find(e => e.code === "shipping")?.value);
    setTotalDC(cartPaymentInfo?.total_segments?.find(e => e.code === "shipping")?.value);
    setTotalTax(cartPaymentInfo?.tax_amount);
    setTotalAmout(cartPaymentInfo?.total_segments?.find(e => e.code === "subtotal")?.value);
  }, []);

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
        setCouponCode("")
        setDiscount(null)
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className={styles.title}>ORDER REVIEW</div>
        <div className="d-flex align-items-center">
          <span class="material-icons-outlined">edit</span>
          <span className="underline underline-hovered c-pointer">Edit</span>
        </div>
      </div>
      <div className="mt-20px d-flex align-items-center">
        <span style={{ margin: "4px" }}>
          <icons.CouponIcon />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          Enter your coupon code if you have any.
        </span>
      </div>
      <div className={styles.applyCoupon}>
        <input
          name="coupon"
          onChange={(event) => setCouponCode(event.target.value)}
          type="text"
          value={couponCode}
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className={`${styles.applyBtn} c-pointer`}
        >
          APPLY
        </button>
        {couponDiscount && (
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className={`${styles.applyBtn} c-pointer`}
            style={{ marginLeft: "0.5rem" }}
          >
            REMOVE
          </button>
        )}
      </div>
      <div className={styles.loyaltyCash}>
        <div className="d-flex align-items-center">
          <span>
            <icons.Loyalty />
          </span>
          <strong>Use Loyalty Cash ($0 Available)</strong>
        </div>
        <p className={`${styles.greyText} ${styles.smallText}`}>
          *You have to earn a minimum of $50 Loyalty Cash before you can redeem
          it in your future purchases.
        </p>
      </div>
      <h4 className="font-weight-normal mt-12px">CHOOSE A DELIVERY SPEED</h4>
      {deliverySpeed?.map((item, index) => {
        return (<div className={styles.chooseShipping} onClick={() => { setActiveDelivery(index); setTotalDC(item?.price_incl_tax) }}>
          <div>
            <input type="radio" checked={index == activeDelivery} name={item.method_code} id={item.method_code} />
          </div>
          <label htmlFor="twoDays">
            <h5>{item?.method_title}</h5>
            <span className={styles.greyText}>${item.amount} - {item.carrier_title}</span>
          </label>
        </div>)
      })}

      <Products products={items} />
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>SUBTOTAL</span>

        <strong>${totalAmout}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>DELIVERY CHARGES</span>
        <strong>${totalDC}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>TAX</span>
        <strong>${totalTax}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>Coupon Applied</span>
        <strong>${discount ?? 0}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className="color-black">GRAND TOTAL </h4>
        <strong>${discount ? parseFloat((totalDC + totalTax + totalAmout) + discount).toFixed(2) : parseFloat(totalDC + totalTax + totalAmout).toFixed(2)}</strong>
      </div>
      <div className="d-flex align-items-center mt-12px">
        <input
          checked={news}
          type="checkbox"
          name=""
          className={styles.inp}
          id=""
        />
        <span onClick={() => setNews(!news)} className="c-pointer">
          Sign up for Newsletter
        </span>
      </div>
      <button onClick={(e) => { handlePlaceOrder(e) }} className={styles.placeOrderBtn}>PLACE ORDER</button>
      <div className={`${styles.borderBottom} my-12px`}>
        <img
          src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/da0d5827-4617-454f-ab2f-e4e970ae73e3.png"
          width="47%"
          className="object-fit-contain"
          alt=""
        />
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span style={{ marginRight: "12px" }}>
          <icons.Return />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          We offer easy returns up to 14 days. Terms & Conditions apply.
        </span>
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span style={{ marginRight: "12px" }}>
          <icons.Secure />
        </span>
        <div>
          <h4 className={styles.greyText}>100% SECURE DATA ENCRYPTION</h4>
          <p className={`${styles.greyText} ${styles.smallText}`}>
            We guarantee security of every transaction
          </p>
          <p></p>
        </div>
      </div>
      <p className={`${styles.greyText} ${styles.smallText} my-12px`}>
        Express Shipping in 3-6 Business Days. You will be redirected to the
        website of Mastercard Internet Gateway System (AMEX) when you place your
        order. And then you will automatically return to rivafashion.com.
      </p>
    </div>
  );
}

export default OrderReview;