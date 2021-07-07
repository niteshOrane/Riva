import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useProducts from "./useProducts";
import Filters from "../../components/pages/products/Filters";
import ProductCard from "../../components/common/Cards/ProductCard";
import * as icons from "../../components/common/Icons/Icons";
import Slider from "../../components/common/Sliders/Slider";
import { body } from "../../mockdata.json";
import Image from "../../components/common/LazyImage/Image";
import styles from "./products.module.scss";

function Products(props) {
  const { products, loading, filters } = useProducts({
    categoryId: props.match.params.categoryId,
  });
  const handleQuickView = () => { };
  const refContainer = useRef();
  return (
    <div>
      <div className="container-90 max-width-1600">
        <div className={styles.essentials}>Essentials</div>
        <div className={styles.header}>
          <div className="d-flex align-items-center">
            <span className="color-grey">
              {products.length ? (
                <>
                  Showing {products.length - 4}-{products.length} out of 344
                </>
              ) : (
                ""
              )}
            </span>
            <div className={styles.sortByText}>
              <span>SORT BY:</span>
              <span>
                <select>
                  <option style={{ background: '#fff' }} value={'Relevance'}>Relevance</option>
                  <option style={{ background: '#fff' }} value={'Lowest price'}>Lowest price</option>
                  <option style={{ background: '#fff' }} value={'Highest price'}>Highest price</option>
                  <option style={{ background: '#fff' }} value={'Most Popular'}>Most Popular</option>
                </select>
              </span>
            </div>
          </div>

          <Filters />
        </div>
      </div>
      {loading && <h3 style={{ textAlign: "center" }}>loading...</h3>}
      {!loading && !products.length && (
        <h3 style={{ textAlign: "center" }}>No Product found!</h3>
      )}
      <div
        className={`${styles.productsPage} container-90 max-width-1600 mx-auto`}
      >
        {products?.map((product, i) => (
          <div className={i === 0 || i === 5 ? styles.fullWidthCard : ""}>
            <ProductCard
              index={i}
              handleQuickView={handleQuickView}
              product={product}
              isProduct={true}
            />
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
          render={(item, index) => (
            <ProductCard product={item} index={index} isProduct={true} />
          )}
        />
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <div className="my-50px d-flex align-items-center justify-content-between">
          <div className={styles.bannerImg}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/9231a77e-7404-4860-83b9-c4c1e9552e8d.png"
              alt=""
              width="100%"
            />
          </div>
          <div className={styles.bannerImg}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/9231a77e-7404-4860-83b9-c4c1e9552e8d.png"
              alt=""
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
