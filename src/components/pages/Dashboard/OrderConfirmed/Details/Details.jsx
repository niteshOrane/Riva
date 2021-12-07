import React from "react";
import styles from "./Details.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Details({deliveryAddress,amount}) {
  const {firstname,lastname,street,region,country_id,postcode,telephone,city} = deliveryAddress
  const {total, shippingAmount,totalPaid} = amount
  const { currency_symbol } = useSelector(
    (state) => state?.common?.store
  );
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p>SHIPPING ADDRESS</p>
          </div>
          <div className={styles.headerRight}>
            <p>ORDER SUMMARY</p>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            <h5 className={styles.name}>{`${firstname} ${lastname}`}</h5>
            <address className={`${styles.greyText} ${styles.address}`}>
              {`${street.map(li => li)}, ${city || region}, ${postcode}`}
              <div>{`${country_id}`}</div>
            </address>
            <div>{telephone} </div>
          </div>
          <div className={styles.bodyRight}>
            <div className="d-flex justify-content-between">
              <div className={styles.greyText}>Item :</div>
              <div className={styles.greyText}>{currency_symbol}{" "}{total}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className={styles.greyText}>Shipping:</div>
              <div className={styles.greyText}>{currency_symbol}{" "}{shippingAmount}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Total</div>
              <div>{currency_symbol}{" "}{totalPaid}</div>
            </div>
          </div>
        </div>
      </div>
      <Link
        className="p-12px d-inline-block mt-12px bg-black color-white no-border c-pointer"
        to={`/myOrder/${"orders"}`}
      >
        GO TO MY ORDERS
      </Link>
    </>
  );
}

export default Details;
