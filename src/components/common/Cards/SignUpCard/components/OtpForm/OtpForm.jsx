import React from "react";
import * as icons from "../../../../Icons/Icons";
import styles from "./Otp.module.scss";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const OtpForm = () => {
  return (
    <>
      <form>
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex align-items-center my-12px">
            <div className={styles.mobileIcon}>
              <icons.Mobile />
            </div>
            <div className="d-flex">
              <div>
                <p>Mobile Number</p>
                <p className="font-weight-600">+91******17858</p>
              </div>

              <span className={styles.resend}>Resend OTP</span>
            </div>
          </div>
          <button type="button" className="no-border bg-transparent"></button>
        </div>

        <div className={`d-flex align-items-center ${styles.inpContainer}`}>
          <div className={styles.otpDots}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <input
            placeholder="Enter OTP"
            type="text"
            name="password"
            id="password"
          />
          <span>00:26</span>{" "}
        </div>

        <button type="submit" className={styles.verifyBtn}>
          CONTINUE
        </button>
      </form>
      <div className={styles.formLogin}>
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
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              <icons.Facebook />
            </span>
            <FacebookLogin
              appId="3898973050213783"
              fields="name,email,picture"
              // cssClass=  {styles.facebookAuthBtn}
              render={(renderProps) => (
                <p onClick={renderProps.onClick}>Connect with Facebook</p>
              )}
              // onClick={componentClicked}
              textButton="Connect with Facebook"
              // callback={responseFacebook}
            />
          </button>
          <button
            type="button"
            className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
          >
            <span className={`material-icons-outlined ${styles.btnIcon}`}>
              phone_iphone
            </span>
            <GoogleLogin
              clientId="488711396287-7q699f85tm36dha5c5mml1dkpg9eibrr.apps.googleusercontent.com"
              buttonText="Connect with Google"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className={styles.googleAuthBtn}
                >
                  Connect with Google
                </button>
              )}
              className={`d-flex align-items-center c-pointer ${styles.btn} ${styles.googleBtn}`}
              // onSuccess={(response) => responseGoogle(response)}
              onFailure={(response) => console.log(response)}
            />
            
          </button>
          <div className={styles.signInLink}>
            <p>
              Create an account?{" "}
              <strong className="c-pointer">
                Sign In
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
