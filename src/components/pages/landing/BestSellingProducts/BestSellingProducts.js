import React, { useRef, useEffect, useState } from 'react';
import ProductCard from '../../../common/Cards/ProductCard';
import SectionHeader from '../../../common/SectionHeader/SectionHeader';
import ArrowButton from '../../../common/Buttons/Arrow';
import Slider from '../../../common/Sliders/Slider';
import { getProducts } from '../../../../services/layout/Layout.service';
import styles from './bestSellingProducts.module.scss';

const category_ids = {
  featured: '2044',
  best_selling: '2045',
  all: '',
};

const BestSellingProducts = () => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  const [dataSet, setdataSet] = useState({ 2044: [], 2045: [], '': [] });
  const [products, setProducts] = useState([]);
  const [categoryId, setcategoryId] = useState(category_ids.featured);

  const changeCategory = (slug) => {
    setcategoryId(slug);
  };

  const fetchProducts = async (id) => {
    if (!id) return [];
    const res = await getProducts(id, 10);
    return res?.data || [];
  };

  useEffect(() => {
    (async () => {
      const featured = await fetchProducts(category_ids.featured);
      const best_selling = await fetchProducts(category_ids.best_selling);
      setdataSet({
        2044: [...featured],
        2045: [...best_selling],
        '': [...featured, ...best_selling],
      });
    })();
  }, []);

  useEffect(() => {
    setProducts(dataSet[categoryId]);
  }, [dataSet, categoryId]);

  return (
    <div
      className={`container-90 max-width-1600 mx-auto ${styles.bestSellingProductsContainer}`}
    >
      <div className="d-flex align-items-center justify-content-between my-20px">
        <SectionHeader roboto="Best Selling" dancing="Products" />
        <div className="d-flex align-items-center">
          <ul className="nav-list d-flex align-items-center">
            <li className="nav-li">
              <span
                className="d-flex align-items-center"
                onClick={() => changeCategory(category_ids.all)}
              >
                <span
                  className={`align-self-end font-light-black ${
                    categoryId === category_ids.all ? 'color-text-primary' : ''
                  }`}
                >
                  All
                </span>
              </span>
            </li>
            <li className="nav-li">
              <span
                className="d-flex align-items-center"
                onClick={() => changeCategory(category_ids.best_selling)}
              >
                <span
                  className={`align-self-end font-light-black ${
                    categoryId === category_ids.best_selling
                      ? 'color-text-primary'
                      : ''
                  }`}
                >
                  Best Selling Products
                </span>
              </span>
            </li>
            <li className="nav-li">
              <span
                className="d-flex align-items-center"
                onClick={() => changeCategory(category_ids.featured)}
              >
                <span
                  className={`align-self-end font-light-black ${
                    categoryId === category_ids.featured
                      ? 'color-text-primary'
                      : ''
                  }`}
                >
                  Featured Products
                </span>
              </span>
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
