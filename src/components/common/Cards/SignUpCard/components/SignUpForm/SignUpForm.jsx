import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import styles from "../../SignUpCard.module.scss";
import * as icons from "../../../../Icons/Icons";

import { showSnackbar } from '../../../../../../store/actions/common';
import { createCustomer } from '../../../../../../services/auth/auth.service';

const SignUpForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, name } = formData;

  const userCreateHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || !name)
      return dispatch(showSnackbar('All fields are required', 'warning'));

    const customer = new FormData();

    customer.append('email', email);
    customer.append('firstname', name?.split(' ')?.[0] || '');
    customer.append('lastname', name?.split(' ')?.[1] || '');
    customer.append('password', password);

    const res = await createCustomer(customer);

    if (res.status === 200) {
      handleSubmit();
      return dispatch(showSnackbar(res?.data?.data, 'success'));
    }
    return dispatch(showSnackbar('Something went wrong', 'error'));
  };

  const [showPass, setShowPass] = useState(false);

  const responseFacebook = (response) => {
    console.log(response);
  };

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
          <span className="material-icons-outlined">lock</span>{' '}
          <input
            required
            value={password}
            type={showPass ? 'password' : 'text'}
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
              {showPass ? 'visibility_off' : 'visibility'}
            </span>{' '}
          </button>
        </div>
        <p className={styles.passInstruction}>
          Password must be at least 8 characters long with 1 Uppercase, 1
          Lowercase & 1 Number character.
        </p>

        <input value="SIGN UP" type="submit" className={styles.signUpBtn} />

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
            <FacebookLogin
              appId="3898973050213783"
              autoLoad
              fields="name,email,picture"
              cssClass = {`d-flex align-items-center c-pointer ${styles.btn} ${styles.fbBtn} facebook-auth-login`}
              // onClick={componentClicked}
              callback={responseFacebook}
              icon="fa-facebook"
            />
            , ,
          </button>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            {/* <span className={`material-icons-outlined ${styles.btnIcon}`}>
              phone_iphone
            </span> */}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
              onSuccess={(responseGoogle) => console.log(responseGoogle)}
              onFailure={(responseGoogle) => console.log(responseGoogle)}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
