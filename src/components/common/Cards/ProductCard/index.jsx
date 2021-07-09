import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../../LazyImage/Image";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import {
  toggleQuickView,
  showSnackbar,
} from "../../../../store/actions/common";
import { addToCart } from "../../../../store/actions/cart";
import { URL } from "../../../../util";
import styles from "./product.module.scss";

const TempLink = ({ children, product }) => {
  if (product.sku)
    return <Link to={`/product/${product.sku}`}>{children} </Link>;

  return <a href={product.uri}>{children}</a>;
};

const ProductCard = ({ product, index, isProduct = false, pageColumns=2 }) => {
  const { custom_attributes, id, image, name } = product;
  let {
    origprice = 0,
    origpriceWithoutCurrency,
    priceWithoutCurrency,
    price = 0,
  } = product;
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === "special_price"
    )?.value;
    origprice = `$${origpriceWithoutCurrency}`;
    priceWithoutCurrency = price;
    price = `$${price}`;
  }
  const wishList = useSelector((state) => state.wishlist.data);
  const { size = [], color = [] } = useSelector(
    (state) => state?.common?.attributes || {}
  );
  const dispatch = useDispatch();

  const handleWishList = () => {
    dispatch(toggleWishlist(product));
  };

  const handleQuickView = () => {
    dispatch(toggleQuickView(product));
  };

  const addToCardHandler = () => {
    dispatch(
      addToCart({
        ...product,
        id: `${product.id}`,
        name: product.name,
        src: product.image,
        color: custom_attributes?.find((e) => e?.attribute_code === "color")
          ?.value,
        quantity: 1,
        size: custom_attributes?.find((e) => e?.attribute_code === "size")
          ?.value,
        price: product.price,
      })
    );
    dispatch(showSnackbar("Added to cart", "success"));
  };

  const isAddedToWishlist = !!wishList.find((w) => w.id === product.id);

  const srcImage =
    image?.indexOf("http") > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  return (
    <div key={id} className={styles.productCard}>
      {index === 4 && <div className={styles.outOfStock}>OUT OF STOCK</div>}
      <div className={styles.imageContainer}>
        <TempLink product={product}>
          <div className={styles.imgContainer_P}>
            <div className={styles.imgContainer}>
              <Image
                src={srcImage}
                defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
                width="100%"
              />
            </div>
          </div>
        </TempLink>
      </div>
      {product.sale && <div className={styles.sale}>Sale</div>}
      <div className={styles.actionContainer}>
        <div>
          <button
            type="button"
            className="no-border bg-transparent c-pointer"
            onClick={handleWishList}
          >
            <span
              className="material-icons-outlined"
              style={{ color: isAddedToWishlist ? "red" : "black" }}
            >
              {isAddedToWishlist ? "favorite" : "favorite_border"}
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="no-border bg-transparent c-pointer"
            onClick={handleQuickView}
          >
            <span className="material-icons-outlined font-light-black">
              search
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="no-border bg-transparent c-pointer"
            onClick={addToCardHandler}
          >
            <span className="material-icons-outlined font-light-black">
              shopping_cart
            </span>
          </button>
        </div>
      </div>
      <TempLink product={product}>
        <div
          className={`${styles.productName} two-lines-text ${
            !isProduct ? "text-center " : "d-flex"
          }`}
          title={name}
        >
          {name}
        </div>
        <div
          className={`${styles.productPrice} ${
            !isProduct ? "text-center" : ""
          }`}
        >
          {origpriceWithoutCurrency > priceWithoutCurrency ? (
            <div className={styles.was}>Was {origprice || ""}</div>
          ) : null}
          <div className={styles.now}>
            {origpriceWithoutCurrency > priceWithoutCurrency ? "Now" : ""}{" "}
            {price}
          </div>
        </div>
        <div
          className={`${styles.productColors} ${
            !isProduct ? "text-center justify-content-center" : ""
          }`}
        >
          <div>
            {color
              ?.filter(
                (c) =>
                  c?.value ===
                    custom_attributes?.find(
                      (e) => e?.attribute_code === "color"
                    )?.value || ""
              )
              ?.map((c) => (
                <div className={styles.text}>{c.label} </div>
              ))}
          </div>
          {/*<div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_red}`}>
              <span className={styles.tooltiptext}>Red</span>
            </div>
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_oranage}`}>
              <span className={styles.tooltiptext}>Orange</span>
            </div>
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_blue}`}>
              <span className={styles.tooltiptext}>Blue</span>
            </div>
          </div>
              */}
        </div>
      </TempLink>
    </div>
  );
};
export default ProductCard;
