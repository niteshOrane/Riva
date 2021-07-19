import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaymentTabs from '../../components/pages/Cart-Payment/PaymentTabs/PaymentTabs';
import * as icons from '../../components/common/Icons/Icons';
import PriceDetails from '../../components/pages/Cart-Payment/PriceDetails/PriceDetails';
import LetUsHear from '../../components/common/Cards/LetUsHear/LetUsHear';
import styles from './CartPayment.module.scss';

import { toggleCart } from '../../store/actions/cart';

function CartPayment() {
  const dispatch = useDispatch();
  const { data: items = [] } = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.auth.customer);

  const customerid = customer.customerID;
  const [totalAmout, setTotalAmout] = useState(0);
  const [totalDC, setTotalDC] = useState(50);
  const [totalTax, setTotalTax] = useState(45);

  useEffect(() => {
    const amount = items.reduce((total, item) => total + item.price * item.qty, 0) || 0;
    setTotalAmout(amount);

    items.totalDC = totalDC;
    items.totalTax = totalTax;
    items.amount = amount;
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
          <PaymentTabs />
        </div>
        <div className={styles.col2}>
          <PriceDetails cartItem={items} customerID={customerid} />
          <LetUsHear />
        </div>
      </div>
    </div>
  );
}

export default CartPayment;
