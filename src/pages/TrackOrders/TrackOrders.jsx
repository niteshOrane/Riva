import React from "react";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import TrackOrderDetails from "../../components/pages/Dashboard/MyOrders/TrackOrders/TrackOrderDetails/TrackOrderDetails";
import { orderConfirmed } from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";

const randomOrder = {
  orderId: "R0374915036",
  deliveryExpectedDate: "24 May 2021",
  shipperName: "FedEx",
  shipperPhone: "+15785685",
  status: "Picked by the courier",
  trackingId: "BD045903594059",
};

function TrackOrders() {
  const [value, setValue] = React.useState("");
  const [orderItems, setOrderItems] = React.useState();
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
    <div className="container-with-circles my-20px">
      <div className="circlesContainer">
        <CategoriesCircles />
      </div>
      <div className="d-flex h-100">
        <Sidebar />
        <section className="d-flex flex-column h-100 w-100">
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
          <TrackOrderDetails order={randomOrder} />
        </section>
      </div>
    </div>
  );
}

export default TrackOrders;
