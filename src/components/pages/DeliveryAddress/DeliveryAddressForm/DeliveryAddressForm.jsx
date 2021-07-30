import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./DeliveryAddressForm.module.scss";
import { getCustId } from "../../../../util";
import { showSnackbar } from "../../../../store/actions/common";
import {
  addCustomerAddress,
  updateCustomerAddress,
  getCountryList,
} from "../../../../services/address/address.service";
import {
  toggleAddresslist,
  addNewAddress,
} from "../../../../store/actions/customerAddress";

function DeliveryAddressForm({ customerData, onAfterSaveEdit }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    city: "",
    state: "",
    mobile: "",
    street: "",
    street1: "",
    block: "",
    houseName: "",
    defaultAddess: true,
    id: 0,
    country: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const getAllCountryList = async () => {
    const res = await getCountryList();
    if (res.status === 200) {
      if (res?.data) {
        setCountryList(res?.data);
        // setFormData({ ...formData, country: res?.data[0]?.full_name_english });
      }
    } else {
      dispatch(showSnackbar("FailedTo Load Country List", "error"))
    }
  };
  useEffect(() => {
    getAllCountryList();
  }, []);
  useEffect(() => {
    if (countryList && formData.country) {
      const temp = countryList?.find(
        (li) => li.full_name_english === formData.country
      )?.available_regions;
      setStateList(temp);
    }
  }, [formData.country]);
  const clearAll = () => {
    setFormData({
      firstName: "",
      lastName: "",
      pincode: "",
      city: "",
      state: "",
      mobile: "",
      street: "",
      street1: "",
      block: "",
      houseName: "",
      defaultAddess: true,
      country: ""
    });
    if (onAfterSaveEdit) { onAfterSaveEdit(); }
  };
  const addAddress = (item, id) => async () => {
    const res = await (id
      ? updateCustomerAddress(item)
      : addCustomerAddress(item));
    if (res.data.success) {
      dispatch(addNewAddress(res, item));
      clearAll();
      if (onAfterSaveEdit) { onAfterSaveEdit(); }
    } else {
      dispatch(
        showSnackbar(
          res.data.message || "failed to add item to Address",
          "error"
        )
      );
    }
  };
  useEffect(() => {
    formData.firstName = customerData?.name?.split(" ")?.[0];
    formData.lastName = customerData?.name?.split(" ")?.[1];
    formData.mobile = customerData?.phone;
    formData.pincode = customerData?.postcode;
    formData.id = customerData?.id;
    formData.block = customerData?.street?.split(" ")?.[0];
    formData.houseName = customerData?.street?.split(" ")?.[1];
    formData.country = customerData?.country
    setFormData({ ...formData, ...customerData });
  }, [customerData]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {
    firstName = "",
    lastName = "",
    pincode = "",
    city = "",
    state = "",
    mobile = "",
    street = "",
    houseName = "",
    block = "",
    defaultAddess,
    id,
    email,
    country
  } = formData;

  const addAddressHandler = () => {
    const form = new FormData();

    if (!firstName) {
      return dispatch(showSnackbar("First Name Require", "error"));
    }
    if (!lastName) {
      return dispatch(showSnackbar("Last Name Require", "error"));
    }
    if (!city) {
      return dispatch(showSnackbar("City Require", "error"));
    }
    if (!state) {
      return dispatch(showSnackbar("State Require", "error"));
    }
    if (!pincode) {
      return dispatch(showSnackbar("pin code Require", "error"));
    }

    if (!block) {
      return dispatch(showSnackbar("street Require", "error"));
    }

    if (!houseName) {
      return dispatch(showSnackbar("houseName Require", "error"));
    }
    if (!street) {
      return dispatch(showSnackbar("Street is Required", "error"));
    }
    if (!mobile) {
      return dispatch(showSnackbar("mobile Require", "error"));
    }
    if (mobile.length !== 10) {
      return dispatch(
        showSnackbar("Mobile number must be 10 numbers long", "error")
      );
    }

    form.append("customerid", getCustId());
    if (id) {
      form.append("addressid", id);
    }
    form.append("name", `${firstName} ${lastName}`);
    form.append("pincode", pincode);
    form.append("city", city);
    form.append("state", state);
    form.append("telephone", mobile);
    form.append("street", `${block} ${houseName}`);
    form.append("street1", street);
    form.append("country", country)
    dispatch(addAddress(form, id));
    dispatch(toggleAddresslist(null));
  };
  return (
    <>
      <form className={styles.form} id="addNewAddress">
        <div className={styles.inpContainerAdd}>Add an address for delivery in your address book and make checkout faster</div>
        <div className={styles.inpContainer}>

          <div className="w-100">
            <p className={styles.inpLable}>
              First Name<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              maxLength={15}
              className={styles.input}
              value={firstName}
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
              maxLength={15}
              value={lastName}
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
              Country<span className={styles.star}>*</span>
            </p>
            <select
              name="country"
              onChange={handleChange}
              className={`${styles.input} c-pointer`}
              value={country}
            >
              <option>Select Country</option>
              {countryList?.map((li) => (
                <option value={li?.full_name_english} key={li.id}>{li?.full_name_english}</option>
              ))}
            </select>
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              State/Province<span className={styles.star}>*</span>
            </p>
            <select
              className={`${styles.input} c-pointer`}
              name="state"
              onChange={handleChange}
              value={state}
            >
              <option>Select state</option>
              {stateList?.map((li) => (
                <option value={li?.name} key={li.id}>{li?.name}</option>
              ))}
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
              value={pincode}
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
            <input
              type="text"
              className={styles.input}
              name="city"
              value={city}
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>Block</p>
            <input
              type="block"
              className={styles.input}
              value={block}
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
              value={street}
              maxLength={15}
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
              maxLength={15}
              className={styles.input}
              name="houseName"
              value={houseName}
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
                value={mobile}
                maxLength={15}
                className={`${styles.input} ${styles.mobileInput}`}
                name="mobile"
                id="mobile"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={defaultAddess}
            name="defaultAddess"
            id="defaultAddess"
            onChange={handleChange}
          />
          <label htmlFor="default" className={styles.useDefaultText}>
            Use as my default address.
          </label>
        </div>
      </form>
      <div className="text-right c-pointer">
        <button
          className={styles.addAddressBtn}
          type="button"
          onClick={addAddressHandler}
        >
          {id ? "UPDATE" : "ADD"} ADDRESS
        </button>
        <button
          className={styles.clrAddressBtn}
          type="button"
          onClick={clearAll}
        >
          CLEAR
        </button>
      </div>
    </>
  );
}

export default DeliveryAddressForm;
