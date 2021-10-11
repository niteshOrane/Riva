import React, { useEffect, useState } from "react";

import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import "./manageAddress.scss";
import * as icons from "../../components/common/Icons/Icons";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DeliveryAddress from "../Delivery-address/DeliveryAddress";
import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";
import { getAddressByLocation } from "../../services/address/address.service";

function ManageAddress() {
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
    const res = await getAddressByLocation(lat, lng);
    if (res.status === 200) {
      setUserAddress(res?.data?.data[0]);
    }
  };
  useEffect(() => {
    const { lat, lng } = currentPosition;
    if (currentPosition.lat && currentPosition.lng) {
      getAddress(lat, lng);
    }
  }, [currentPosition]);

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="cat-circle">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-50">
            <DeliveryAddress isManageScreen />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAddress;
