import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profileInformation.scss";
import * as icons from "../../components/common/Icons/Icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from '@material-ui/core/Dialog';
import OTPForm from '../../components/common/Cards/SignUpCard/components/OtpForm/OtpForm';
import styles from '../../components/common/Cards/SignUpCard/SignUpCard.module.scss';
import {
  profileUpdate,
} from "../../services/dashboard/dashboard.service";
import { showSnackbar } from "../../store/actions/common";
import { setCustomer } from "../../store/actions/auth";
import {
  customerVerifyOtp,

} from "../../services/auth/auth.service";
import { getStoreId } from "../../util";

function ProfileInfoForm() {
  const customer = useSelector((state) => state.auth.customer);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
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
    } else {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    }
  };
  const handleChangeMobile = (event) => {
    setMobileNumber(event.target.value)
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
    cust.append("customerInfo[mobile_number]", values.mobile_number);
    cust.append("customerInfo[storeId]", getStoreId());

    const res = await profileUpdate(cust);

    if (res.status === 200) {
      dispatch(
        setCustomer({
          ...values,
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
    customerMobile.append("customerInfo", "")

    const res = await customerVerifyOtp(customerMobile);
    if (res.status === 200) {
      if (res?.data?.success) {
        //code goes Here

      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  }
  return (
    <>
      <section className="registration-form-wrapper">
        <form onSubmit={handleSubmit} className="user-sign-in-form">
          <article className="inner-form-wrapper">
            <section>
              <div className>
                <label className="profile-label">First Name</label>
                <input
                  value={values?.firstname}
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label className="profile-label">Last Name</label>
                <input
                  name="lastname"
                  value={values?.lastname}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section>
              <div className>
                <label className="profile-label">Email</label>
                <input
                  readOnly
                  disabled
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label className="profile-label">Mobile Number</label>
                <div className={`d-flex align-items-center inpContainer`}>

                  <input
                    name="mobile_number"
                    readOnly={!isEdit}
                    value={isEdit ? mobileNumber : values?.mobile_number}
                    onChange={handleChangeMobile}
                  />
                  {isEdit ? <> <span onClick={() => { setIsEdit(false); setIsOpen(true) }} className={` underline-hovered c-pointer`}>
                    <icons.Check className="closeIcon" />
                  </span>
                    <span onClick={() => { setIsEdit(false) }} className={` underline-hovered c-pointer`}>
                      <icons.Close className="closeIcon" />
                    </span></>

                    : <span onClick={() => { setIsEdit(true) }} className={` underline-hovered c-pointer`}>
                      <icons.Pencil />
                    </span>
                  }

                </div>


              </div>
            </section>
            <section>
              <FormControl component="fieldset">
                <FormLabel className="profile-label" component="legend">Your Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={values.gender}
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                >
                  <section>
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="primary" />}
                      label="Male"
                      labelPlacement="start"
                      name="gender"
                      style={{ color: "black" }}
                    />
                    <FormControlLabel
                      value="Female"
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
              <div style={{ position: "relative" }}>
                <label className="profile-label">Date of Birth</label>
                <input
                  value={values.dob}
                  placeholder="Select DOB"
                  name="dob"
                  onChange={handleChange}
                />
                <img className="inputCalender" src="/assets/images/pfCalender.svg" />
              </div>
            </section>
          </article>
          <section className="registration-submit-btn-wrapper">
            <button type="submit" className="registration-btn">
              SAVE DEATILS
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
          <OTPForm handleSubmit={handleClose} onChangeMobileNumber={verifyOTP} showMediaIcon={Boolean(false)} />
        </div>
      </Dialog>
    </>
  );
}

export default ProfileInfoForm;
