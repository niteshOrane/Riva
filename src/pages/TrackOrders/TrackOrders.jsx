import React from "react";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import TrackOrderDetails from "../../components/pages/Dashboard/TrackOrders/TrackOrderDetails/TrackOrderDetails";
import styles from "./TrackOrders.module.scss";

const randomOrder = {
  orderId: "R0374915036",
  deliveryExpectedDate: "24 May 2021",
  shipperName: "FedEx",
  shipperPhone: "+15785685",
  status: "Picked by the courier",
  trackingId: "BD045903594059",
};

function TrackOrders() {
  return (
    <div className="container-with-circles my-50px">
      <div className={styles.circlesContainer}>
        <CategoriesCircles />
      </div>
      <div className="d-flex h-100">
        <Sidebar />
        <TrackOrderDetails order={randomOrder} />
      </div>
    </div>
  );
}

export default TrackOrders;
