import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./outOfStock.module.scss";
import { showSnackbar } from "../../../../../store/actions/common";
import { addAlertstock } from "../../../../../services/order/order.services";

function OutOfStock({ productId }) {
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = useState("");
  const { isAuthenticated, customer } = useSelector((state) => state?.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated && emailAddress === "") {
      return dispatch(showSnackbar("Please enter email", "error"));
    }
    if (!isAuthenticated && !emailAddress.includes("@")) {
      return dispatch(showSnackbar("Invalid Email", "error"));
    }
    const subscribe = new FormData();
    subscribe.append("productId", productId);
    subscribe.append("email", isAuthenticated ? customer?.email : emailAddress);
    const res = await addAlertstock(subscribe);
    if (res.status === 200 && res.data) {
      setEmailAddress("");
      return dispatch(
        showSnackbar("We will let you know when product is in stock", "success")
      );
    } else {
      return dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  return (
    <>
      <form className={style.outOfstockForm} onSubmit={handleSubmit}>
        <div className={style.inp}>
          {!isAuthenticated && (
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter your email here"
              name="email"
              value={emailAddress}
            />
          )}
        </div>
        <div style={{margin:isAuthenticated ? "0" : "12px 13px"}} className={style.sub}>
          <button type="submit">Notify Me</button>
        </div>
      </form>
    </>
  );
}

export default OutOfStock;
