import React, { useState } from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import { orderConfirmed } from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";

function TrackYourOrder() {
  const [value, setValue] = useState("");
  const [orderItems, setOrderItems] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      const res = await orderConfirmed(value);
      if (res.status === 200 && res?.data) {
        setOrderItems(
          res?.data?.items.filter((li) => li.product_type === "simple")
        );
      }
    }
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100 d-flex flex-column">
            <h2 className="font-weight-normal">Track Your Order</h2>
            <TrackYourOrderCard
              value={value}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
            <div className="mt-5">
              {orderItems?.map((li) => (
                <ProductCard product={li} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackYourOrder;
