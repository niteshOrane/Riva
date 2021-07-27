import React from "react";
import styles from "./Tab2Content.module.scss";
import * as icons from "../../../Icons/Icons";
import { cartPaymentAction } from "../../../../../../services/cart/cart.service";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../store/actions/common";
const Tab2Content = () => {
  const dispatch = useDispatch();
  const [saveCardDetails, setSaveCardDetails] = React.useState(true);
  const onPayNow = async (e) => {
    e.preventDefault()
    const res = await cartPaymentAction();
    if (res.status === 200) {
      dispatch(showSnackbar("Payment success", "success"));
    } else {
      dispatch(showSnackbar("Payment Failed", "error"));
    }
  };
  return (
    <div>
      <h3 className="my-20px">CREDIT/DEBIT CARD</h3>
      <form>
        <div className={styles.inpContainer}>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            id="cardNumber"
          />
          <img
            src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/3f2c72bf-7c3a-48c8-b038-0e65ac92b2dc.png"
            width="100%"
            alt="Card Number"
          />
        </div>
        <div className={styles.inpContainer}>
          <input
            type="text"
            placeholder="Name on Card"
            name="nameOnCard"
            id="nameOnCard"
          />
        </div>
        <div className={styles.twoInpsContainer}>
          <div>
            <input
              type="text"
              name="validTill"
              placeholder="Valid Thru (MM/YY)"
              id="validTill"
            />
          </div>

          <div className="d-flex align-items-center">
            <input type="text" name="cvv" placeholder="CVV" id="cvv" />
            <icons.Cvv />
          </div>
        </div>
        <div className="my-20px d-flex align-items-center gap-12px">
          <input
            onChange={() => setSaveCardDetails(!saveCardDetails)}
            checked={saveCardDetails}
            type="checkbox"
            name="saveCard"
            id="saveCard"
          />
          <label className={styles.fontSmall} htmlFor="saveCard">
            Save this card for faster payments
          </label>
          <span className="d-flex align-items-center">
            <icons.Cvv />
          </span>
        </div>
        <button onClick = {onPayNow} type="submit" className={styles.payNowBtn}>
          PAY NOW
        </button>
      </form>
    </div>
  );
};

export default Tab2Content;
