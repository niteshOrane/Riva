import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DashboardData from "../../components/pages/Dashboard/DashboardData/DashboardData";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
  }, []);

  return (
    <div
      style={{
        paddingLeft: "3.5rem",
        paddingRight: "3.5rem",
      }}
      className="py-20px px-20px dashboard"
    >
      <div className="d-flex h-100">
        <Sidebar />
        <div className="w-100">
          <DashboardData />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
