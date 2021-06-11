import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../../common/Cards/ProductCard';
import SectionHeader from '../../../common/SectionHeader/SectionHeader';
import ArrowButton from '../../../common/Buttons/Arrow';
import Slider from 'react-slick';
import './styles.scss';

const ProductList = ({ products }) => {
  const refContainer = useRef();

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
