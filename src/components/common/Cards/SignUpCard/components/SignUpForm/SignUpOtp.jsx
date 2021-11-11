import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../OtpForm/Otp.module.scss";
import { PhoneNumberUtil } from "google-libphonenumber";
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
import LoaderButton from "../../../../Buttons/LoaderButton/ControlledButton";

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
    position: "relative",
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
    border: "1px solid black",
  },
  otpInput: {
    height: 42,
    padding: "0px 5px",
  },
  signUpBtn: {
    margin: "12px auto",
    display: "flex",
    justifyContent: "center",

    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#181617",
    textAlign: "center",
    padding: "12px 30px",
    cursor: "pointer",
    width: 204,
    height: 40,
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

export default function TransitionsModal({
  formData,
  handleSubmit,
  language,
  error,
  setError,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState(null);
  const [userOtp, setUserOtp] = React.useState("");

  const [recivedOTPData, setRecivedOTPData] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (value) => {
    const errorVal = {};
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value?.email
      )
    ) {
      errorVal.email = "Please enter a valid email address";
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(
        value?.password
      )
    ) {
      errorVal.password =
        "Password must be at least 8 characters long with 1 Uppercase, 1 Lowercase & 1 Number character and one special character";
    }
    if (!value.phone) {
      errorVal.phone = "Phone is required";
      // return dispatch(
      //   showSnackbar(
      //     "Phone is required",
      //     "error"
      //   )
      // );
    } else {
      let valid = false;
      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        valid = phoneUtil.isValidNumber(phoneUtil.parse(value.phone));
        if (!valid) {
          errorVal.phone = "Invalid Contact Phone With Country";
        }
      } catch (e) {
        errorVal.phone = "Invalid Contact Phone With Country";
      }
    }
    if (!value.name) {
      errorVal.name = "First name is required";
    }
    if (!value.lastName) {
      errorVal.lastName = "Last name is required";
    }
    return errorVal;
  };
  const handleSubmitSign = (e) => {
    e.preventDefault();
    setError(validate(formData));
    setIsSubmit(true);
  };

  const sendRegisterOtp = async (fnValue) => {
    const { phone, name, lastName, email } = fnValue;
    if (phone && name && lastName && email) {
      setLoading(true);
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
        setLoading(false);
        const divisor_for_minutes = res?.data.data.expiredtime % (60 * 60);
        const minutesTime = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const secondsTime = Math.ceil(divisor_for_seconds);
        setSeconds(secondsTime);
        setMinutes(minutesTime);
      } else {
        setLoading(false);
        dispatch(showSnackbar(`${res?.data?.message}`, "error"));
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
      setLoading(true);
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
        setLoading(false);
        handleSubmit();
      } else {
        setLoading(false);
        return dispatch(showSnackbar(res?.data.message, "error"));
      }
    } else {
      setLoading(false);
      dispatch(showSnackbar("Please enter OTP", "error"));
    }
  };
  const handleOpen = () => {
    sendRegisterOtp(formData);
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
  useEffect(() => {
    if (Object.keys(error)?.length === 0 && isSubmit) {
      handleOpen();
    }
  }, [error]);
  return (
    <div>
      <LoaderButton
        onClick={handleSubmitSign}
        loading={loading}
        value=" SIGN UP"
        className={classes.signUpBtn}
      >
        {" "}
        SIGN UP
      </LoaderButton>

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
            <button onClick={handleClose} className={styles.signOtpCls}>
              X
            </button>
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
              <div className="d-flex justify-content-between w-100">
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
                  className={styles.signUpInput}
                  placeholder="Enter OTP"
                  type="number"

                  onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault() }
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
