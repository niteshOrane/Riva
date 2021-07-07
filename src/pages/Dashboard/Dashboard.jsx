import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DashboardData from "../../components/pages/Dashboard/DashboardData/DashboardData";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className={styles.circlesContainer}>
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <DashboardData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
