import React from "react";
import * as icons from "../../../common/Icons/Icons";
import styles from "./SelectDeliveryAddress.module.scss";

function SelectBillingAddress(addressItem) {
  return (
    <div>
      <p className={styles.title}>Select a Delivery Address</p>
      <p className={styles.greyText}>
        Is the address you'd like to use displayed below? If so, click the
        corresponding "Deliver to this address" button. Or you can{" "}
        <strong className="color-black">enter a new delivery address. </strong>
      </p>
      <div className={styles.deliveryAddress}>
        <div>
          <h3 className="font-weight-normal">
            Delivery Address <icons.Check />
          </h3>
          <h4 className="font-weight-normal">{addressItem?.name || 'Dheeraj'}</h4>
          <p className={styles.greyText}>
            {addressItem?.addesss || 'R-006, Pan Oasis Tower'}
          </p>
        </div>
        <button className={styles.changeBtn}>CHANGE</button>
      </div>
      <div className={styles.addAddress}>
        <p className={styles.title}>Add a new address</p>
      </div>
    </div>
  );
}

export default SelectBillingAddress;
