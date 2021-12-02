import React from "react";
import * as icons from "../../../../../../common/Icons/Icons";
import { Link } from "react-router-dom";
import styles from "./Table.module.scss";
const Table = ({ order,value }) => {
  let list = Object.values(order);
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
          <div id={styles.orderInfo} className="d-flex align-items-start w-100">
            <div>{list?.[0]?.Carrier}</div>
            <div>
              {list?.[0]?.ShipmentDate?.slice(0, 10) || "No Date Found"} <span className="color-black font-weight-600">|</span>&nbsp;
              <icons.ShipperPhone />
              <a className="d-block" href={`tel: +${order?.shipperPhone}`}>
              {list?.[0]?.ShipmentDate?.slice(0, 10) || "No Date Found"} 
              </a>
            </div>
            <div>Expected delivery with in 5 to 7 bussiness days</div>
            <div>123098765</div>
          </div>
        </div>
      </div>
      {list.length > 0 && (
        <table className={styles.trackTable}>
          <thead>
            <tr>
              <th>Carrier Name</th>
              <th>Shipping Date</th>
              <th>Tracks Description</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((li) => (
              <tr>
                <td>{li?.Carrier}</td>
                <td>{li?.ShipmentDate?.slice(0, 10) || "No Date Found"}</td>
                <td className={styles.desc}>
                  {li?.tracks?.map((desc) => (
                    <span>{desc?.Description || "No tracks"}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
