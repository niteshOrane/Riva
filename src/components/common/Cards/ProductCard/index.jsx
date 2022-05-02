import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Image from "../../LazyImage/Image";
import {
  addWishlist,
  toggleWishlist,
} from "../../../../store/actions/wishlist";
import {
  showSnackbar,
  toggleQuickView,
  toggleSignUpCard,
} from "../../../../store/actions/common";
import { extractColorSize, getColorsForHomePage, URL } from "../../../../util";
import { colorRegexFilter } from "../../colorRegex/colorRegex";

import {
  getProduct,
  getProductColor,
} from "../../../../services/product/product.service";
import styles from "./product.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const TempLink = ({ children, product }) => {
  if (product?.sku)
    return (
      <Link to={{ pathname: `/product/${product?.sku}`, state: product?.cat }}>
        {children}{" "}
      </Link>
    );

  return <a href={product?.uri}>{children}</a>;
};

const ProductCard = ({
  product,
  index,
  isProduct = false,
  extraOridnary,
  isListing,
  isRecommended,
  isComplete,
  landing,
  Imgloading,
}) => {
  const { custom_attributes, id, image, name } = product;
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = useLocation();
  const [loading, setLoading] = useState({
    quickView: false,
    wishlist: false,
  });
  let {
    origprice = 0,
    origpriceWithoutCurrency,
    priceWithoutCurrency,
    price,
  } = product;
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === "special_price"
    )?.value;
    origprice = `${parseFloat(origpriceWithoutCurrency)?.toFixed(2)}`;
    priceWithoutCurrency = price;
    price = `${parseFloat(price).toFixed(2)}`;
  }
  const wishList = useSelector((state) => state.wishlist.data);
  const openSignUpCard = (redirectTo) => {
    dispatch(toggleSignUpCard({ redirectTo }));
  };
  const [attributes, setattributes] = useState({ colors: [], size: [] });
  const [productItem, setProductItem] = useState(null);
  const [colorImg, setColorImg] = useState(null);
  useEffect(() => {
    if (product?.configurable_product_options) {
      
      const { colors, size } = extractColorSize(
        product?.configurable_product_options || []
      );
      setattributes({ colors, size });

      product["selected"] = { color: colors[0], size: size[0] };
    }
    if (isComplete) {
      const colors =
        product?.options?.length !== 0 &&
        Object.values(product?.options?.[0]?.values);

      setattributes({ colors });
    }
    if (landing) {
      if (product?.options) {
        const colors = getColorsForHomePage(product?.options);
        setattributes({
          ...attributes,
          colors: colors?.filter((li) => li?.label !== undefined),
        });
      }
    }

    setProductItem(product);
  }, [product]);

  const handleWishList = async () => {
    setLoading({ ...loading, wishlist: true });
    const res = await getProduct(productItem.sku);

    const { colors, size } = extractColorSize(
      res?.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...productItem,
      ...res?.data,
      image: res?.data?.custom_attributes.find(
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
      currency_symbol,
      selected: {
        color: colors?.[0] || {},
        size: size?.[0] || {},
      },
    };
    setLoading({ ...loading, wishlist: false });
    dispatch(toggleWishlist(p, false));
    // dispatch(addWishlist(p));
  };
  const handleUnAuthAdd = (item) => {
    openSignUpCard(location.pathname);
    localStorage.setItem("toWishlist", JSON.stringify(item));
  };

  const loadColorImages = async (pro, colorSelected) => {
    setColorImg("");

    if (!pro.productColorImage) {
      const pResponse = await getProductColor(pro?.id);
      const productColorImage = pResponse?.data?.databind || [];
      pro.productColorImage = productColorImage;
      pro.media_gallery_entries = productColorImage;
      setProductItem({ ...pro, productColorImage });
    }
    product["selected"] = { color: colorSelected };
    setColorImg(
      pro?.productColorImage.find((e) => e.option_id === colorSelected.value)
        ?.file
    );
  };
  const handleQuickView = async () => {
    setLoading({ ...loading, quickView: true });
    const res = await getProduct(productItem.sku);
    if (res?.status === 200 && res?.data) {
      const { colors, size } = extractColorSize(
        res.data?.extension_attributes?.configurable_product_options || []
      );

      const p = {
        ...productItem,
        ...res.data,
        image: res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "image"
        )?.value,
        name: res.data.name,
        price: res.data.price,
        currency_symbol,
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
      setLoading({ ...loading, quickView: false });
      dispatch(toggleQuickView(p));
    } else if (res?.message) {
      dispatch(showSnackbar(`${res?.message}`, "warning"));
    } else {
      dispatch(showSnackbar(`Something went wrong`, "error"));
    }
  };
  const handleChange = async (event, newValue) => {
    if (!product.productColorImage) {
      const pResponse = await getProductColor(product?.id);
      const productColorImage = pResponse?.data?.databind || [];
      product.productColorImage = productColorImage;
      product.media_gallery_entries = productColorImage;
      setProductItem({ ...product, productColorImage });
    }
    setColorImg("");
  };
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          right: 0,
          width: "37px",
          hight: "35px",
          opacity: "0.7",
        }}
        onClick={handleChange}
      >
        <span>
          <img src="/assets/images/recomended2.svg" alt="Next" />
        </span>
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          left: 0,
          zIndex: 1,
          width: "37px",
          hight: "35px",
          opacity: "0.7",
        }}
        onClick={handleChange}
      >
        <span>
          <img src="/assets/images/recomended.svg" alt="Previos" />
        </span>
      </div>
    );
  }
  const isAddedToWishlist = !!wishList.find((w) => w.id == product.id);

  const srcImage =
    image?.indexOf("http") > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  const isAuth = auth.isAuthenticated;
  return (
    <>
      <div
        style={isRecommended ? { padding: "2px" } : null}
        key={id}
        className={styles.productCard}
      >
        {/* {index === 4 && <div className={styles.outOfStock}>OUT OF STOCK</div>} */}
        {isListing && (
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay={false}
            showIndicators={false}
            interval={2000}
          >
            {productItem &&
              Object?.values(productItem?.media_gallery_entries)?.map(
                (item, indexitem) => (
                  <TempLink product={productItem}>
                    <div className={styles.legendWrapper} key={indexitem}>
                      <Image
                        src={
                          colorImg ||
                          `${
                            !productItem?.productColorImage
                              ? URL.baseUrlProduct
                              : ""
                          }/${item?.file}`
                        }
                        defaultImage="https://www.rivafashion.com/media/catalog/product/placeholder/default/placeholder_1.jpg"
                        width="100%"
                        loading={Imgloading}
                      />

                      <div className={`legend ${styles.sizeWrap}`}>
                        <p>SIZE</p>
                        <div className={styles.sizeType}>
                          {attributes?.size
                            ?.sort((a, b) => a - b)
                            ?.map((li) => (
                              <span
                                className={
                                  attributes?.size?.length === 1
                                    ? styles.single
                                    : null
                                }
                              >
                                {li?.label}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TempLink>
                )
              )}
          </Carousel>
        )}
        {!isListing && (
          <div className={styles.imageContainer}>
            <div className={styles.imgContainer_P}>
              <div className={styles.imgContainer}>
                {!isListing && (
                  <TempLink product={productItem}>
                    <Image
                      src={srcImage}
                      defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
                      width="100%"
                    />
                  </TempLink>
                )}
              </div>
            </div>
          </div>
        )}
        {productItem?.sale && <div className={styles.sale}>Sale</div>}
        <div className={styles.actionContainerText}>
          <div className={styles.actionContainer}>
            <div>
              <button
                type="button"
                className="no-border bg-transparent c-pointer"
                onClick={() => {
                  isAuth ? handleWishList() : handleUnAuthAdd(productItem);
                }}
              >
                <span
                  className="material-icons-outlined"
                  style={{ color: isAddedToWishlist ? "red" : "black" }}
                >
                  {loading.wishlist
                    ? "hourglass_top"
                    : isAddedToWishlist
                    ? "favorite"
                    : "favorite_border"}
                </span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`${styles.productBtn} no-border bg-transparent c-pointer`}
                onClick={handleQuickView}
              >
                <span className="material-icons-outlined font-light-black">
                  {loading.quickView ? "hourglass_top" : "search"}
                </span>
              </button>
            </div>
            <div>
              <TempLink product={productItem}>
                <button
                  type="button"
                  className={`${styles.productBtn} no-border bg-transparent c-pointer`}
                >
                  <span className="material-icons-outlined font-light-black">
                    shopping_cart
                  </span>
                </button>
              </TempLink>
            </div>
          </div>
          <TempLink product={productItem}>
            <div
              className={`${
                !extraOridnary ? styles.productName : styles.extraOridnary
              } two-lines-text ${!isProduct ? "text-center " : "d-flex"}`}
              title={name}
            >
              {name || ""}
            </div>
            <div
              className={`${styles.productPrice} ${
                !isProduct ? "text-center" : ""
              }`}
            >
              {origpriceWithoutCurrency > priceWithoutCurrency ? (
                <div className={styles.was}>
                  Was {currency_symbol}
                  {origprice || ""}
                </div>
              ) : null}
              <div className={styles.now}>
                {origpriceWithoutCurrency > priceWithoutCurrency ? "Now" : ""}{" "}
                {currency_symbol} {price}
              </div>
            </div>
          </TempLink>
          <div
            className={`${styles.productColors} ${
              !isProduct ? "text-center justify-content-center" : ""
            }`}
          >
            <div
              className={`${
                !isRecommended
                  ? styles.color
                  : `${styles.color} ${styles.recomm}`
              } d-flex`}
            >
              {attributes?.colors?.length > 0 &&
                attributes?.colors?.map((item) => (
                  <div
                    key={`color${index}`}
                    title={item?.label}
                    className={`${styles.option}  c-pointer `}
                    style={{
                      border:
                        product?.selected?.color?.value === item?.value &&
                        `1px solid ${item?.color}`,
                    }}
                    onClick={() => {
                      loadColorImages(product, item);
                    }}
                  >
                    {typeof item?.label === "string" ? (
                      <Tooltip arrow title={item?.label} placement="top">
                        <img
                          src={`${URL.baseUrlColorSwitcher}/${colorRegexFilter(
                            item?.label
                          )
                            ?.toLowerCase()
                            .trim()}.png`}
                          className={`${styles.colorItem} ${
                            product?.selected?.color?.value === item.value
                              ? styles.active
                              : ""
                          }`}
                          alt={item?.label}
                        />
                      </Tooltip>
                    ) : (
                      <div
                        src={item?.file}
                        className={`${styles.colorItem} 
                        ${
                          product?.selected?.color?.value === item?.value
                            ? styles.active
                            : ""
                        }`}
                        title={item?.label}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
