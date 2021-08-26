import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useProducts from "./useProducts";
import useOnScreen from "./useOnScreen";
import Filters from "../../components/pages/products/Filters";
import ProductCard from "../../components/common/Cards/ProductCard";
import * as icons from "../../components/common/Icons/Icons";
import Slider from "../../components/common/Sliders/Slider";
import { body } from "../../mockdata.json";
import Image from "../../components/common/LazyImage/Image";
import styles from "./products.module.scss";
import { useEffect } from "react";
import SliderCarousel from "react-slick";

function Products(props) {
  const handleQuickView = () => {};
  const refContainer = useRef();
  const refContainerLoad = useRef();
  const onScreen = useOnScreen(refContainerLoad);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState("position");
  const [sortDirection, setSortDirection] = useState("desc");
  const [pageColumns, setPageColumns] = useState(2);
  const { products, loading, totalCount } = useProducts({
    categoryId: props.match.params.categoryId,
    currentPage,
    pageSize,
    sortDirection,
    sortField,
    onScreen,
  });
  const handleSortChange = (event) => {
    setSortField(event.target.value.split("-")?.[0]);
    setSortDirection(event.target.value.split("-")?.[1]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (onScreen && !loading && totalCount > products.length) {
      setCurrentPage(currentPage + 1);
    }
  }, [onScreen]);

  const handleThreeColumns = () => setPageColumns(3);
  const handleTwoColumns = () => setPageColumns(2);

  const getClassOfBigCard = (index) => {
    if (index === 0 || index === 5) {
      if (pageColumns === 3) {
        return styles.fullWidthCardInThreeCol;
      } else {
        return styles.fullWidthCardInTwoCol;
      }
    }
  };
  return (
    <div>
      <div className="container-90 max-width-1600">
        <div className={styles.essentials}>Essentials</div>
        <div className={styles.header}>
          <div className="d-flex align-items-center">
            <span className="color-grey">
              {products.length ? (
                <>
                  Showing {1}-{products.length} out of {totalCount}
                </>
              ) : (
                ""
              )}
            </span>
            <div className={styles.sortByText}>
              <span>SORT BY:</span>
              <span>
                <select onChange={handleSortChange}>
                  <option
                    style={{ background: "#fff" }}
                    value="position-desc"
                    id="desc"
                  >
                    Relevance
                  </option>
                  <option
                    style={{ background: "#fff" }}
                    value="price-asc"
                    id="asc"
                  >
                    Lowest price
                  </option>
                  <option
                    style={{ background: "#fff" }}
                    value="price-desc"
                    id="desc"
                  >
                    Highest price
                  </option>
                  <option
                    style={{ background: "#fff" }}
                    value="created_at-desc"
                    id="desc"
                  >
                    Most Popular
                  </option>
                </select>
              </span>
            </div>
          </div>

          <Filters
            handleThreeColumns={handleThreeColumns}
            handleTwoColumns={handleTwoColumns}
            pageColumns={pageColumns}
            categoryId={props.match.params.categoryId}
          />
        </div>
      </div>
      {loading && <h3 style={{ textAlign: "center" }}>loading...</h3>}
      {!loading && !products.length && (
        <h3 style={{ textAlign: "center" }}>No Product found!</h3>
      )}
      <div
        className={`${styles.productsPage} ${
          pageColumns === 3
            ? styles.threeColumnsLayOut
            : styles.twoColumnsLayOut
        } container-90 max-width-1600 mx-auto`}
      >
        {products?.map((product, i) => (
          <div className={getClassOfBigCard(i)}>
            <ProductCard
              index={i}
              pageColumns={pageColumns}
              handleQuickView={handleQuickView}
              product={product}
              isProduct={Boolean(true)}
              isListing
            />
          </div>
        ))}
      </div>
      <div
        className={`${styles.productsPage} ${
          pageColumns === 3
            ? styles.threeColumnsLayOut
            : styles.twoColumnsLayOut
        } container-90 max-width-1600 mx-auto`}
      >
        {/* {products?.map((product, i) => (
          <div className={getClassOfBigCard(i)}>
            <ProductCard
              index={i}
              pageColumns={pageColumns}
              handleQuickView={handleQuickView}
              product={product}
              isProduct={Boolean(true)}
            />
          </div>
        ))} */}
        {/* {products?.map((product, i) => (
          <div className={getClassOfBigCard(i)}>
            <ProductCard
              index={i}
              pageColumns={pageColumns}
              handleQuickView={handleQuickView}
              product={product}
              isProduct={Boolean(true)}
            />
          </div>
        ))} */}

        <div ref={refContainerLoad} />
      </div>
      <center>
        {" "}
        {loading && <h3 style={{ textAlign: "center" }}>loading...</h3>}
      </center>
      <div>
        <h4 className={styles.sliderTitle}>Recommendation For You</h4>
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <Slider
          className="basicSlider"
          recomended
          items={products}
          slidesToShow={4}
          arrows={Boolean(true)}
          ref={refContainer}
          render={(item, index) => (
            <ProductCard
              isRecommended
              product={item}
              index={index}
              isProduct={Boolean(true)}
            />
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
