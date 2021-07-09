import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import TrackYourOrderCard from "../../components/pages/Dashboard/MyOrders/TrackYourOrderCard/TrackYourOrderCard";
function TrackYourOrder() {
  const [value, setValue] = React.useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Track Your Order</h2>
            <TrackYourOrderCard
              value={value}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackYourOrder;
