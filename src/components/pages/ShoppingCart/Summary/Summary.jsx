import React from "react";
import style from "./Summary.module.scss";
const Summary = () => {
  return (
    <div className={style.container}>
      <div className={style.bgGrey}>
        <div className={style.title}>
          <h2>ORDER SUMMARY</h2>
        </div>
        <div className="my-10px d-flex align-items-center justify-content-between">
          <p className="font-light-black">SUBTOTAL</p>
          <span className="color-primary">$43.59</span>
        </div>
        <div
          className={`${style.greandTotal} my-10px d-flex align-items-center justify-content-between`}
        >
          <h4 className="font-weight-600">GRAND TOTAL</h4>
          <h4 className="font-weight-600 color-primary">$43.59</h4>
        </div>

        <div className={style.checkoutBtn}>
          <button type="button">SECURE CHECKOUT</button>
        </div>
        <div className="gap-12 bg-white d-flex align-items-center p-12">
          <span>icon</span>
          <span className="font-light-black">
            We offer easy returns up to 14 days. Terms & Conditions apply
          </span>
        </div>
        <div className="gap-12 bg-white d-flex align-items-center p-12">
          <span>icon</span>
          <p>
            <strong className="d-block">100% SECURE DATA ENCRYPTIN</strong>
            <span className="d-block font-light-black">
              We guarantee security of every transaction
            </span>
          </p>
        </div>
      </div>
      <div className={style.contactCard}>
        <div className={style.contactIcon}>
          <span className="material-icons-outlined">add</span>
        </div>
        <h4 className={style.contactCardTitle}>Let us hear from you at</h4>
        <p>
          <strong>
            <a className="color-black" href="tel: +971 800 7482">
              +971 800 7482
            </a>
          </strong>
          <span className="font-light-black">
            we are available to serve you 24 hours all week long & always happy
            to help you.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
