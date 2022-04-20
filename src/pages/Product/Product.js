import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import TagManager from "react-gtm-module";
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
import ImageCard from "../../components/common/Cards/ImageCard/ImageCard";

import styles from "./product.module.scss";

import "react-loading-skeleton/dist/skeleton.css";

import { extractColorSize } from "../../util";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";

const Product = (props) => {
  const { match } = props;
  const refContainer = useRef();
  const dispatch = useDispatch();
  useAnalytics();

  const selectedProductId = match.params.categoryId;

  const [product, setproduct] = useState({});
  const [compositioncare, setCompositioncare] = useState({});
  const { currency_symbol, language } = useSelector(
    (state) => state?.common?.store
  );
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { data } = useSelector((state) => state?.cart);
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
      if (p.custom_attributes) {
        p.origpriceWithoutCurrency = p.custom_attributes?.find(
          (e) => e?.attribute_code === "special_price"
        )?.value;
        p.origprice = `${parseFloat(p.origpriceWithoutCurrency)?.toFixed(2)}`;
        p.priceWithoutCurrency = p.price;
        p.price = `${parseFloat(p.price).toFixed(2)}`;
      }
      const cartValue =
        localStorage.getItem("recentVieItem") || JSON.stringify([]);
      const cartObj = JSON.parse(cartValue);
      if (cartObj.filter((e) => e?.id === p?.id).length === 0) {
        cartObj.push(p);
        const jsonStr = JSON.stringify(cartObj);
        localStorage.setItem("recentVieItem", jsonStr);

        dispatch(addToRecentlyViewed(p));
      }
    } catch (err) {
      setproduct({});
    }
    setloading(false);
  };


  const setColorSize = (attr) => {
    setproduct({ ...product, selected: attr });
  };
  useEffect(() => {
    if (product.name) {
      TagManager.dataLayer({
        dataLayer: {
          pageType: "catalog_category_view",
          list: "category",
          customer: { isLoggedIn: isAuthenticated },
          category: {
            id: JSON.parse(localStorage.getItem("preferredCategory")),
          },
          cart: { hasItems: data.length > 0 },
          ecommerce: {
            currencyCode: currency_symbol,

            product: {
              name: product.name,
              price: product.price,
              sku: product.sku,
              id: product.id,
            },
          },
        },
      });
    }
    window.insider_object = {
      product: {
        ...product,
        currency: currency_symbol,
      },
      page: {
        type: "Product_details",
        url: match.url,
      },
    };
    document.title = product?.name || "Riva Fashion";
  }, [product]);

  useEffect(() => {
    init(selectedProductId);
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: match.url,
      },
    });
  }, [selectedProductId]);
  if (loading)
    return (
      <div className="d-flex justify-content-between">
        <div className={styles.load}>
          <Skeleton height="40rem" width="40rem" />
        </div>
       <div className={styles.load}>
          <Skeleton height="40rem" width="40rem" />
        </div>
      </div>
    );
  return (
    <div>
      <ProductDetails
        product={product}
        setColorSize={setColorSize}
        mediaImage={mediaImage}
        colorImage={colorImage}
        currency_symbol={currency_symbol}
        language={language}
        items={mediaImage}
        loading={loading}
      />
      <div className="max-width-1750 mx-auto">
        <Slider
          className={`simpleGreyArrow ${styles.simpleCardGap}`}
          items={mediaImage}
          slidesToShow={3}
          render={(item) => (
            <ImageCard
              product={{ src: item?.file }}
              count={mediaImage.length}
            />
          )}
        />
      </div>
      <DescriptionComposition
        product={product}
        prodDiscr={product}
        compositioncare={compositioncare?.data}
      />
      {howToWear.length > 0 ? (
        <div id="complete-your-look">
          <div className="max-width-1750 mx-auto my-20px">
            <div>
              <p className="section-title text-center my-20px">
                Complete Your Look
              </p>
            </div>
            <Slider
              className="simpleGreyArrow"
              items={howToWear}
              slidesToShow={4}
              arrows
              ref={refContainer}
              render={(item) => <ProductCard isComplete product={item} />}
            />
          </div>
          <hr style={{ marginTop: "100px", marginBottom: "60px" }} />
          <div className="container-90 max-width-1750 mx-auto my-20px">
            <ShopTheWholeOutfit data={howToWear} mainProd={product} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Product;
