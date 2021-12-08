import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Congratulations from "../../components/pages/Dashboard/OrderConfirmed/Congratulations/Congratulations";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import Details from "../../components/pages/Dashboard/OrderConfirmed/Details/Details";
import styles from "./OrderConfirmed.module.scss";
import { emptyCart, emptyCartItem } from "../../store/actions/auth";
import { orderConfirmed } from "../../services/order/order.services";

import { showSnackbar } from "../../store/actions/common";

function OrderConfirmed(props) {
  const dispatch = useDispatch();
  const { orderId, displayOrderNumber } = useParams();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [orderCurrency,setOrderCurrency] = useState(null)
  const [amount, setAmount] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const getOrderDetails = async (val) => {
    const res = await orderConfirmed(val);
    if (res.status === 200 && res?.data && !res?.data?.error) {
      setOrderItems(
        res?.data?.items.filter((li) => li.product_type === "simple")
      );
      setDeliveryAddress(res?.data?.billing_address);
      setAmount({
        total: res?.data?.subtotal_incl_tax,
        shippingAmount: res?.data?.shipping_amount,
        totalPaid: res?.data?.grand_total,
      });
      setOrderCurrency(res?.data?.order_currency_code)
    } else {
      return dispatch(showSnackbar(res?.data?.error, "error"));
    }
  };
  useEffect(() => {
    if (orderId) {
      dispatch(emptyCart());
      dispatch(emptyCartItem());
      getOrderDetails(displayOrderNumber);
    }
  }, [orderId]);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.contentConatiner}>
            <h2 className={styles.title}>Order Confirmed</h2>
            <div className="py-20px d-flex w-100 justify-content-between">
              <Congratulations {...props?.match?.params} />
              <div className = {styles.confirmCard}>
                {orderItems?.map((li) => (
                  <ProductCard
                    product={li}
                    displayOrderNumber={displayOrderNumber}
                    orderCurrency = {orderCurrency}
                  />
                ))}
              </div>
            </div>
            {deliveryAddress && amount && (
              <Details deliveryAddress={deliveryAddress} amount={amount} orderCurrency={orderCurrency} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
