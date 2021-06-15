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

  return (
    <div>
      <ProductDetails product={selectedProduct} />
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
