import React from "react";
import * as icons from "../../../../../../common/Icons/Icons";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
import { Divider } from "@material-ui/core";
const Table = ({ order, value }) => {
  const list = Object.entries(order);
  return (
    <div className="w-100">
      <h2 className={styles.title}>Track Orders</h2>
      <div className={styles.table}>
        <p className="greyText">Order ID #{value}</p>
        <div className={styles.tblBody}>
          <div className="d-flex align-items-center w-100">
            <div className={styles.bgLightGrey}>Carrier Name:</div>
            <div className={styles.bgDarkGrey}>Shipping Date:</div>
            <div className={styles.bgLightGrey}>Status:</div>
            <div className={styles.bgDarkGrey}>Tracking #:</div>
          </div>
          {list
            ?.filter(([id, li]) => li !== null)
            ?.map(([id, li]) => (
              <>
                <div
                  id={styles.orderInfo}
                  className="d-flex align-items-start w-100"
                >
                  <div>{li?.Carrier}</div>
                  <div>
                    {li?.ShipmentDate?.slice(0, 10) || "No Date Found"}{" "}
                  </div>
                  <div>{li?.tracks?.at(-1)?.Description}</div>
                  <div>{id}</div>
                </div>
                <Divider />
              </>
            ))}
        </div>
      </div>
      <div className="mt-20px">
        <Link
          to="/myOrder/orders"
          className="d-inline-block bg-black p-12px color-white no-border"
        >
          BACK TO ORDER
        </Link>
      </div>
    </div>
  );
};

export default Table;
