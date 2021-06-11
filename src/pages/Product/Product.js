import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { WhatsApp, Instagram, Facebook } from '@material-ui/icons';
import { addToRecentlyViewed } from '../../store/actions/stats';
import Slider from '../../components/common/Sliders/Slider';
import ProductDetails from '../../components/pages/product/ProductDetails/ProductDetails';
import AdditionalProductDetails from '../../components/pages/product/AdditionalProductDetails/AdditionalProductDetails';
import HowToWearThis from '../../components/pages/product/HowToWearThis/HowToWearThis';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import ProductCard from '../../components/common/Cards/ProductCard';
import ShopTheWholeOutfit from '../../components/pages/product/ShopTheWholeOutfit/ShopTheWholeOutfit';
import OneImageBanner from '../../components/pages/landing/Banners/OneImageBanner';
import { body } from '../../mockdata.json';
import './product.scss';

import { products } from '../../db.json';

const Product = (props) => {
  const refContainer = useRef();
  const dispatch = useDispatch();
  const selectedProductId = props.match.params.categoryId;
  const selectedProduct = products.find(product => product.id == selectedProductId) || products[0];

  useEffect(() => {
    dispatch(addToRecentlyViewed(selectedProduct.id));
  }, [])

  const previous = () => refContainer.current.slickPrev();
  const next = () => refContainer.current.slickNext();

  return (
    <div>
      <OneImageBanner img="/assets/images/15PercentSaleBanner.png" />
      <div className="product-page gap-12 d-flex p-12">
        <div className="preview">
          {selectedProduct.images.map((src) => {
            return (
              <div className="img">
                <img src={src} width="100%" alt="" />
              </div>
            );
          })}
          <div className="d-flex-all-center justify-content-between">
            <div onClick={previous} className="btn d-flex-all-center">
              <span class="material-icons-outlined">keyboard_arrow_up</span>
            </div>
            <div onClick={next} className="btn d-flex-all-center">
              <span class="material-icons-outlined">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
        <div className="slider">
          <Slider
            className="basicSlider"
            items={selectedProduct.images}
            slidesToShow={1}
            render={(item) => (
              <div className="slide text-center d-flex-all-center flex-column">
                <img src={item} width="100%" alt="" />
                <div className="action-container-top-right">
                  <div>
                    <span className="material-icons-outlined font-light-black">
                      favorite_border
                    </span>
                  </div>
                </div>
                <div className="action-container-top-left">
                  <div>ON SALE</div>
                </div>
                <div className="action-container-bottom-right">
                  <div>
                    <span class="material-icons-outlined font-light-black">
                      open_with
                    </span>
                  </div>
                </div>
              </div>
            )}
            ref={refContainer}
          />
          <div className="d-flex-all-center gap-12 my-10px">
            <div>Share:</div>
            <div className="share d-flex-all-center">
              <WhatsApp />
            </div>
            <div className="share d-flex-all-center">
              <Instagram />
            </div>
            <div className="share d-flex-all-center">
              <Facebook />
            </div>
          </div>
        </div>
        <div className="details">
          <ProductDetails product={selectedProduct} />
        </div>
      </div>
      <AdditionalProductDetails sections={body.additionalProductDetails} />
      <HowToWearThis cards={body.howToWear} />
      <div>
        <div className="section-header-container">
          <SectionHeader roboto="Complete" dancing="Your Look" />
        </div>
        <Slider
          className="basicSlider basicSliderGap p-12"
          items={body.productList}
          slidesToShow={5}
          render={(item) => <ProductCard product={item} />}
        />
      </div>
      <div>
        <div className="section-header-container">
          <SectionHeader roboto="Similar" dancing="Products" />
        </div>
        <Slider
          className="basicSlider basicSliderGap p-12"
          items={body.productList}
          slidesToShow={5}
          render={(item) => <ProductCard product={item} />}
        />
      </div>
      <ShopTheWholeOutfit data={body.shopTheWholeOutfit} />
      <div className="d-flex-all-center gap-12 mx-50px gap-12">
        <OneImageBanner img="./assets/images/sunglassDiscountBanner.png" />
        <OneImageBanner img="./assets/images/bagDiscountBanner.png" />
      </div>
    </div>
  );
};

export default Product;
