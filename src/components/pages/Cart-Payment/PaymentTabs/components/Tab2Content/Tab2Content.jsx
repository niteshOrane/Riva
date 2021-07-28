import React from "react";
import styles from "./Tab2Content.module.scss";
import * as icons from "../../../Icons/Icons";
import { cartPaymentAction } from "../../../../../../services/cart/cart.service";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../store/actions/common";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";
const Tab2Content = () => {
  const dispatch = useDispatch();
  const [saveCardDetails, setSaveCardDetails] = React.useState(true);
  const [paymentToken, setPaymentToken] = React.useState("");
  const onPayNow = async () => {
    if (paymentToken) {
      const res = await cartPaymentAction(paymentToken);
      if (res.status === 200) {
        dispatch(showSnackbar("Payment success", "success"));
      } else {
        dispatch(showSnackbar("Payment Failed", "error"));
      }
    }
  };
  console.log(paymentToken);
  return (
    <div>
      <h3 className="my-20px">CREDIT/DEBIT CARD</h3>
      {/* <form>
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
      </form> */}
      <Frames
        id={styles.cardNumber}
        config={{
          debug: true,
          publicKey: "pk_test_15144f98-d5cf-435d-943c-325ed98564ba",
          localization: {
            cardNumberPlaceholder: "Card number",
            expiryMonthPlaceholder: "MM",
            expiryYearPlaceholder: "YY",
            cvvPlaceholder: "CVV",
          },

          style: {
            base: {
              fontSize: "17px",
              border: "1px solid black",
              height: "3rem",
              padding: "4px",
            },
            invalid: {
              color: "red",
            },
          },
        }}
        cardSubmitted={() => {}}
        cardTokenized={(e) => {
          console.log(e);
          setPaymentToken(e?.token);
        }}
        cardTokenizationFailed={(e) => {
          console.log(e);
          dispatch(showSnackbar("Payment Fail", "error"));
        }}
      >
        <CardNumber />
        <ExpiryDate />
        <Cvv />
        <button
          className={styles.payNowBtn}
          onClick={() => {
            Frames.submitCard();
            onPayNow();
          }}
        >
          PAY NOW
        </button>
      </Frames>
    </div>
  );
};

export default Tab2Content;
