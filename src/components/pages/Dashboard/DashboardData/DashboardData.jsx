import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as icons from '../../../common/Icons/Icons';
import styles from './DashboardData.module.scss';

const DashboardData = () => {
  const customer = useSelector((state) => state.auth.customer);
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
                Hello, <b>{`${customer.firstname} ${customer.lastname}` ?? 'unknown'} </b>
              </span>
            </div>
          </div>
        </div>
        <Link to="/profile-information">
          <span className={` underline-hovered c-pointer ${styles.pencil}`}>
            <icons.Pencil />
          </span>
          <button className="bg-transparent no-border underline underline-hovered c-pointer">
            Edit
          </button>
        </Link>
      </div>
      <div className={styles.grid}>
        <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.MyOrders />
          </span>
          <span>My Orders</span>
        </Link>
        <Link className={styles.box} to="/wishlist">
          <span className="my-12px">
            <icons.Heart />
          </span>
          <span>My Wishlist</span>
        </Link>
        <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.MyStuf />
          </span>
          <span>My Stuff</span>
        </Link>
        <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.Notification />
          </span>
          <span>Notify Me</span>
        </Link>
        <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.Accounts />
          </span>
          <span>Account</span>
        </Link>
        <Link className={styles.box} to="#">
          <span className="my-12px">
            <icons.DashboardPayments />
          </span>
          <span>Payments</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardData;
