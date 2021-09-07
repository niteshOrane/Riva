import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import styles from "./CreatePassword.module.scss";
import {
  showSnackbar,
} from "../../../../../store/actions/common";
import {
  resetForgotPassword
} from "../../../../../services/auth/auth.service";

const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;


const CreatePasswordForm = ({ handleSubmit, props }) => {
  const dispatch = useDispatch();

  const [passwordNew, setPasswordNew] = useState('');
  const [passwordNewConfirm, setPasswordNewConfirm] = useState('');

  const [showPass, setShowPass] = useState(false);


  const handleChangePassword = (e) => {
    setPasswordNew(e.target.value);
  };
  const handleChangeConfirm = (e) => {
    setPasswordNewConfirm(e.target.value);
  };
  const sendOTP = async (e) => {
    e.preventDefault();
    const parsed = queryString.parse(props?.location?.search);
    if (parsed && Object.keys(parsed).length && parsed?.token && parsed?.fid) {

      if (!passwordNew || !passwordNewConfirm)
        return dispatch(showSnackbar("Passwords are required", "warning"));

      if (!re.test(passwordNew))
        return dispatch(
          showSnackbar(
            "Password must be at least 8 characters long with 1 Uppercase, 1 Lowercase & 1 Number character.",
            "error"
          )
        );

      if (passwordNew !== passwordNewConfirm) {
        return dispatch(showSnackbar("Both password should be same", "warning"));
      }
      const customer = new FormData();
      customer.append("customerId", parsed?.fid);
      customer.append("token", parsed?.token);
      customer.append("password", passwordNew);
      customer.append("confirmpassword", passwordNewConfirm);

      const res = await resetForgotPassword(customer);

      if (res.status === 200) {
        if (res?.data?.success) {
          handleSubmit();
          return dispatch(showSnackbar(res?.data?.message, "success"));
        }
        else {
          return dispatch(showSnackbar(res?.data?.message, "error"));
        }
      }
      else {
        return dispatch(showSnackbar("Something went wrong", "error"));
      }
    }
    else {
      handleSubmit();
      return dispatch(showSnackbar("token Expire or no token Pass", "error"));
    }
  }

  return (
    <>
      <span className={styles.tagline}>Create Password</span>
      <form>
        <div className="d-flex justify-content-between align-items-end">
          <button role="button" type="button" onClick={handleSubmit} className="no-border bg-transparent" />
        </div>
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">lock</span>{" "}

          <input
            placeholder="Enter New Password"
            type={!showPass ? "password" : "text"}
            name="newPassword"
            autoComplete={false}
            value={passwordNew}
            id="newPassword"
            onChange={handleChangePassword}
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
        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <span className="material-icons-outlined">lock</span>{" "}

          <input
            placeholder="Confirm Password"
            type={!showPass ? "password" : "text"}
            name="confirmPassword"
            autoComplete={false}
            value={passwordNewConfirm}
            id="confirmPassword"
            onChange={handleChangeConfirm}
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
        <button type="button" onClick={(e) => { sendOTP(e) }} className={styles.verifyBtn}>
          CONTINUE
        </button>
      </form>

    </>
  );
};

export default CreatePasswordForm;
