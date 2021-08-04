import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ButtonWithArrows from "../../../common/Buttons/ButtonWithArrows/ButtonWithArrows";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import "./heroGridTwo.css";

const HeroGrid = ({ src1, src2, src3 }) => {
  return (
    <div className="landing-two-wrapper">
      <CategoriesCircles />
      <section>
        <section
       className = "banner-grid-wrapper"
        >
          <div className="base-image-wrapper">
            <img src={src1} alt="" />
            <div className="banner-wrapper-text">
              <h3>WOMEN</h3>
              <ButtonWithArrows  btnClass="bg-black color-white mx-auto" text="Shop Now" />
            </div>
          </div>
          <section>
            <div className="base-image-two">
              <img src={src2} alt="" />
              <div className="banner-wrapper-text">
                <h3>TEENS</h3>
                <ButtonWithArrows  btnClass="bg-black color-white mx-auto" text="Shop Now" />
              </div>
            </div>
            <div className="base-image-two">
              <img className = "kids-banner-img" src={src3} alt="" />
              <div className="banner-wrapper-text">
                <h3>KIDS</h3>
                <ButtonWithArrows  btnClass="bg-black color-white mx-auto" text="Shop Now" />
              </div>
            </div>
          </section>
        </section>
        <div className="red-banner-wrapper">
          <section>
            <img src="/assets/images/redBanner.jpg" alt="" />
          </section>
        </div>
      </section>
    </div>
  );
};
export default HeroGrid;
