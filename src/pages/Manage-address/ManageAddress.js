import React from "react";

import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import "./manageAddress.scss";
import * as icons from "../../components/common/Icons/Icons";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DeliveryAddressForm from "../../components/pages/DeliveryAddress/DeliveryAddressForm/DeliveryAddressForm";

function ManageAddress() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="cat-circle">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Add Address</h2>
            <div className="font-weight-normal d-flex">
              <div className="location-icon"><icons.LocationFlag /></div>
              <div className="location-map">USE MY CURRENT LOCATION</div>
            </div>
            <DeliveryAddressForm />
          </div>
        </div>
      </div>
    </div>
  );    
}
 
export default  ManageAddress;