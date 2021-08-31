import React, { useEffect } from "react";

import { useHistory } from "react-router";
import * as icons from "../../../../Icons/Icons";
import styles from "./Otp.module.scss";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";


import { getCart } from "../../../../../../store/actions/cart";

import {
  loginCustomerOTP,
  customerVerifyOtp,
  mergeGuestCart,
  customerResendOtp
} from "../../../../../../services/auth/auth.service";

import { loginSuccess } from "../../../../../../store/actions/auth";
import { getCartId } from "../../../../../../util";

const OtpForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [recivedOTPData, setRecivedOTPData] = useState('');
  const [hideMobileBox, setHideMobileBox] = useState(false);


  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleChangeOTP = (e) => {
    setMobileOtp(e.target.value);
  };
  const sendOTP = async (e) => {
    e.preventDefault();
    if (!mobileNumber)
      return dispatch(showSnackbar("Mobile Number are required", "warning"));
    const customer = new FormData();
    customer.append("phone", mobileNumber);
    customer.append("email", "");
    customer.append("name", "")

    const res = await loginCustomerOTP(customer);

    if (res.status === 200) {
      if (res?.data?.success) {
        setHideMobileBox(true);
        setRecivedOTPData(res?.data.data);
        setSeconds(res?.data.data.expiredtime)
        return dispatch(showSnackbar(`Otp-${res?.data.data.otp} Sent on ${mobileNumber}`, "success"));
      }
      else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    }
    else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  }
  const reSendOTP = async (e) => {
    e.preventDefault();
    if (!mobileNumber)
      return dispatch(showSnackbar("Mobile Number are required", "warning"));
    const customer = new FormData();
    customer.append("phone", mobileNumber);

    const res = await customerResendOtp(customer);

    if (res.status === 200) {
      if (res?.data?.success) {
        setHideMobileBox(true);
        setRecivedOTPData(res?.data.data);
        setSeconds(res?.data.data.expiredtime)
        return dispatch(showSnackbar(`Otp-${res?.data.data.otp} Sent on ${mobileNumber}`, "success"));
      }
      else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    }
    else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  }
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!mobileOtp)
      return dispatch(showSnackbar("Please enter OTP", "warning"));
    const customer = new FormData();
    customer.append("phone", mobileNumber);
    customer.append("otp", mobileOtp);
    customer.append("customerInfo", "")

    const res = await customerVerifyOtp(customer);
    if (res.status === 200) {
      if (res?.data?.success) {
        if (getCartId() > 0) {
          const customerCart = new FormData();
          customerCart.append("guestQuoteId", getCartId());
          customerCart.append("customerId", res.data?.data?.customerID);
          await mergeGuestCart(customerCart);
          dispatch(getCart());
        }
        handleSubmit();
        typeof res?.data?.data !== "string" &&
          dispatch(loginSuccess(res.data.data));
        dispatch(
          showSnackbar(
            typeof res?.data?.data === "string"
              ? res?.data?.data
              : "Login Success",
            "success"
          )
        );
        return typeof res?.data?.data !== "string"
          ? history.push(redirectTo || "/dashboard")
          : null;
      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  }
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <>
      <span className={styles.tagline}>Have an account? Sign In</span>
      {hideMobileBox ? <form>
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex align-items-center my-12px">
            <div className={styles.mobileIcon}>
              <icons.Mobile />
            </div>
            <div className="d-flex">
              <div>
                <p>Mobile Number</p>
                <p className="font-weight-600">{mobileNumber}</p>
                <p className="font-weight-600">OTP is - {recivedOTPData?.otp}</p>
              </div>
              {hideMobileBox && minutes === 0 && seconds === 0 ? <span onClick={(e) => { reSendOTP(e) }} className={styles.resend}>Resend OTP</span> : null}
            </div>
          </div>
          <button type="button" className="no-border bg-transparent" />
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
            name="mobileOtp"
            autoComplete={false}
            value={mobileOtp}
            id="mobileOtp"
            onChange={handleChangeOTP}
          />
          {minutes === 0 && seconds === 0
            ? null
            : <span> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          }
        </div>
        <button type="button" onClick={(e) => { verifyOTP(e) }} className={styles.verifyBtn}>
          CONTINUE
        </button>
      </form>
        :
        <form>
          <p className="mt-12px">
            Mobile Number<span className={styles.star}>*</span>
          </p>
          <div className={`d-flex align-items-center ${styles.inpContainer}`}>
            <div className={styles.mobileIcon}>
              <icons.Mobile />
            </div>
            <input
              placeholder="Enter Mobile Number"
              type="text"
              name="mobileNumber"
              value={mobileNumber}
              id="mobileNumber"
              maxLength={20}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={(e) => { sendOTP(e) }} className={styles.verifyBtn}>
            SEND OTP
          </button>
        </form>

      }<div className={styles.formLogin}>
        <p className={styles.or}>OR</p>
        <div>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.appleBtn}`}
          >
            <span className={styles.btnIcon}>
              <icons.Apple />
            </span>
            <p>Connect with Apple</p>
          </button>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.fbBtn}`}
          >
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              <icons.Facebook />
            </span>
            <FacebookLogin
              appId="3898973050213783"
              fields="name,email,picture"
              // cssClass=  {styles.facebookAuthBtn}
              render={(renderProps) => (
                <p onClick={renderProps.onClick}>Connect with Facebook</p>
              )}
              // onClick={componentClicked}
              textButton="Connect with Facebook"
            // callback={responseFacebook}
            />
          </button>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              phone_iphone
            </span>
            <GoogleLogin
              clientId="488711396287-7q699f85tm36dha5c5mml1dkpg9eibrr.apps.googleusercontent.com"
              buttonText="Connect with Google"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={styles.googleAuthBtn}
                >
                  Connect with Google
                </button>
              )}
              className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
              // onSuccess={(response) => responseGoogle(response)}
              onFailure={(response) => console.log(response)}
            />

          </button>
          <div className={styles.signInLink}>
            <p>
              Create an account?{" "}
              <strong className="c-pointer">
                Sign In
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
