import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CouponCard from "../../components/pages/Dashboard/MyStuff/CouponCard/CouponCard";

function Coupons() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
      
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Coupons</h2>
            <CouponCard />
            <CouponCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupons;
