import React, { useRef, useEffect, useState } from 'react';
import ProductCard from '../../../common/Cards/ProductCard';
import SectionHeader from '../../../common/SectionHeader/SectionHeader';
import ArrowButton from '../../../common/Buttons/Arrow';
import Slider from '../../../common/Sliders/Slider';
import { getProducts } from '../../../../services/layout/Layout.service';
import styles from './bestSellingProducts.module.scss';

const BestSellingProducts = () => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts('2045', 10);
    setProducts(res.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`container-90 max-width-1600 mx-auto ${styles.bestSellingProductsContainer}`}
    >
      <div className="d-flex align-items-center justify-content-between my-20px">
        <SectionHeader roboto="Best Selling" dancing="Products" />
        <div className="d-flex align-items-center">
          <ul className="nav-list d-flex align-items-center">
            <li className="nav-li">
              <a href="/" className="d-flex align-items-center">
                <span className="align-self-end font-light-black">
                  Wishlist
                </span>
              </a>
            </li>
            <li className="nav-li">
              <a href="/" className="d-flex align-items-center">
                <span className="align-self-end font-light-black color-text-primary">
                  Best Selling Products
                </span>
              </a>
            </li>
            <li className="nav-li">
              <a href="/" className="d-flex align-items-center">
                <span className="align-self-end font-light-black">
                  Featured Products
                </span>
              </a>
            </li>
          </ul>
          <div onClick={previous} className={styles.arrowButton}>
            <ArrowButton direction="backward" />
          </div>
          <div onClick={next} className={styles.arrowButton}>
            <ArrowButton direction="forward" />
          </div>
        </div>
      </div>
      <div>
        <Slider
          className="basicSlider basicSliderGap"
          items={products}
          slidesToShow={6}
          arrows={false}
          ref={refContainer}
          render={(item) => <ProductCard product={item} />}
        />
      </div>
    </div>
  );
};

export default BestSellingProducts;
