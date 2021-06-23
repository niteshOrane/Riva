import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
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
        <DialogTitle className="text-center" id="simple-dialog-title">
          SIGN UP
        </DialogTitle>
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
