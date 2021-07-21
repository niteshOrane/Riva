import React from "react";
import * as icons from "../../../common/Icons/Icons";
import styles from "./SelectBillingAddress.module.scss";

function SelectBillingAddress({addressItem}) {
  return (
    <div>
    <p className={styles.title}>Select a Billing Address</p>
    <p className={styles.greyText}>
      Is the address you'd like to use displayed below? If so, click the
      corresponding "Billing to this address" button. Or you can{" "}
      <strong className="color-black">enter a new delivery address. </strong>
    </p>
    <div className={styles.deliveryAddress}>
      <div>
        <h3 className="font-weight-normal">
          Billing Address <icons.Check />
        </h3>
        <h4 className="font-weight-normal">{addressItem?.name}</h4>
        <p className={styles.greyText}>
          {addressItem?.address1}  {addressItem?.city} {addressItem?.state}
        </p>
        <p className={styles.greyText}>
          {addressItem?.address2}  {addressItem?.phone}
        </p>
      </div>
    </div>
  </div>
  );
}

export default SelectBillingAddress;
