import React from 'react';
import styles from './ChangePasswordForm.module.scss';
const ChangePasswordForm = ({ values, handleChange, handleSubmit,translate }) => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <p>
          {translate?.dash?.TYPE}<span class={styles.star}>*</span>
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
          {translate?.dash?.CURRENT}<span class={styles.star}>*</span>
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
          {translate?.dash?.RETYPE}<span class={styles.star}>*</span>
          </p>
          <input
            onChange={handleChange}
            type="password"
            name="retypePassword"
            id="retypePassword"
            value={values.retypePassword}
          />
        </div>
      </form>
      <div className="my-12px">
        <strong>Note:</strong>{' '}
        <span className={`greyText ${styles.smallText}`}>
        {translate?.dash?.PASS}
        </span>
      </div>
      <div className="mt-12px">
        <button
          onClick={(e) => handleSubmit(e, values)}
          type="submit"
          className={styles.submitBtn}
        >
          {translate?.dash?.CHANGE}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
