import React, { useState } from "react";
import styles from "../../SignUpCard.module.scss";
import * as icons from "../../../../Icons/Icons";

const SignUpForm = ({ handleSubmit }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <form className={styles.form}>
      <div className="mt-12px">
        <p className="mt-12px">
          First Name & Last Name <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span class="material-icons-outlined">account_circle</span>
          <input type="text" name="name" id="name" />
        </div>
      </div>
      <div className="mt-12px">
        <p className={styles.inpTitle}>
          Email <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span class="material-icons-outlined">email</span>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <div className="mt-12px">
        <p className={styles.inpTitle}>
          Mobile Number <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span class="material-icons-outlined">call</span>
          <input type="number" name="phone" id="phone" />
        </div>
      </div>
      <div className="mt-12px">
        <p className={styles.inpTitle}>
          Set a Password <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span class="material-icons-outlined">lock</span>{" "}
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
            <span class="material-icons-outlined">
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
          <button
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.appleBtn}`}
          >
            <span class={styles.apple}>
              <icons.Apple />
            </span>
            <p className="text-center">Connect with Apple</p>
          </button>
          <button
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.fbBtn}`}
          >
            <span class={styles.fb}>
              <icons.Facebook />
            </span>
            <p className="text-center">Connect with Apple</p>
          </button>
          <button
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            <span class={`material-icons-outlined ${styles.google}`}>
              phone_iphone
            </span>
            <p className="text-center">Connect with Apple</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
