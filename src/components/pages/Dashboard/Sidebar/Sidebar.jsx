import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Sidebar.module.scss";
import * as icons from "../../../common/Icons/Icons";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>My Account</h2>
        <button>Join VIP Membership</button>
      </div>
      <div className={styles.sidebarBody}>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Heart />
          <Link to='/wishlist'> <h2 className={styles.title}>My Wishlist</h2></Link>
        </div>
        <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Loyalty />
          <Link to='/order-confirmed'> <h2 className={styles.title}>Order Confirmed</h2></Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
