import React from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import * as icons from "../../../common/Icons/Icons";
import { logoutUser } from '../../../../services/auth/auth.service';
import { logout, emptyCart } from '../../../../store/actions/auth';

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>My Account</h2>
        <button type="button">Join VIP Membership</button>
      </div>
      <div className={styles.sidebarBody}>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Dashboard />
          <Link to="/dashboard" className={styles.title}>
            Dashboard
          </Link>
        </div>
        <div className="d-flex" id={styles.sec}>
          <icons.MyOrders />
          <div className={styles.children}>
            <p className={styles.title}>My Orders</p>

            <Link to="/" className={styles.child}>
              <icons.AngleRight />
              &nbsp; On the Way
            </Link>
            <Link to="/delivered" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Delivered
            </Link>
            <Link to="/track-orders" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Track Orders
            </Link>
            <Link to="/track-your-order" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Track Your Order
            </Link>
            <Link to="/cancelled-orders" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Cancelled
            </Link>
            <Link to="/" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Returned
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Heart />
          <Link to="/wishlist">
            {" "}
            <p className={styles.title}>My Wishlist</p>
          </Link>
        </div>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Loyalty />
          <Link to="/order-confirmed">
            {" "}
            <p className={styles.title}>Order Confirmed</p>
          </Link>
        </div>
        <div className="d-flex" id={styles.sec}>
          <icons.Accounts />
          <div className={styles.children}>
            <p className={styles.title}>Accounts</p>
            <Link to="/profile-information" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Profile information
            </Link>
            <Link to="/" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Manage Addresses
            </Link>
            <Link to="/change-password" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Change Password
            </Link>
            <Link to="/" className={styles.child}>
              <icons.AngleRight />
              &nbsp; My Reviews
            </Link>
            <Link to="/my-subscription" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Manage Subscription
            </Link>
          </div>
        </div>
        <div className="d-flex" id={styles.sec}>
          <icons.DashboardPayments />
          <div className={styles.children}>
            <p className={styles.title}>Payments</p>

            <Link to="/saved-cards" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Saved Cards
            </Link>
          </div>
        </div>
        <div className="d-flex" id={styles.sec}>
          <icons.MyStuf />
          <div className={styles.children}>
            <p className={styles.title}>My Stuff</p>
            <Link to="/" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Loyalty Points
            </Link>
            <Link to="/coupons" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Coupons
            </Link>
            <Link to="/refer-&-earn" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Refer & Earn Credit
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Notification />
          <Link to="/notify-me">
            {" "}
            <p className={styles.title}>Notify Me</p>
          </Link>
        </div>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Logout />
          <span onClick={
              () => {
                dispatch(logout());
                dispatch(emptyCart());
                logoutUser();
              }
            }
            className="d-flex align-items-center gap-12 c-pointer"
          > <p className={styles.title}>Logout</p></span>
        </div>
        </div>
      </div>
      );
}

      export default Sidebar;
