import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../../common/Cards/ProductCard';
import SectionHeader from '../../../common/SectionHeader/SectionHeader';
import ArrowButton from '../../../common/Buttons/Arrow';
import Slider from 'react-slick';
import { getProducts } from '../../../../services/layout/Layout.service';
import './styles.scss';

const ProductList = () => {
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

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: products.length < 4 ? products.length : 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  return (
    <React.Fragment>
      <div className="section-header-container">
        <SectionHeader roboto="Extraordinary" dancing="Essentials" />
      </div>
      <div className="product-list-container container-90 max-width-1600 mx-auto ">
        <div className="arrow-button" onClick={previous}>
          <ArrowButton direction="backward" />
        </div>
        <div className="product-slider">
          <Slider ref={refContainer} {...settings}>
            {products.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="arrow-button" onClick={next}>
          <ArrowButton direction="forward" />
        </div>
      </div>
    </React.Fragment>
  );
};

ProductCard.propTypes = {
  products: PropTypes.object.isRequired,
};

ProductCard.defaultProps = {
  products: [],
};

export default ProductList;
