import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { WhatsApp, Instagram, Facebook } from "@material-ui/icons";
import { addToRecentlyViewed } from "../../store/actions/stats";
import Slider from "../../components/common/Sliders/Slider";
import ProductDetails from "../../components/pages/product/ProductDetails/ProductDetails";
import AdditionalProductDetails from "../../components/pages/product/AdditionalProductDetails/AdditionalProductDetails";
import HowToWearThis from "../../components/pages/product/HowToWearThis/HowToWearThis";
import DescriptionComposition from "../../components/pages/product/DescriptionComposition/DescriptionComposition";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import ProductCard from "../../components/common/Cards/ProductCard";
import ShopTheWholeOutfit from "../../components/pages/product/ShopTheWholeOutfit/ShopTheWholeOutfit";
import OneImageBanner from "../../components/pages/landing/Banners/OneImageBanner";
import { body, productDetailsSimleCard } from "../../mockdata.json";
import styles from "./product.module.scss";

import { products } from "../../db.json";
import ImageCard from "../../components/common/Cards/ImageCard/ImageCard";
console.log("tesrting", productDetailsSimleCard);
const Product = (props) => {
  const refContainer = useRef();
  const dispatch = useDispatch();
  const selectedProductId = props.match.params.categoryId;
  const selectedProduct =
    products.find((product) => product.id == selectedProductId) || products[0];

  useEffect(() => {
    dispatch(addToRecentlyViewed(selectedProduct.id));
  }, []);

  return (
    <div>
      <ProductDetails product={selectedProduct} />
      <Slider
        className={`simpleGreyArrow ${styles.simpleCardGap}`}
        items={productDetailsSimleCard}
        slidesToShow={3}
        render={(item) => <ImageCard product={item} />}
      />
      <DescriptionComposition product={body.DescriptionComposition} />
      {/* <AdditionalProductDetails sections={body.additionalProductDetails} /> */}

      <HowToWearThis cards={body.howToWear} />

      <div>
        <h4 className="section-title text-center my-20px">
          Complete Your Look
        </h4>
      </div>
      <div className="container-90 max-width-1600 mx-auto my-20px">
        <Slider
          className="simpleGreyArrow"
          items={body.completeLook}
          slidesToShow={4}
          arrows={true}
          ref={refContainer}
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
