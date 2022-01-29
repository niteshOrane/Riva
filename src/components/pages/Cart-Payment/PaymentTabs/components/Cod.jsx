import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { placeCodOrder } from "../../../../../services/cart/cart.service";
import styles from "./Tab2Content/Tab2Content.module.scss";
import * as DATA_TYPES from "../../../../../store/types";
import { showSnackbar } from "../../../../../store/actions/common";
import { useState } from "react";
import { useEffect } from "react";

function Cod({ codInfo }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const [loading, setLoading] = useState(false);
  const [title,setTitle] = useState();
  const [value,setValue] = useState();
  useEffect(() => {
    const name =
    codInfo?.total_segments?.find((li) => li?.code === "fee")?.title ||
    "Delivery Charges";
    setTitle(name);
  const pay =
    codInfo?.total_segments?.find((li) => li?.code === "payment_fee")?.value || 0;
    setValue(pay)
  },[codInfo])
  const placeCodOrderConfirm = async () => {
    setLoading(true);
    const res = await placeCodOrder("cashondelivery");
    if (res.status === 200) {
      dispatch({
        type: DATA_TYPES.SET_CART_ID,
        payload: { cart_id: 0 },
      });
      dispatch({
        type: DATA_TYPES.SET_BULK_CART,
        payload: [],
      });
      setLoading(false);
      history.push(
        `/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`
      );
    } else if (res?.message) {
      dispatch(showSnackbar(res?.message, "warning"));
      setLoading(false);
    } else {
      dispatch(showSnackbar("Something went wrong", "error"));
      setLoading(false);
    }
  };
  return (
    <div className={styles.codWrapper}>
      <section className="d-flex">
        <span className={`material-icons ${styles.icon}`}>payments</span>
        <span>{title}:</span>
        <span className={styles.codCharge}>
          {currency_symbol}
          {value}
        </span>
      </section>
      <button
        onClick={placeCodOrderConfirm}
        type="button"
        className={styles.codPlace}
      >
        Place Order
      </button>
      {loading && (
        <p className={styles.loading}>Please Wait processing your order...</p>
      )}
    </div>
  );
}

export default Cod;
