import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  showSnackbar,
  toggleSignUpCard,
} from "../../../../../../store/actions/common";

import styles from "../../SignUpCard.module.scss";
import * as icons from "../../../../Icons/Icons";
import { createCustomer } from "../../../../../../services/auth/auth.service";

const SignUpForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setshowLoginForm = () => {
    dispatch(toggleSignUpCard({}));
  };

  const { email, password, name } = formData;

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

    if (!email || !name)
      return dispatch(showSnackbar("All fields are required", "warning"));

    const customer = new FormData();

    customer.append("email", email);
    customer.append("firstname", name?.split(" ")?.[0] || "");
    customer.append("lastname", name?.split(" ")?.[1] || "");
    customer.append("password", password);

    const res = await createCustomer(customer);

    if (res.status === 200) {
      handleSubmit();
      return dispatch(showSnackbar(res?.data?.data, "success"));
    }
    return dispatch(showSnackbar("Something went wrong", "error"));
  };

  const [showPass, setShowPass] = useState(false);

  return (
    <form className={styles.form} onSubmit={userCreateHandler}>
      <div className={styles.container}>
        <p className="mt-12px">
          First Name & Last Name <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">account_circle</span>
          <input
            required
            value={name}
            type="text"
            name="name"
            id="name"
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
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.inpTitle}>
          Mobile Number <span className={styles.star}>*</span>
        </p>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">call</span>
          <input
            type="number"
            name="phone"
            id="phone"
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
        <p className={styles.passInstruction}>
          Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Number character.
        </p>

        <input value="SIGN UP" type="submit" className={styles.signUpBtn} />

        <p className={styles.or}>OR</p>

        <div>
          <a
            type="button"
            className={`d-flex align-items-center c-pointer`}
            style={{ justifyContent: "center", textDecoration: "underline" }}
            onClick={() => setshowLoginForm()}
          >
            <p>Login </p>
          </a>
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
            <span className={styles.btnIcon}>
              <icons.Facebook />
            </span>
            <p>Connect with Facebook</p>
          </button>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              phone_iphone
            </span>
            <p>Connect with Google</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
