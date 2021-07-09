import React from 'react';
import styles from './ChangePasswordForm.module.scss';
const ChangePasswordForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <p>
            Type Current Password<span class={styles.star}>*</span>
          </p>
          <input
            onChange={handleChange}
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={values.currentPassword}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>
            Type New Password<span class={styles.star}>*</span>
          </p>
          <input
            onChange={handleChange}
            type="password"
            name="newPassword"
            id="newPassword"
            value={values.newPassword}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>
            Retype New Password<span class={styles.star}>*</span>
          </p>
          <input
            onChange={handleChange}
            type="password"
            name="retypePassword"
            id="retypePassword"
            value={values.retypePassword}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>
            Enter OTP
            {/* <span class={styles.star}>*</span> */}
          </p>
          <input
            onChange={handleChange}
            type="text"
            name="otp"
            id="otp"
            value={values.otp}
          />
        </div>
      </form>
      <div className="my-12px">
        <strong>Note:</strong>{' '}
        <span className={`greyText ${styles.smallText}`}>
          Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Numeric character.
        </span>
      </div>
      <div className="mt-12px">
        <button
          onClick={(e) => handleSubmit(e, values)}
          type="submit"
          className={styles.submitBtn}
        >
          CHANGE PASSWORD
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
