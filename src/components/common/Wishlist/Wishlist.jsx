import React from "react";
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
import { outOfStockCheck } from "../../../services/product/product.service";
import OutOfStock from "../../pages/product/ProductDetails/outOfStock/OutOfStock";

const closeStyle = {
  position: "absolute",
  top: 4,
  right: 4,
  paddingTop:8,
  paddingRight:8
};
function Wishlist() {
  const [productQuantity, setProductQuantity] = React.useState(1);
  const {
    isOpen,
    modalData: data = {},
    data: wishlist = [],
  } = useSelector((state) => state.wishlist);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleWishlist(null));
  };
  const handleIncrementProduct = () => {
    setProductQuantity((prevState) => prevState + 1);
  };
  const handleDecrementProduct = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prevState) => prevState - 1);
  };
  const handleWishlist = () => {
    if (!auth.isAuthenticated)
      return dispatch(
        toggleSignUpCard({ redirectTo: window.location.pathname })
      );
    if (wishlist.find((w) => data.id == w.id)) {
      dispatch(removeWishlist(data));
    } else {
      dispatch(addWishlist(data));
    }
    handleClose();
  };

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
              <Star style={{ fill: "#FFD700", fontSize: 16 }} />
              <Star style={{ fill: "#FFD700", fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
              <Star style={{ fontSize: 16 }} />
            </div>
            <div className={`${styles.rating} d-flex-all-center`}>4 rating</div>
            <div className={`${styles.sku} d-flex`}>
              <div className={styles.title}>SKU:&nbsp;</div>
              <div className={styles.text}>{data?.sku}</div>
            </div>
          </div>
          <div className={`${styles.price} d-flex`}>
            {origpriceWithoutCurrency < priceWithoutCurrency ? (
              <div className={styles.was}>Was {origprice || ""}</div>
            ) : null}
            <div className={styles.now}>Now {data?.price}</div>
            <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
          </div>
          <div className={`${styles.color} d-flex`}>
            <div className={styles.title}>Color:&nbsp;</div>
            {data?.colors?.map((c) => (
              <div className={styles.text}>{c.label} </div>
            ))}
          </div>
          <div className={`${styles.size} gap-12px d-flex align-items-center`}>
            <div className={styles.title}>Size:</div>
            <div
              className={`${styles.options} gap-12px d-flex align-items-center`}
            >
              {data?.size?.length &&
                data?.size?.map((size) => {
                  return (
                    <div className={`${styles.option} d-flex-all-center`}>
                      {size.label}
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
