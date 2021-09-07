import { Link } from "react-router-dom";
import React from "react";
import style from "./style.module.scss";

const OneImageBanner = ({ title, img, link }) => {
  return (
    <Link to={`/${link ?? ""}`}>
      <div className={`container-with-circles ${style.container}`}>
        {title && <h2 className={style.title}>{title}</h2>}
        <img src={img} alt="" width="100%" />
      </div>
    </Link>
  );
};

export default OneImageBanner;
