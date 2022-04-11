import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ReturnForm from "../../components/pages/returned/ReturnForm";

function Returned() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <ReturnForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returned;
