import React, { useState, useRef, useEffect } from "react";
import queryString from "query-string";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useProducts from "./useProducts";
import useOnScreen from "./useOnScreen";
import Filters from "../../components/pages/products/Filters";
import ProductCard from "../../components/common/Cards/ProductCard";
import Image from "../../components/common/LazyImage/Image";
import Slider from "../../components/common/Sliders/Slider";
import styles from "./products.module.scss";
import useLanding from "../Landing/LandingHooks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TagManager from "react-gtm-module";


import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import { extractColorSize } from "../../util";

function Products(props) {
  const handleQuickView = () => {};
  const history = useHistory();
  const { currency_symbol } = useSelector((state) => state?.common?.store);

  const refContainer = useRef();

  const refContainerLoad = useRef();
  const onScreen = useOnScreen(refContainerLoad);
  const { middleBanner: categorypromotionbanner } = useLanding(
    "categorypromotionbanner"
  );
  const { location, match } = props;
  const parsed = queryString.parse(location?.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState("entity_id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filteredData, setFilteredData] = useState([]);
  const [pageColumns, setPageColumns] = useState(2);
  const { products, loading, totalCount } = useProducts({
    categoryId: match.params.categoryId,
    currentPage,
    pageSize,
    sortDirection,
    sortField,
    onScreen,
    serachTerm: parsed?.serachTerm,
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
  const handleBannerPush = (title, categories) => {
    history.push(`${`/products/${title}/${categories}`}`);
  };
 

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
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("selectedCategory");
    };
  });
  // google tag manager
  // useEffect(() => {
  //   const tagManagerArgs = {
  //     gtmId: process.env.REACT_APP_GTM,
  //   };
  //   TagManager.initialize(tagManagerArgs);
  // }, []);
  return (
    <div>
      <div className="container-90 max-width-1600">
        <div className={styles.essentials}>
          {sessionStorage.getItem("selectedCategory") ??
            (parsed?.serachTerm && parsed?.serachTerm !== "undefined"
              ? `Search Results for ${parsed?.serachTerm}`
              : match.params.category?.[0]?.toUpperCase() +
                match.params.category?.slice(1))}
        </div>
        <div className={styles.header}>
          <div className={styles.catNumber}>
            <div className={styles.circlesContainer}>
              <CategoriesCircles />
            </div>
            <div className={`d-flex align-items-center ${styles.total}`}>
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
                <span className={styles.sortBy}>SORT BY:</span>
                <span>
                  <select
                    className={styles.sortDrop}
                    onChange={handleSortChange}
                  >
                    <option
                      style={{ background: "#fff" }}
                      value="entity_id-desc"
                      id="desc"
                    >
                      Newest
                    </option>
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
          </div>
          <section className={styles.total}>
            <Filters
              handleThreeColumns={handleThreeColumns}
              handleTwoColumns={handleTwoColumns}
              pageColumns={pageColumns}
              categoryId={match.params.categoryId}
              serachTerm={parsed?.serachTerm}
            />
          </section>
        </div>
      </div>
      {loading && (
        <div
          className={`${styles.productsPage} ${
            pageColumns === 3
              ? styles.threeColumnsLayOut
              : styles.twoColumnsLayOut
          }`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((li) => (
            <div
              style={{ marginLeft: "1.7rem", marginRight: "1.5rem" }}
              className={getClassOfBigCard(li)}
            >
              <Skeleton height="30rem" />
            </div>
          ))}
        </div>
      )}
      {!loading && !products.length && (
        <h3 style={{ textAlign: "center" }}>No Product found!</h3>
      )}
      <div
        className={`${styles.productsPage} ${
          pageColumns === 3
            ? styles.threeColumnsLayOut
            : styles.twoColumnsLayOut
        }`}
      >
        {filteredData.length === 0
          ? products?.map((product, i) => {
              const pro = {
                ...product,
                cat: {
                  category: match.params.category,
                  categoryId: match.params.categoryId,
                },
              };
              return (
                <div className={getClassOfBigCard(i)}>
                  <ProductCard
                    index={i}
                    pageColumns={pageColumns}
                    handleQuickView={handleQuickView}
                    product={pro}
                    isProduct={Boolean(true)}
                    isListing
                    currency_symbol={currency_symbol}
                    Imgloading={loading}
                  />
                </div>
              );
            })
          : filteredData?.map((product, i) => (
              <div className={getClassOfBigCard(i)}>
                <ProductCard
                  index={i}
                  pageColumns={pageColumns}
                  handleQuickView={handleQuickView}
                  product={product}
                  isProduct={Boolean(true)}
                  isListing
                  currency_symbol={currency_symbol}
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
      <center> {loading && <h3>loading...</h3>}</center>
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
              currency_symbol={currency_symbol}
              isProduct={Boolean(true)}
            />
          )}
        />
      </div>
      <div className="container-90 container-row max-width-1600 mx-auto">
        <div className="my-50px d-flex align-items-center justify-content-between">
          {categorypromotionbanner.map((item, index) => {
            return (
              <div
                style={{ marginLeft: "8px" }}
                key={`divBanner_${index}`}
                className={styles.bannerImg}
              >
                <a href={item?.url_banner}>
                  <Image
                    alt={item?.title}
                    src={item?.image}
                    defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
                    width="100%"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
