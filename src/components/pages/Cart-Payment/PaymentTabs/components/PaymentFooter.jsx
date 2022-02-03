import React from "react";
import styles from "./Tab2Content/Tab2Content.module.scss";

function PaymentFooter({translate}) {
  return (
    <div className={styles.payFooter}>
      <div className="d-flex align-items-center">
        <span className={`material-icons-outlined ${styles.footIcon}`}>
          security
        </span>
        <span className={styles.text}>{translate?.deliveryAddress?.SECURE}</span>
      </div>
      <p>{translate?.deliveryAddress?.SECURITY}</p>
      <div className="d-flex align-items-center">
        <span className={`material-icons-outlined ${styles.footIcon}`}>
          thumb_up
        </span>
        <span className={styles.text}>
        {translate?.deliveryAddress?.WE}
        </span>
      </div>
    </div>
  );
}

export default PaymentFooter;
