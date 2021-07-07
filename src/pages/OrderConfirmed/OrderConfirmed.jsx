import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Congratulations from "../../components/pages/Dashboard/OrderConfirmed/Congratulations/Congratulations";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import Details from "../../components/pages/Dashboard/OrderConfirmed/Details/Details";
import styles from "./OrderConfirmed.module.scss";
const randomProduct = {
  src: "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/b4bac6c2-516e-4778-89c1-fdf75fc725ce.png",
  name: "High Waist Slim Fit Trouser",
  price: "43.00",
  color: "White",
  size: "XL",
  placedOrder: "Thu 15 May 2021",
  orderId: "R0374915036",
  payment: "Approved",
};
function OrderConfirmed() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className={styles.circlesContainer}>
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.contentConatiner}>
            <h2 className={styles.title}>Order Confirmed</h2>
            <div className="py-20px d-flex w-100 justify-content-between">
              <Congratulations />
              <ProductCard product={randomProduct} />
            </div>
            <Details />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
