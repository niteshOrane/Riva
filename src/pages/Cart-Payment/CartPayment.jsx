import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaymentTabs from '../../components/pages/Cart-Payment/PaymentTabs/PaymentTabs';
import * as icons from '../../components/common/Icons/Icons';
import PriceDetails from '../../components/pages/Cart-Payment/PriceDetails/PriceDetails';
import LetUsHear from '../../components/common/Cards/LetUsHear/LetUsHear';
import { getPaymentMethodlist } from '../../store/actions/payment';
import styles from './CartPayment.module.scss';

import { toggleCart } from '../../store/actions/cart';

function CartPayment() {
  const dispatch = useDispatch();
  const { data: items = [] } = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.auth.customer);
  const paymentMode = useSelector((state) => state.payment);
  const customerid = customer.customerID;
 
  
  const cartPaymentInfo = useSelector((state) => state.cart?.cartPaymentInfo || {});

  useEffect(() => {
    dispatch(getPaymentMethodlist());
    dispatch(toggleCart(false));
  }, []);

  return (
    <div className="container-90 max-width-1600">
      <div className={styles.header}>
        <strong id="logo" className={styles.logo}>
          <Link to="/">
            <img src="/assets/images/logo.png" alt="Riva" />
          </Link>
        </strong>
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
          <h2 className="font-weight-normal my-20px">Choose Payment Mode</h2>
          <PaymentTabs paymentMode={paymentMode?.data}/>
        </div>
        <div className={styles.col2}>
          <PriceDetails cartItem={items} customerID={customerid} cartPaymentInfo={cartPaymentInfo} />
          <LetUsHear />
        </div>
      </div>
    </div>
  );
}

export default CartPayment;
