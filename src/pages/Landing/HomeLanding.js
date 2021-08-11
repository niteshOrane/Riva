import React from "react";
import { useSelector } from "react-redux";
import style from "./Landing.module.scss"
import useLanding from "./LandingHooks";
import HeroGrid2 from "../../components/pages/landing/Hero-grid/HomeHeroGrid";

function HomeLanding() {
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const { middleBanner } = useLanding('landing');
  return (
    <HeroGrid2 items={middleBanner} srcPath='/assets/images/banner' isHomePage={Boolean(true)} />
  );
}

export default HomeLanding;
