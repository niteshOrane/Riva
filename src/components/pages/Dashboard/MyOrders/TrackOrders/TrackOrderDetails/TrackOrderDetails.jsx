import React from "react";
import Table from "../components/Table/Table";
import Stepper from "../components/Stepper/Stepper";
function TrackOrderDetails({ order }) {
  return (
    <div className="w-100 mt-5">
      <Table order={order} />
      <div className="mt-50px">
        <Stepper />
      </div>
    </div>
  );
}

export default TrackOrderDetails;
