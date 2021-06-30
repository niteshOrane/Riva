import React from "react";
import styles from "./DeliveryAddressForm.module.scss";
function DeliveryAddressForm() {
  return (
    <form className={styles.form}>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            First Name<span className={styles.star}>*</span>
          </p>
          <input
            type="text"
            className={styles.input}
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="w-100">
          <p className={styles.inpLable}>
            Last Name<span className={styles.star}>*</span>
          </p>
          <input
            type="text"
            className={styles.input}
            name="LastName"
            id="LastName"
          />
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            Email<span className={styles.star}>*</span>
          </p>
          <input
            type="email"
            className={styles.input}
            name="email"
            id="email"
          />
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            Country<span className={styles.star}>*</span>
          </p>
          <select className={`${styles.input} c-pointer`}>
            <option selected>America</option>
            <option>UAE</option>
            <option>UK</option>
          </select>
        </div>
        <div className="w-100">
          <p className={styles.inpLable}>
            State/Province<span className={styles.star}>*</span>
          </p>
          <select className={`${styles.input} c-pointer`}>
            <option selected disabled>
              Please select region, state or province
            </option>
            <option>UAE</option>
            <option>UK</option>
          </select>
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            Zip/Postal Code<span className={styles.star}>*</span>
          </p>
          <input
            type="text"
            className={styles.input}
            name="zipCode"
            id="zipCode"
          />
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            City<span className={styles.star}>*</span>
          </p>
          <select className={`${styles.input} c-pointer`}>
            <option selected disabled>
              Please Select City
            </option>
            <option>UAE</option>
            <option>UK</option>
          </select>
        </div>
        <div className="w-100">
          <p className={styles.inpLable}>Block</p>
          <input
            type="block"
            className={styles.input}
            name="block"
            id="block"
          />
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            Street<span className={styles.star}>*</span>
          </p>
          <input
            type="text"
            className={styles.input}
            name="street"
            id="street"
          />
        </div>
        <div className="w-100">
          <p className={styles.inpLable}>
            House Name/Number<span className={styles.star}>*</span>
          </p>
          <input
            type="text"
            className={styles.input}
            name="houseName"
            id="houseName"
          />
        </div>
      </div>
      <div className={styles.inpContainer}>
        <div className="w-100">
          <p className={styles.inpLable}>
            Mobile Number<span className={styles.star}>*</span>
          </p>
          <div className="d-flex align-items-center w-100 position-relative">
            <span className={styles.mobileCode}>+374</span>
            <input
              type="mobile"
              className={`${styles.input} ${styles.mobileInput}`}
              name="mobile"
              id="mobile"
            />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <input type="checkbox" checked={true} name="default" id="default" />
        <label htmlFor="default" className={styles.useDefaultText}>
          Use as my default address.
        </label>
      </div>
    </form>
  );
}

export default DeliveryAddressForm;
