import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";
const randomProducts = [
  {
    image:
      "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/6edae83a-8a9c-48f3-9835-a40b9f29a0de.png",
    name: "High Waist Slim Fit Trouser",
    color: "White",
    size: "XL",
    deliveryDate: "24 April 2021",
    price: "25.00",
    orderId: "#R0374915036",
  },
  {
    image:
      "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/2606012f-bc87-4744-9182-5b978c66a46a.png",
    name: "Solid Classic Midaxi Dress",
    color: "Black",
    size: "MD",
    deliveryDate: "24 April 2021",
    price: "50.00",
    orderId: "#R0374915036",
  },
  {
    image:
      "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/54ec64f9-21e9-4968-8d23-f376f3eeff2f.png",
    name: "Solid Classic Midaxi Dress",
    color: "White",
    size: "XL",
    deliveryDate: "24 April 2021",
    price: "32.00",
    orderId: "#R0374915036",
  },
];

function Delivered() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Delivered</h2>

            <DeliveredOrders products={randomProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
