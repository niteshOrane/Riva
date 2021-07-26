import React from "react";

import Switch from '@material-ui/core/Switch';

import styles from "./AddressItem.module.scss";

function AddressItem(options) {
  const { addressItem, index, onEdit, setDefaultAddress, state, handleChange, onDelete } = options;

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
        <div style={{ display: 'inline-grid', gap: '5px' }}>
          <div> <Switch
            checked={state.indexItem === index ? state.checkedA : false}
            title="Set Default Shipping Address"
            onChange={(event) => { handleChange(event, index); setDefaultAddress(options, false) }}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
            <Switch
              checked={state.indexItem === index ? state.checkedB : false}
              title="Set Default Billing Address"
              onChange={(event) => { handleChange(event, index); setDefaultAddress(options, true) }}
              name="checkedB"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            /></div>
          <button className={`c-pointer ${styles.changeBtn}`} type="button"
            onClick={() => { onEdit(addressItem) }}>CHANGE</button>
          <button className={`c-pointer ${styles.changeBtn}`} type="button"
            onClick={() => { onDelete(addressItem) }}>DELETE ADDRESS</button>
        </div>
      </div>
    </div>
  );
}

export default AddressItem;
