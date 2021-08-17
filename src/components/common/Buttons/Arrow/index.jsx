import React from "react";

const ArrowButton = ({ direction, onClick }) => {
  return (
    <span
      style={{
        width: "30px",
        height: "30px",
        opacity: "0.7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="material-icons-two-tone"
    >
      {direction == "forward" ? "arrow_forward_ios" : "arrow_back_ios"}
    </span>
  );
};

export default ArrowButton;
