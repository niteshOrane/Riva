import React from "react";
import * as icons from "../../../common/Icons/Icons";
import styles from "./AddressItem.module.scss";

function AddressItem({addressItem, index}) {
  return (
    <div>
    
      <div className={styles.deliveryAddress}>
        <div>
          <h3 className="font-weight-normal">
            Address {index}
          </h3>
          <h4 className="font-weight-normal">{addressItem?.name}</h4>
          <p className={styles.greyText}>
            {addressItem?.address1}  {addressItem?.city} {addressItem?.state}
          </p>
          <p className={styles.greyText}>
            {addressItem?.address2}  {addressItem?.phone}
          </p>
        </div>
        <button className={styles.changeBtn}>CHANGE</button>
      </div>
    </div>
  );
}

export default AddressItem;
