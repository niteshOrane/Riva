import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as icons from "../../components/common/Icons/Icons";
import { Link } from "react-router-dom";
import SelectDeliveryAddress from "../../components/pages/DeliveryAddress/SelectDeliveryAddress/SelectDeliveryAddress";
import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";
import OrderReview from "../../components/pages/DeliveryAddress/OrderReview/OrderReview";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import styles from "./DeliveryAddress.module.scss";
import { getCustomerAddressList } from '../../store/actions/customerAddress';
import { useEffect } from "react";
import AddressItem from "../../components/pages/DeliveryAddress/AddressItem/AddressItem";

function DeliveryAddress() {
  const dispatch = useDispatch();
  const customerAddressList = useSelector((state) => state.address?.data || []);
  useEffect(() => {
    dispatch(getCustomerAddressList());
  }, [])
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
          <Link to="/shopping-cart">
            <div className={styles.backBtn}>
              <span class="material-icons-outlined">arrow_back_ios</span>
              Back
            </div></Link>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.columnLeft}>
          <SelectDeliveryAddress addressItem={customerAddressList && customerAddressList.length > 0 ? customerAddressList[0] : {}} />
          <div className={styles.addAddress}>
            <p className={styles.title}>Add a new address</p>
          </div>
          {customerAddressList.map((addr, index) => {
            return (<AddressItem addressItem={addr} index={index}></AddressItem>)
          })}
        
          <DeliveryAddressForm customerData={customerAddressList} />
          <div className={styles.shippingMethod}>
            <h3 className="font-weight-normal">SHIPPING METHOD</h3>
            <p className={styles.greyText}>
              Please specify the shipping address to see available options.
            </p>
          </div>
          <div className={styles.subBtns}>
            <Link to="/shopping-cart">
              <button className={styles.returnBtn}>
                <span class="material-icons-outlined">arrow_back_ios</span>

                <span>RETURN TO CART</span>
              </button>
            </Link>
            <Link to="/">
              <button className={styles.continueBtn}>CONTINUE SHOPPING</button>
            </Link>
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
