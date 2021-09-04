import React from "react";
import { GoSellElements } from "@tap-payments/gosell";
import styles from "./Tab2Content.module.scss";
import { cartPaymentTapAction } from "../../../../../../services/cart/cart.service";
import { showSnackbar } from "../../../../../../store/actions/common";
import { useDispatch } from "react-redux";
import * as DATA_TYPES from "../../../../../../store/types";
import { useHistory } from "react-router-dom";

function GoSellTap() {
  const dispatch = useDispatch();
  const history = useHistory();
  const callbackFunc = async (subType) => {
    const res = await cartPaymentTapAction(subType);
    if (res.status === 200 && res.data?.data?.success) {
      window.location.href= res.data?.data?.redirect_url;
    }
  };
  return (
    <div style={{ overflowX: "scroll" }}>

      <div
        className={styles.chooseShipping}

      >
        <div className={styles.chooseShipping} onClick={() => callbackFunc('card')}>
          <input type="radio" name="card" value="card" />

          <label htmlFor="submethod">
            Card
          </label>
        </div>
        <div className={styles.chooseShipping} onClick={() => callbackFunc('mada')}>
          <input type="radio" name="mada" value="mada" />

          <label htmlFor="mada">
            Mada
          </label>
        </div>
        <div className={styles.chooseShipping} onClick={() => callbackFunc('Knet')}>
          <input type="radio" name="knet" value="knet" />

          <label htmlFor="knet">
            Knet
          </label>
        </div>
        <div className={styles.chooseShipping} onClick={() => callbackFunc('benefit')}>
          <input type="radio" name="benefit" value="benefit" />


          <label htmlFor="benefit">
            Benefit
          </label>
        </div>
      </div>
    </div>
  );
}

export default GoSellTap;
