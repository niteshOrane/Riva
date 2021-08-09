import React from "react";
import { useSelector } from "react-redux";
import style from "./Landing.module.scss"

import HeroGrid2 from "../../components/pages/landing/Hero-grid/HomeHeroGrid";

function HomeLanding() {
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  return (
    <HeroGrid2 items={selectedCategoryItem?.data} srcPath='/assets/images/banner' isHomePage={Boolean(true)} />
  );
}

export default HomeLanding;
