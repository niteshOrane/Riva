import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "../../../common/Cards/ProductCard";
import SectionHeader from "../../../common/SectionHeader/SectionHeader";
import ArrowButton from "../../../common/Buttons/Arrow";
import Slider from "react-slick";
import { getProducts } from "../../../../services/layout/Layout.service";
import "./styles.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getProducts("2046", 10);
    if (res?.data) {
      setProducts(res.data || []);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: products.length < 4 ? products.length : 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  return (
    <>
      <div style={{ marginTop: "52px" }} className="section-header-container">
        <SectionHeader roboto="Extraordinary" dancing="Essentials" />
      </div>
      <div className="product-list-container container-with-circles ">
        <div className="arrow-button" onClick={previous}>
          <ArrowButton direction="backward" />
        </div>
        {loading && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Skeleton height="25rem" width="18rem" />
             <span style={{width:"0.5rem"}}></span>
            <Skeleton height="25rem" width="18rem" />
            <span style={{width:"0.5rem"}}></span>
            <Skeleton height="25rem" width="18rem" />
            <span style={{width:"0.5rem"}}></span>
            <Skeleton height="25rem" width="18rem" />
          </div>
        )}
        <div className="product-slider">
          <Slider ref={refContainer} {...settings}>
            {products.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard product={product} landing extraOridnary />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="arrow-button" onClick={next}>
          <ArrowButton direction="forward" />
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object.isRequired,
};

ProductCard.defaultProps = {
  products: [],
};

export default ProductList;
