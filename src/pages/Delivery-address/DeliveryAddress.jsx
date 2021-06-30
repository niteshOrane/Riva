import React from "react";
import * as icons from "../../components/common/Icons/Icons";
import { Link } from "react-router-dom";
import SelectDeliveryAddress from "../../components/pages/DeliveryAddress/SelectDeliveryAddress/SelectDeliveryAddress";
import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";
import OrderReview from "../../components/pages/DeliveryAddress/OrderReview/OrderReview";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import styles from "./DeliveryAddress.module.scss";
function DeliveryAddress() {
  return (
    <div className="container-90 max-width-1600">
      <div className={styles.header}>
        <strong id="logo" className={styles.logo}>
          <Link to="/">
            <img src="/assets/images/logo.png" alt="Riva" />
          </Link>
        </strong>
        <div className={styles.breadCrumb}>
          <div className={styles.bcLinks}>
            <Link to="/">
              <strong className="color-black">
                <icons.Home />
                &nbsp;
              </strong>
              <span className="color-grey">
                Home <icons.AngleRight />
              </span>
            </Link>

            <strong>Select a Delivery Address</strong>
          </div>
          <div className={styles.backBtn}>
            <span class="material-icons-outlined">arrow_back_ios</span>
            Back
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.columnLeft}>
          <SelectDeliveryAddress />
          <DeliveryAddressForm />

          <div className="text-right">
            <button className={styles.addAddressBtn}>ADD ADDRESS</button>
          </div>

          <div className={styles.shippingMethod}>
            <h3 className="font-weight-normal">SHIPPING METHOD</h3>
            <p className={styles.greyText}>
              Please specify the shipping address to see available options.
            </p>
          </div>
          <div className={styles.subBtns}>
            <button className={styles.returnBtn}>
              <span class="material-icons-outlined">arrow_back_ios</span>

              <span>RETURN TO CART</span>
            </button>
            <button className={styles.continueBtn}>CONTINUE SHOPPING</button>
          </div>
        </div>
        <div>
          <div className={styles.columnRight}>
            <OrderReview />
          </div>
          <div className="my-20px">
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/7ff29082-fdcb-41b5-97d7-e87fe5d767e7.png"
              width="100%"
              alt=""
            />
          </div>
          <LetUsHear />
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
