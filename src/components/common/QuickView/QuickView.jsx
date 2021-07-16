import React from "react";
import Star from "@material-ui/icons/StarBorderOutlined";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar, toggleQuickView } from "../../../store/actions/common";
import { addToCart, toggleCart } from "../../../store/actions/cart";
import OutOfStock from "../../pages/product/ProductDetails/outOfStock/OutOfStock";

import Image from "../LazyImage/Image";

import styles from "./QuickView.module.scss";
import * as icons from "../Icons/Icons";

const closeStyle = {
  position: "absolute",
  top: 4,
  right: 4,
};
function QuickView() {
  const [outOfStock, setOutOfStock] = React.useState(true);
  const [productQuantity, setProductQuantity] = React.useState(1);


  const handleIncrementProduct = () => {
    setProductQuantity((prevState) => prevState + 1);
  };
  const handleDecrementProduct = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prevState) => prevState - 1);
  };

  const { isOpen = false, data = {} } = useSelector(
    (state) => state.common.quickView || {}
  );
  const dispatch = useDispatch();
  const {
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
    price,
    visibility = 0,
    custom_attributes,
  } = data ?? {};

  const handleClose = () => {
    dispatch(toggleQuickView(null));
  };

  const addToCardHandler = () => {
    dispatch(
      addToCart({
        ...data,
        id: `${data?.id}`,
        name: data?.name,
        src: data?.image,
        color: custom_attributes?.find((e) => e?.attribute_code === "color")
          ?.value,
        qty: 1,
        size: custom_attributes?.find((e) => e?.attribute_code === "size")
          ?.value,
        price,
      })
    );

    dispatch(toggleQuickView(null));
  };

  return (
    <Dialog
      fullWidth
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
            <div className={`${styles.rating} d-flex-all-center`}>
              {visibility} rating
            </div>
            <div className={`${styles.sku} d-flex`}>
              <div className={styles.title}>SKU:&nbsp;</div>
              <div className={styles.text}>{data?.sku}</div>
            </div>
          </div>
          <div className={`${styles.price} d-flex`}>
            <div className={styles.now}>Now ${price}</div>
            <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
          </div>
          <div className={`${styles.color} d-flex`}>
            <div className={styles.title}>Color:&nbsp;</div>
            <div className={styles.text}>Black</div>
            <div className={`${styles.options} d-flex-all-center`}>
              <div className={`${styles.option} ${styles.option_red}`} />
              <div className={`${styles.option} ${styles.option_oranage}`} />
              <div className={`${styles.option} ${styles.option_blue}`} />
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
                    <div className={`${styles.option} d-flex-all-center`}>
                      {size}
                    </div>
                  );
                })}
            </div>
          </div>
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
          <div className={`${styles.sizeHelp} d-flex align-items-center`}>
            <ul className="nav-list gap-12px d-flex align-items-center">
              <li className="nav-li">
                <a href="#" className="d-flex align-items-center">
                  <span className="material-icons-outlined font-light-black">
                    straighten
                  </span>
                  &nbsp; &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    //   onClick={() => setGuideCardOpen(true)}
                  >
                    <span className="align-self-end font-light-black">
                      Size Guide
                    </span>
                  </button>
                </a>
              </li>
              <li className="nav-li">
                <a href="#" className="d-flex align-items-center">
                  <span className="material-icons-outlined font-light-black">
                    search
                  </span>
                  &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    //   onClick={() => setSizeCardOpen(true)}
                  >
                    <span className="align-self-end font-light-black">
                      Find your size
                    </span>
                  </button>
                </a>
              </li>
            </ul>
          </div>

          <div className={`${styles.stats} d-flex justify-content-between`}>
            <div
              className={`${styles.visibility} d-flex gap-12px align-items-center`}
            >
              <div className={styles.icon}>
                <span className="material-icons-outlined font-light-black">
                  visibility
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <div className="d-flex align-items-center justify-content-between flex-wrap my-20px">
              <div
                className={`${styles.qty} d-flex align-items-center justify-content-between`}
              >
                <div className={styles.title}>qty:</div>
                <div
                  className={`${styles.counter} d-flex align-items-center justify-content-between`}
                >
                  <div>
                    <span style ={{cursor:"pointer"}} onClick = {handleDecrementProduct} className="material-icons-outlined font-light-black">
                      remove
                    </span>
                  </div>
                  <div>{productQuantity}</div>
                  <div>
                    <span style ={{cursor:"pointer"}} onClick = {handleIncrementProduct} className="material-icons-outlined font-light-black">
                      add
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.demand} d-flex gap-12px align-items-center`}
              >
                <div className="d-flex align-items-center">
                  <div className={styles.title}>Availability: </div>
                  &nbsp;<div className={styles.text}>In stock</div>
                </div>
              </div>
            </div>

            <div className="d-flex w-100 align-items-center ">
              {outOfStock ? (
                <OutOfStock />
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
              <div className={`${styles.wishlist} d-flex-all-center`}>
                <span className="material-icons-outlined font-light-black">
                  favorite_border
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
