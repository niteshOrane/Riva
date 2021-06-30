import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WhatsApp, Instagram, Facebook } from '@material-ui/icons';
import { addToRecentlyViewed } from '../../store/actions/stats';
import Slider from '../../components/common/Sliders/Slider';
import ProductDetails from '../../components/pages/product/ProductDetails/ProductDetails';
import AdditionalProductDetails from '../../components/pages/product/AdditionalProductDetails/AdditionalProductDetails';
import HowToWearThis from '../../components/pages/product/HowToWearThis/HowToWearThis';
import DescriptionComposition from '../../components/pages/product/DescriptionComposition/DescriptionComposition';
import {
  getAttributes,
  getProduct,
} from '../../services/product/product.service';
import ProductCard from '../../components/common/Cards/ProductCard';
import ShopTheWholeOutfit from '../../components/pages/product/ShopTheWholeOutfit/ShopTheWholeOutfit';
import OneImageBanner from '../../components/pages/landing/Banners/OneImageBanner';
import { body, productDetailsSimleCard } from '../../mockdata.json';
import styles from './product.module.scss';

import { products } from '../../db.json';
import ImageCard from '../../components/common/Cards/ImageCard/ImageCard';

const Product = (props) => {
  const { match } = props;
  const refContainer = useRef();
  const dispatch = useDispatch();
  const selectedProductId = match.params.categoryId;

  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(true);

  const init = async (sku) => {
    setloading(true);
    try {
      const res = await getProduct(sku);

      const color = res.data?.custom_attributes?.find(
        (e) => e?.attribute_code === 'color'
      )?.value;
      const size = res.data?.custom_attributes?.find(
        (e) => e?.attribute_code === 'size'
      )?.value;

      const colorAttr = await getAttributes('92');
      const sizeAttr = await getAttributes('213');

      const p = {
        ...res.data,
        image: res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === 'image'
        )?.value,
        name: res.data.name,
        price: res.data.price,
        sale:
          res.data?.custom_attributes.find(
            (attr) => attr.attribute_code === 'show_sale_badge'
          )?.value === '1',
        colors: colorAttr?.data?.filter((c) => c.value === color) || [],
        size: sizeAttr?.data?.filter((s) => s.value === size) || [],
      };
      console.log({ p }, 'dsafsaf');

      setproduct(p);
      dispatch(addToRecentlyViewed(p));
    } catch (err) {
      setproduct({});
    }
    setloading(false);
  };

  useEffect(() => {
    init(selectedProductId);
  }, [selectedProductId]);

  if (loading) return <h2 style={{ textAlign: 'center' }}>loading...</h2>;
  return (
    <div>
      <ProductDetails product={product} />
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
