import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";

import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import { orderConfirmed } from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";

import { showSnackbar } from "../../store/actions/common";

function TrackYourOrder() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [orderItems, setOrderItems] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      const res = await orderConfirmed(value);
      if (res.status === 200 && res?.data && !res?.data?.error) {
        setOrderItems({
          product: res?.data?.items.filter(
            (li) => li.product_type === "simple"
          ),
          status: res?.data?.status,
        });
      } else {
        return dispatch(showSnackbar(res?.data?.error, "error"));
      }
    }
    return null;
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
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
              {orderItems?.product?.map((li) => (
                <ProductCard product={li} status={orderItems?.status} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackYourOrder;
