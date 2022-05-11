import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import AppleLogin from "react-apple-login";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { getCart } from "../../../../../../store/actions/cart";
import {
  getForgetPasswordEmail,
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";
import styles from "../../SignUpCard.module.scss";
import {
  loginCustomer,
  forgotPassword,
  mergeGuestCart,
  createCustomerSocial,
} from "../../../../../../services/auth/auth.service";
import {
  loginSuccess,
  setSocialLogin,
} from "../../../../../../store/actions/auth";
import { extractColorSize, getCartId } from "../../../../../../util";
import * as icons from "../../../../Icons/Icons";
import LoaderButton from "../../../../Buttons/LoaderButton/ControlledButton";
import { getProduct } from "../../../../../../services/product/product.service";
import { addWishlist } from "../../../../../../store/actions/wishlist";
import useDocumentTitle from "../../../../PageTitle/useDocumentTitle";

const LoginForm = ({
  handleSubmit,
  handleOtpForm,
  setForgetPassStyle,
  language,
  setIsForget,
  setHeading,
}) => {
  const dispatch = useDispatch();
  useDocumentTitle("Customer Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [forgotError, setForgotError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );
  const newEmail = useSelector((state) => state.common.newUser);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
  });

  const [showforgotPassword, setforgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setIsForget(true);
    setForgetPassStyle(true);
    setforgotPassword((f) => !f);
  };

  const { email, password } = formData;

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return setForgotError(true);
    setForgotError(false);
    const customer = new FormData();

    customer.append("email", email);

    const res = await forgotPassword(customer);

    if (res && res.status === 200 && res.data?.success) {
      dispatch(getForgetPasswordEmail(email));
      handleSubmit();
      return dispatch(showSnackbar(res?.data?.message, "success"));
    }
    if (res?.data?.message) {
      return dispatch(
        showSnackbar(
          `${res?.data?.message ? res?.data?.message : "Something went wrong"}`,
          "error"
        )
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleError = (res) => {
    console.log(error);
  };
  const responseFacebook = async (response) => {
    if (response) {
      const firstName = response?.name?.split(" ")[0];
      const lName = response?.name?.split(" ")[1];
      const userEmail = response?.email;
      const customer = new FormData();
      customer.append("email", userEmail);
      customer.append("firstname", firstName || "");
      customer.append("lastname", lName || "");
      customer.append("password", "");
      customer.append("resource", "Facebook");
      const res = await createCustomerSocial(customer);

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
          dispatch(setSocialLogin(res?.data?.data));
          typeof res?.data?.data !== "string" &&
            dispatch(loginSuccess(res.data.data));
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
      return dispatch(
        showSnackbar(
          "Failed! Registration unsuccessful",
          "error"
        )
      );
    } else {
      return dispatch(
        showSnackbar(
          "Failed! Registration unsuccessful",
          "error"
        )
      );
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
      customer.append("password", "");
      customer.append("resource", "Google");
      const res = await createCustomerSocial(customer);
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
          dispatch(setSocialLogin(res?.data?.data));
          typeof res?.data?.data !== "string" &&
            dispatch(loginSuccess(res.data.data));
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
      return dispatch(
        showSnackbar(
          "Failed! Registration unsuccessful",
          "error"
        )
      );
    } else {
      return dispatch(
        showSnackbar(
          "Failed! Registration unsuccessful",
          "error"
        )
      );
    }
  };
  const validate = (value) => {
    const errorVal = {};
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        newEmail ? newEmail : value?.email
      )
    ) {
      errorVal.email = "Please enter a valid email address";
    }
    if (!value?.password) {
      errorVal.password = "Password is required";
    }
    return errorVal;
  };

  const setSignUpForm = () => {
    dispatch(toggleSignUpCard({ isLogin: false }));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setError(validate(formData));
    setIsSubmit(true);
  };

  const handleUnAuthWish = async (productItem) => {
    const res = await getProduct(productItem.sku);

    const { colors, size } = extractColorSize(
      res?.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...productItem,
      ...res?.data,
      image: res?.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "image"
      )?.value,
      name: res.data.name,
      price: res.data.price,
      sale:
        res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "show_sale_badge"
        )?.value === "1",
      description: res.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "description"
      )?.value,
      colors,
      size,
      currency_symbol,
      selected: {
        color: colors?.[0] || {},
        size: size?.[0] || {},
      },
    };
    setLoading({ ...loading, wishlist: false });
    dispatch(addWishlist(p));
    localStorage.removeItem("toWishlist");
  };

  const userCreateHandler = async (e) => {
    setLoading(true);
    const customer = new FormData();

    customer.append("email", newEmail ? newEmail : email);

    customer.append("password", password);
    customer.append("mobile", "");
    customer.append("action", "login");
    customer.append("cartId", getCartId());

    const res = await loginCustomer(customer);
    if (res.status === 200) {
      if (res?.data?.success) {
        if (getCartId() > 0) {
          const customerCart = new FormData();
          customerCart.append("guestQuoteId", getCartId());
          customerCart.append("customerId", res.data?.data?.customerID);
          // await mergeGuestCart(customerCart);
          // dispatch(getCart());
          setLoading(false);
        }
        handleSubmit();
        typeof res?.data?.data !== "string" &&
          dispatch(loginSuccess(res.data.data));
        const pro = JSON.parse(localStorage?.getItem("toWishlist"));
        if (pro) {
          handleUnAuthWish(pro);
        }
        window.insider_object = {
          user: {
            type: "login",
            gdpr_optin: true,
            sms_optin: true,
            whatsapp_optin: true,
            custom: res.data.databind,
          },
        };
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
        setLoading(false);
      }
    } else {
      setLoading(false);
      return dispatch(showSnackbar(res?.message, "error"));
    }
  };

  useEffect(() => {
    if (Object.keys(error)?.length === 0 && isSubmit) {
      userCreateHandler();
    }
  }, [error]);
  useEffect(() => {}, []);

  const [showPass, setShowPass] = useState(false);

  if (showforgotPassword)
    return (
      <form className={styles.form} onSubmit={forgotPasswordSubmit}>
        <div className={styles.container}>
          <p className={styles.inpTitle}>
            Enter your registered email <span className={styles.star}>*</span>
          </p>
          <div
            style={{ border: forgotError ? "1px solid red" : null }}
            className={`d-flex align-items-center ${styles.inpContainer}`}
          >
            <span className="material-icons-outlined">email</span>
            <input
              value={email}
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
        </div>
        {forgotError && (
          <span className={styles.authVal}>
            Please enter a valid email containing "@" and "."
          </span>
        )}
        <p className={styles.forP}>
          You will get a password reset link on your registered email
        </p>
        <div className={styles.container}>
          <input value="SUBMIT" type="submit" className={styles.signUpBtn} />
        </div>
      </form>
    );
  return (
    <>
      {/* <span className={styles.tagline}>Have an account? Sign In</span> */}
      <form className={styles.formLogin}>
        <div className={styles.container}>
          <p className={styles.inpTitle}>
            Email <span className={styles.star}>*</span>
          </p>
          <div
            style={{ border: error?.email ? "1px solid red" : null }}
            className={`d-flex align-items-center ${styles.inpContainer}`}
          >
            <span className="material-icons-outlined">email</span>
            <input
              required
              value={newEmail ? newEmail : email}
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className={styles.signUpInput}
            />
          </div>
          {error?.email && (
            <span className={styles.authVal}>{error.email}</span>
          )}
        </div>

        <div className={styles.container}>
          <p className={styles.inpTitle}>
            Password <span className={styles.star}>*</span>
          </p>
          <div
            style={{ border: error?.password ? "1px solid red" : null }}
            className={`d-flex align-items-center ${styles.inpContainer}`}
          >
            <span className="material-icons-outlined">lock</span>{" "}
            <input
              required
              value={password}
              type={!showPass ? "password" : "text"}
              name="password"
              id="password"
              onChange={handleChange}
              className={styles.signUpInput}
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
          {error?.password && (
            <span className={styles.authVal}>password is required</span>
          )}
          <div className={styles.checkContainer}>
            <div>
              <input className={styles.checkBox} type="checkbox" />
              <span style={{ color: "#6a6565" }}>Remember me</span>
            </div>
            <div>
              <p
                onClick={() => {
                  toggleForgotPassword();
                  setHeading("FORGET PASSWORD");
                }}
                className={styles.fyp}
              >
                Forgot Password
              </p>
            </div>
          </div>
          <div className={styles.signinWrapper}>
            <button
              onClick={handleSubmitLogin}
              onKeyDown={(e) => {
                console.log(e);
              }}
              // variant="contained"
              type="button"
              className={styles.signUpBtn}
              disabled={loading}
            >
              {!loading ? (
                "SIGN IN"
              ) : (
                <span
                  style={{ fontSize: "1rem" }}
                  className="material-icons-outlined"
                >
                  hourglass_top
                </span>
              )}
            </button>
            <input
              value="SIGN IN WITH OTP"
              type="button"
              onClick={() => {
                handleOtpForm();
                setHeading("SIGN IN WITH OTP");
              }}
              className={styles.signUpBtn}
            />
          </div>

          <p className={styles.or}>OR</p>
          <div>
            {/* <AppleLogin
              clientId="com.react.apple.login"
              redirectURI="https://redirectUrl.com"
              usePopup={false}
              designProp={{ height: 40, width: 360 }}
              callback={(res) => console.log(res)}
            /> */}

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
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={styles.googleAuthBtn}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                  >
                    Connect with Google
                  </button>
                )}
                className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
                onSuccess={(response) => responseGoogle(response)}
                onFailure={(response) => handleGoogleError(response)}
              />
            </button>
          </div>
          <div className={styles.signInLink}>
            <p>
              Create an account?{" "}
              <strong
                className="c-pointer"
                onClick={() => {
                  setSignUpForm();
                  setHeading("SIGN UP");
                }}
              >
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
