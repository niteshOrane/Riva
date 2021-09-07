import React, { useRef, useState, useEffect } from 'react';
import TopBrandCard from './TopBrandCard';
import Slider from '../../../common/Sliders/Slider';
import ArrowButton from '../../../common/Buttons/Arrow';
import { getProducts } from '../../../../services/layout/Layout.service';
import style from './TopBrandCard.module.scss';

const TopBrandsSlider = () => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts('2047', 10);
    setProducts(res.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <div>
        {products.length < 3 ? (
          <div className="d-flex">
            {products?.map((item) => (
              <TopBrandCard item={item} />
            ))}
          </div>
        ) : (
          <Slider
            items={products}
            ref={refContainer}
            slidesToShow={2}
            rows={2}
            render={(item) => <TopBrandCard item={item} />}
          />
        )}
      </div>
    </div>
  );
};

export default TopBrandsSlider;
