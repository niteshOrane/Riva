/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import * as icons from "../../Icons/Icons";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import OtpForm from "./components/OtpForm/OtpForm";
import styles from "./SignUpCard.module.scss";
import { toggleSignUpCard } from "../../../../store/actions/common";

const SignUpCard = () => {
  const {
    isOpen = false,
    isLogin = true,
    isOtp = false,
  } = useSelector((state) => state.common?.signUpCard || {});

  const [forgetPassStyle, setForgetPassStyle] = useState(false);
  const [isForget, setIsForget] = useState(false);
  const [isLoginWithOtp, setLoginWithOtp] = useState(false);
  const { language } = useSelector((state) => state?.common?.store);

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsForget(false);
    dispatch(toggleSignUpCard({ isOpen: false }));
  };
  const handleOtpForm = () => {
    setLoginWithOtp(true);
    dispatch(toggleSignUpCard({ isOtp: true }));
  };

  const handleSubmit = () => {
    handleClose();
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      dir={language === "Arabic" ? "rtl" : "ltr"}
      open={isOpen}
    >
      <div
        className={
          !forgetPassStyle ? styles.popupBody : `${styles.forgetPassWrap}`
        }
      >
        <button
          type="button"
          onClick={handleClose}
          title="Close"
          className={`bg-transparent no-border ${styles.close}`}
        >
          <icons.Close />
        </button>
        {isForget ? (
          <h2 className={styles.title}>RESET PASSWORD</h2>
        ) : (
          <h2 className={styles.title}>
            {isLogin
              ? "SIGN IN"
              : isLoginWithOtp
              ? "SIGNIN WITH OTP"
              : "SIGN UP"}{" "}
          </h2>
        )}

        {!isLogin && <p className="text-center">Create your account on RIVA</p>}
        {!isOtp ? (
          isLogin ? (
            <LoginForm
              setForgetPassStyle={setForgetPassStyle}
              handleOtpForm={handleOtpForm}
              handleSubmit={handleClose}
              language={language}
              setIsForget={setIsForget}
            />
          ) : (
            <SignUpForm handleSubmit={handleSubmit} language={language} />
          )
        ) : (
          <OtpForm handleSubmit={handleClose} language={language} />
        )}
      </div>
    </Dialog>
  );
};

export default SignUpCard;
