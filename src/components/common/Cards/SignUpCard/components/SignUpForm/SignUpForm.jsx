import React, { useState } from "react";
import styles from "../../SignUpCard.module.scss";
import * as icons from "../../../../Icons/Icons";

const SignUpForm = ({ handleSubmit }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <p className="mt-12px">
          First Name & Last Name <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">account_circle</span>
          <input type="text" name="name" id="name" />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Email <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">email</span>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Mobile Number <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">call</span>
          <input type="number" name="phone" id="phone" />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Set a Password <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">lock</span>{" "}
          <input
            type={showPass ? "password" : "text"}
            name="password"
            id="password"
          />
          <button
            type="button"
            className="no-border bg-transparent c-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <span className="material-icons-outlined">
              {showPass ? "visibility_off" : "visibility"}
            </span>{" "}
          </button>
        </div>
        <p className={styles.passInstruction}>
          Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Number character.
        </p>

        <button
          onClick={handleSubmit}
          type="submit"
          className={styles.signUpBtn}
        >
          SIGN UP
        </button>
        <p className={styles.or}>OR</p>

        <div>
          <button type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.appleBtn}`}
          >
            <span className={styles.btnIcon}>
              <icons.Apple />
            </span>
            <p >Connect with Apple</p>
          </button>
          <button type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.fbBtn}`}
          >
            <span className={styles.btnIcon}>
              <icons.Facebook />
            </span>
            <p >Connect with Facebook</p>
          </button>
          <button type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              phone_iphone
            </span>
            <p >Connect with Google</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
