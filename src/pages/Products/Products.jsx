import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useProducts from './useProducts';
import Filters from '../../components/pages/products/Filters';
import ProductCard from '../../components/common/Cards/ProductCard';
import * as icons from '../../components/common/Icons/Icons';
import Slider from '../../components/common/Sliders/Slider';
import { body } from '../../mockdata.json';
import Image from '../../components/common/LazyImage/Image';
import QuickView from '../../components/pages/products/QuickView/QuickView';
import styles from './products.module.scss';

function Products(props) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { products, loading, filters } = useProducts({
    categoryId: props.match.params.categoryId,
  });
  const refContainer = useRef();
  const handleQuickView = () => setQuickViewOpen(true);
  return (
    <div>
      <QuickView
        open={quickViewOpen}
        handleClose={() => setQuickViewOpen(false)}
      />
      <div className="container-90 max-width-1600 mx-88px mr-75px">
        <div className={styles.essentials}>Essentials</div>
        <div className={styles.header}>
          <div className="d-flex align-items-center">
            <span className="color-grey">
              {products.length ? (
                <>
                  Showing {products.length - 4}-{products.length} out of 344
                </>
              ) : (
                ''
              )}
            </span>
            <div className={styles.sortByText}>
              <span>SORT BY:</span>
              <span>
                <icons.AngleDown />
              </span>
            </div>
          </div>

          <Filters />
        </div>
      </div>
      {loading && <h3 style={{ textAlign: 'center' }}>loading...</h3>}
      {!loading && !products.length && (
        <h3 style={{ textAlign: 'center' }}>No Product found!</h3>
      )}
      <div className={`${styles.productsPage}`}>
        {products?.map((product, i) => (
          <div className={i === 0 || i === 5 ? styles.fullWidthCard : ''}>
            <ProductCard handleQuickView={handleQuickView} product={product} />
          </div>
        ))}
      </div>
      <div>
        <h4 className={styles.sliderTitle}>Recommendation For You</h4>
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <Slider
          className="basicSlider"
          items={products}
          slidesToShow={4}
          arrows={true}
          ref={refContainer}
          render={(item) => <ProductCard product={item} />}
        />
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <div className="my-50px d-flex align-items-center justify-content-between">
          <div className={styles.bannerImg}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/9231a77e-7404-4860-83b9-c4c1e9552e8d.png"
              alt=""
            />
          </div>
          <div className={styles.bannerImg}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/9231a77e-7404-4860-83b9-c4c1e9552e8d.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
