import React from "react";
import * as DATA_TYPES from '../../../../../../store/types';
import { Link, useHistory } from "react-router-dom";
import styles from "./Tab2Content.module.scss";
import { cartPaymentAction } from "../../../../../../services/cart/cart.service";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../store/actions/common";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";

const Tab2Content = ({onPayNow}) => {
  const dispatch = useDispatch();
  const [validation,setValidation] = React.useState(false)
  // const onPayNow = async (e) => {
  //   if (e) {
  //     setLoading(true)
  //     const res = await cartPaymentAction(e);
  //     if (res.status === 200) {
  //       setLoading(false)
  //       dispatch(showSnackbar("Payment success", "success"));
  //       dispatch({
  //         type: DATA_TYPES.SET_CART_ID,
  //         payload: { cart_id: 0 },
  //       });
  //       dispatch({
  //         type: DATA_TYPES.SET_BULK_CART,
  //         payload: [],
  //       });
  //       history.push(`/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`);
  //     } else {
  //       dispatch(showSnackbar("Payment Failed", "error"));
  //     }
  //   }
  // };
  const showValidation = (e) => {
    if(!e.isValid || e.isEmpty){
      setValidation(true)
    }else{
      setValidation(false)
    }
  }
  return (
    <div>
      <h3 className="my-20px">CREDIT/DEBIT CARD</h3>
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
          }}
        >
          PAY NOW
        </button>
      </Frames>
      <br/>
      {validation && <span className={styles.cardValidation}>Please enter valid card details</span>}
    </div >
  );
};

export default Tab2Content;
