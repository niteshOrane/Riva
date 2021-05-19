import React from "react";
import style from "./navbar.module.scss";
const Circle = ({ bg, children }) => {
  return <div className={`circleBg-${bg} ${style.circle}`}>{children}</div>;
};

export default Circle;
