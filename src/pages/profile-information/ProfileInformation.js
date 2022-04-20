import React, { useEffect, useState } from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ProfileInfoForm from "./ProfileInfoForm";
import useArabic from "../../components/common/arabicDict/useArabic";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";
import { getProfileUpdate } from "../../services/dashboard/dashboard.service";
import { getCustId } from "../../util";

function ProfileInformation() {
  const { translate } = useArabic();
  useDocumentTitle("User Profile");
  const [customer, setCustomer] = useState(null);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("customerid", getCustId());
    const res = await getProfileUpdate(formData);
    if (res?.status === 200) {
      setCustomer(res?.data?.data);
    }
  };
  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal"> {translate?.dash?.PROFILE}</h2>
            <ProfileInfoForm customer={customer && customer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
