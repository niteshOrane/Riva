import React from "react";
import * as icons from "../../../../Icons/Icons";
import styles from "./Otp.module.scss";

const OtpForm = () => {
  return (
    <form>
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex align-items-center my-12px">
          <div className={styles.mobileIcon}>
            <icons.Mobile />
          </div>
          <div>
            <p>Mobile Number</p>
            <p className="font-weight-600">+91******17858</p>
          </div>
        </div>
        <button type="button" className="no-border bg-transparent"></button>
      </div>

      <div className={`d-flex align-items-center ${styles.inpContainer}`}>
        <div className={styles.otpDots}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <input
          placeholder="Enter OTP"
          type="text"
          name="password"
          id="password"
        />
        <span>00:26</span>{" "}
      </div>

      <button type="submit" className={styles.verifyBtn}>
        VERIFY
      </button>
    </form>
  );
};

export default OtpForm;
