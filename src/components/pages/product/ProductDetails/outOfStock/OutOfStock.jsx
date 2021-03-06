import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./outOfStock.module.scss";
import { showSnackbar } from "../../../../../store/actions/common";
import { addAlertstock } from "../../../../../services/order/order.services";


function OutOfStock({ productId }) {
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (emailAddress === "") {
      return dispatch(showSnackbar("Please enter email", "error"));
    }
    if (!emailAddress.includes('@')) {
      return dispatch(showSnackbar("Invalid Email", "error"))
    }
    const subscribe = new FormData();
    subscribe.append("productId", productId);
    subscribe.append("email", emailAddress);
    const res = await addAlertstock(subscribe);
    if (res.status === 200 && res.data) {
      setEmailAddress("");
      return dispatch(showSnackbar("We will let you know when product is in stock", "success"));
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"))
    }
  };

  return (
    <>
      <form className={style.outOfstockForm} onSubmit={handleSubmit}>
        <div className={style.inp}>
          <input
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Enter your email here"
            name="email"
            value={emailAddress}
          />
        </div>
        <div className={style.sub}>
          <button type="submit">Notify Me</button>
        </div>
      </form>
    </>
  );
}

export default OutOfStock;
