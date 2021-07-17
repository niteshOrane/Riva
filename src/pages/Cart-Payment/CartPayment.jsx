import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PaymentTabs from '../../components/pages/Cart-Payment/PaymentTabs/PaymentTabs';
import * as icons from '../../components/common/Icons/Icons';
import PriceDetails from '../../components/pages/Cart-Payment/PriceDetails/PriceDetails';
import LetUsHear from '../../components/common/Cards/LetUsHear/LetUsHear';
import styles from './CartPayment.module.scss';

import { toggleCart } from '../../store/actions/cart';

function CartPayment() {
  const dispatch = useDispatch();

  React.useEffect(() => {
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

            <strong>Select a Delivery Address</strong>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h2 className="font-weight-normal my-20px">Choose Payment Mode</h2>
          <PaymentTabs />
        </div>
        <div className={styles.col2}>
          <PriceDetails />
          <LetUsHear />
        </div>
      </div>
    </div>
  );
}

export default CartPayment;
