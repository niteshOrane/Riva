import React from "react";
import { useSelector } from 'react-redux';
import style from "./TopBrandCard.module.scss";
import RecentlyViewedSlider from "./RecentlyViewedSlider";
import TopBrandsSlider from "./TopBrandsSlider";

function TopBrand() {
  
  const { currency_symbol } = useSelector(state => state?.common?.store);
  return (
    <div className="container-90 max-width-1600 mx-auto">
      <div className="d-flex gap-12px">
        <div className={style.col}>
          <RecentlyViewedSlider currency_symbol={currency_symbol}/>
        </div>
        <div className={style.col}>
          <TopBrandsSlider currency_symbol={currency_symbol}/>
        </div>
      </div>
    </div>
  );
}
export default TopBrand;
