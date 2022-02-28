import React from "react";
import "./profileInformation.scss";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ProfileInfoForm from "./ProfileInfoForm";
import useArabic from "../../components/common/arabicDict/useArabic";

function ProfileInformation() {
  const {translate} = useArabic();
  
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
          <h2 className="font-weight-normal">  {translate?.dash?.PROFILE}</h2>
            <ProfileInfoForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
