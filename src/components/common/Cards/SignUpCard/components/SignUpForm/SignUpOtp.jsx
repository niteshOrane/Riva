import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../OtpForm/Otp.module.scss";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  loginCustomerOTP,
  customerVerifyOtp,
  customerResendOtp,
} from "../../../../../../services/auth/auth.service";
import { getStoreId } from "../../../../../../util";
import { useDispatch } from "react-redux";
import * as icons from "../../../../Icons/Icons";
import { showSnackbar } from "../../../../../../store/actions/common";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 382,
    height: 310,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position:"relative"
  },
  head: {
    textAlign: "center",
  },
  headSpan: {
    display: "block",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: 32,
  },
  verify: {
    width: 204,
    height: 41,
    marginTop: 26,
    margin: "0px auto",
    background: "transparent",
    cursor: "pointer",
    border:"1px solid black"
  },
  otpInput: {
    height: 42,
    padding: "0px 5px",
  },
  signUpBtn: {
    margin: "12px auto",
    display: "block",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#181617",
    textAlign: "center",
    padding: "12px 30px",
    cursor: "pointer",
    // transition: all 0.4s ease;
    // cursor: pointer;
    // &:hover {
    //   background-color: #181617;
    //   color: white;
    // }
  },
  iconWrap: {
    display: "flex",
    marginTop: "18px",
  },
  para: {
    paddingLeft: "1rem",
  },
}));

export default function TransitionsModal({ formData, handleSubmit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState(null);
  const [userOtp, setUserOtp] = React.useState("");

  const [recivedOTPData, setRecivedOTPData] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const sendRegisterOtp = async (fnValue) => {
    const { phone, name, lastName, email } = fnValue;
    if (phone && name && lastName && email) {
      const customer = new FormData();
      customer.append("phone", phone);
      customer.append("email", email);
      customer.append("name", `${name} ${lastName}`);
      const res = await loginCustomerOTP(customer);
      if (res.status === 200 && res.data?.success) {
        dispatch(showSnackbar(res.data?.message, "success"));
        setOtp(res?.data.data.otp);
        setOpen(true);
        setRecivedOTPData(res?.data.data);

        const divisor_for_minutes = res?.data.data.expiredtime % (60 * 60);
        const minutesTime = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const secondsTime = Math.ceil(divisor_for_seconds);
        setSeconds(secondsTime);
        setMinutes(minutesTime);
      } else {
        dispatch(showSnackbar(res.data.data?.message, "error"));
      }
    }
  };
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(0);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(0);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const handleClose = () => {
    setOpen(false);
    setOtp("");
  };
  const varifyOtp = async () => {
    if (userOtp) {
      const { email, name, lastName, password, phone } = formData;
      const customer = new FormData();
      customer.append("otp", userOtp);
      customer.append("phone", phone);
      customer.append("customerInfo[firstname]", name || "");
      customer.append("customerInfo[lastname]", lastName || "");
      customer.append("customerInfo[email]", email);
      customer.append("customerInfo[mobile]", phone);
      customer.append("customerInfo[password]", password);
      customer.append("customerInfo[storeId]", getStoreId());
      const res = await customerVerifyOtp(customer);
      if (res.status === 200 && res?.data?.success) {
        handleClose();
        handleSubmit();
      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      dispatch(showSnackbar("Please enter OTP", "error"));
    }
  };
  const handleOpen = () => {
    const { email, name, lastName, password, phone } = formData;
    if (email && name && lastName && password && phone) {
      sendRegisterOtp(formData);
    } else {
      dispatch(showSnackbar("Please fill all required fields", "error"));
    }
  };
  const reSendOTP = async (e) => {
    const { email, name, lastName, password, phone } = formData;
    e.preventDefault();
    if (!phone)
      return dispatch(showSnackbar("Mobile Number are required", "warning"));
    const customer = new FormData();
    customer.append("phone", phone);

    const res = await customerResendOtp(customer);

    if (res.status === 200) {
      if (res?.data?.success) {
        setRecivedOTPData(res?.data.data);
        const divisor_for_minutes = res?.data.data.expiredtime % (60 * 60);
        const minutesTime = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const secondsTime = Math.ceil(divisor_for_seconds);
        setSeconds(secondsTime);
        setMinutes(minutesTime);
        return dispatch(showSnackbar(`Otp Sent on ${phone}`, "success"));
      } else {
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };
  return (
    <div>
      <button className={classes.signUpBtn} type="button" onClick={handleOpen}>
        SIGN UP
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <button onClick={handleClose} className={styles.signOtpCls}>X</button>
            <div>
              <h2 className={classes.head}>SIGN UP</h2>
              <span className={classes.headSpan}>
                Create an account on RIVA
              </span>
            </div>
            <div className={classes.iconWrap}>
              <div>
                <icons.Mobile />
              </div>
              <div className="d-flex">
                <div className={classes.para}>
                  <p>Mobile Number</p>
                  <p>{formData.phone}</p>
                </div>
                {minutes === 0 && seconds === 0 ? (
                  <span
                    onClick={(e) => {
                      reSendOTP(e);
                    }}
                    className={styles.resendSignup}
                  >
                    Resend OTP
                  </span>
                ) : null}
              </div>
            </div>
            <div className={`d-flex ${classes.form}`}>
              <div
                className={`d-flex align-items-center ${styles.inpContainer}`}
              >
                <img src="/assets/images/signOtp.png" alt="otp-icon" />
                <input
                  onChange={(e) => setUserOtp(e.target.value)}
                  className={classes.otpInput}
                  placeholder="Enter OTP"
                />

                {minutes === 0 && seconds === 0 ? null : (
                  <span>
                    {" "}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                )}
              </div>
              <button
                onClick={varifyOtp}
                className={classes.verify}
                type="button"
              >
                VERIFY
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}