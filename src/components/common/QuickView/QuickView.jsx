import React, { useEffect, useState } from "react";
import Star from "@material-ui/icons/StarBorderOutlined";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar, toggleQuickView } from "../../../store/actions/common";
import { addToCart, toggleCart } from "../../../store/actions/cart";
import OutOfStock from "../../pages/product/ProductDetails/outOfStock/OutOfStock";

import Image from "../LazyImage/Image";

import styles from "./QuickView.module.scss";
import * as icons from "../Icons/Icons";
import { extractColorSize, URL } from "../../../util";
import SizeCard from "../../pages/product/ProductDetails/components/SizeCard/SizeCard";
import SizeGuide from "../../pages/product/ProductDetails/components/SizeGuide/SizeGuide";
import { outOfStockCheck } from "../../../services/product/product.service";

const closeStyle = {
  position: "absolute",
  top: 4,
  right: 4,
  paddingTop:8,
  paddingRight:8
};

function QuickView() {
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
  const setColorSize = (attr) => {
    data.selected = attr;
    setSelectedProduct(data);
  };
  const colorImageAction = (colorItem) => {
    setColorSize({ ...data?.selected, color: colorItem });
  };
  const addToCardHandler = () => {
    dispatch(
      addToCart({
        ...selectedProduct,
        id: `${data?.id}`,
        name: data?.name,
        color:data?.selected?.color,
        size:data?.selected?.size,
        src: data?.image,
        qty: productQuantity,
        ...selectedProduct?.selected,
        price,
      })
    );

    dispatch(toggleQuickView(null));
  };
  console.log("data", data);
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
  useEffect(() => {
    getOutOfStock();
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

  return (
    <Dialog
      fullWidth
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={isOpen}
    >
      <SizeCard
        imageSelected={srcImage}
        open={sizeCardOpen}
        handleClose={() => setSizeCardOpen(false)}
      />
      <SizeGuide
        imageSelected={srcImage}
        open={guideCardOpen}
        handleClose={() => setGuideCardOpen(false)}
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
          <Image
            src={srcImage}
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
            {attributes.colors?.map((c) => (
              <div
                onClick={() => colorImageAction(c)}
                className={`c-pointer ${styles.text}`}
              >
                {c.label}{" "}
              </div>
            ))}
            {/* <div className={styles.text}>Black</div>
            <div className={`${styles.options} d-flex-all-center`}>
              <div className={`${styles.option} ${styles.option_red}`} />
              <div className={`${styles.option} ${styles.option_oranage}`} />
              <div className={`${styles.option} ${styles.option_blue}`} />
            </div> */}
          </div>
          <div className={`${styles.size} gap-12px d-flex align-items-center`}>
            <div className={styles.title}>Size:</div>
            <div
              className={`${styles.options} gap-12px d-flex align-items-center`}
            >
              {attributes.size?.map((c) => (
                <div
                  className={`c-pointer ${styles.text} d-flex-all-center`}
                  style={{
                    transform:
                      selectedProduct?.selected?.size?.value === c.value
                        ? "scale(1.2)"
                        : "scale(1)",
                  }}
                  onClick={() =>
                    setColorSize({ ...selectedProduct?.selected, size: c })
                  }
                >
                  {c.label}{" "}
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
          <div className={`${styles.sizeHelp} d-flex align-items-center`}>
            <ul className="nav-list gap-12px d-flex align-items-center">
              <li className="nav-li">
                <span className="d-flex align-items-center">
                  {/* <span className="material-icons-outlined font-light-black">
                    straighten
                  </span> */}
                  <img src="/assets/images/ruler (1).svg" alt="/" />
                  &nbsp; &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    onClick={() => setGuideCardOpen(true)}
                  >
                    <span
                      className={`${styles.sizeGuideDecoration} align-self-end font-light-black`}
                    >
                      Size Guide
                    </span>
                  </button>
                </span>
              </li>
              <li className="nav-li">
                <span className="d-flex align-items-center">
                  {/* <span className="material-icons-outlined font-light-black">
                    search
                  </span> */}
                  <img src="/assets/images/search.svg" alt="/" />
                  &nbsp;
                  <button
                    type="button"
                    className="bg-transparent no-border c-pointer"
                    onClick={() => setSizeCardOpen(true)}
                  >
                    <span
                      className={`${styles.sizeGuideDecoration} align-self-end font-light-black`}
                    >
                      Find your size
                    </span>
                  </button>
                </span>
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
              <div
                className={`${styles.demand} d-flex gap-12px align-items-center`}
              >
                <div className="d-flex align-items-center">
                  <div className={styles.title}>Availability: </div>
                  &nbsp;
                  <div className={styles.text}>
                    {outOfStock ? "Out Of Stock" : "In Stock"}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 align-items-center ">
              {/* {outOfStock ? (
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
              )} */}
              <div className={styles.addToCart}>
                <button
                  type="button"
                  onClick={addToCardHandler}
                  className="w-100 d-flex-all-center bg-black color-white p-12px"
                >
                  <span className="material-icons-outlined">shopping_cart</span>
                  &nbsp;ADD TO CART
                </button>
              </div>
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
