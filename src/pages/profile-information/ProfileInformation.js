import React from "react";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import "./profileInformation.scss";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ProfileInfoForm from "./ProfileInfoForm";

function ProfileInformation() {
  
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="cat-circle">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
          <h2 className="font-weight-normal">Profile Information</h2>
            <ProfileInfoForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
