import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as icons from "../../components/common/Icons/Icons";
import { Link } from "react-router-dom";
import { getCustId } from "../../util";
import SelectDeliveryAddress from "../../components/pages/DeliveryAddress/SelectDeliveryAddress/SelectDeliveryAddress";
import SelectBillingAddress from "../../components/pages/DeliveryAddress/SelectBillingAddress/SelectBillingAddress";

import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";
import OrderReview from "../../components/pages/DeliveryAddress/OrderReview/OrderReview";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import styles from "./DeliveryAddress.module.scss";
import { getCustomerAddressList, setCustomerAddresDefault } from '../../store/actions/customerAddress';
import { useEffect } from "react";
import AddressItem from "../../components/pages/DeliveryAddress/AddressItem/AddressItem";
import {
  setDefaultAddressCustomer
} from '../../services/address/address.service';
import { useState } from "react";
import {
  showSnackbar
} from "../../store/actions/common";

function DeliveryAddress() {
  const [stateCheck, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    indexItem: null
  });
  const handleChange = (event, index) => {
    setState({ ...stateCheck, [event.target.name]: event.target.checked, indexItem: index });
  };
  const dispatch = useDispatch();
  const customerAddressList = useSelector((state) => state.address?.data || []);
  const [dataList, setDataList] = useState([]);
  const defaultAddressIds = useSelector((state) => state.address?.defaultAddressIds || []);
  useEffect(() => {
    setDataList(customerAddressList);
  }, [customerAddressList])
  const [showList, setShowList] = useState(true);

  const [recordToEdit, setrecordToEdit] = useState(null);
  useEffect(() => {
    dispatch(getCustomerAddressList());
  }, [])
  const handleOnEdit = (record) => {
    setrecordToEdit(record);
    setShowList(false);
  }
  const recordUpdated = () => {
    dispatch(getCustomerAddressList());
  }
  const setDefaultAddress = async (record, isBilling) => {
    const form = new FormData();

    form.append("customerid", getCustId());
    form.append("addressid", record?.addressItem?.id);
    const res = await setDefaultAddressCustomer(form, isBilling);
    if (res.data.success) {
      dispatch(setCustomerAddresDefault(res));
      recordUpdated();
      setState({ ...stateCheck, checkedA: false, checkedB: false, indexItem: null });
    }
    else {
      dispatch(
        showSnackbar(
          res.data.message || 'failed to add item to Address',
          'error'
        )
      );
    }
  }
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
          <div className="d-flex">
            <SelectDeliveryAddress addressItem={dataList && dataList.length > 0 ? dataList?.find(e => e.id === defaultAddressIds.Shippingid) : {}} />
            <SelectBillingAddress addressItem={dataList && dataList.length > 0 ? dataList?.find(e => e.id === defaultAddressIds.Billingid) : {}} />
          </div>
          {showList && dataList.map((addr, index) => {
            return (<AddressItem addressItem={addr} state={stateCheck} handleChange={handleChange} setDefaultAddress={setDefaultAddress} index={index} onEdit={handleOnEdit} />)
          })}
          <div className={styles.addAddress}>
            <p className={styles.title}>{recordToEdit ? 'Edit your address' : 'Add a new address'}</p>
          </div>
          <DeliveryAddressForm customerData={recordToEdit} onAfterSaveEdit={() => { setShowList(true); setrecordToEdit(null); recordUpdated(); }} />
          <div className={styles.shippingMethod}>
            <h3 className="font-weight-normal">SHIPPING METHOD</h3>
            <p className={styles.greyText}>
              Please specify the shipping address to see available options.
            </p>
          </div>

          <div className={styles.subBtns}>
            <Link to="/shopping-cart">
              <button className={styles.returnBtn} type="button">
                <span className="material-icons-outlined">arrow_back_ios</span>
                <span>RETURN TO CART</span>
              </button>
            </Link>
            <Link to="/">
              <button className={styles.continueBtn} type="button">CONTINUE SHOPPING</button>
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
