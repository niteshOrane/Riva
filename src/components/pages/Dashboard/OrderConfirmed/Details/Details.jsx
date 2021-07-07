import React from "react";
import styles from "./Details.module.scss";
import { Link } from "react-router-dom";
function Details() {
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
            <h5 className={styles.name}>David Smith</h5>
            <address className={`${styles.greyText} ${styles.address}`}>
              Melba R Fox, 4900 Spirit Drive Hastings, Florida - 32145{" "}
              <div>USA</div>
            </address>
            <div>Phone: 4567 8925 </div>
          </div>
          <div className={styles.bodyRight}>
            <div className="d-flex justify-content-between">
              <div className={styles.greyText}>Item :</div>
              <div className={styles.greyText}>$39.00</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className={styles.greyText}>Shipping:</div>
              <div className={styles.greyText}>$4.00</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Total</div>
              <div>$43.00</div>
            </div>
          </div>
        </div>
      </div>
      <Link
        className="p-12px d-inline-block mt-12px bg-black color-white no-border"
        to="/myorders"
      >
        GO TO MY ORDERS
      </Link>
    </>
  );
}

export default Details;
