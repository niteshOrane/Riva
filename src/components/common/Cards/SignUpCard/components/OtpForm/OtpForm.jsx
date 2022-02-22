import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import * as icons from "../../../../Icons/Icons";
import styles from "./Otp.module.scss";
import PhoneInput from "react-phone-number-input";
import AppleLogin from "react-apple-login";
import "react-phone-number-input/style.css";

import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";

import { getCart } from "../../../../../../store/actions/cart";

import {
  loginCustomerOTP,
  customerVerifyOtp,
  mergeGuestCart,
  customerResendOtp,
} from "../../../../../../services/auth/auth.service";

import { loginSuccess } from "../../../../../../store/actions/auth";
import { getCartId } from "../../../../../../util";
import { isdCodes } from "../ISDdummy/isdCodes";

const OtpForm = ({
  handleSubmit,
  onChangeMobileNumber = null,
  showMediaIcon = true,
  mobileNo = "",
  otpData = "",
  language,
  setLoginWithOtp,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const [phoneValue, setPhoneValue] = useState(mobileNo);
  const [loading, setLoading] = useState(false);
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );
  const { currency } = useSelector((state) => state?.common?.store);
  const [isdState, setIsdState] = useState(
    isdCodes?.find((li) => li?.countryCode === currency)?.isd
  );
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState(mobileNo);
  const [mobileOtp, setMobileOtp] = useState("");
  const [recivedOTPData, setRecivedOTPData] = useState("");
  const [hideMobileBox, setHideMobileBox] = useState(false);

  let myInterval = null;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleChangeOTP = (e) => {
    setMobileOtp(e.target.value);
  };
  const setSignUpForm = () => {
    dispatch(toggleSignUpCard({ isLogin: false }));
    setLoginWithOtp(false);
  };
  const sendOTP = async (e) => {
    e.preventDefault();
    if (!phoneValue) return setError(true);
    setError(false);
    setLoading(true);
    const customer = new FormData();
    customer.append("phone", phoneValue);
    customer.append("email", "");
    customer.append("name", "");
    setMobileNumber(phoneValue);
    const res = await loginCustomerOTP(customer);

    if (res.status === 200) {
      if (res?.data?.success) {
        setLoading(false);
        setHideMobileBox(true);

        setRecivedOTPData(res?.data.data);

        const divisor_for_minutes = res?.data.data.expiredtime % (60 * 60);
        const minutesTime = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const secondsTime = Math.ceil(divisor_for_seconds);
        setSeconds(secondsTime);
        setMinutes(minutesTime);
        return dispatch(showSnackbar(`OTP Sent on ${phoneValue}`, "success"));
      } else {
        setLoading(false);
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      setLoading(false);
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };
  const reSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneValue)
      return dispatch(showSnackbar("Mobile Number are required", "warning"));
      setMobileOtp("");

    const customer = new FormData();
    customer.append("phone", phoneValue);
    customer.append("customerInfo[email]", "");
    const res = await customerResendOtp(customer);

    if (res.status === 200) {
      if (res?.data?.success) {
        setHideMobileBox(true);
  
        setRecivedOTPData(res?.data.data);
        const divisor_for_minutes = res?.data.data.expiredtime % (60 * 60);
        const minutesTime = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const secondsTime = Math.ceil(divisor_for_seconds);
        setSeconds(secondsTime);
        setMinutes(minutesTime);
        return dispatch(
          showSnackbar(`OTP Sent on ${phoneValue} or Email`, "success")
        );
      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!mobileOtp) {
      return dispatch(showSnackbar("Please enter OTP", "warning"));
    } else if (onChangeMobileNumber) {
      onChangeMobileNumber(e, mobileOtp);
    } else {
      const customer = new FormData();
      customer.append("phone", phoneValue);
      customer.append("otp", mobileOtp);
      customer.append("customerInfo", "");
      customer.append("cartId",getCartId())

      const res = await customerVerifyOtp(customer);
      if (res.status === 200) {
        if (res?.data?.success) {
          if (getCartId() > 0) {
            const customerCart = new FormData();
            customerCart.append("guestQuoteId", getCartId());
            customerCart.append("customerId", res.data?.data?.customerID);
            // await mergeGuestCart(customerCart);
            // dispatch(getCart());
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
  };
  const setIntervalOTP = () => {
    myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    setIntervalOTP();

    return () => {
      clearInterval(myInterval);
    };
  });
  useEffect(() => {
    if (onChangeMobileNumber) {
      setHideMobileBox(true);
      setRecivedOTPData(otpData);

      const divisor_for_minutes = otpData.expiredtime % (60 * 60);
      const minutesTime = Math.floor(divisor_for_minutes / 60);

      const divisor_for_seconds = divisor_for_minutes % 60;
      const secondsTime = Math.ceil(divisor_for_seconds);
      setSeconds(secondsTime);
      setMinutes(minutesTime);
    }
  }, []);
  return (
    <>
      <span className={styles.tagline}>Have an account? Sign In</span>
      {hideMobileBox ? (
        <form>
          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex align-items-center my-12px">
              <div className={styles.cntCode}>
                <div className={styles.mobileIcon}>
                  <icons.Mobile />
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <p>Mobile Number</p>
                  <p className="font-weight-600">{phoneValue}</p>
                </div>
                {hideMobileBox && minutes === 0 && seconds === 0 ? (
                  <span
                    onClick={(e) => {
                      reSendOTP(e);
                    }}
                    className={styles.resend}
                  >
                    Resend OTP
                  </span>
                ) : null}
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
              type="number"
              name="mobileOtp"
              autoComplete={false}
              value={mobileOtp}
              id="mobileOtp"
              onChange={handleChangeOTP}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
            />
            {minutes === 0 && seconds === 0 ? null : (
              <span>
                {" "}
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              verifyOTP(e);
            }}
            className={styles.verifyBtn}
          >
            CONTINUE
          </button>
        </form>
      ) : (
        <form>
          <p className="mt-12px">
            Mobile Number<span className={styles.star}>*</span>
          </p>
          <div
            style={{ border: error ? "1px solid red" : null }}
            className={`d-flex align-items-center ${styles.inpContainer}`}
          >
            {/* <div className = "d-flex align-items-center">
              <select className = {styles.isdSelect} value={isdState} onChange={(e) => setIsdState(e.target.value)}>
                {isdCodes?.map(li => (
                  <option value={li?.isd}>{li?.isd}{" "}{li?.countryCode}</option>
                ))}
              </select>
            </div> */}
            {/* <input
              placeholder="Enter Mobile Number"
              type="text"
              name="mobileNumber"
              value={mobileNumber}
              id="mobileNumber"
              maxLength={20}
              onChange={handleChange}
            /> */}
            <PhoneInput
              placeholder="Enter Mobile Number"
              value={phoneValue}
              width="10px"
              defaultCountry={currentLocation.country_code.toUpperCase()}
              onChange={setPhoneValue}
            />
          </div>
          {error && (
            <span className={styles.authVal}>
              Please enter a valid mobile number
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              sendOTP(e);
            }}
            className={styles.verifyBtn}
          >
            {loading ? "SENDING OTP . . ." : "SEND OTP"}
          </button>
        </form>
      )}
      {showMediaIcon ? (
        <div className={styles.formLogin}>
          <p className={styles.or}>OR</p>
          <div>
          <AppleLogin
              clientId="com.react.apple.login"
              redirectURI="https://redirectUrl.com"
              usePopup={false}
              designProp={{ height: 40, width: 360 }}
              callback={(res) => console.log(res)}
            />
            <button
              type="button"
              className={
                language === "Arabic"
                  ? `d-flex align-items-center justify-content-between c-pointer ${styles.btn} ${styles.fbBtn}`
                  : `d-flex align-items-center c-pointer ${styles.btn} ${styles.fbBtn}`
              }
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
              className={
                language === "Arabic"
                  ? `d-flex align-items-center justify-content-between c-pointer ${styles.btn} ${styles.googleBtn}`
                  : `d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`
              }
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
                <strong className="c-pointer" onClick={() => setSignUpForm()}>
                  Sign Up
                </strong>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OtpForm;
