import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profileInformation.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as icons from "../../components/common/Icons/Icons";

import OTPForm from "../../components/common/Cards/SignUpCard/components/OtpForm/OtpForm";
import styles from "../../components/common/Cards/SignUpCard/SignUpCard.module.scss";
import { profileUpdate } from "../../services/dashboard/dashboard.service";
import { showSnackbar } from "../../store/actions/common";
import { setCustomer } from "../../store/actions/auth";
import {
  verifyUpdateProfileMobileOtp,
  loginCustomerOTP,
} from "../../services/auth/auth.service";
import { getCustId, getStoreId } from "../../util";

import useArabic from "../../components/common/arabicDict/useArabic";

function ProfileInfoForm() {
  const customer = useSelector((state) => state.auth.customer);
  const { translate } = useArabic();
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const { language } = useSelector((state) => state?.common?.store);
  const [phoneValue, setPhoneValue] = useState(
    `${
      customer?.mobile ||
      customer?.mobile_number ||
      currentLocation.country_calling_code
    }`
  );
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(customer?.mobile || "");
  const [values, setValues] = useState({
    firstname: customer?.firstname,
    lastname: customer?.lastname,
    email: customer?.email,
    mobile_number: customer?.mobile,
    gender: customer.gender,
    dob: customer.dob,
    profileImg: "",
  });
  const handleChange = (event) => {
    if (event.target.type === "file") {
      setValues({
        ...values,
        [event.target.name]: event.target.files[0],
      });
    } else if (event.target.type === "date") {
      const date = new Date(event.target.value);
      const selectedDate = date.getTime();
      if (selectedDate > new Date().getTime()) {
        const ele = document.querySelector("#dob-date");
        ele.value = "";
        return dispatch(
          showSnackbar(
            "Enter a valid DOB, Future Date cannot be added",
            "error"
          )
        );
      } else {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
      }
    } else {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cust = new FormData();

    cust.append("customerid", customer.customerID);
    cust.append("firstname", values.firstname);
    cust.append("email", values.email);
    cust.append("customerInfo[lastname]", values.lastname);
    cust.append("customerInfo[dob]", values.dob);
    cust.append("customerInfo[gender]", values.gender);
    cust.append("customerInfo[mobile_number]", phoneValue);
    cust.append("customerInfo[storeId]", getStoreId());

    const res = await profileUpdate(cust);

    if (res.status === 200) {
      dispatch(
        setCustomer({
          ...res?.data,
        })
      );
      return dispatch(showSnackbar(res?.data?.message, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };
  const verifyOTP = async (e, mobileOtp) => {
    e.preventDefault();
    if (!mobileOtp)
      return dispatch(showSnackbar("Please enter OTP", "warning"));
    const customerMobile = new FormData();
    customerMobile.append("phone", mobileNumber);
    customerMobile.append("otp", mobileOtp);
    customerMobile.append("customerid", getCustId());

    const res = await verifyUpdateProfileMobileOtp(customerMobile);
    if (res.status === 200) {
      if (res?.data?.success) {
        return dispatch(showSnackbar(res?.data.message, "success"));
      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  const [recivedOTPData, setRecivedOTPData] = useState("");
  useEffect(() => {
    if (recivedOTPData) {
      setIsEdit(false);
      setIsOpen(true);
    }
  }, [recivedOTPData]);

  const onSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneValue)
      return dispatch(showSnackbar("Mobile Number are required", "warning"));
    const customerSendOTP = new FormData();
    customerSendOTP.append("phone", phoneValue);
    customerSendOTP.append("email", "");
    customerSendOTP.append("name", values?.firstname);

    const res = await loginCustomerOTP(customerSendOTP);

    if (res.status === 200) {
      if (res?.data?.success) {
        setRecivedOTPData(res?.data.data);
        return dispatch(showSnackbar(`OTP Sent on ${mobileNumber}`, "success"));
      } else if (res?.data.message) {
        return dispatch(showSnackbar(res?.data.message, "error"));
      } else {
        dispatch(showSnackbar("Something went wrong", "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
    return null;
  };
  return (
    <>
      <section className="registration-form-wrapper">
        <form onSubmit={handleSubmit} className="user-sign-in-form">
          <article className="inner-form-wrapper">
            <section>
              <div className="boxProfileInfo">
                <label htmlFor="firstName" className="profile-label">
                  First Name
                </label>
                <input
                  value={values?.firstname}
                  name="firstname"
                  onChange={handleChange}
                  id="firstName"
                />
              </div>
              <div className="boxProfileInfo" style={{ marginLeft: "2rem" }}>
                <label className="profile-label">Last Name</label>
                <input
                  name="lastname"
                  value={values?.lastname}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <div className="boxProfileInfo">
                <label className="profile-label">Email</label>
                <input
                  readOnly
                  disabled
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="isdInfoBox" style={{ marginLeft: "2rem" }}>
                <label className="profile-label-mobile">Mobile Number</label>
                <div className="inpContainer phoneInp">
                  <PhoneInput
                    placeholder="Enter Mobile Number"
                    value={isEdit ? mobileNumber : phoneValue}
                    width="100%"
                    defaultCountry={
                      currentLocation.country_code.toUpperCase() || "US"
                    }
                    onChange={setPhoneValue}
                    readOnly={!isEdit}
                  />
                  {isEdit ? (
                    <>
                      {" "}
                      <span
                        onClick={(e) => {
                          onSendOTP(e);
                        }}
                        className={` underline-hovered c-pointer edit-position-check`}
                      >
                        <icons.Check className="closeIcon" />
                      </span>
                      <span
                        onClick={() => {
                          setIsEdit(false);
                          setMobileNumber("");
                        }}
                        className={` underline-hovered c-pointer edit-position-close`}
                      >
                        <icons.Close className="closeIcon" />
                      </span>
                    </>
                  ) : (
                    <span
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      className={` underline-hovered c-pointer edit-position-pencil`}
                      style={{
                        left: language === "Arabic" && "3%",
                      }}
                    >
                      <icons.Pencil />
                    </span>
                  )}
                </div>
              </div>
            </section>
            <section>
              <FormControl component="fieldset">
                <FormLabel className="profile-label" component="legend">
                  Your Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={values.gender}
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                >
                  <section
                    style={{
                      paddingRight: language === "Arabic" ? "10px" : "0px",
                    }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="Male"
                      labelPlacement="start"
                      name="gender"
                      style={{ color: "black" }}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="Female"
                      labelPlacement="start"
                      name="gender"
                      style={{ color: "black" }}
                    />
                  </section>
                </RadioGroup>
              </FormControl>
            </section>
            <section>
              <div className="boxProfileInfo" style={{ position: "relative" }}>
                <label className="profile-label">Date of Birth</label>
                <input
                  type="date"
                  id="dob-date"
                  value={values.dob}
                  placeholder="Select DOB"
                  name="dob"
                  onChange={handleChange}
                />
                {/* <img className="inputCalender" src="/assets/images/pfCalender.svg" /> */}
              </div>
            </section>
          </article>
          <section className="registration-submit-btn-wrapper">
            <button type="submit" className="registration-btn">
              {translate?.dash?.DETAILS}
            </button>
          </section>
        </form>
      </section>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="simple-dialog-title"
        onClose={handleClose}
        open={isOpen}
      >
        <div className={styles.popupBody}>
          <button
            type="button"
            onClick={handleClose}
            title="Close"
            className={`bg-transparent no-border ${styles.close}`}
          >
            <icons.Close />
          </button>
          <OTPForm
            handleSubmit={handleClose}
            onChangeMobileNumber={verifyOTP}
            otpData={recivedOTPData}
            showMediaIcon={Boolean(false)}
            mobileNo={mobileNumber}
            email={values?.email}
          />
        </div>
      </Dialog>
    </>
  );
}

export default ProfileInfoForm;
