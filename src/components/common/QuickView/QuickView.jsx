import React, { useEffect, useState } from "react";
import Star from "@material-ui/icons/StarBorderOutlined";
import Dialog from "@material-ui/core/Dialog";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleQuickView,
  toggleSignUpCard,
} from "../../../store/actions/common";
import { addToCart } from "../../../store/actions/cart";
import OutOfStock from "../../pages/product/ProductDetails/outOfStock/OutOfStock";
import { colorRegexFilter } from "../colorRegex/colorRegex";
import Image from "../LazyImage/Image";
import ReviewModal from "../../pages/product/ProductDetails/ReviewPopUp";

import styles from "./QuickView.module.scss";
import * as icons from "../Icons/Icons";
import { extractColorSize, URL } from "../../../util";
import SizeCard from "../../pages/product/ProductDetails/components/SizeCard/SizeCard";
import SizeGuide from "../../pages/product/ProductDetails/components/SizeGuide/SizeGuide";
import {
  getReviewList,
  outOfStockCheck,
} from "../../../services/product/product.service";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../../../store/actions/wishlist";
import ReactPixel from "react-facebook-pixel";
import TagManager from "react-gtm-module";

function QuickView() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { data: cartItem } = useSelector((state) => state?.cart);

  const [outOfStock, setOutOfStock] = React.useState(false);
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [attributes, setattributes] = useState({ colors: [], size: [] });
  const [sizeCardOpen, setSizeCardOpen] = useState(false);
  const [guideCardOpen, setGuideCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleIncrementProduct = () => {
    setProductQuantity((prevState) => prevState + 1);
  };
  const handleDecrementProduct = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prevState) => prevState - 1);
  };
  const handleClose = () => {
    dispatch(toggleQuickView(null));
  };

  const { isOpen = false, data = {} } = useSelector(
    (state) => state.common.quickView || {}
  );
  const { currency_symbol, language } = useSelector(
    (state) => state?.common?.store
  );
  const closeStyle =
    language === "Arabic"
      ? {
          position: "absolute",
          top: 4,
          left: 4,
          paddingTop: 8,
          paddingLeft: 8,
        }
      : {
          position: "absolute",
          top: 4,
          right: 4,
          paddingTop: 8,
          paddingRight: 8,
        };

  const {
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
    price,
    visibility = 0,
    custom_attributes,
  } = data ?? {};

  const addToCardHandler = () => {
    dispatch(
      addToCart({
        ...selectedProduct,
        id: `${data?.id}`,
        name: data?.name,
        color: data?.selected?.color,
        size: data?.selected?.size,
        src: data?.image,
        qty: productQuantity,
        ...selectedProduct?.selected,
        price,
        isFromWishlist: data?.isFromWishlist,
      })
    );
    setProductQuantity(1);
    dispatch(toggleQuickView(null));
    ReactPixel.init(process.env.REACT_APP_FACEBOOK);
    const wishData = {
      content_name: "Added To Cart",
      content_ids: data?.id,
      content_type: data?.sku,
      currency: currency_symbol,
      value: data?.price,
    };
    ReactPixel.track("AddToCart", wishData);
    TagManager.dataLayer({
      dataLayer: {
        pageType: "QuickView",
        customer: { isLoggedIn: isAuthenticated },
        category: {
          id: JSON.parse(localStorage.getItem("preferredCategory")),
        },
        cart: { hasItems: cartItem.length > 0 ? true : false },
        ecommerce: {
          currencyCode: currency_symbol,
          product: {
            name: data.name,
            price: data.price,
            sku: data.sku,
            id: data.id,
          },
        },
      },
    });
  };
  const getOutOfStock = async () => {
    const id = data?.id;
    const color = data?.selected?.color?.label;
    const size = data?.selected?.size?.label;
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
  const setColorSize = (attr, type) => {
    data.selected[type] = attr;
    setSelectedProduct({ ...data });
    getOutOfStock();
  };
  useEffect(() => {
    getOutOfStock();
    setSelectedProduct(data);
  }, [data]);
  const srcImage =
    data?.image?.indexOf("http") > -1
      ? data?.image
      : `${URL.baseUrlProduct}${data?.image}`;

  useEffect(() => {
    setSelectedProduct(data);
    getOutOfStock();
  }, []);
  useEffect(() => {
    if (data?.extension_attributes?.configurable_product_options) {
      const { colors, size } = extractColorSize(
        data?.extension_attributes?.configurable_product_options || []
      );

      setattributes({ colors, size });
    }
  }, [data]);
  // const handleWishList = () => {
  //   dispatch(toggleWishlist(data));
  // };
  const { data: wishlist = [] } = useSelector((state) => state.wishlist);
  const handleWishlist = () => {
    if (!auth.isAuthenticated)
      return dispatch(
        toggleSignUpCard({ redirectTo: window.location.pathname })
      );
    if (wishlist.find((w) => data?.id == w.id)) {
      dispatch(removeWishlist(data));
      dispatch(toggleQuickView(null));
    } else {
      dispatch(addWishlist(data));
    }
  };
  const isAddedToWishlist = !!wishlist.find((w) => w.id == data?.id);

  return (
    <Dialog
      fullWidth
      dir={language === "Arabic" ? "rtl" : "ltr"}
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={isOpen}
    >
      <SizeCard
        imageSelected={srcImage}
        language={language}
        open={sizeCardOpen}
        handleClose={() => setSizeCardOpen(false)}
      />
      <SizeGuide
        imageSelected={srcImage}
        open={guideCardOpen}
        handleClose={() => setGuideCardOpen(false)}
        language={language}
      />
      <button
        type="button"
        onClick={handleClose}
        style={closeStyle}
        className="bg-transparent no-border closeBtn"
      >
        <icons.Close />
      </button>

      <div className={styles.details}>
        <div className={styles.img}>
          <Link to={`/product/${data?.sku}`}>
            <Image
              src={srcImage}
              classname="object-fit-fill h-100"
              width="100%"
              alt=""
              customeStyle={{ objectFit: "cover" }}
            />
          </Link>
        </div>
        <form>
          <div className={styles.bestSeller}>BEST SELLER</div>
          <div className={styles.name}>{data?.name} </div>
          <div className="d-flex">
            <div className={`${styles.sku} d-flex`}>
              <div className={styles.title}>SKU:&nbsp;</div>
              <div className={styles.text}>{data?.sku}</div>
            </div>
          </div>
          <div className={`${styles.price} d-flex`}>
            <div className={styles.now}>
              Now {currency_symbol} {parseFloat(price)?.toFixed(2)}
            </div>
          </div>
          <div className={`${styles.color} d-flex`}>
            <div className={styles.title}>Color:&nbsp;</div>
            <span>
              {data?.selected?.color?.label === false
                ? "WHITE"
                : data?.selected?.color?.label}
            </span>
            {data?.colors?.length > 0 &&
              data?.colors?.map((item) => (
                <div
                  // key={`color${index}`}
                  title={item?.label}
                  className={`${styles.option}  c-pointer `}
                  onClick={() => {
                    // colorImageAction(item)
                    setColorSize(item, "color");
                  }}
                  style={{
                    transform:
                      data?.selected?.color?.value === item?.value
                        ? "scale(1)"
                        : "scale(.9)",
                  }}
                >
                  {typeof item?.label === "string" ? (
                    <>
                      <img
                        src={`${URL.baseUrlColorSwitcher}/${colorRegexFilter(
                          item?.label
                        )
                          ?.toLowerCase()
                          .trim()}.png`}
                        className={`${styles.colorItem} ${
                          data?.selected?.color?.value === item?.value
                            ? styles.active
                            : ""
                        }`}
                        style={{
                          height: "13px",
                          width: "13px",
                          borderRadius: "50%",
                          margin: "5px",
                        }}
                        alt={item?.label}
                      />
                    </>
                  ) : (
                    <div
                      src={item?.file}
                      className={`${styles.colorItem} 
                        ${
                          data?.selected?.color?.value === item.value
                            ? styles.active
                            : ""
                        }`}
                      title={item?.label}
                    />
                  )}
                </div>
              ))}
          </div>

          <div className={`${styles.size} gap-12px d-flex align-items-center`}>
            <div className={styles.title}>Size:</div>
            <div
              className={`${styles.options} gap-12px d-flex align-items-center`}
            >
              {attributes.size?.map((c) => (
                <div
                  className={`c-pointer ${styles.text} ${styles.quickBorder} d-flex-all-center`}
                  style={{
                    transform:
                      selectedProduct?.selected?.size?.value === c.value
                        ? "scale(1.2)"
                        : "scale(1)",
                    background:
                      selectedProduct?.selected?.size?.value === c?.value &&
                      "#EADEB8",
                    border:
                      selectedProduct?.selected?.size?.value === c?.value &&
                      "1px solid #EADEB8",
                  }}
                  onClick={() => setColorSize(c, "size")}
                >
                  <span className={styles.sizeLabel}>{c.label} </span>
                </div>
              ))}
            </div>
          </div>
          {outOfStock ? (
            <div
              className={`${styles.outOfStock} d-flex align-items-center gap-12px`}
            >
              <div className={`${styles.icon} d-flex-all-center`}>
                <span className="material-icons">mail</span>
              </div>

              <div className={styles.text}>
                We will let you know when its in stock
              </div>
            </div>
          ) : null}

          {/* <div className={`${styles.stats} d-flex justify-content-between`}>
            <div
              className={`${styles.visibility} d-flex gap-12px align-items-center`}
            >
              <div className={styles.icon}>
                <span className="material-icons-outlined font-light-black">
                  visibility
                </span>
              </div>
            </div>
          </div> */}

          <div className={styles.actions}>
            <div className="d-flex align-items-center justify-content-between flex-wrap my-20px">
              {!outOfStock && (
                <div
                  className={`${styles.qty} d-flex align-items-center justify-content-between`}
                >
                  <div className={styles.title}>Qty:</div>
                  <div
                    className={`${styles.counter} d-flex align-items-center justify-content-between`}
                  >
                    <div>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleDecrementProduct}
                        className="material-icons-outlined font-light-black"
                      >
                        remove
                      </span>
                    </div>
                    <div>{productQuantity}</div>
                    <div>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleIncrementProduct}
                        className="material-icons-outlined font-light-black"
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
                  <div className={`${styles.title} ${styles.avail}`}>
                    Availability:{" "}
                  </div>
                  &nbsp;
                  <div className={`${styles.text} ${styles.info}`}>
                    {outOfStock ? "Out Of Stock" : "In Stock"}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 align-items-center ">
              {outOfStock ? (
                <OutOfStock productId={data?.id} />
              ) : (
                <div className={styles.addToCart}>
                  <button
                    type="button"
                    onClick={addToCardHandler}
                    className="w-100 d-flex-all-center bg-black color-white p-12px"
                  >
                    <span className="material-icons-outlined">
                      shopping_cart
                    </span>
                    &nbsp;ADD TO CART
                  </button>
                </div>
              )}
              <div
                onClick={handleWishlist}
                className={`${styles.wishlist} d-flex-all-center c-pointer`}
              >
                <span
                  style={{ color: isAddedToWishlist ? "red" : "black" }}
                  className="material-icons-outlined font-light-black"
                >
                  {isAddedToWishlist ? "favorite" : "favorite_border"}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default QuickView;
