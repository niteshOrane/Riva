import React from "react";
import * as icons from "../../../../../common/Icons/Icons";
import { Link } from "react-router-dom";
import styles from "./InvitesAndCredits.module.scss";
const InvitesAndCredits = () => {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tblBody}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="m-12px d-inline-block">
                <img src="/assets/images/iandc.svg" />
              </span>
              <h4>Invites & Credits</h4>
            </div>
            <span>Your Credit(s): $120</span>
          </div>
          <div className="d-flex align-items-center w-100">
            <div className={styles.bgLightGrey}>Contact</div>
            <div className={styles.bgDarkGrey}>Date Joined</div>
            <div className={styles.bgLightGrey}>Status:</div>
            <div className={styles.bgDarkGrey}>Credit on</div>
          </div>
          <div id={styles.orderInfo} className="d-flex align-items-start w-100">
            <div>Referral signups</div>

            <div>19-05-2021</div>
            <div>Friends signed up</div>
            <div>$80</div>
          </div>
        </div>
      </div>
      <p className="mt-12px greyText">
        To get in touch with our customer care team regarding any queries or
        assistance,{" "}
        <Link className="underline underline-hovered" to="#">
          click here
        </Link>
      </p>
    </div>
  );
};

export default InvitesAndCredits;
