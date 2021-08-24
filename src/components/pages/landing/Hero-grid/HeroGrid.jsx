import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../../../common/LazyImage/Image";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import SlideBanner from "../../../pages/landing/Banners/SlideBanner";
import style from "./HeroGrid.module.scss";

const HeroGrid = ({ btfLeft, btfRight }) => {
  return (
    <div className={`${style.grid} container-with-circles`}>
      <div className={style.circlesContainer}>
        <CategoriesCircles />
      </div>
      <div className="d-flex">
        <div className={style.col2}>
          {btfLeft.length > 0 ? <SlideBanner banners={btfLeft} /> : null}
        </div>

        {btfRight.length > 0 ? (
          <div className={`d-grid w-50 ${style.gap25}`}>
            <div className="position-relative">
              <div className="position-relative h-100">
                <a href={`${btfRight?.[0]?.url_banner}`}>
                  <Image
                    src={btfRight?.[0]?.image}
                    classname={style.imgHeight}
                    width="100%"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className={style.col2Grid}>
              <div className={style.col2GridImgs}>
                <a href={`${btfRight?.[1]?.url_banner}`}>
                  <Image src={`${btfRight?.[1]?.image}`} width="100%" alt="" />
                </a>
              </div>
              <div className={style.col2GridImgs}>
                <a href={`${btfRight?.[2]?.url_banner}`}>
                  <Image src={`${btfRight?.[2]?.image}`} width="100%" alt="" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default HeroGrid;
