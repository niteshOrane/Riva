import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WhatsApp, Instagram, Facebook } from "@material-ui/icons";
import { addToRecentlyViewed } from "../../store/actions/stats";
import Slider from "../../components/common/Sliders/Slider";
import ProductDetails from "../../components/pages/product/ProductDetails/ProductDetails";
import AdditionalProductDetails from "../../components/pages/product/AdditionalProductDetails/AdditionalProductDetails";
import HowToWearThis from "../../components/pages/product/HowToWearThis/HowToWearThis";
import DescriptionComposition from "../../components/pages/product/DescriptionComposition/DescriptionComposition";
import {
  getAttributes,
  getProduct,
  getCompositioncare,
  getHowToWear,
} from "../../services/product/product.service";
import ProductCard from "../../components/common/Cards/ProductCard";
import ShopTheWholeOutfit from "../../components/pages/product/ShopTheWholeOutfit/ShopTheWholeOutfit";
import OneImageBanner from "../../components/pages/landing/Banners/OneImageBanner";
import { body, productDetailsSimleCard } from "../../mockdata.json";
import styles from "./product.module.scss";

import { products } from "../../db.json";
import ImageCard from "../../components/common/Cards/ImageCard/ImageCard";
import { extractColorSize } from "../../util";
import axios from "axios";

const Product = (props) => {
  const { match } = props;
  const refContainer = useRef();
  const dispatch = useDispatch();

  const selectedProductId = match.params.categoryId;

  const [product, setproduct] = useState({});
  const [compositioncare, setCompositioncare] = useState({});
  const [loading, setloading] = useState(true);
  const [howToWear, sethowToWear] = useState([]);

  const setUpHowToWear = async (id) => {
    const res = await getHowToWear(id);

    if (res.status === 200 && res.data.length > 0) {
      sethowToWear(res.data || []);
    }
  };

  const init = async (sku) => {
    setloading(true);
    try {
      const res = await getProduct(sku);
      setUpHowToWear(res?.data?.id);
      const rescompositioncare = await getCompositioncare(res?.data?.id);

      const { colors, size } = extractColorSize(
        res.data?.extension_attributes?.configurable_product_options || []
      );

      const p = {
        ...res.data,
        image: res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "image"
        )?.value,
        name: res.data.name,
        price: res.data.price,
        sale:
          res.data?.custom_attributes.find(
            (attr) => attr.attribute_code === "show_sale_badge"
          )?.value === "1",
        description: res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "description"
        )?.value,
        colors,
        size,
        selected: {
          color: colors?.[0] || {},
          size: size?.[0] || {},
        },
      };
  
      // const response = await getColor(p.id)
      // console.log(response)
      setCompositioncare(rescompositioncare);
      setproduct(p);
      dispatch(addToRecentlyViewed(p));
    } catch (err) {
      setproduct({});
    }
    setloading(false);
  };

  const setColorSize = (attr) => {
    setproduct({ ...product, selected: attr });
  };

  useEffect(() => {
    init(selectedProductId);
  }, [selectedProductId]);
  // useEffect(() => {
  //   if(product.id){
  //     const sliderImg = new FormData();
  //     sliderImg.append("productId",product.id)
  //     axios.get(`http://65.0.141.49/shop/index.php/rest/V1/products/137108-19012-005/media`).then(res => console.log(res))
  //   }
  // },[product.id])
  if (loading) return <h2 style={{ textAlign: "center" }}>loading...</h2>;
  return (
    <div>
      <ProductDetails product={product} setColorSize={setColorSize} />
      <div className="max-width-1750 mx-auto">
        <Slider
          className={`simpleGreyArrow ${styles.simpleCardGap}`}
          items={productDetailsSimleCard}
          slidesToShow={3}
          render={(item) => <ImageCard product={item} />}
        />
      </div>
      <DescriptionComposition
        product={product}
        prodDiscr={product}
        compositioncare={compositioncare?.data}
      />
      {/* <AdditionalProductDetails sections={body.additionalProductDetails} /> */}
      {/* <div className="container-90 max-width-1750 mx-auto">
        <HowToWearThis cards={body.howToWear} />
      </div> */}

      <div id="complete-your-look" className="max-width-1750 mx-auto my-20px">
        <div>
          <h4 className="section-title text-center my-20px">
            Complete Your Look
          </h4>
        </div>
        <Slider
          className="simpleGreyArrow"
          items={howToWear}
          slidesToShow={4}
          arrows
          ref={refContainer}
          render={(item) => <ProductCard product={item} />}
        />
      </div>
      <div className="container-90 max-width-1750 mx-auto my-20px">
        <ShopTheWholeOutfit data={howToWear} mainProd={product} />
      </div>
      {/* <div className="d-flex-all-center gap-12px mx-50px gap-12px">
        <OneImageBanner img="./assets/images/categSlider-bg.png" />
        <OneImageBanner img="./assets/images/bagDiscountBanner.png" />
      </div> */}
    </div>
  );
};

export default Product;
