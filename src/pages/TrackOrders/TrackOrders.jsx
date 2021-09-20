import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import TrackOrderDetails from "../../components/pages/Dashboard/MyOrders/TrackOrders/TrackOrderDetails/TrackOrderDetails";
import {
  getTrackYourOrder,
  cancelOrder,
  getOrderList,
} from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import { useHistory } from "react-router";
import styles from "./TrackOrders.module.scss";

import { showSnackbar } from "../../store/actions/common";
import Details from "../../components/pages/Dashboard/OrderConfirmed/Details/Details";

const randomOrder = {
  orderId: "R0374915036",
  deliveryExpectedDate: "24 May 2021",
  shipperName: "FedEx",
  shipperPhone: "+15785685",
  status: "Picked by the courier",
  trackingId: "BD045903594059",
};

function TrackOrders() {
  const { customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState("");
  const [orderItems, setOrderItems] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const getOrderDetail = async () => {
    if (value) {
      const res2 = await getOrderList(customer?.customerID);
      if (res2.status === 200 && res2?.data?.items) {
        setOrderDetails(
          res2?.data?.items
            ?.find((li) => li?.increment_id === value)
            ?.items?.find((li) => li.product_type === "simple")
        );
      } else {
        dispatch(showSnackbar("No product found"), "error");
      }
    }
  };
  const handleSubmit = async (e) => {
    if (!value)
      return dispatch(showSnackbar("Please enter order Number", "error"));
    e.preventDefault();
    if (value) {
      setLoading(true);
      getOrderDetail();
      const res = await getTrackYourOrder(value);
      if (
        res.status === 200 &&
        res?.data
      ) {
        setOrderItems(
          res?.data
        );
        setLoading(false);
      } else {
        dispatch(
          showSnackbar(
            res?.data?.error || `No Record found for Order Number #${value}`,
            "error"
          )
        );
        setError(true);
        setLoading(false);
      }
    }
  };
  const cancelOrderfn = async (e, id) => {
    e.preventDefault();
    if (value) {
      const res = await cancelOrder(id);
      if (res.status === 200) {
        dispatch(showSnackbar("Order Canceled", "Success"));
        history.push("/cancelled-orders");
      } else {
        dispatch(showSnackbar("Order Cancelation failed", "error"));
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
            loading={loading}
          />
          {orderDetails && (
            <div>
              <section className={styles.detailsWrap}>Order Details</section>
              <ProductCard
                product={orderDetails}
                cancelOrderFn={cancelOrderfn}
                trackOrder
                value={value}
              />
            </div>
          )}
          {error && (
            <section className={styles.noRecord}>
              <div>
                <p>{`NO RECORD FOUND FOR ORDER NUMBER ${value}`}</p>
              </div>
              <div>
                <button onClick={() => setError(false)} type="button">
                  OK
                </button>
              </div>
            </section>
          )}
          {orderItems.length>0 && <TrackOrderDetails order={orderItems[0]} />}
        </section>
      </div>
    </div>
  );
}

export default TrackOrders;
