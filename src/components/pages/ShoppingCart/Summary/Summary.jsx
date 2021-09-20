import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LetUsHear from "../../../common/Cards/LetUsHear/LetUsHear";
import style from "./Summary.module.scss";
import { toggleSignUpCard } from "../../../../store/actions/common";

const Summary = ({ currency_symbol }) => {
  const { data: items = [] } = useSelector((state) => state.cart);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const openSignUpCard = (redirectTo) => {
    dispatch(toggleSignUpCard({ redirectTo }));
  };

  const isAuth = auth.isAuthenticated;
  return (
    <div className={style.container}>
      <div className={style.bgGrey}>
        <div className={style.title}>
          <h2>ORDER SUMMARY</h2>
        </div>
        <div className="my-10px d-flex align-items-center justify-content-between">
          <p className="font-light-black">SUBTOTAL</p>
          <span className="color-primary">
            {currency_symbol}
            {items.reduce((total, item) => total + item.price * item.qty, 0) ||
              0}
          </span>
        </div>
        <div
          className={`${style.greandTotal} my-10px d-flex align-items-center justify-content-between`}
        >
          <h4 className="font-weight-600">GRAND TOTAL</h4>
          <h4 className="font-weight-600 color-primary">
            {currency_symbol}
            {parseFloat(
              items.reduce((total, item) => total + item.price * item.qty, 0)
            ).toFixed(2) || 0}
          </h4>
        </div>

        <div className={style.checkoutBtn}>
          <Link to="/delivery-address">
            <button type="button">SECURE CHECKOUT</button>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              isAuth
                ? history.push("/delivery-address")
                : openSignUpCard("/delivery-address");
            }}
            type="button"
            className="bg-black color-white p-12px w-100 d-block c-pointer"
          >
            Change Delivery Address
          </button>
        </div>
        <div className="gap-12px bg-white d-flex align-items-center p-12px">
          <span>icon</span>
          <span className="font-light-black">
            We offer easy returns up to 14 days. Terms & Conditions apply
          </span>
        </div>
        <div className="gap-12px bg-white d-flex align-items-center p-12px">
          <span>icon</span>
          <p>
            <strong className="d-block">100% SECURE DATA ENCRYPTIN</strong>
            <span className="d-block font-light-black">
              We guarantee security of every transaction
            </span>
          </p>
        </div>
      </div>
      <LetUsHear />
    </div>
  );
};

export default Summary;
