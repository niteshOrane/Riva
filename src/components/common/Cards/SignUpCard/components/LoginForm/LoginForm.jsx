import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { getCart } from "../../../../../../store/actions/cart";
import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";
import styles from "../../SignUpCard.module.scss";
import {
  loginCustomer,
  forgotPassword,
  mergeGuestCart,
} from "../../../../../../services/auth/auth.service";
import { loginSuccess } from "../../../../../../store/actions/auth";
import { getCartId } from "../../../../../../util";
import * as icons from "../../../../Icons/Icons";

const LoginForm = ({
  handleSubmit,
  handleOtpForm,
  setForgetPassStyle,
  language,
}) => {
  const dispatch = useDispatch();
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
  });

  const [showforgotPassword, setforgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setForgetPassStyle(true);
    setforgotPassword((f) => !f);
  };

  const { email, password } = formData;

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) return dispatch(showSnackbar("email required", "warning"));

    const customer = new FormData();

    customer.append("email", email);

    const res = await forgotPassword(customer);

    if (res && res.status === 200 && res.data?.success) {
      handleSubmit();
      return dispatch(showSnackbar(res?.data?.message, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setSignUpForm = () => {
    dispatch(toggleSignUpCard({ isLogin: false }));
  };

  const userCreateHandler = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return dispatch(showSnackbar("All fields are required", "warning"));

    const customer = new FormData();

    customer.append("email", email);

    customer.append("password", password);
    customer.append("mobile", "");
    customer.append("action", "login");

    const res = await loginCustomer(customer);

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
          `Welcome ${res?.data?.success ? res?.data.data.firstname : " Guest"}`,
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
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  const [showPass, setShowPass] = useState(false);

  if (showforgotPassword)
    return (
      <form className={styles.form} onSubmit={forgotPasswordSubmit}>
        <div className={styles.container}>
          <p className={styles.inpTitle}>
            Enter Email <span className={styles.star}>*</span>
          </p>
          <div className={`d-flex align-items-center ${styles.inpContainer}`}>
            <span className="material-icons-outlined">email</span>
            <input
              required
              value={email}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.container}>
          <input value="SUBMIT" type="submit" className={styles.signUpBtn} />
        </div>
      </form>
    );
  return (
    <>
      <span className={styles.tagline}>Have an account? Sign In</span>
      <form className={styles.formLogin} onSubmit={userCreateHandler}>
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
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.container}>
          <p className={styles.inpTitle}>
            Password <span className={styles.star}>*</span>
          </p>
          <div className={`d-flex align-items-center ${styles.inpContainer}`}>
            <span className="material-icons-outlined">lock</span>{" "}
            <input
              required
              value={password}
              type={!showPass ? "password" : "text"}
              name="password"
              id="password"
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
          <div className={styles.checkContainer}>
            <div>
              <input className={styles.checkBox} type="checkbox" />
              <span style={{ color: "#6a6565" }}>Remember me</span>
            </div>
            <div>
              <p onClick={() => toggleForgotPassword()} className={styles.fyp}>
                Forget Your Password
              </p>
            </div>
          </div>
          <div className={styles.signinWrapper}>
            <input value="SIGN IN" type="submit" className={styles.signUpBtn} />
            <input
              value="SIGN IN WITH OTP"
              type="button"
              onClick={handleOtpForm}
              className={styles.signUpBtn}
            />
          </div>

          <p className={styles.or}>OR</p>

          {/* <div>
          <a
            type="button"
            className={`d-flex align-items-center c-pointer`}
            style={{ justifyContent: "center", textDecoration: "underline" }}
            onClick={() => setSignUpForm()}
          >
            <p>Signup </p>
          </a>
          <p
            className="c-pointer underline underline-hovered font-size-small greyText d-inline-block"
            onClick={() => toggleForgotPassword()}
          >
            Forgot Password hello
          </p>
        </div> */}
          <div>
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
          </div>
          <div className={styles.signInLink}>
            <p>
              Create an account?{" "}
              <strong className="c-pointer" onClick={() => setSignUpForm()}>
                Sign Up
              </strong>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
