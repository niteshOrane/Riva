import React, { useEffect, useState } from "react";
import queryString from "query-string";

import { useHistory } from "react-router-dom";

import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";

import styles from "./OrderConfirmed.module.scss";

import {
  Hypy_PaymentCart,
  finalCallTapAction,
} from "../../services/cart/cart.service";

function ResultPage(props) {
  const history = useHistory();
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");

  const getHyperPayPayment = async () => {
    const parsed = queryString.parse(props?.location?.search);
    if (parsed) {
      let res = null;
      if (parsed["tap_id"]) {
        res = await finalCallTapAction(parsed["tap_id"]);
      } else {
        res = await Hypy_PaymentCart(
          props?.location?.search,
          props.match.params["type"]
        );
      }
      if (
        res &&
        res.status === 200 &&
        res?.data &&
        res.data?.[0]?.["order_id"]
      ) {
        history.push(
          `/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`
        );
      } else {
        setPaymentErrorMsg(res?.data?.[0]?.status);
      }
    }
  };

  useEffect(() => {
    getHyperPayPayment();
  }, []);

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.contentConatiner}>
            <h2 className={styles.title}>Order Confirmed</h2>
            <div className="py-20px d-flex w-100 justify-content-between">
              {!paymentErrorMsg ? (
                <div>Please wait Order In Progress</div>
              ) : (
                <div className={styles.payMsg}>{paymentErrorMsg}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
