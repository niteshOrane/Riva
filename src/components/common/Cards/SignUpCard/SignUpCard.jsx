/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import * as icons from '../../Icons/Icons';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import OtpForm from './components/OtpForm/OtpForm';
import styles from './SignUpCard.module.scss';
import { toggleSignUpCard } from '../../../../store/actions/common';

const SignUpCard = () => {
  const {
    isOpen = false,
    isLogin = true,
    isOtp = false,
  } = useSelector((state) => state.common?.signUpCard || {});

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleSignUpCard({ isOpen: false }));
  };

  const handleSubmit = () => {
    handleClose();
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={isOpen}
    >
      <div className={styles.popupBody}>
        <button
          type="button"
          onClick={handleClose}
          title="Close"
          className={`bg-transparent no-border ${styles.close}`}
        >
          <icons.Close />
        </button>
        <h2 className={styles.title}>{isLogin ? 'LOGIN' : 'SIGN UP'} </h2>
        {!isLogin && <p className="text-center">Create your account on RIVA</p>}
        {!isOtp ? (
          isLogin ? (
            <LoginForm handleSubmit={handleClose} />
          ) : (
            <SignUpForm handleSubmit={handleSubmit} />
          )
        ) : (
          <OtpForm />
        )}
      </div>
    </Dialog>
  );
};

export default SignUpCard;
