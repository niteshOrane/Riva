import React from "react";
import * as DATA_TYPES from '../../../../../../store/types';
import { Link, useHistory } from "react-router-dom";
import styles from "./Tab2Content.module.scss";
import { cartPaymentAction } from "../../../../../../services/cart/cart.service";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../store/actions/common";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";

const Tab2Content = ({ onPayNow, paymentType }) => {
  const dispatch = useDispatch();
  const [validation, setValidation] = React.useState(false)
  const showValidation = (e) => {
    if (e.isEmpty) return setValidation(true)
    if (!e.isValid || e.isEmpty) {
      setValidation(true)
    } else {
      setValidation(false)
    }
  }
  const gtmDataLayer = () => {
    const dataLayer = window.dataLayer || [];
    dataLayer.push({
      'bookTitle': 'Cien años de soledad',
  });
  }
  return (
    <div>
      <h3 className="my-20px">CREDIT/DEBIT CARD</h3>
      <Frames
        id={styles.cardNumber}
        config={{
          publicKey: paymentType,
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
              width: '95%'
            },
            invalid: {
              color: "red",
            },
          },
        }}
        frameValidationChanged={(e) => showValidation(e)}
        cardTokenized={(e) => {
          onPayNow(e);
        }}
        cardTokenizationFailed={e => {
          dispatch(showSnackbar("Payment Fail", "error"));
        }}
      >
        <CardNumber />
        <ExpiryDate />
        <Cvv />
        <button
          type="button"
          className={styles.payNowBtn}
          onClick={() => {
            Frames.submitCard();
            gtmDataLayer();
          }}
        >
          PAY NOW
        </button>
      </Frames>
      <br />
      {validation && <span className={styles.cardValidation}>Please enter valid card details</span>}
    </div >
  );
};

export default Tab2Content;
