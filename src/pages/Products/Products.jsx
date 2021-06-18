import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useProducts from "./useProducts";
import Filters from "../../components/pages/products/Filters";
import ProductCard from "../../components/common/Cards/ProductCard";
import Slider from "../../components/common/Sliders/Slider";
import { body } from "../../mockdata.json";
import Image from "../../components/common/LazyImage/Image";

import styles from "./products.module.scss";

const baseUrl = `https://www.rivafashion.com/media/catalog/product/`;

function Products(props) {
  const { products, loading, filters } = useProducts({
    categoryId: props.match.params.categoryId,
  });
  const refContainer = useRef();
  
  return (
    <div>
      <div className="container-90 max-width-1600 mx-auto">
        <div className={styles.header}>
          <span className="color-grey">
            {products.length ? <>Showing {products.length} Results</> : ""}
          </span>
          <Filters />
        </div>
      </div>
      {loading && <h3 style={{ textAlign: "center" }}>loading...</h3>}
      {!loading && !products.length && (
        <h3 style={{ textAlign: "center" }}>No Product found!</h3>
      )}
      <div className={`${styles.productsPage}`}>
        {products?.map((product) => (
          <Link
            className={`d-inline-block ${styles.productCard} ${
              product.isSingle ? styles.singleCard : ""
            }`}
            to="/product/1"
          >
            <div>
              <div>
                <Image
                  src={`${baseUrl}${product?.src}`}
                  width="100%"
                  alt={product?.name}
                />
              </div>
              <div className={styles.cardFooter}>
                <p className={styles.title}>{product?.name}</p>
                <div className={styles.prices}>
                  <s className="color-grey font-size-normal">
                    {product?.wasPrice}
                  </s>
                  <strong>{product?.nowPrice}</strong>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <h4 className={styles.sliderTitle}>Recommendation For You</h4>
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <Slider
          className="basicSlider"
          items={body.productList}
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
