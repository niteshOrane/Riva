import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ButtonWithArrows from "../../../common/Buttons/ButtonWithArrows/ButtonWithArrows";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import { selectedCategory } from "../../../../store/actions/common";

import "./heroGridTwo.css";


const HomeHeroGrid = (props) => {
  const { items, srcPath = '/assets/images/banner', isHomePage } = props;
  const links = useSelector((state) => state.common.category)[0];
  const [defaultCategory, setCategory] = useState([]);
  useEffect(() => {
    console.log('links?.children_data.filter(item => item.is_active == 1)', links?.children_data.filter(item => item.is_active == 1))
    setCategory(links?.children_data.filter(item => item.is_active == 1));
  }, [])
  const dispatch = useDispatch();
  const history = useHistory();

  const onCategorySelect = (id) => {
    const selectItem = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (selectItem.length) {
      dispatch(selectedCategory(selectItem[0]?.children_data, id));
      history.push(`/type/${id}`);
    }
  };
  return (
    <div className="landing-two-wrapper">
      <CategoriesCircles isHomePage={isHomePage} />
      <div>
        <section className="banner-grid-wrapper"
        >
          <div className="base-image-wrapper c-pointer" onClick={() => { onCategorySelect(defaultCategory.find(e => e?.name?.toLowerCase() === "woman").id) }}>
            <img src={`${srcPath}1.jpg`} alt="" />
            <div className="banner-wrapper-text">
              <h3>WOMEN</h3>
              <ButtonWithArrows btnClass="bg-black color-white mx-auto" text="Shop Now" />
            </div>
          </div>
          <section>

            <div className="base-image-two c-pointer " onClick={() => { onCategorySelect(defaultCategory.find(e => e?.name?.toLowerCase() === "teens").id) }}>
              <img src={`${srcPath}2.jpg`} alt="" />
              <div className="banner-wrapper-text">
                <h3>TEENS</h3>
                <ButtonWithArrows btnClass="bg-black color-white mx-auto" text="Shop Now" />
              </div>
            </div>
            <div className="base-image-two c-pointer " onClick={() => { onCategorySelect(defaultCategory.find(e => e?.name?.toLowerCase() === "kids").id) }}>
              <img className="kids-banner-img" src={`${srcPath}3.jpg`} alt="" />
              <div className="banner-wrapper-text">
                <h3>KIDS</h3>
                <ButtonWithArrows btnClass="bg-black color-white mx-auto" text="Shop Now" />
              </div>
            </div>
          </section>
        </section>
        <div className="red-banner-wrapper c-pointer" onClick={() => { onCategorySelect(defaultCategory.find(e => e?.name?.toLowerCase() === "woman").id) }}>
          <section>
            <img src="/assets/images/redBanner.jpg" alt="" />
          </section>
        </div>
      </div>
    </div>
  );
};
export default HomeHeroGrid;
