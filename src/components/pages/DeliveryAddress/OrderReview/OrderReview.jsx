import React from 'react';
import * as icons from '../../../common/Icons/Icons';
import Products from './components/Products/Products';
import styles from './OrderReview.module.scss';

const randomProducts = [
  {
    image:
      'https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/63eb296e-bc16-4408-be8c-d891ed52494a.png',
    name: 'High Waist Slim Fit Trouser',
    color: 'White',
    size: 'XL',
    qty: '1',
    subTotal: '43.50',
  },
  {
    image:
      'https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/7efe70bf-b931-49dc-8fda-c7de160eeb54.png',
    name: 'High Waist Slim Fit Trouser',
    color: 'White',
    size: 'XL',
    qty: '1',
    subTotal: '43.50',
  },
];

function OrderReview() {
  const [news, setNews] = React.useState(true);

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
        <span style={{ margin: '4px' }}>
          <icons.CouponIcon />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          Enter your coupon code if you have any.
        </span>
      </div>
      <div className={styles.applyCoupon}>
        <input type="text" />
        <button className={styles.applyBtn}>APPLY</button>
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
      <div className={styles.chooseShipping}>
        <div>
          <input checked type="radio" name="shipping" id="standard" />
        </div>
        <label htmlFor="standard">
          <h5>Sunday, May 30</h5>
          <span className={styles.greyText}>$5.99 - Standard Shipping</span>
        </label>
      </div>
      <div className={styles.chooseShipping}>
        <div>
          <input type="radio" name="shipping" id="twoDays" />
        </div>
        <label htmlFor="twoDays">
          <h5>Sunday, May 30</h5>
          <span className={styles.greyText}>$5.99 - Standard Shipping</span>
        </label>
      </div>
      <Products products={randomProducts} />

      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>SUBTOTAL</span>
        <strong>${82.5}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>DELIVERY CHARGES</span>
        <strong>${82.99}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>TAX</span>
        <strong>${82.5}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className="color-black">GRAND TOTAL </h4>
        <strong>${82.5}</strong>
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
      <button className={styles.placeOrderBtn}>PLACE ORDER</button>
      <div className={`${styles.borderBottom} my-12px`}>
        <img
          src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/da0d5827-4617-454f-ab2f-e4e970ae73e3.png"
          width="47%"
          className="object-fit-contain"
          alt=""
        />
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span style={{ marginRight: '12px' }}>
          <icons.Return />
        </span>
        <span className={`${styles.greyText} ${styles.smallText}`}>
          We offer easy returns up to 14 days. Terms & Conditions apply.
        </span>
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span style={{ marginRight: '12px' }}>
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
