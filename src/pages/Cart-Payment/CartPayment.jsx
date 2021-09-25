import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentTabs from "../../components/pages/Cart-Payment/PaymentTabs/PaymentTabs";
import * as icons from "../../components/common/Icons/Icons";
import PriceDetails from "../../components/pages/Cart-Payment/PriceDetails/PriceDetails";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import { getPaymentMethodlist } from "../../store/actions/payment";
import styles from "./CartPayment.module.scss";

import { toggleCart } from "../../store/actions/cart";

function CartPayment() {
  const dispatch = useDispatch();
  const { data: items = [] } = useSelector((state) => state.cart);
  const [paymentOption, setPaymentOption] = React.useState([]);
  const customer = useSelector((state) => state.auth.customer);
  const paymentMode = useSelector((state) => state.payment);
  const customerid = customer.customerID;

  const store = useSelector((state) => state?.common?.store);
  const cartPaymentInfo = useSelector(
    (state) => state.cart?.cartPaymentInfo || {}
  );
  useEffect(() => {
    dispatch(getPaymentMethodlist());
    dispatch(toggleCart(false));
  }, [customerid]);

  useEffect(() => {
    setPaymentOption(paymentMode);
  }, [paymentMode]);

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
                Home <icons.AngleRight />
              </span>
            </Link>

            <strong>Payment</strong>
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
                Choose Payment Mode
              </h2>
              <PaymentTabs
                cartItem={items}
                customerID={customerid}
                cartPaymentInfo={cartPaymentInfo}
                store={store}
                paymentMode={paymentOption?.data}
              />
            </>
          ) : null}
        </div>

        <div className={styles.col2}>
          <PriceDetails
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
