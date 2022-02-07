import React, { useState, useEffect } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Star from "@material-ui/icons/StarBorderOutlined";
import Image from "../../../common/LazyImage/Image";
import styles from "./productDetails.module.scss";
import { addToCart } from "../../../../store/actions/cart";
import SizeCard from "./components/SizeCard/SizeCard";
import ImageDropdown from "./components/ImageDropdown/ImageDropdown";
import SizeGuide from "./components/SizeGuide/SizeGuide";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import OutOfStock from "./outOfStock/OutOfStock";
import {
  getReviewList,
  outOfStockCheck,
} from "../../../../services/product/product.service";
import SearchInStorePopup from "./SearchInStorePopup";
import SubscribeModel from "./SubscribeModel";
import { URL } from "../../../../util";
import { colorRegexFilter } from "../../../common/colorRegex/colorRegex";
import ReviewModal from "./ReviewPopUp";
import ShareIcons from "./ShareIcons";
import Rating from "@material-ui/lab/Rating";
import CategoriesCircles from "../../../common/CategoriesCircles/CategoriesCircles";
import SizeChart from "./SizeChart";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import DeliveryReturn from "./DeliveryReturn";
import useArabic from "../../../common/arabicDict/useArabic";
import ReactPixel from "react-facebook-pixel";

const ProductDetails = (props) => {
  const {
    product,
    setColorSize,
    mediaImage,
    colorImage,
    currency_symbol,
    language,
  } = props;
  const history = useHistory();
  const { translate } = useArabic();
  const [sizeCardOpen, setSizeCardOpen] = useState(false);
  const [guideCardOpen, setGuideCardOpen] = useState(false);
  const [reviewState, setReviewState] = useState(false);
  const [productColorList, setProductColorList] = useState([]);
  const [value, setValue] = React.useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [colorImg, setColorImg] = useState(null);

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
    setColorImg(data?.file);
    setColorSize({
      ...product?.selected,
      color: { label: data?.color, value: data?.option_id },
    });
  };
  const getReviewListForProduct = async (val) => {
    const res = await getReviewList(val);
    if (res.status === 200 && res?.data) {
      setReviewList(res?.data);
    }
  };
  const calculateAvgReview = () => {
    const sum = reviewList?.reduce(
      (acc, li) => (li?.ratings?.length ? acc + li?.ratings[0]?.value : null),
      0
    );

    return isNaN(parseFloat(sum / reviewList?.length)?.toFixed(1))
      ? 0
      : parseFloat(sum / reviewList?.length)?.toFixed(1);
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
    getReviewListForProduct(product?.sku);
  }, []);
  useEffect(() => {
    getReviewListForProduct(product?.sku);
  }, [reviewState]);
  useEffect(() => {
    const sum = reviewList?.reduce(
      (acc, li) => (li?.ratings?.length ? acc + li?.ratings[0]?.value : null),
      0
    );
    setValue(
      isNaN(parseFloat(sum / reviewList?.length)?.toFixed(1))
        ? 0
        : parseFloat(sum / reviewList?.length)?.toFixed(1)
    );
    calculateAvgReview();
  }, [reviewList]);
  useEffect(() => {
    getOutOfStock();
  }, [product, colorImg]);

  let {
    origprice = 0,
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
  } = product;
  const { price, visibility = 0, custom_attributes } = product;
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

  const isAddedToWishlist = !!wishlist.find((w) => w.id == product.id);
  return (
    <div style={{ marginTop: "25px" }}>
      <SizeCard
        imageSelected={colorImg || product?.image}
        open={sizeCardOpen}
        handleClose={() => setSizeCardOpen(false)}
        language={language}
      />
      {/* <SizeGuide
        imageSelected={colorImg || product?.image}
        open={guideCardOpen}
        handleClose={() => setGuideCardOpen(false)}
        language={language}
      /> */}
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
                  {history?.location?.state?.category}
                </Link>
              )}
              <span underline="hover" color="inherit">
                {product?.name}
              </span>
            </Breadcrumbs>
          </section>
          <div
            className={`${styles.slide} h-100 text-center d-flex-all-center flex-column`}
          >
            <Image
              src={colorImg || product?.image}
              className="object-fit-fill h-100"
              width="100%"
              alt={product?.name}
              zoomPos={language === "Arabic" ? "left" : "right"}
              type="product-details"
              isZoom
            />
            {/* <div className={styles.circlesContainer}>
              <CategoriesCircles />
            </div> */}
            {/*<ImageDropdown />*/}

            {/* <div className={styles.actionContainerTopRight}>
              <div onClick={handleWishList}>
                <span
                  className="material-icons-outlined font-light-black"
                  style={{ color: isAddedToWishlist ? "red" : "black" }}
                >
                  {isAddedToWishlist ? "favorite" : "favorite_border"}
                </span>
              </div>
            </div> */}
            <div className={styles.actionContainerTopLeft}>
              {calculateOnSale()}
            </div>
            {/* <div className={styles.actionContainerBottomRight}>
              <div>
                <span className="material-icons-outlined font-light-black">
                  open_with
                </span>
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.details}>
          <form>
            <div className={styles.bestSeller}>{translate?.details?.BEST}</div>
            <div className={styles.name}>{product?.name}</div>
            <div className="d-flex">
              <div className={`${styles.stars} d-flex-all-center`}>
                <Rating name="read-only" readOnly value={value} />
              </div>
              <div className={`${styles.rating} d-flex-all-center`}>
                {calculateAvgReview()} {translate?.details?.RATE}
              </div>
              <div className={`${styles.sku} d-flex`}>
                <div className={styles.title}>SKU:&nbsp;</div>
                <div className={styles.text}>{product?.sku}</div>
              </div>
            </div>
            <div>
              <ReviewModal
                id={product?.id}
                sku={product?.sku}
                language={language}
                isTop
                setReviewState={setReviewState}
              />
            </div>
            <div className={`${styles.price} d-flex`}>
              {origpriceWithoutCurrency > priceWithoutCurrency ? (
                <div className={styles.was}>
                  {translate?.details?.WAS} {currency_symbol}{" "}
                  {parseFloat(origprice)?.toFixed(2) || ""}
                </div>
              ) : null}
              <div className={styles.now}>
                {translate?.details?.NOW} {currency_symbol} {price}
              </div>
              {/*
                <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
              */}
            </div>
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
                <li className="nav-li">
                  <span className="d-flex align-items-center">
                    <span className="material-icons-outlined font-light-black">
                      search
                    </span>
                    &nbsp;
                    <button
                      type="button"
                      className="bg-transparent no-border c-pointer"
                      onClick={() => setSizeCardOpen(true)}
                    >
                      <span
                        className={`${styles.sizeGuide} align-self-end font-light-black`}
                      >
                        {translate?.details?.FIND}
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
                        <SearchInStorePopup
                          image={colorImg || product?.image}
                          sizes={product?.size}
                          language={language}
                          sku={product?.sku}
                          translate={translate}
                        />
                        // <SubscribeModel />
                      ),
                      icon: "/assets/images/shop.png",
                    },
                    // {
                    //   name: <SubscribeModel language={language} productId={product.id} />,
                    //   icon: "/assets/images/tshirt.png",
                    // },

                    {
                      name: (
                        <ReviewModal
                          id={product?.id}
                          sku={product?.sku}
                          isDetail
                          setReviewState={setReviewState}
                          reviewState={reviewState}
                          translate={translate}
                        />
                      ),
                      icon: "/assets/images/review.png",
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


