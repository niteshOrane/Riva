import TopBrandCard from './TopBrandCard';
import React, { useRef } from 'react';
import { body } from '../../../../mockdata.json';
import Slider from '../../../common/Sliders/Slider';
import ArrowButton from '../../../common/Buttons/Arrow';
import style from './TopBrandCard.module.scss';
const TopBrandsSlider = () => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  return (
    <div>
      <div
        id={style.borderBotm}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className={style.titelMrgn}>Top Brands</h4>
        <div className="d-flex align-items-center">
          <div onClick={previous} className={style.arrowBtn}>
            <ArrowButton direction="backward" />
          </div>
          <div onClick={next} className={style.arrowBtn}>
            <ArrowButton direction="forward" />
          </div>
        </div>
      </div>
      <div className="my-20px">
        <Slider
          items={body.recentlyViewed}
          ref={refContainer}
          slidesToShow={2}
          rows={2}
          render={(item) => <TopBrandCard item={item} />}
        />
      </div>
    </div>
  );
};

export default TopBrandsSlider;
