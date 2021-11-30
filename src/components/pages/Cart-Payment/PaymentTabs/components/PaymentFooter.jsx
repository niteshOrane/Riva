import React from "react";
import styles from "./Tab2Content/Tab2Content.module.scss";

function PaymentFooter() {
  return (
    <div className={styles.payFooter}>
      <div className="d-flex align-items-center">
        <span className={`material-icons-outlined ${styles.footIcon}`}>
          security
        </span>
        <span className={styles.text}>100% SECURE DATA ENCRYPTION</span>
      </div>
      <p>We guarantee security of every transaction</p>
      <div className="d-flex align-items-center">
        <span className={`material-icons-outlined ${styles.footIcon}`}>
          thumb_up
        </span>
        <span className={styles.text}>
          We offer easy returns up to 14 days. Terms & Conditions apply.
        </span>
      </div>
    </div>
  );
}

export default PaymentFooter;
