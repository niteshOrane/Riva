import React from "react";
import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
import TrackOrderDetails from "../../components/pages/Dashboard/MyOrders/TrackOrders/TrackOrderDetails/TrackOrderDetails";
import {
  getTrackYourOrder,
  cancelOrder,
  getOrderList,
} from "../../services/order/order.services";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import styles from "./TrackOrders.module.scss";
import { showSnackbar } from "../../store/actions/common";
import InformationGrid from "../../components/pages/OrderInformation/InformationGrid";
import InformationTable from "../../components/pages/OrderInformation/InformationTable";

function TrackOrders() {
  const { customer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState("");
  const [orderItems, setOrderItems] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState({
    product: null,
    status: null,
  });
  const [orderInfo, setOrderInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const getOrderDetail = async () => {
    if (value) {
      const res2 = await getOrderList(customer?.customerID);
      if (res2.status === 200 && res2?.data?.items) {
        setOrderDetails({
          ...orderDetails,
          product: res2?.data?.items
            ?.find((li) => li?.increment_id === value)
            ?.items?.find((li) => li.product_type === "simple"),
          status: res2?.data?.items?.find((li) => li?.increment_id === value)
            ?.status,
        });
        setOrderInfo({
          shippingAddress: res2?.data?.items?.find(
            (li) => li?.increment_id === value
          )?.billing_address,
          shippingDescription: res2?.data?.items?.find(
            (li) => li?.increment_id === value
          )?.shipping_description,
          billingAddress: res2?.data?.items?.find(
            (li) => li?.increment_id === value
          )?.billing_address,
          payment: res2?.data?.items?.find((li) => li?.increment_id === value)
            ?.payment,
        });
      } else {
        dispatch(showSnackbar("No product found"), "error");
      }
    }
  };
  console.log(orderInfo);
  const handleSubmit = async (e) => {
    if (!value)
      return dispatch(showSnackbar("Please enter order Number", "error"));
    e.preventDefault();
    if (value) {
      setError(false);
      setLoading(true);
      getOrderDetail();
      const res = await getTrackYourOrder(value);
      if (res.status === 200 && !Array.isArray(res?.data?.[0])) {
        setOrderItems(res?.data);
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
        setOrderItems([]);
      }
    }
  };
  const cancelOrderfn = async (e, id) => {
    e.preventDefault();
    if (value) {
      setCancelLoading(true);
      const res = await cancelOrder(id);
      if (res.status === 200) {
        dispatch(showSnackbar("Order Canceled", "Success"));
        setCancelLoading(false);
        history.push("/cancelled-orders");
      } else {
        dispatch(showSnackbar("Order Cancelation failed", "error"));
        setCancelLoading(false);
      }
    }
  };
  return (
    <div className="container-with-circles my-20px">
      <div className="d-flex h-100">
        <Sidebar />
        <section className="d-flex flex-column h-100 w-100">
          <TrackYourOrderCard
            value={value}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          {orderInfo && (
            <InformationGrid orderNumber={value} infoList={orderInfo} />
          )}
          {orderInfo && <InformationTable />}
          {orderDetails?.product && (
            <div>
              <section className={styles.detailsWrap}>Order Details</section>
              <ProductCard
                product={orderDetails?.product}
                status={orderDetails?.status}
                loading={cancelLoading}
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
          {orderItems.length > 0 && <TrackOrderDetails order={orderItems[0]} />}
          {loading && (
            <div className={styles.progress}>
              <CircularProgress size={50} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TrackOrders;
