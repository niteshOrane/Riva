/* eslint-disable no-nested-ternary */
import React from "react";
import * as icons from "../../../common/Icons/Icons";
import styles from "./PriceDetails.module.scss";
const PriceDetails = ({
  translate,
  cartItem,
  cartPaymentInfo,
  store,
  isFreeDelivery,
}) => {
  const { currency_symbol } = store;

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        {translate?.deliveryAddress?.DETAILS} ({cartItem.length} Item)
      </h4>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.SUB}
        </span>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : parseFloat(cartPaymentInfo?.subtotal || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.DEL}
        </span>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : isFreeDelivery
            ? "0.00"
            : parseFloat(
                cartPaymentInfo?.total_segments?.find(
                  (e) => e.code === "shipping"
                )?.value || 0
              )?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.TAX}
        </span>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : parseFloat(cartPaymentInfo?.tax_amount || 0)?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>COD CHARGES</span>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : parseFloat(
                cartPaymentInfo?.total_segments?.find(
                  (e) => e.code === "payment_fee"
                )?.value || 0
              )?.toFixed(2)}
        </strong>
      </div>
      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <span className={styles.greyText}>
          {translate?.deliveryAddress?.COUPON}
        </span>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : parseFloat(
                cartPaymentInfo?.total_segments?.find(
                  (e) => e.code === "discount"
                )?.value || 0
              )?.toFixed(2)}
        </strong>
      </div>

      <div
        id={styles.calculatinRow}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className="color-black">{translate?.deliveryAddress?.GRAND}</h4>
        <strong>
          {currency_symbol}{" "}
          {cartItem?.length === 0
            ? "0.00"
            : parseFloat(
                cartPaymentInfo?.total_segments?.find(
                  (e) => e.code === "grand_total"
                )?.value
              ).toFixed(2)}
        </strong>
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
          {translate?.deliveryAddress?.WE}
        </span>
      </div>
      <div className="my-12px p-12px bg-white d-flex align-items-center">
        <span style={{ marginRight: "12px" }}>
          <icons.Secure />
        </span>
        <div>
          <h4 className={styles.greyText}>
            {translate?.deliveryAddress?.SECURE}
          </h4>
          <p className={`${styles.greyText} ${styles.smallText}`}>
            {translate?.deliveryAddress?.SECURITY}
          </p>
          <p></p>
        </div>
      </div>
      <p className={`${styles.greyText} ${styles.smallText} my-12px`}>
        {translate?.deliveryAddress?.EXPRESS}
      </p>
    </div>
  );
};

export default PriceDetails;
