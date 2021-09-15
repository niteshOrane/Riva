import React from "react";
import { useDispatch } from "react-redux";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import TrackOrderDetails from "../../components/pages/Dashboard/MyOrders/TrackOrders/TrackOrderDetails/TrackOrderDetails";
import { getTrackYourOrder, cancelOrder } from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import { useHistory } from "react-router";

import { showSnackbar } from "../../store/actions/common";

const randomOrder = {
  orderId: "R0374915036",
  deliveryExpectedDate: "24 May 2021",
  shipperName: "FedEx",
  shipperPhone: "+15785685",
  status: "Picked by the courier",
  trackingId: "BD045903594059",
};

function TrackOrders() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = React.useState("");
  const [orderItems, setOrderItems] = React.useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    if (!value) return dispatch(showSnackbar("Please enter order Number", "error"))
    e.preventDefault();
    if (value) {
      const res = await getTrackYourOrder(value);
      if (res.status === 200 && res?.data && res?.data.length && !res?.data?.error && res?.data[0].length) {
        setOrderItems(
          res?.data?.items.filter((li) => li.product_type === "simple")
        );
      }
      else {
        return dispatch(showSnackbar(res?.data?.error || `No Record found for Order Number #${value}`, "error"))
      }
    }
  };
  const cancelOrderfn = async (e, id) => {
    e.preventDefault();
    if (value) {
      const res = await cancelOrder(id);
      if (res.status === 200) {
        dispatch(showSnackbar("Order Canceled", "Success"))
        history.push("/cancelled-orders")
      }
      else {
        dispatch(showSnackbar("Order Cancelation failed", "error"))
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
              <ProductCard product={li} cancelOrderFn={cancelOrderfn} />
            ))}
          </div>
          <TrackOrderDetails order={randomOrder} />
        </section>
      </div>
    </div>
  );
}

export default TrackOrders;
