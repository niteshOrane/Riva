import React, { useState } from "react";
 import Dialog from "@material-ui/core/Dialog";
import * as icons from "../../Icons/Icons";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import OtpForm from "./components/OtpForm/OtpForm";
import styles from "./SignUpCard.module.scss";
const SignUpCard = ({ open, handleClose }) => {
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const handleSubmit = () => {
    setShowSignUpForm(false);
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={open}
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
        <h2 className={styles.title}>
          SIGN UP
        </h2>
        <p className="text-center">Create your account on RIVA</p>
        {showSignUpForm ? (
          <SignUpForm handleSubmit={handleSubmit} />
        ) : (
          <OtpForm />
        )}
      </div>
    </Dialog>
  );
};

export default SignUpCard;
