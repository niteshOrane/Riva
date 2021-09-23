import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Star from "@material-ui/icons/StarBorderOutlined";
import Dialog from "@material-ui/core/Dialog";
import * as icons from "../Icons/Icons";
import {
  addWishlist,
  removeWishlist,
  toggleWishlist,
} from "../../../store/actions/wishlist/index";
import Image from "../LazyImage/Image";
import styles from "./Wishlist.module.scss";
import { toggleSignUpCard } from "../../../store/actions/common";
import { colorRegexFilter } from "../colorRegex/colorRegex";
import { URL } from "../../../util";
import ReviewModal from "../../pages/product/ProductDetails/ReviewPopUp";
import { getReviewList } from "../../../services/product/product.service";
import { Rating } from "@material-ui/lab";

function Wishlist() {
  const [selectedColor, setSelectedColor] = React.useState({
    color: null,
    size: null,
  });
  const [reviewList, setReviewList] = useState([]);
  const [value, setValue] = React.useState(0);
  const {
    isOpen,
    modalData: data = {},
    data: wishlist = [],
  } = useSelector((state) => state.wishlist);
  const { currency_symbol, language } = useSelector(state => state?.common?.store);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const closeStyle = language === 'Arabic' ? {
    position: "absolute",
    top: 4,
    left: 4,
    paddingTop: 8,
    paddingLeft: 8,
  } : {
    position: "absolute",
    top: 4,
    right: 4,
    paddingTop: 8,
    paddingRight: 8,
  };

  const handleClose = () => {
    dispatch(toggleWishlist(null));
  };
  const handleWishlist = () => {
    if (!auth.isAuthenticated)
      return dispatch(
        toggleSignUpCard({ redirectTo: window.location.pathname })
      );
    if (wishlist?.find((w) => data?.id == w?.id)) {
      dispatch(removeWishlist(data));
    } else {
      dispatch(addWishlist(data));
    }
    handleClose();
  };
  const getReviewListForProduct = async (val) => {
    if (val) {
      const res = await getReviewList(val);
      if (res.status === 200 && res?.data) {
        setReviewList(res?.data);
      }
    }
  };
  const calculateAvgReview = () => {
    const sum = reviewList?.reduce((acc, li) => acc + li?.ratings[0]?.value, 0);
    return isNaN(parseFloat(sum / reviewList?.length)?.toFixed(1))
      ? 0
      : parseFloat(sum / reviewList?.length)?.toFixed(1);
  };

  useEffect(() => {
    const sum = reviewList?.reduce((acc, li) => acc + li?.ratings[0]?.value, 0);
    setValue(
      isNaN(parseFloat(sum / reviewList?.length)?.toFixed(1))
        ? 0
        : parseFloat(sum / reviewList?.length)?.toFixed(1)
    );
  }, [reviewList]);

  const setColorSize = (attr, type) => {
    setSelectedColor({ ...selectedColor, [type]: attr });
  };
  React.useEffect(() => {
    if (data) {
      setSelectedColor({ ...selectedColor, color: data?.selected?.color });
      getReviewListForProduct(data?.sku);
    }
  }, [data]);

  const isAddedToWishlist = !!wishlist.find((w) => w.id == data?.id);
  const {
    origprice,
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
    price,
    visibility = 0,
    custom_attributes,
  } = data ?? {};

  return (
    <Dialog
      dir={language === 'Arabic' ? 'rtl' : 'ltr'}
      width="975px"
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={isOpen}
    >
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
          <Image
            src={data?.image}
            classname="object-fit-fill h-100"
            width="100%"
            alt=""
            type="product-details"
            customeStyle={{ objectFit: "cover" }}
          />
        </div>
        <form>
          <div className={styles.bestSeller}>BEST SELLER</div>
          <div className={styles.name}>{data?.name} </div>
          <div className="d-flex">
            <div className={`${styles.stars} d-flex-all-center`}>
              <Rating name="read-only" readOnly value={value} size="small" />
            </div>
            <div className={`${styles.rating} d-flex-all-center`}>{calculateAvgReview()} rating</div>
            <div className={`${styles.sku} d-flex`}>
              <div className={styles.title}>SKU:&nbsp;</div>
              <div className={styles.text}>{data?.sku}</div>
            </div>
          </div>
          <div>
            <ReviewModal id={data?.id} sku={data?.sku}  language={language} />
          </div>
          <div className={`${styles.price} d-flex`}>
            {origpriceWithoutCurrency < priceWithoutCurrency ? (
              <div className={styles.was}>Was {currency_symbol}{" "}{origprice || ""}</div>
            ) : null}
            <div className={styles.now}>Now {currency_symbol}{" "}{data?.price}</div>
            <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
          </div>
          {/* <div className={`${styles.color} d-flex`}>
            <div className={styles.title}>Color:&nbsp;</div>
            {data?.colors?.map((c) => (
              <div className={styles.text}>{c.label} </div>
            ))}
          </div> */}
          <div>
            <div className={`${styles.color} d-flex`}>
              <div className={styles.title}>Color:&nbsp;</div>
              <span>
                {selectedColor?.color?.label === false
                  ? "WHITE"
                  : selectedColor?.color?.label}
              </span>
              {data?.colors?.length > 0 &&
                data?.colors?.map((item) => (
                  <div
                    // key={`color${index}`}
                    title={item?.label}
                    className={`${styles.option}  c-pointer `}
                    onClick={() => {
                      setColorSize(item, "color");
                    }}
                    style={{
                      transform:
                        selectedColor?.color?.value === item?.value
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
                          className={`${styles.colorItem} ${data?.selected?.color?.value === item?.value
                            ? styles.active
                            : ""
                            }`}
                          alt={item?.label}
                        />
                      </>
                    ) : (
                      <div
                        src={item?.file}
                        className={`${styles.colorItem} 
                        ${data?.selected.color.value === item.value
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
          <div className={`${styles.size} gap-12px d-flex align-items-center`}>
            <div className={styles.title}>Size:</div>
            <div
              className={`${styles.options} gap-12px d-flex align-items-center`}
            >
              {data?.size?.length &&
                data?.size?.map((size) => {
                  return (
                    <div
                      style={{
                        transform:
                          selectedColor?.size?.value === size?.value
                            ? "scale(1)"
                            : "scale(.9)",
                      }}
                      onClick={() => setColorSize(size, "size")}
                      className={`${styles.option} d-flex-all-center`}
                    >
                      <span className={styles.sizeLabel}>{size.label}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={styles.actions}>
            <div className="d-flex w-100 align-items-center ">
              <div className={styles.addToCart}>
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="w-100 d-flex-all-center bg-black color-white p-12px"
                >
                  <span className="material-icons-outlined">
                    favorite_border
                  </span>
                  &nbsp;{" "}
                  {isAddedToWishlist
                    ? "REMOVE FROM WISHLIST"
                    : "ADD TO WISHLIST"}
                </button>
              </div>

              {/* <div className={`${styles.wishlist} d-flex-all-center`}>
                <span className="material-icons-outlined font-light-black">
                  favorite_border
                </span>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default Wishlist;
