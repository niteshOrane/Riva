import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useArabic from "../../../common/arabicDict/useArabic";
import * as icons from "../../../common/Icons/Icons";
import styles from "./DashboardData.module.scss";

const DashboardData = () => {
  const { customer, socialDetails } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state?.common?.store);
  const {translate} = useArabic()
  // console.log({ customer,socialDetails });
  return (
    <div>
      <div className={styles.header}>
        <div>
          <div className="d-flex align-items-center">
            <div className={styles.img}>
              <img
                src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/b6ed66c5-a6b4-40b4-ae52-1af8e675662b.png"
                width="100%"
                alt="CHANGE_ME"
              />
            </div>
            <div>
              <span>
                Hello,{" "}
                {!socialDetails?.isSocial ? ( <b>
                  {`${customer.firstname}` ?? "unknown"}
                </b>): (
                  <b>{customer?.username}</b>
                )}
              </span>
            </div>
          </div>
        </div>
        <Link to="/profile-information">
          <span  style={{
                      paddingLeft: language === "Arabic" ? "8px" : "0px",
                    }} className={` underline-hovered c-pointer ${styles.pencil}`}>
            <icons.Pencil />
          </span>
          <button className="bg-transparent no-border underline underline-hovered c-pointer">
            Edit
          </button>
        </Link>
      </div>
      <div className={styles.grid}>
        <Link className={styles.box} to={`myOrder/${"orders"}`}>
          <span className="my-12px">
            <icons.MyOrders />
          </span>
          <span>{translate?.dash?.ORDER}</span>
        </Link>
        <Link className={styles.box} to="/wishlist">
          <span className="my-12px">
            <icons.Heart />
          </span>
          <span>{translate?.dash?.WISH}</span>
        </Link>
        {/* <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.MyStuf />
          </span>
          <span>My Stuff</span>
        </Link> */}
        <Link className={styles.box} to="/notify-me">
          <span className="my-12px">
            <icons.Notification />
          </span>
          <span>{translate?.dash?.NOTIFY}</span>
        </Link>
        <Link className={styles.box} to="/profile-information">
          <span className="my-12px">
            <icons.Accounts />
          </span>
          <span>{translate?.dash?.ACCOUNT}</span>
        </Link>
        {/* <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.DashboardPayments />
          </span>
          <span>Payments</span>
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardData;
