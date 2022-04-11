import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import TagManager from "react-gtm-module";
import * as icons from "../../components/common/Icons/Icons";
import { getCustId } from "../../util";
import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";
import OrderReview from "../../components/pages/DeliveryAddress/OrderReview/OrderReview";
import LetUsHear from "../../components/common/Cards/LetUsHear/LetUsHear";
import styles from "./DeliveryAddress.module.scss";
import {
  getCustomerAddressList,
  setCustomerAddresDefault,
} from "../../store/actions/customerAddress";
import { getCart, getCustomerCartPayments } from "../../store/actions/cart";
import { getShippingMethodlist } from "../../store/actions/payment";
import {
  setDefaultAddressCustomer,
  deleteAddress,
} from "../../services/address/address.service";
import { showSnackbar } from "../../store/actions/common";
import AddressCard from "../../components/pages/DeliveryAddress/AddressCard/AddressCard";
import useArabic from "../../components/common/arabicDict/useArabic";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";

function DeliveryAddress({ isManageScreen, currentLocationPath }) {
  useAnalytics();

  const [stateCheck, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    indexItem: null,
  });
  const location = useLocation();
  const history = useHistory();
  const { language } = useSelector((state) => state?.common?.store);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { data } = useSelector((state) => state?.cart);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const [loading, setLoading] = useState(false);
  const { translate } = useArabic();
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        pageType: "Delivery Address",
        customer: { isLoggedIn: isAuthenticated },
        category: {
          id: JSON.parse(localStorage.getItem("preferredCategory")),
        },
        cart: { hasItems: data.length > 0 },
        ecommerce: {
          currencyCode: currency_symbol,
          products: data,
        },
      },
    });
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
    window.insider_object = {
      page: {
        type: "delivery_address",
        url: location.pathname,
      },
    };
  }, []);
  const dispatch = useDispatch();
  const customerAddressList = useSelector(
    (state) => state?.address?.data || []
  );
  const customerDeliverySpeed = useSelector(
    (state) => state.payment?.deliverySpeed || []
  );
  const [dataList, setDataList] = useState([]);
  const defaultAddressIds = useSelector(
    (state) => state.address?.defaultAddressIds || []
  );
  const cartPaymentInfo = useSelector(
    (state) => state.cart?.cartPaymentInfo || {}
  );
  useEffect(() => {
    setDataList(customerAddressList);
  }, [customerAddressList]);
  const [showList, setShowList] = useState(customerAddressList.length);

  const [recordToEdit, setrecordToEdit] = useState(null);
  useEffect(() => {
    dispatch(getCustomerAddressList());
    dispatch(getCart());
  }, []);
  useEffect(() => {
    if (data?.length === 0) {
      swal("There is no product in cart for this store", {
        buttons: {
          catch: {
            text: "Continue Shopping",
            value: "catch",
          },
        },
      }).then((value) => {
         history.push("/type/1241")
      });
    }
  }, [data]);
  const callBackAfterApplyCoupan = () => {
    dispatch(getCustomerCartPayments());
  };
  useEffect(() => {
    if (defaultAddressIds.Shippingid) {
      dispatch(getShippingMethodlist(defaultAddressIds.Shippingid));
    }
  }, [defaultAddressIds]);
  useEffect(() => {}, [customerDeliverySpeed]);
  const handleOnEdit = (record) => {
    setrecordToEdit(record);
    setShowList(false);
  };
  const handleOnDelete = async (record) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Address",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const formData = new FormData();
        formData.append("addressid", record?.id);
        const res = await deleteAddress(formData);
        if (res.status === 200) {
          dispatch(showSnackbar("Address Deleted Successfully", "success"));
          dispatch(getCustomerAddressList());
        } else {
          dispatch(showSnackbar("Something went wrong", "error"));
        }
      }
    });
  };
  const recordUpdated = () => {
    dispatch(getCustomerAddressList());
  };
  const addNewAddressbtn = () => {
    setShowList(false);
  };
  const setDefaultAddress = async (record, isBilling) => {
    setLoading(true);
    const form = new FormData();

    form.append("customerid", getCustId());
    form.append("addressid", record?.id);
    const res = await setDefaultAddressCustomer(form, isBilling);
    if (res.data.success) {
      dispatch(setCustomerAddresDefault(res));
      recordUpdated();
      setState({
        ...stateCheck,
        checkedA: false,
        checkedB: false,
        indexItem: null,
      });
      setLoading(false);
    } else {
      setLoading(false);
      dispatch(
        showSnackbar(
          res.data.message || "failed to add item to Address",
          "error"
        )
      );
    }
  };
  return (
    <div
      className={
        currentLocationPath?.pathname?.includes("manage-addresses")
          ? ""
          : `container-90`
      }
    >
      {!isManageScreen && (
        <div className={styles.header}>
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
                <span className="material-icons-outlined">arrow_back_ios</span>
                Back
              </div>
            </Link>
          </div>
        </div>
      )}
      {showList ? (
        <button
          className={styles.addAddressBtn}
          type="button"
          onClick={addNewAddressbtn}
        >
          {translate?.dash?.NEW}
        </button>
      ) : null}
      <div
        className={
          currentLocationPath?.pathname?.includes("manage-addresses")
            ? ""
            : styles.container
        }
      >
        <div className={styles.columnLeft}>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "10px",
            }}
          >
            {showList ? (
              <>
                <AddressCard
                  className={styles.defualtAddressArea}
                  onEdit={handleOnEdit}
                  onDelete={handleOnDelete}
                  addressItem={
                    dataList && dataList.length > 0
                      ? dataList?.find(
                          (e) => e.id === defaultAddressIds?.Shippingid
                        )
                      : {}
                  }
                  setDefaultAddress={setDefaultAddress}
                  isDefault={
                    dataList && dataList.length > 0
                      ? dataList?.find(
                          (e) => e.id === defaultAddressIds?.Shippingid
                        )?.Shippingid?.length > 0
                      : {}
                  }
                  isBillingDefault={false}
                  isManageScreen={isManageScreen}
                />

                <AddressCard
                  className={styles.defualtAddressArea}
                  onEdit={handleOnEdit}
                  onDelete={handleOnDelete}
                  addressItem={
                    dataList && dataList.length > 0
                      ? dataList?.find(
                          (e) => e.id === defaultAddressIds?.Billingid
                        )
                      : {}
                  }
                  setDefaultAddress={setDefaultAddress}
                  isDefault={false}
                  isBillingDefault={
                    dataList && dataList.length > 0
                      ? dataList?.find(
                          (e) => e.id === defaultAddressIds?.Billingid
                        )?.Billingid?.length > 0
                      : {}
                  }
                  isManageScreen={isManageScreen}
                />
              </>
            ) : null}
            {showList
              ? dataList
                  .filter((e) => e.Billingid === "" && e.Shippingid === "")
                  .map((addr) => (
                    <AddressCard
                      onEdit={handleOnEdit}
                      onDelete={handleOnDelete}
                      addressItem={addr}
                      setDefaultAddress={setDefaultAddress}
                      isDefault={false}
                      isBillingDefault={false}
                      isManageScreen={isManageScreen}
                      loading={loading}
                    />
                  ))
              : null}
          </section>
          {!showList || recordToEdit ? (
            <>
              {" "}
              <div className={styles.addAddress}>
                <p className={styles.title}>
                  {recordToEdit ? "Edit your address" : "Add a new address"}
                </p>
              </div>
              <DeliveryAddressForm
                customerData={recordToEdit}
                onAfterSaveEdit={() => {
                  setShowList(true);
                  setrecordToEdit(null);
                  recordUpdated();
                }}
              />
            </>
          ) : null}
          {!isManageScreen && (
            <>
              <div className={styles.shippingMethod}>
                <h3 className="font-weight-normal">
                  {translate?.deliveryAddress?.SHIP}
                </h3>
                <p className={styles.greyText}>
                  {translate?.deliveryAddress?.PLEASE}
                </p>
              </div>

              <div className={styles.subBtns}>
                <Link to="/shopping-cart">
                  <button className={styles.returnBtn} type="button">
                    <span className="material-icons-outlined">
                      arrow_back_ios
                    </span>
                    <span> {translate?.deliveryAddress?.RETURN}</span>
                  </button>
                </Link>
                <Link to="/">
                  <button className={styles.continueBtn} type="button">
                    {translate?.deliveryAddress?.CONT}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        {!isManageScreen && (
          <>
            <div style={{ marginRight: language === "Arabic" ? "10px" : null }}>
              <div className={styles.columnRight}>
                <OrderReview
                  cartPayment={cartPaymentInfo}
                  deliverySpeed={customerDeliverySpeed}
                  callBackAfterApplyCoupan={callBackAfterApplyCoupan}
                  addressItem={
                    dataList && dataList.length > 0
                      ? dataList?.find(
                          (e) => e.id === defaultAddressIds?.Shippingid
                        )
                      : {}
                  }
                  translate={translate}
                />
              </div>
              <div className="my-20px">
                <img
                  src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/7ff29082-fdcb-41b5-97d7-e87fe5d767e7.png"
                  width="100%"
                  alt=""
                />
              </div>
              <LetUsHear translate={translate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeliveryAddress;
