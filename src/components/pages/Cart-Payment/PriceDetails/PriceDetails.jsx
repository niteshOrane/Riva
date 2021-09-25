import React from "react";
import * as icons from "../../../common/Icons/Icons";
import styles from "./PriceDetails.module.scss";
const PriceDetails = ({ cartItem, cartPaymentInfo, store }) => {
  const { currency_symbol } = store;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>PRICE DETAILS ({cartItem.length} Item)</h4>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>SUBTOTAL</span>
        <strong>{currency_symbol} {parseFloat(cartPaymentInfo?.subtotal || 0)?.toFixed(2)}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>DELIVERY CHARGES</span>
        <strong>{currency_symbol} {parseFloat(cartPaymentInfo?.total_segments?.find(e => e.code === "shipping")?.value || 0)?.toFixed(2)}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>TAX</span>
        <strong>{currency_symbol} {parseFloat(cartPaymentInfo?.tax_amount || 0)?.toFixed(2)}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>Coupon Applied</span>
        <strong>{currency_symbol} {parseFloat(cartPaymentInfo?.total_segments?.find(e => e.code === "discount")?.value || 0)?.toFixed(2)}</strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className="color-black">GRAND TOTAL </h4>
        <strong>{currency_symbol} {parseFloat(cartPaymentInfo?.total_segments?.find(e => e.code === "grand_total")?.value).toFixed(2)}</strong>
      </div>

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
};

export default PriceDetails;
