import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToRecentlyViewed } from "../../store/actions/stats";
import Slider from "../../components/common/Sliders/Slider";
import ProductDetails from "../../components/pages/product/ProductDetails/ProductDetails";
import DescriptionComposition from "../../components/pages/product/DescriptionComposition/DescriptionComposition";
import {
  getProduct,
  getCompositioncare,
  getHowToWear,
  getProductMedia,
  getProductColor,
} from "../../services/product/product.service";
import ProductCard from "../../components/common/Cards/ProductCard";
import ShopTheWholeOutfit from "../../components/pages/product/ShopTheWholeOutfit/ShopTheWholeOutfit";

import styles from "./product.module.scss";

import ImageCard from "../../components/common/Cards/ImageCard/ImageCard";
import { extractColorSize } from "../../util";


const Product = (props) => {
  const { match } = props;
  const refContainer = useRef();
  const dispatch = useDispatch();

  const selectedProductId = match.params.categoryId;

  const [product, setproduct] = useState({});
  const [compositioncare, setCompositioncare] = useState({});
  const [loading, setloading] = useState(true);
  const [howToWear, sethowToWear] = useState([]);
  const [mediaImage, setMediaImage] = useState([]);
  const [colorImage, setColorImage] = useState([]);

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
      const productMediaImage = await getProductMedia(sku);
      const productColorImage = await getProductColor(res?.data?.id);
      setMediaImage(productMediaImage?.data);
      setColorImage(productColorImage?.data);

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
  if (loading) return <h2 style={{ textAlign: "center" }}>loading...</h2>;
  return (
    <div>
      <ProductDetails
        product={product}
        setColorSize={setColorSize}
        mediaImage={mediaImage}
        colorImage={colorImage}
      />
      <div className="max-width-1750 mx-auto">
        <Slider
          className={`simpleGreyArrow ${styles.simpleCardGap}`}
          items={mediaImage}
          slidesToShow={3}
          render={(item) => <ImageCard product={{ src: item?.file }} count={mediaImage.length} />}
        />
      </div>
      <DescriptionComposition
        product={product}
        prodDiscr={product}
        compositioncare={compositioncare?.data}
      />
      {howToWear.length > 0 ?
        < div id="complete-your-look" >
          <div className="max-width-1750 mx-auto my-20px">
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
        </div>
        : null}
      {/* <div className="d-flex-all-center gap-12px mx-50px gap-12px">
        <OneImageBanner img="./assets/images/categSlider-bg.png" />
        <OneImageBanner img="./assets/images/bagDiscountBanner.png" />
      </div> */}
    </div>
  );
};

export default Product;
