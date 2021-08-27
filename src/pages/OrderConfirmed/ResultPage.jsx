import React, { useEffect } from "react";
import queryString from 'query-string';

import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';

import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";

import styles from "./OrderConfirmed.module.scss";

import { Hypy_PaymentCart } from "../../services/cart/cart.service";

function ResultPage(props) {
  const history = useHistory();
  

  const getHyperPayPayment = async () => {
    const parsed = queryString.parse(props?.location?.search);
    if (parsed) {
      const res = await Hypy_PaymentCart(props?.location?.search, props.match.params["type"]);
      if (res.status === 200 && res?.data && res.data?.[0]?.["order_id"]) {
        history.push(
          `/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`
        );
      }
    }
  }

  useEffect(() => {
    getHyperPayPayment()
  }, [])

 
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
              <div>Please wait Order In Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
