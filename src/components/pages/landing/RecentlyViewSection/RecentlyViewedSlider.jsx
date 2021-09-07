import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TopBrandCard from './TopBrandCard';
import Slider from '../../../common/Sliders/Slider';
import ArrowButton from '../../../common/Buttons/Arrow';
import style from './TopBrandCard.module.scss';
import { products } from '../../../../db.json';

const RecentlyViewedSlider = () => {
  const refContainer = useRef();
  const { data: items = [] } = useSelector((state) => state.stats);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (items.length) {
      setRecentlyViewed(items);
    }
  }, [items]);

  const previous = () => refContainer.current?.slickPrev();
  const next = () => refContainer.current?.slickNext();

  return (
    <div>
      <div
        id={style.borderBotm}
        className="d-flex align-items-center justify-content-between"
      >
        <h4 className={style.titelMrgn}>Recently Viewed</h4>
        <div className="d-flex align-items-center">
          <div onClick={previous} className={style.arrowBtn}>
            <ArrowButton direction="backward" />
          </div>
          <div onClick={next} className={style.arrowBtn}>
            <ArrowButton direction="forward" />
          </div>
        </div>
      </div>
      <div className="">
        {recentlyViewed.length < 3 ? (
          <div className="d-flex">
            {recentlyViewed?.map((item) => (
              <TopBrandCard item={item} />
            ))}
          </div>
        ) : (
          <Slider
            items={recentlyViewed}
            ref={refContainer}
            rows={2}
            slidesToShow={2}
            render={(item) => <TopBrandCard item={item} />}
          />
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedSlider;
