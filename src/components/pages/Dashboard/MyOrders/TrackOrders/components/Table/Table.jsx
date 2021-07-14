import React from "react";
import * as icons from "../../../../../../common/Icons/Icons";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
const Table = ({ order }) => {
  return (
    <div className="w-100">
      <h2 className={styles.title}>Track Orders</h2>
      <div className={styles.table}>
        <p className="greyText">Order ID #{order?.orderId}</p>
        <div className={styles.tblBody}>
          <div className="d-flex align-items-center w-100">
            <div className={styles.bgLightGrey}>Delivery Expected by:</div>
            <div className={styles.bgDarkGrey}>Shipping By:</div>
            <div className={styles.bgLightGrey}>Status:</div>
            <div className={styles.bgDarkGrey}>Tracking #:</div>
          </div>
          <div id={styles.orderInfo} className="d-flex align-items-start w-100">
            <div>{order?.deliveryExpectedDate}</div>
            <div>
              {order?.shipperName}{" "}
              <span className="color-black font-weight-600">|</span>&nbsp;
              <icons.ShipperPhone />
              <a className="d-block" href={`tel: +${order?.shipperPhone}`}>
                {order?.shipperPhone}
              </a>
            </div>
            <div>{order?.status}</div>
            <div>{order?.trackingId}</div>
          </div>
        </div>
      </div>
      <div className="mt-20px">
        <Link
          to="/"
          className="d-inline-block bg-black p-12px color-white no-border"
        >
          BACK TO ORDER
        </Link>
      </div>
    </div>
  );
};

export default Table;
