import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import MyReviews from "../../components/pages/MyReviews/MyReviews";

function Reviews() {
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <MyReviews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
