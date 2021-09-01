import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  loginCustomerOTP,
  customerVerifyOtp,
} from "../../../../../../services/auth/auth.service";
import { getStoreId } from "../../../../../../util";

import * as icons from "../../../../Icons/Icons";
import { showSnackbar } from "../../../../../../store/actions/common";
import { useDispatch } from "react-redux";
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
    margin:"0px auto",
    background:"transparent",
    cursor:"pointer"
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
    cursor:"pointer"
    // transition: all 0.4s ease;
    // cursor: pointer;
    // &:hover {
    //   background-color: #181617;
    //   color: white;
    // }
  },
  iconWrap:{
      display:"flex",
      marginTop:"12px"
  },
  para:{
      paddingLeft:"2rem"
  }
}));

export default function TransitionsModal({ formData, handleSubmit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState(null);
  const [userOtp, setUserOtp] = React.useState("");

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
      }
      else {
        dispatch(showSnackbar(res.data.data?.message, "error"));
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
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
    if(email && name && lastName && password && phone){
        sendRegisterOtp(formData);
    }else{
        dispatch(showSnackbar("Please fill all required fields", "error"));  
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
              <div className={classes.para}>
                <p>Mobile Number</p>
                <p>+91 XXXXXXXXX</p>
              </div>
            </div>
            {otp && (
              <div>
                <span>Your Otp is: {otp}</span>
              </div>
            )}
            <div className={classes.form}>
              <input
                onChange={(e) => setUserOtp(e.target.value)}
                className={classes.otpInput}
                placeholder="Enter otp"
              />
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
