import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { placeCodOrder } from "../../../../../services/cart/cart.service";
import styles from "./Tab2Content/Tab2Content.module.scss";
import * as DATA_TYPES from "../../../../../store/types";
import { showSnackbar } from "../../../../../store/actions/common";

function Cod({ codInfo }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const title = codInfo?.total_segments?.find(
    (li) => li?.code === "fee"
  )?.title;
  const value = codInfo?.total_segments?.find(
    (li) => li?.code === "fee"
  )?.value;
  const placeCodOrderConfirm = async () => {
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
      history.push(
        `/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`
      );
    } else if (res?.message) {
      dispatch(showSnackbar(res?.message, "warning"));
    } else {
      dispatch(showSnackbar("Something went wrong", "error"));
    }
  };
  return (
    <div className={styles.codWrapper}>
      <section className="d-flex">
        <span className={`material-icons ${styles.icon}`}>payments</span>
        <span>{title}:</span>
        <span className={styles.codCharge}>
          {codInfo?.quote_currency_code}
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
    </div>
  );
}

export default Cod;
