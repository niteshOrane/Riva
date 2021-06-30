import { Link } from 'react-router-dom';
import React from "react";
import style from "./style.module.scss";

const OneImageBanner = ({ title, img, link }) => {
  return (
    <Link to={`/${link ?? ''}`}>
      <div
        className={`my-20px container-90 max-width-1600 mx-auto ${style.container}`}
      >
        {title && <h2 className={style.title}>{title}</h2>}
        <img src={img} alt="" width="100%" />
      </div>
    </Link>
  );
};

export default OneImageBanner;
