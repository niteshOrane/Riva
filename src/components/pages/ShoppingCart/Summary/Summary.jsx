import React from "react";
import LetUsHear from "../../../common/Cards/LetUsHear/LetUsHear";
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
        <div className="gap-12 bg-white d-flex align-items-center p-12px">
          <span>icon</span>
          <span className="font-light-black">
            We offer easy returns up to 14 days. Terms & Conditions apply
          </span>
        </div>
        <div className="gap-12 bg-white d-flex align-items-center p-12px">
          <span>icon</span>
          <p>
            <strong className="d-block">100% SECURE DATA ENCRYPTIN</strong>
            <span className="d-block font-light-black">
              We guarantee security of every transaction
            </span>
          </p>
        </div>
      </div>
      <LetUsHear />
    </div>
  );
};

export default Summary;
