import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import styles from "./CancelledOrders.module.scss";
import CancelledOrdersCards from "../../components/pages/Dashboard/CancelledOrdersCards/CancelledOrdersCards";
const randomProducts = [
  {
    image:
      "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/706fcd90-13fe-473f-9cd0-26330c64249a.png",
    name: "High Waist Slim Fit Trouser",
    color: "White",
    size: "XL",
    price: "25.00",
    refundId: "#R0374915036",
  },
];

function CancelledOrders() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className={styles.circlesContainer}>
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Order Cancelled</h2>

            <CancelledOrdersCards products={randomProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelledOrders;
