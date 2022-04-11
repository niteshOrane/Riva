import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./manageAddress.scss";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DeliveryAddress from "../Delivery-address/DeliveryAddress";
import { getAddressByLocation } from "../../services/address/address.service";

function ManageAddress() {
  const currentLocationPath = useLocation();
  const [currentPosition] = useState({
    lat: "",
    lng: "",
  });
  const [, setUserAddress] = useState(null);

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
        <div className="d-flex h-100">
          <Sidebar />
          <div className={currentLocationPath?.pathname?.includes('manage-addresses') ? 'w-100' : `w-50`}>
            <DeliveryAddress isManageScreen currentLocationPath={currentLocationPath} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAddress;
