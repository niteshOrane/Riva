import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch, useSelector } from "react-redux";
import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";

import styles from "../../SignUpCard.module.scss";
import * as icons from "../../../../Icons/Icons";
import {
  createCustomer,
  createCustomerSocial,
  mergeGuestCart,
} from "../../../../../../services/auth/auth.service";
import { getCartId, getStoreId } from "../../../../../../util";
import { getCart } from "../../../../../../store/actions/cart";
import SignUpOtp from "./SignUpOtp";
import { loginSuccess } from "../../../../../../store/actions/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { isdCodes } from "../ISDdummy/isdCodes";

const SignUpForm = ({ handleSubmit, language }) => {
  const { currency } = useSelector((state) => state?.common?.store);
  const [isdState, setIsdState] = useState(
    isdCodes?.find((li) => li?.countryCode === currency)?.isd
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    lastName: "",
  });
  const [passError, setPassError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setshowLoginForm = () => {
    dispatch(toggleSignUpCard({}));
  };

  const { email, password, name, phone, lastName } = formData;

  const userCreateHandler = async (e) => {
    e.preventDefault();

    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (!re.test(password))
      return dispatch(
        showSnackbar(
          "Password must be at least 8 characters long with 1 Uppercase, 1 Lowercase & 1 Number character.",
          "error"
        )
      );

    if (!email || !name || !phone)
      return dispatch(showSnackbar("All fields are required", "warning"));
  };

  const [showPass, setShowPass] = useState();

  const responseFacebook = async (response) => {
    if (response) {
      const firstName = response?.name?.split(" ")[0];
      const lName = response?.name?.split(" ")[1];
      const userEmail = response?.email;
      const customer = new FormData();
      customer.append("email", userEmail);
      customer.append("firstname", firstName || "");
      customer.append("lastname", lName || "");
      customer.append("password", "hello@123");
      customer.append("resource", "Facebook");
      const res = await createCustomerSocial(customer);

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
          toast.configure();
          toast(
            `Welcome ${
              res?.data?.success ? res?.data.data.firstname : " Guest"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          return typeof res?.data?.data !== "string"
            ? history.push(redirectTo || "/dashboard")
            : null;
        } else {
          dispatch(
            showSnackbar(
              typeof res?.data?.data === "string"
                ? res?.data?.data
                : res.data.message || "Login failure",
              "error"
            )
          );
        }
      }
      return dispatch(showSnackbar("Something went wrong", "error"));
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  const responseGoogle = async (response) => {
    if (response.profileObj) {
      const firstName = response?.profileObj?.givenName;
      const lname = response?.profileObj?.familyName;
      const userEmail = response?.profileObj?.email;
      const customer = new FormData();
      customer.append("email", userEmail);
      customer.append("lastname", lname || "");
      customer.append("firstname", firstName || "");
      customer.append("password", "hello@123");
      customer.append("resource", "Google");
      const res = await createCustomerSocial(customer);
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
          toast.configure();
          toast(
            `Welcome ${
              res?.data?.success ? res?.data.data.firstname : " Guest"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          return typeof res?.data?.data !== "string"
            ? history.push(redirectTo || "/dashboard")
            : null;
        } else {
          dispatch(
            showSnackbar(
              typeof res?.data?.data === "string"
                ? res?.data?.data
                : res.data.message || "Login failure",
              "error"
            )
          );
        }
      }
      return dispatch(showSnackbar("Something went wrong", "error"));
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  return (
    <form className={styles.form} onSubmit={userCreateHandler}>
      <div className={styles.container}>
        <p className="mt-12px">
          First Name<span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">account_circle</span>
          <input
            required
            value={name}
            type="text"
            name="name"
            id="name"
            maxLength={30}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className="mt-12px">
          Last Name <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">account_circle</span>
          <input
            required
            value={lastName}
            type="text"
            name="lastName"
            id="lastName"
            maxLength={30}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Email <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">email</span>
          <input
            required
            value={email}
            type="email"
            name="email"
            id="email"
            maxLength={256}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Mobile Number <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <div className={styles.cntCode}>
            <select
              value={isdState}
              onChange={(e) => setIsdState(e.target.value)}
              className = {styles.isdSelect}
            >
              {isdCodes?.map((li) => (
                <option value={li?.isd}>
                  {li?.isd} {li?.countryCode}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            maxLength={10}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Set a Password <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">lock</span>{" "}
          <input
            required
            value={password}
            type={!showPass ? "password" : "text"}
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            id="password"
            maxLength={15}
            onChange={handleChange}
          />
          <button
            type="button"
            className="no-border bg-transparent c-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <span className="material-icons-outlined">
              {showPass ? "visibility_off" : "visibility"}
            </span>{" "}
          </button>
        </div>
        {/* {passError && <span> Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Number character.</span>} */}
        <p>
          Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Number character.
        </p>

        {/* <input value="SIGN UP" type="submit" className={styles.signUpBtn} /> */}
        <SignUpOtp
          formData={formData}
          handleSubmit={handleSubmit}
          language={language}
        />

        <p className={styles.or}>OR</p>

        <div>
          <a
            className={`d-flex align-items-center c-pointer`}
            style={{ justifyContent: "center", textDecoration: "underline" }}
            onClick={() => setshowLoginForm()}
          >
            <p>Login </p>
          </a>
          <button
            type="button"
            className={
              language === "Arabic"
                ? `d-flex align-items-center justify-content-between c-pointer ${styles.btn} ${styles.appleBtn}`
                : `d-flex align-items-center c-pointer ${styles.btn} ${styles.appleBtn}`
            }
          >
            <span className={styles.btnIcon}>
              <icons.Apple />
            </span>
            <p>Connect with Apple</p>
          </button>
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
              callback={responseFacebook}
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
              onSuccess={(response) => responseGoogle(response)}
              onFailure={(response) => console.log(response)}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
