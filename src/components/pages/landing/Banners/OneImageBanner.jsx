import { Link } from "react-router-dom";
import React from "react";
import style from "./style.module.scss";

const OneImageBanner = ({ title, img, link }) => {
  return (
    <a href={link}>
      <div className={`container-with-circles ${style.container}`}>
        {title && <h2 className={style.title}>{title}</h2>}
        <img src={img} alt="" width="100%" />
      </div>
    </a>
  );
};

export default OneImageBanner;
