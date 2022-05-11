import React, { useState, useEffect } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ReactPixel from "react-facebook-pixel";
import { Link, useHistory } from "react-router-dom";
import Image from "../../../common/LazyImage/Image";
import styles from "./productDetails.module.scss";
import { addToCart } from "../../../../store/actions/cart";
import SizeCard from "./components/SizeCard/SizeCard";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import OutOfStock from "./outOfStock/OutOfStock";
import { outOfStockCheck } from "../../../../services/product/product.service";
import { URL } from "../../../../util";
import { colorRegexFilter } from "../../../common/colorRegex/colorRegex";
import ShareIcons from "./ShareIcons";
import SizeChart from "./SizeChart";

import DeliveryReturn from "./DeliveryReturn";
import useArabic from "../../../common/arabicDict/useArabic";
import { showSnackbar } from "../../../../store/actions/common";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = (props) => {
  const {
    product,
    setColorSize,
    colorImage,
    currency_symbol,
    language,
    loading,
  } = props;
  const history = useHistory();
  const { translate } = useArabic();
  const [guideCardOpen, setGuideCardOpen] = useState(false);
  const [productColorList, setProductColorList] = useState([]);
  const [colorImg, setColorImg] = useState(null);
  const [showThumb, setShowThumb] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  useEffect(() => {
    if (colorImage.databind !== undefined) {
      const temp = colorImage?.databind;
      setProductColorList(temp);
      setColorImg(colorImage?.databind[0]?.file || "");
      setColorSize({
        ...product?.selected,
        color: { label: temp[0]?.color, value: temp[0]?.option_id },
      });
    }
  }, []);
  const colorImageAction = (data) => {
    setShowThumb(false);
    setColorImg(data?.file);
    setColorSize({
      ...product?.selected,
      color: { label: data?.color, value: data?.option_id },
    });
  };
  const [outOfStock, setOutOfStock] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const getOutOfStock = async () => {
    const id = product?.id;
    const color = product?.selected?.color?.label;
    const size = product?.selected?.size?.label;
    const res = await outOfStockCheck(id, color, size);
    if (res && res.status === 200) {
      if (res?.data?.data?.Stock) {
        return setOutOfStock(false);
      }
      if (res?.data?.data?.Stock === 0) {
        return setOutOfStock(true);
      }
    }
  };
  useEffect(() => {
    getOutOfStock();
  }, [product]);

  useEffect(() => {
    getOutOfStock();
  }, [product, colorImg]);

  let {
    origprice = 0,
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
  } = product;
  const { price, visibility = 0, custom_attributes } = product;
  useEffect(() => {
    if (Number(origprice) > Number(price)) {
      const decrease = origprice - price;
      setDiscountPercentage(decrease / (origprice * 100));
    }
  }, [product]);
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === "special_price"
    )?.value;
    origprice = origpriceWithoutCurrency;
    priceWithoutCurrency = price;
  }
  const dispatch = useDispatch();
  const { data: wishlist = [] } = useSelector((state) => state.wishlist);

  const handleIncrementProduct = () => {
    if (productQuantity === 5){
      dispatch(showSnackbar("You can only add 5 products", "error"));
      return
    }
      
    setProductQuantity((prevState) => prevState + 1);
  };
  const handleDecrementProduct = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prevState) => prevState - 1);
  };
  const calculateOnSale = () => {
    const newProductMessage = custom_attributes?.find(
      (e) => e?.attribute_code === "news_to_date"
    )?.value;

    const saleEndDate = custom_attributes?.find(
      (e) => e?.attribute_code === "salebadge_enddate"
    )?.value;
    if (
      saleEndDate &&
      moment(saleEndDate).isAfter(moment().format("YYYY-MM-DDTHH:mm:ssZ"))
    ) {
      return <div>On Sale</div>;
    }
    if (
      newProductMessage &&
      moment(newProductMessage).isAfter(moment().format("YYYY-MM-DDTHH:mm:ssZ"))
    ) {
      return <div>New</div>;
    }
    return null;
  };

  const addToCardHandler = () => {
    if (Number(productQuantity) > 20) {
      return dispatch(
        showSnackbar(
          "You can only order less then 20 items of this product",
          "error"
        )
      );
    }
    dispatch(
      addToCart({
        ...product,
        id: `${product.id}`,
        name: product.name,
        src: product.image,
        qty: productQuantity,
        price: product.price,
        ...product.selected,
      })
    );
    ReactPixel.init(process.env.REACT_APP_FACEBOOK);
    const wishData = {
      content_name: "Added To Cart",
      content_ids: product?.id,
      content_type: product?.sku,
      currency: currency_symbol,
      value: product?.price,
    };
    ReactPixel.track("AddToCart", wishData);
  };
  const handleWishList = () => {
    dispatch(toggleWishlist(product));
  };

  const displayPlaceHolder = () => {
    setColorImg(
      "https://www.rivafashion.com/media/catalog/product/placeholder/default/placeholder_1.jpg"
    );
  };

  const isAddedToWishlist = !!wishlist.find((w) => w.id == product.id);
  return (
    <div style={{ marginTop: "25px" }}>
      <div
        className={`${styles.product} gap-12px my-10px max-width-1750 mx-auto`}
      >
        <div className={styles.mainImage}>
          <section className={styles.bread}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/">{translate?.details?.HOME}</Link>
              {history?.location?.state && (
                <Link
                  to={`/products/${history?.location?.state?.category}/${history?.location?.state?.categoryId}`}
                >
                  {history?.location?.state?.category?.[0]?.toUpperCase() +
                    history?.location?.state?.category?.slice(1)}
                </Link>
              )}
              <span underline="hover" color="inherit">
                {product?.name}
              </span>
            </Breadcrumbs>
          </section>
          <div className={`${styles.slide}`}>
            <img
              src={colorImg || product?.image}
              className="object-fit-fill h-100"
              width="100%"
              alt={product?.name}
              zoomPos={language === "Arabic" ? "left" : "right"}
              type="product-details"
              isZoom
              onError={displayPlaceHolder}
            />

            <div className={styles.actionContainerTopLeft}>
              {calculateOnSale()}
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <form>
            <div className={styles.bestSeller}>{translate?.details?.BEST}</div>
            <div className={styles.name}>{product?.name}</div>
            <div className="d-flex">
              <div className={`${styles.sku} d-flex`}>
                <div className={styles.title}>SKU:&nbsp;</div>
                <div className={styles.text}>{product?.sku}</div>
              </div>
            </div>

            <div className={`${styles.price} d-flex`}>
              {Number(origpriceWithoutCurrency) >
              Number(priceWithoutCurrency) ? (
                <div className={styles.was}>
                  {translate?.details?.WAS} {currency_symbol}{" "}
                  {parseFloat(origprice)?.toFixed(2) || ""}
                </div>
              ) : null}
              <div className={styles.now}>
                {currency_symbol}
                {price}
              </div>
              <br />
            </div>
            {discountPercentage && discountPercentage !== 0 && (
              <span>{discountPercentage}% discount</span>
            )}

            <div className={`${styles.color} d-flex`}>
              <div className={styles.title}>
                {translate?.details?.COLOR}:{" "}
                {typeof productColorList?.find(
                  (item) => product.selected.color.value === item.option_id
                )?.color === "string"
                  ? productColorList?.find(
                      (item) => product.selected.color.value === item.option_id
                    )?.color
                  : "White"}
                {"  "}
              </div>
              {productColorList.length > 0 &&
                productColorList?.map((item, index) => (
                  <div
                    title={item?.color}
                    key={`color${index}`}
                    className={`${styles.option}  c-pointer `}
                    onClick={() => colorImageAction(item)}
                    style={{
                      transform:
                        product.selected.color.value === item.option_id
                          ? "scale(1)"
                          : "scale(.9)",
                    }}
                  >
                    {typeof item?.color === "string" ? (
                      <img
                        src={`${URL.baseUrlColorSwitcher}/${colorRegexFilter(
                          item?.color
                        )?.toLowerCase()}.png`}
                        className={`${styles.colorItem} ${
                          product.selected.color.value === item.option_id
                            ? styles.active
                            : ""
                        }`}
                        alt={item?.color}
                        style={{
                          border:
                            product.selected.color.value === item.option_id &&
                            `1px solid ${item?.color}`,
                        }}
                      />
                    ) : (
                      <img
                        src={item?.file}
                        className={`${styles.colorItem} ${
                          product.selected.color.value === item.option_id
                            ? styles.active
                            : ""
                        }`}
                        alt={item?.color}
                      />
                    )}
                  </div>
                ))}
            </div>
            <div
              className={`${styles.size} gap-12px d-flex align-items-center`}
            >
              <div className={styles.title}>{translate?.details?.SIZE}:</div>
              <div
                className={`${styles.options} gap-12px d-flex align-items-center`}
              >
                {product?.size?.map((size) => {
                  return (
                    <div
                      onClick={() => {
                        setColorSize({ ...product?.selected, size });
                      }}
                      className={`${styles.option} d-flex-all-center`}
                      style={{
                        transform:
                          product.selected.size.value === size.value
                            ? "scale(1.2)"
                            : "scale(1)",
                        background:
                          product.selected.size.value === size.value &&
                          "#EADEB8",
                      }}
                    >
                      {size.label}
                    </div>
                  );
                })}
              </div>
            </div>
            {outOfStock ? (
              <div
                className={`${styles.outOfStock} d-flex align-items-center gap-12px`}
              >
                <div className={`${styles.icon} d-flex-all-center`}>
                  <span className="material-icons">mail</span>
                </div>
                <div className={styles.text}>{translate?.details?.STOCK}</div>
              </div>
            ) : null}
            <div className={`${styles.sizeHelp} d-flex align-items-center`}>
              <ul className="nav-list gap-12px d-flex align-items-center">
                <li className="nav-li m-0">
                  <span className="d-flex align-items-center">
                    <span className="material-icons-outlined font-light-black">
                      straighten
                    </span>
                    &nbsp; &nbsp;
                    <button
                      type="button"
                      className="bg-transparent no-border c-pointer"
                      onClick={() => setGuideCardOpen(true)}
                    >
                      <span
                        className={`${styles.sizeGuide} align-self-end font-light-black`}
                      >
                        <SizeChart img={colorImg} language={language} />
                      </span>
                    </button>
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.w80}>
              <div className={`${styles.stats} d-flex justify-content-between`}>
                <div
                  className={`${styles.visibility} d-flex gap-12px align-items-center`}
                >
                  <div className={styles.icon}>
                    <span className="material-icons-outlined font-light-black">
                      visibility
                    </span>
                  </div>
                  <div>
                    <div className={styles.title}>
                      {translate?.details?.POPULAR}
                    </div>
                    <div className={styles.text}>
                      {product?.stats?.popular} {translate?.details?.LOOK}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.demand} d-flex gap-12px align-items-center`}
                >
                  <div className={styles.icon}>
                    <span className="material-icons-outlined font-light-black">
                      shopping_bag
                    </span>
                  </div>
                  <div>
                    <div className={styles.title}>IN DEMAND</div>
                    <div className={styles.text}>
                      Bought {product?.stats?.inDemand}+{" "}
                      {translate?.details?.TIMES}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <div className="d-flex align-items-center justify-content-between my-20px">
                  {!outOfStock && (
                    <div
                      className={`${styles.qty} d-flex align-items-center justify-content-between`}
                    >
                      <div className={styles.title}>
                        {translate?.details?.QUANT}:
                      </div>
                      <div
                        className={`${styles.counter} d-flex align-items-center justify-content-between`}
                      >
                        <div>
                          <span
                            onClick={handleDecrementProduct}
                            className="material-icons-outlined font-light-black"
                            style={{ cursor: "pointer" }}
                          >
                            remove
                          </span>
                        </div>
                        <div>{productQuantity}</div>
                        <div>
                          <span
                            onClick={handleIncrementProduct}
                            className="material-icons-outlined font-light-black"
                            style={{ cursor: "pointer" }}
                          >
                            add
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={`${styles.demand} d-flex gap-12px align-items-center`}
                  >
                    <div className="d-flex align-items-center">
                      <div className={styles.title}>
                        {translate?.details?.AVAIL}:{" "}
                      </div>
                      &nbsp;
                      <div className={styles.text}>
                        {outOfStock ? "Out Of Stock" : "In Stock"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center my-50px">
                  {outOfStock ? (
                    <OutOfStock productId={product.id} />
                  ) : (
                    <div
                      className={
                        Number(price) === 0
                          ? styles.disableCart
                          : styles.addToCart
                      }
                    >
                      <button
                        type="button"
                        onClick={() => addToCardHandler()}
                        className="d-flex-all-center"
                        disabled={Number(price) === 0}
                      >
                        <span className="material-icons-outlined">
                          shopping_cart
                        </span>
                        &nbsp;{translate?.details?.CARD}
                      </button>
                    </div>
                  )}

                  <div
                    className={`${styles.wishlist} d-flex-all-center`}
                    onClick={handleWishList}
                  >
                    <span
                      className="material-icons-outlined"
                      style={{ color: isAddedToWishlist ? "red" : "black" }}
                    >
                      {isAddedToWishlist ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                </div>

                <div className={styles.other}>
                  {[
                    {
                      name: (
                        <DeliveryReturn
                          language={language}
                          translate={translate}
                        />
                      ),
                      icon: "/assets/images/delivery.png",
                    },
                    {
                      name: (
                        <ShareIcons
                          styles={styles}
                          product={product}
                          language={language}
                          translate={translate}
                        />
                      ),
                      icon: "/assets/images/share.png",
                    },
                  ].map((item) => (
                    <div className={`${styles.labelContainer}`}>
                      <div className={styles.icon}>
                        <img src={item.icon} alt={item.name} />
                      </div>
                      <div className={`${styles.labelName} c-pointer`}>
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
