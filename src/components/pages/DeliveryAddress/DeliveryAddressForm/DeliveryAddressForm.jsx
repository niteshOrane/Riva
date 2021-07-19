import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeliveryAddressForm.module.scss";
import { getCustId, getCartId, getStoreId } from "../../../../util";
import {
  showSnackbar
} from "../../../../store/actions/common";
//services/address/address.service
import {
  addCustomerAddress
} from '../../../../services/address/address.service';
import { getCustomerAddress, toggleAddresslist, addNewAddress } from '../../../../store/actions/customerAddress';



function DeliveryAddressForm({customerData}) {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(true);
  const addAddress = (item) => async (dispatch) => {
    const res = await addCustomerAddress(item);
    if (res.data.success) {
      dispatch(addNewAddress(res, item));
      clearAll();
      setShowList(true);
    }
    else {
      dispatch(
        showSnackbar(
          res.data.message || 'failed to add item to Address',
          'error'
        )
      );
    }
  };
  const [formData, setFormData] = useState({
    customerid: "",
    firstName: "",
    lastName: "",
    pincode: "",
    city: '',
    state: '',
    mobile: '',
    street: '',
    street1: '',
    block: '',
    houseName: '',
    block: '',
    defaultAddess: true
  });
  const clearAll = () => {
    setFormData({
      customerid: "",
      firstName: "",
      lastName: "",
      pincode: "",
      city: '',
      state: '',
      mobile: '',
      street: '',
      street1: '',
      block: '',
      houseName: '',
      block: '',
      defaultAddess: true
    });
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {
    customerid = "",
    firstName = "",
    lastName = "",
    pincode = "",
    city = '',
    state = '',
    mobile = '',
    street = '',
    street1 = '',
    houseName = '',
    block = '', defaultAddess } = formData;

  const addAddressHandler = () => {
    if (!firstName) {
      return dispatch(
        showSnackbar(
          'First Name Require',
          "error"
        )
      );
    }
    if (!lastName) {
      return dispatch(
        showSnackbar(
          'Last Name Require',
          "error"
        )
      );
    }
    if (!email) {
      return dispatch(
        showSnackbar(
          'Email Require',
          "error"
        )
      );
    }
    if (!city) {
      return dispatch(
        showSnackbar(
          'City Require',
          "error"
        )
      );
    }
    if (!state) {
      return dispatch(
        showSnackbar(
          'State Require',
          "error"
        )
      );
    }
    if (!pincode) {
      return dispatch(
        showSnackbar(
          'pin code Require',
          "error"
        )
      );
    }

    if (!block) {
      return dispatch(
        showSnackbar(
          'street Require',
          "error"
        )
      );
    }

    if (!houseName) {
      return dispatch(
        showSnackbar(
          'houseName Require',
          "error"
        )
      );
    }
    if (!houseName) {
      return dispatch(
        showSnackbar(
          'houseName Require',
          "error"
        )
      );
    }
    if (!street) {
      return dispatch(
        showSnackbar(
          'houseName Require',
          "error"
        )
      );
    }
    if (!mobile) {
      return dispatch(
        showSnackbar(
          'mobile Require',
          "error"
        )
      );
    }
    var form = new FormData();
    form.append("customerid", getCustId());
    form.append("name", `${firstName} ${lastName}`);
    form.append("pincode", pincode);
    form.append("city", city);
    form.append("state", state);
    form.append("telephone", mobile);
    form.append("street", `${block} ${houseName}`);
    form.append("street1", street);
    dispatch(addAddress(form));
    dispatch(toggleAddresslist(null));
  };
  return (
    <>{!showList ? <>
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
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              Last Name<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              className={styles.input}
              name="lastName"
              id="lastName"
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Country<span className={styles.star}>*</span>
            </p>
            <select name="country" className={`${styles.input} c-pointer`}>
              <option selected>America</option>
              <option>UAE</option>
              <option>UK</option>
            </select>
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              State/Province<span className={styles.star}>*</span>
            </p>
            <select className={`${styles.input} c-pointer`} name="state" onChange={handleChange}>
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
              name="pincode"
              id="pincode"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              City<span className={styles.star}>*</span>
            </p>
            <select className={`${styles.input} c-pointer`} name="city" onChange={handleChange}>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <input type="checkbox" checked={true} name="defaultAddess" id="defaultAddess" onChange={handleChange} />
          <label htmlFor="default" className={styles.useDefaultText}>
            Use as my default address.
          </label>
        </div>
      </form>
      <div className="text-right c-pointer">
        <button className={styles.addAddressBtn} onClick={addAddressHandler}>ADD ADDRESS</button>
      </div>
    </> : <></>}
    </>
  );
}

export default DeliveryAddressForm;
