import React from 'react';

import style from './TopBrandCard.module.scss';
import RecentlyViewedSlider from './RecentlyViewedSlider';
import TopBrandsSlider from './TopBrandsSlider';

function TopBrand() {
  return (
    <div className="container-90 max-width-1600 mx-auto">
      <div className="d-flex gap-12">
        <div className={style.col}>
          <RecentlyViewedSlider />
        </div>
        <div className={style.col}>
          <TopBrandsSlider />
        </div>
      </div>
    </div>
  );
}
export default TopBrand;
