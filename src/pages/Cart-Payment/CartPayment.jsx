import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import RePaymentTab from "../../components/pages/Cart-Payment/PaymentTabs/RePaymentTab";
import * as icons from "../../components/common/Icons/Icons";
import PriceDetails from "../../components/pages/Cart-Payment/PriceDetails/PriceDetails";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import { getPaymentMethodlist } from "../../store/actions/payment";
import styles from "./CartPayment.module.scss";

import { toggleCart } from "../../store/actions/cart";
import Loader from "../../components/common/Loader";

import useArabic from "../../components/common/arabicDict/useArabic";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";

function CartPayment() {
  const dispatch = useDispatch();
  const { translate } = useArabic();

  useAnalytics();
  const { data: items = [] } = useSelector((state) => state.cart);
  const [paymentOption, setPaymentOption] = React.useState([]);
  const [customObj,setCustomObj] =  React.useState(null)
  const [loading, setLoading] = React.useState(false);
  const customer = useSelector((state) => state.auth.customer);
  const paymentMode = useSelector((state) => state.payment);
  const customerid = customer.customerID;

  const store = useSelector((state) => state?.common?.store);
  const { data } = useSelector((state) => state?.cart);
  const location = useLocation();
  const cartPaymentInfo = useSelector(
    (state) => state.cart?.cartPaymentInfo || {}
  );
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  useEffect(() => {
    dispatch(getPaymentMethodlist());
    dispatch(toggleCart(false));
  }, [customerid]);

  useEffect(() => {
    setPaymentOption(paymentMode);
    const obj = paymentMode?.data?.reduce((acc,item) =>{
      if(!acc[item]){
       acc[item.code] = item
       return acc
      }
      return acc
    },{})
    if(obj){
      setCustomObj(obj)
    }
  }, [paymentMode]);
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        pageType: "cart_payment",
        list: "category",
        customer: { isLoggedIn: isAuthenticated },
        category: {
          id: JSON.parse(localStorage.getItem("preferredCategory")),
        },
        cart: { hasItems: data.length > 0 },
        ecommerce: {
          currencyCode: currency_symbol,
          orderValue: parseFloat(
            cartPaymentInfo?.total_segments?.find(
              (e) => e.code === "grand_total"
            )?.value
          ).toFixed(2),
          products: items.length,
        },
      },
    });
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
    window.insider_object = {
      page: {
        type: "Cart_payment",
        url: location.pathname,
      },
    };
  }, [cartPaymentInfo, items]);
  if (loading)
    return (
      <div className={styles.tapLoader}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </div>
    );

  return (
    <div className="container-90 max-width-1600">
      <div className={styles.header}>
        <div className={styles.breadCrumb}>
          <div className={styles.bcLinks}>
            <Link to="/">
              <strong className="color-black">
                <icons.Home />
                &nbsp;
              </strong>
              <span className="color-grey">
                {translate?.payment?.HOME} <icons.AngleRight />
              </span>
            </Link>

            <strong>{translate?.payment?.PAYMENT}</strong>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.col1}>
          {paymentOption &&
          paymentOption?.data &&
          paymentOption?.data?.length ? (
            <>
              <h2 className="font-weight-normal my-20px">
                {translate?.payment?.CHOOSE}
              </h2>
              <RePaymentTab
                translate={translate}
                cartItem={items}
                customerID={customerid}
                cartPaymentInfo={cartPaymentInfo}
                store={store}
                paymentMode={paymentOption?.data}
                loading={loading}
                setLoading={setLoading}
                customObj = {customObj}
              />
            </>
          ) : null}
        </div>

        <div className={styles.col2}>
          <PriceDetails
            translate={translate}
            cartItem={items}
            store={store}
            customerID={customerid}
            cartPaymentInfo={cartPaymentInfo}
          />
          <LetUsHear />
        </div>
      </div>
    </div>
  );
}

export default CartPayment;
