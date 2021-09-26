import React from "react";
import style from "./navbar.module.scss";
const Circle = ({ bg, children, onClick, id }) => {
  return (
    <div
      className={`c-pointer circleBg-${bg} ${style.circle} d-flex-all-center`}
    >
      {children}
    </div>
  );
};

export default Circle;
