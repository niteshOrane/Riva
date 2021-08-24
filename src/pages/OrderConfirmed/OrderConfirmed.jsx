import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import queryString from 'query-string';
import axios from "axios";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import Congratulations from "../../components/pages/Dashboard/OrderConfirmed/Congratulations/Congratulations";
import ProductCard from "../../components/pages/Dashboard/OrderConfirmed/ProductCard/ProductCard";
import Details from "../../components/pages/Dashboard/OrderConfirmed/Details/Details";
import styles from "./OrderConfirmed.module.scss";

import { orderConfirmed } from "../../services/order/order.services";
import { Hypy_PaymentCart } from "../../services/cart/cart.service";

function OrderConfirmed(props) {
  const { orderId } = useParams();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [orderItems, setOrderItems] = useState(null)
  const [responseData, setResponseData] = useState({
    responseData: null,
    loading: true
  })

  useEffect(async () => {
    const parsed = queryString.parse(props?.location?.search)
    const res = await Hypy_PaymentCart(props?.location?.search);
    if (res.status === 200 && res?.data) {
      setResponseData({
        responseData: res.data,
        loading: false
      })
    }
  }, [])
  const checkResult = () => {
    const successPattern = /^(000\.000\.|000\.100\.1|000\.[36])/;
    const manuallPattern = /^(000\.400\.0[^3]|000\.400\.100)/;
    if (responseData?.responseData) {
      const match1 = successPattern.test(responseData.responseData.result.code);
      const match2 = manuallPattern.test(responseData.responseData.result.code);
      if (match1 || match2) {
        return (
          <div>
            <h1>Success</h1>
            <h3>{responseData.responseData.result.description}</h3>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Failed</h1>
            <h3>{responseData.responseData.result.description}</h3>
          </div>
        )
      }
    }
  }
  const getOrderDetails = async (val) => {
    const res = await orderConfirmed(val);
    if (res.status === 200 && res?.data) {
      setOrderItems(res?.data?.items.filter(li => li.product_type === "simple"))
      setDeliveryAddress(res?.data?.billing_address);
      setAmount({
        total: res?.data?.subtotal_incl_tax,
        shippingAmount: res?.data?.shipping_amount,
        totalPaid: res?.data?.grand_total
      });
    }
  };
  useEffect(() => {
    if (orderId) {
      getOrderDetails(orderId);
    }
  }, [orderId]);
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
              <Congratulations {...props?.match?.params} />
              {props?.location?.search ? checkResult() : null}
              {orderItems?.map(li => (
                <ProductCard product={li} />
              ))}
            </div>
            {deliveryAddress && amount && <Details deliveryAddress={deliveryAddress} amount={amount} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
