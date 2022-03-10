import React from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import * as icons from "../../../common/Icons/Icons";
import useArabic from "../../../common/arabicDict/useArabic"
import { logoutUser } from '../../../../services/auth/auth.service';
import { logout, emptyCart } from '../../../../store/actions/auth';


function Sidebar() {
  const dispatch = useDispatch();
  const {translate} = useArabic();
  return (
    <>
      {/* <div className={styles.circlesContainer}>
        <CategoriesCircles />
      </div> */}
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>{translate?.dash?.MY}</h2>
          {/* <button className={styles.membership} type="button">Join VIP Membership</button> */}
        </div>
        <div className={styles.sidebarBody}>
          <div className="d-flex align-items-center" id={styles.sec}>
            <icons.Dashboard />
            <Link to="/dashboard" className={styles.title}>
            {translate?.dash?.DASH}
            </Link>
          </div>
          <div className="d-flex" id={styles.sec}>
            <icons.MyOrders />
            <div className={styles.children}>
              <p className={styles.title}>{translate?.dash?.ORDER}</p>

              <Link to={`/myOrder/${"orders"}`} className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.ORDERS}
              </Link>
              <Link to={`/myOrder/${"delivered"}`} className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.DELIVERED}
              </Link>
              <Link to="/track-orders" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.TRACK}
              </Link>
              {/* <Link to="/track-your-order" className={styles.child}>
              <icons.AngleRight />
              &nbsp; Track Your Order
            </Link> */}
              {/* <Link to="/cancelled-orders" className={styles.child}>
                <icons.AngleRight />
                &nbsp; Cancelled
              </Link> */}
              <Link to="/returned-orders" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.RETURN}
              </Link>
            </div>
          </div>
          <div className="d-flex align-items-center" id={styles.sec}>
            <icons.Heart />
            <Link to="/wishlist">
              {" "}
              <p className={styles.title}>{translate?.dash?.WISH}</p>
            </Link>
          </div>
          {/* <div className="d-flex align-items-center" id={styles.sec}>
          <icons.Loyalty />
          <Link to="/order-confirmed">
            {" "}
            <p className={styles.title}>Order Confirmed</p>
          </Link>
        </div>
          */}
          <div className="d-flex" id={styles.sec}>
            <icons.Accounts />
            <div className={styles.children}>
              <p className={styles.title}>{translate?.dash?.ACCOUNT}</p>
              <Link to="/profile-information" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.PROFILE}
              </Link>
              <Link to="/manage-addresses" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.MANAGE}
              </Link>
              <Link to="/change-password" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.CHANGE}
              </Link>
              <Link to="/my-reviews" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.REVIEW}
              </Link>
              <Link to="/my-subscription" className={styles.child}>
                <icons.AngleRight />
                &nbsp; {translate?.dash?.SUBS}
              </Link>
            </div>
          </div>
          {/* <div className="d-flex" id={styles.sec}>
            <icons.DashboardPayments />
            <div className={styles.children}>
              <p className={styles.title}>Payments</p>

              <Link to="/saved-cards" className={styles.child}>
                <icons.AngleRight />
                &nbsp; Saved Cards
              </Link>
            </div>
          </div> */}
          {/* <div className="d-flex" id={styles.sec}>
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
          </div> */}
          <div className="d-flex align-items-center" id={styles.sec}>
            <icons.Notification />
            <Link to="/notify-me">
              {" "}
              <p className={styles.title}>{translate?.dash?.NOTIFY}</p>
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
            > <p className={styles.title}>{translate?.dash?.LOG}</p></span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
