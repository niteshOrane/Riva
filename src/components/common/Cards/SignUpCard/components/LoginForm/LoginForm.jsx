import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showSnackbar,
  toggleSignUpCard,
} from '../../../../../../store/actions/common';
import { useHistory } from 'react-router';
import styles from '../../SignUpCard.module.scss';
import * as icons from '../../../../Icons/Icons';
import {
  loginCustomer,
  forgotPassword,
} from '../../../../../../services/auth/auth.service';
import { loginSuccess } from '../../../../../../store/actions/auth';

const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const redirectTo = useSelector(
    (state) => state.common.signUpCard?.redirectTo
  );
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showforgotPassword, setforgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setforgotPassword((f) => !f);
  };

  const { email, password } = formData;

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) return dispatch(showSnackbar('email required', 'warning'));

    const customer = new FormData();

    customer.append('email', email);

    const res = await forgotPassword(customer);

    if (res.status === 200) {
      handleSubmit();
      return dispatch(showSnackbar(res?.data?.data, 'success'));
    }
    return dispatch(showSnackbar('Something went wrong', 'error'));
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
      return dispatch(showSnackbar('All fields are required', 'warning'));

    const customer = new FormData();

    customer.append('email', email);

    customer.append('password', password);

    const res = await loginCustomer(customer);

    console.log(redirectTo);

    if (res.status === 200) {
      if (res?.data?.success) {
        handleSubmit();
        typeof res?.data?.data !== 'string' &&
          dispatch(loginSuccess(res.data.data));
        dispatch(
          showSnackbar(
            typeof res?.data?.data === 'string'
              ? res?.data?.data
              : 'Login Success',
            'success'
          )
        );
      
      }
      else{
        dispatch(
          showSnackbar(
            typeof res?.data?.data === 'string'
              ? res?.data?.data
              : 'Login Success',
            'success'
          )
        );
      }
      return typeof res?.data?.data !== 'string'
      ? history.push(redirectTo ?? '/dashboard')
      : null;
    }
    return dispatch(showSnackbar('Something went wrong', 'error'));
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
    <form className={styles.form} onSubmit={userCreateHandler}>
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
          <span className="material-icons-outlined">lock</span>{' '}
          <input
            required
            value={password}
            type={!showPass ? 'password' : 'text'}
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

        <input value="LOGIN" type="submit" className={styles.signUpBtn} />

        <p className={styles.or}>OR</p>

        <div>
          <a
            type="button"
            className={`d-flex align-items-center c-pointer`}
            style={{ justifyContent: 'center', textDecoration: 'underline' }}
            onClick={() => setSignUpForm()}
          >
            <p>Signup </p>
          </a>
          <p
            className="c-pointer underline underline-hovered font-size-small greyText d-inline-block"
            onClick={() => toggleForgotPassword()}
          >
            Forgot Password
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
