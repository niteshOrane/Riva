import React from "react";
import { GoSellElements } from "@tap-payments/gosell";
import styles from "./Tab2Content.module.scss";
import { cartPaymentAction } from "../../../../../../services/cart/cart.service";
import { showSnackbar } from "../../../../../../store/actions/common";
import { useDispatch } from "react-redux";
import * as DATA_TYPES from "../../../../../../store/types";
import { useHistory } from "react-router-dom";

function GoSellTap() {
  const dispatch = useDispatch();
  const history = useHistory();
  const callbackFunc = async (response) => {
    if (response) {
      const res = await cartPaymentAction(response,"tap");
      if (res.status === 200) {
        dispatch(showSnackbar("Payment success", "success"));
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
      } else {
        dispatch(showSnackbar("Payment Failed", "error"));
      }
    }
  };
  return (
    <div style={{ overflowX: "scroll" }}>
      <GoSellElements
        gateway={{
          publicKey: "pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
          language: "en",
          supportedCurrencies: "all",
          supportedPaymentMethods: "all",
          notifications: "msg",
          callback: callbackFunc,
          labels: {
            cardNumber: "Card Number",
            expirationDate: "MM/YY",
            cvv: "CVV",
            cardHolder: "Name on Card",
            actionButton: "Pay",
          },
          style: {
            base: {
              color: "#535353",
              lineHeight: "18px",
              fontFamily: "sans-serif",
              fontSmoothing: "antialiased",
              width: "100%",
              fontSize: "16px",
              "::placeholder": {
                color: "rgba(0, 0, 0, 0.26)",
                fontSize: "15px",
              },
            },
            invalid: {
              color: "red",
              iconColor: "#fa755a ",
            },
          },
        }}
      />
      <p id="msg"></p>

      <button
        type="button"
        className={styles.payNowBtn}
        onClick={() => GoSellElements.submit()}
        style={{ marginBottom: "6px" }}
      >
        Submit
      </button>
    </div>
  );
}

export default GoSellTap;
