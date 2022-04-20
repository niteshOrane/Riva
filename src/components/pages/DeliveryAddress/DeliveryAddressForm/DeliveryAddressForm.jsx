import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeliveryAddressForm.module.scss";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Geocode from "react-geocode";

import { getCustId } from "../../../../util";

import { showSnackbar } from "../../../../store/actions/common";
import {
  addCustomerAddress,
  updateCustomerAddress,
  getCountryList,
  getAddressByLocation,
  getStateList,
} from "../../../../services/address/address.service";
import {
  toggleAddresslist,
  addNewAddress,
} from "../../../../store/actions/customerAddress";
import * as icons from "../../../../components/common/Icons/Icons";
import LoaderButton from "../../../common/Buttons/LoaderButton";

function DeliveryAddressForm({ customerData, onAfterSaveEdit }) {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.common.currentLocation);
  const { store_name, country_id, currency } = useSelector(
    (state) => state?.common?.store
  );
  const [phoneValue, setPhoneValue] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    city: "",
    state: "",
    mobile: "",
    street: "",
    street1: "",
    block: "",
    houseName: "",
    defaultAddress: true,
    billingAddress: true,
    judda: "",
    floorNumber: "",
    buildingName: "",
    id: 0,
    country: "",
    Billingid: 0,
  });
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  // get address by location
  const [currentPosition, setCurrentPosition] = useState({
    lat: "",
    lng: "",
  });
  const [userAddress, setUserAddress] = useState(null);
  const getLatLng = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        ...currentPosition,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };
  const getAddress = async (lat, lng) => {
    Geocode.setApiKey("AIzaSyB2yAnOZsOcUDHCiBN10ZwoWgWaVzJBjnk");
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country, zipCode, subLocal, subLocal2, subLocal3;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].short_name;
                break;
              case "postal_code":
                zipCode = response.results[0].address_components[i].long_name;
                break;
              case "sublocality":
                subLocal = response.results[0].address_components[i].long_name;
                break;
              case "sublocality_level_2":
                subLocal2 = response.results[0].address_components[i].long_name;
                break;
              case "sublocality_level_3":
                subLocal3 = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        setFormData({
          ...formData,
          city,
          pincode: zipCode,
          country,
          state,
          street: subLocal || subLocal2 || subLocal3,
          street1: subLocal || subLocal2 || subLocal3,
          block: subLocal || subLocal2 || subLocal3,
          floorNumber: subLocal || subLocal2 || subLocal3,
          buildingName: subLocal2 || subLocal || subLocal3,
          judda: subLocal3 || subLocal || subLocal2,
          houseName: subLocal3 || subLocal || subLocal2,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  useEffect(() => {
    const { lat, lng } = currentPosition;
    if (currentPosition.lat && currentPosition.lng) {
      getAddress(lat, lng);
    }
  }, [currentPosition]);
  const getAllCountryList = async () => {
    const res = await getCountryList();
    if (res.status === 200) {
      if (res?.data) {
        if (currency === "USD") {
          setCountryList(res?.data?.data);
        } else {
          const specificCountry = res?.data?.data?.find(
            (li) => li?.id === country_id
          );
          setCountryList(res?.data?.data);
          setFormData({
            ...formData,
            country: specificCountry?.id,
          });
          const input = document.getElementById("countryInput");
          input.setAttribute("disabled","disabled");
        }
      }
    } else {
      dispatch(showSnackbar("FailedTo Load Country List", "error"));
    }
  };
  useEffect(() => {
    getAllCountryList();
  }, []);
  useEffect(() => {
    if (userAddress) {
      setFormData({
        ...formData,
        country: userAddress?.country_code?.slice(0, -1),
        state: userAddress?.region,
        street: userAddress?.label,
        city: userAddress?.locality,
        block: userAddress?.name,
        pincode: userAddress?.postal_code || "",
      });
    }
  }, [userAddress]);
  const getCountryState = async (cnt) => {
    const res = await getStateList(cnt);
    if (res.status === 200) {
      setStateList(res?.data?.available_regions);
    }
  };
  useEffect(() => {
    if (countryList.length > 0) {
      getCountryState(formData.country);
    }
  }, [formData.country]);
  const clearAll = () => {
    setFormData({
      firstName: "",
      lastName: "",
      pincode: "",
      city: "",
      state: "",
      mobile: "",
      street: "",
      street1: "",
      block: "",
      houseName: "",
      defaultAddress: true,
      billingAddress: true,
      country: "",
      judda: "",
      floorNumber: "",
      buildingName: "",
    });
    setPhoneValue(null);
    if (onAfterSaveEdit) {
      onAfterSaveEdit();
    }
  };
  const addAddress = (item, id) => async () => {
    setLoading(true);
    const res = await (id
      ? updateCustomerAddress(item)
      : addCustomerAddress(item));
    if (res.data.success) {
      dispatch(addNewAddress(res, item));
      clearAll();
      setLoading(false);
      if (onAfterSaveEdit) {
        onAfterSaveEdit();
      }
    } else {
      dispatch(
        showSnackbar(
          res.data.message || "failed to add item to Address",
          "error"
        )
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    formData.firstName = customerData?.firstname
      ? customerData?.firstname
      : customerData?.name?.split(" ")?.[0];
    formData.lastName = customerData?.lastname
      ? customerData?.lastname
      : customerData?.name?.split(" ")?.[1];

    formData.pincode = customerData?.postcode;
    formData.id = customerData?.id;
    formData.block = customerData?.block;
    formData.houseName = customerData?.house_name_number;
    formData.street = customerData?.street?.split(" ")?.[1];
    formData.country = customerData?.country;
    formData.defaultAddress = customerData?.Shippingid !== "";
    formData.billingAddress = customerData?.Billingid !== "";
    formData.judda = customerData?.judda;
    formData.buildingName = customerData?.building_name_number;
    formData.firstName = customerData?.firstname;
    formData.floorNumber = customerData?.floor_number;
    if (formData.country) {
      getCountryState(formData.country);
    }
    setPhoneValue(customerData?.phone);
    setFormData({ ...formData, ...customerData });
  }, [customerData]);
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const {
    firstName = "",
    lastName = "",
    pincode = "",
    city = "",
    state = "",
    mobile = "",
    street = "",
    houseName = "",
    block = "",
    defaultAddress,
    billingAddress,
    id,
    country,
    judda,
    buildingName,
    floorNumber,
  } = formData;

  const addAddressHandler = () => {
    const form = new FormData();

    if (!firstName) {
      return dispatch(showSnackbar("First Name is Required", "error"));
    }
    if (!lastName) {
      return dispatch(showSnackbar("Last Name is Required", "error"));
    }
    if (!city) {
      return dispatch(showSnackbar("City is Required", "error"));
    }
    if (!country) {
      return dispatch(showSnackbar("Country is Required", "error"));
    }
    if (!state) {
      return dispatch(showSnackbar("State is Required", "error"));
    }
    if (!pincode) {
      return dispatch(showSnackbar("pin code is Required", "error"));
    }

    if (!block) {
      return dispatch(showSnackbar("block is Required", "error"));
    }

    if (!houseName) {
      return dispatch(showSnackbar("houseName is Required", "error"));
    }
    if (!street) {
      return dispatch(showSnackbar("Street is Required", "error"));
    }
    if (!phoneValue) {
      return dispatch(showSnackbar("mobile is Required", "error"));
    }
    if (!floorNumber) {
      return dispatch(showSnackbar("Floor Number is required", "error"));
    }
    if (!buildingName) {
      return dispatch(showSnackbar("building name is required", "error"));
    }
    // if (mobile.length !== 10) {
    //   return dispatch(
    //     showSnackbar("Mobile number must be 10 numbers long", "error")
    //   );
    // }

    form.append("customerid", getCustId());
    if (id) {
      form.append("addressid", id);
    }

    form.append("customerAddress[firstname]", firstName);
    form.append("customerAddress[lastname]", lastName);
    form.append("customerAddress[pincode]", pincode);
    form.append("customerAddress[city]", city);
    form.append("customerAddress[state]", state);
    form.append("customerAddress[mobile_number]", phoneValue);
    form.append("customerAddress[telephone]", phoneValue);
    form.append("customerAddress[street]", `${block} ${houseName}`);
    form.append("customerAddress[street1]", street);
    form.append("customerAddress[country]", country);
    form.append("customerAddress[block]", block);
    form.append("customerAddress[house_name_number]", houseName);
    form.append("customerAddress[judda]", judda);
    form.append("customerAddress[floor_number]", floorNumber);
    form.append("customerAddress[building_name_number]", buildingName);
    form.append("setDefaultAddress", defaultAddress ? 1 : 0);
    form.append("setBillingAddress", billingAddress ? 1 : 0);
    dispatch(addAddress(form, id));
    dispatch(toggleAddresslist(null));
  };
  return (
    <>
      <div>
        <div
          style={{ marginBottom: "10px" }}
          onClick={getLatLng}
          className="font-weight-normal d-flex c-pointer"
        >
          <div className="location-icon">
            <icons.LocationFlag />
          </div>
          <div
            style={{ marginLeft: "2rem", marginRight: "5px" }}
            className="location-map"
          >
            USE MY CURRENT LOCATION
          </div>
        </div>
      </div>
      <form className={styles.form} id="addNewAddress">
        <div className={styles.inpContainerAdd}>
          Add an address for delivery in your address book and make checkout
          faster
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              First Name<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              maxLength={15}
              className={styles.input}
              value={firstName}
              name="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              Last Name<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              maxLength={15}
              value={lastName}
              className={styles.input}
              name="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Country<span className={styles.star}>*</span>
            </p>
            <select
              name="country"
              onChange={handleChange}
              className={`${styles.input} c-pointer`}
              value={country}
              id="countryInput"
            >
              <option>Select Country</option>
              {countryList?.map((li) => (
                <option value={li?.id} key={li.id}>
                  {li?.full_name_english}
                </option>
              ))}
            </select>
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              State/Province<span className={styles.star}>*</span>
            </p>
            <select
              className={`${styles.input} c-pointer`}
              name="state"
              onChange={handleChange}
              value={state}
            >
              <option>Select state</option>
              {stateList?.map((li) => (
                <option value={li?.name} key={li.id}>
                  {li?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Zip/Postal Code<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              className={styles.input}
              name="pincode"
              value={pincode}
              id="pincode"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              City<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              className={styles.input}
              name="city"
              value={city}
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              Block<span className={styles.star}>*</span>
            </p>
            <input
              type="block"
              className={styles.input}
              value={block}
              name="block"
              id="block"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Judda
            </p>
            <input
              type="text"
              className={styles.input}
              name="judda"
              value={judda}
              id="judda"
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              Floor Number<span className={styles.star}>*</span>
            </p>
            <input
              type="block"
              className={styles.input}
              value={floorNumber}
              name="floorNumber"
              id="floorNumber"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Building Name/Number<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              className={styles.input}
              name="buildingName"
              value={buildingName}
              id="buildingName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Street<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              value={street}
              maxLength={15}
              className={styles.input}
              name="street"
              id="street"
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className={styles.inpLable}>
              House Name/Number<span className={styles.star}>*</span>
            </p>
            <input
              type="text"
              maxLength={15}
              className={styles.input}
              name="houseName"
              value={houseName}
              id="houseName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inpContainer}>
          <div className="w-100">
            <p className={styles.inpLable}>
              Mobile Number<span className={styles.star}>*</span>
            </p>
            <div
              className={`d-flex align-items-center w-100 position-relative ${styles.isdDel}`}
            >
              <PhoneInput
                placeholder="Enter Mobile Number"
                value={phoneValue}
                defaultCountry={currentLocation.country_code.toUpperCase()}
                onChange={setPhoneValue}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={defaultAddress}
            name="defaultAddress"
            id="defaultAddress"
            onChange={handleChange}
          />
          <label
            htmlFor="default"
            aria-controls="defaultAddress"
            className={styles.useDefaultText}
          >
            Use as my default address.
          </label>{" "}
          <input
            type="checkbox"
            checked={billingAddress}
            name="billingAddress"
            id="billingAddress"
            onChange={handleChange}
          />
          <label
            htmlFor="default"
            aria-controls="billingAddress"
            className={styles.useDefaultText}
          >
            Use as Billing address.
          </label>
        </div>
      </form>
      <div className="text-right c-pointer">
        <LoaderButton
          onClick={addAddressHandler}
          loading={loading}
          value={id ? "UPDATE ADDRESS" : "ADD ADDRESS"}
          className={styles.addAddressBtn}
        >
          {id ? "UPDATE" : "ADD"} ADDRESS
        </LoaderButton>
        <button
          className={styles.clrAddressBtn}
          type="button"
          onClick={clearAll}
        >
          CANCEL
        </button>
      </div>
    </>
  );
}

export default DeliveryAddressForm;
