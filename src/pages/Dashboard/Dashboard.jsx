import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DashboardData from "../../components/pages/Dashboard/DashboardData/DashboardData";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";

function Dashboard() {
  const location = useLocation();
  useAnalytics()

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
