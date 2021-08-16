import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../../LazyImage/Image";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import {
  toggleQuickView
} from "../../../../store/actions/common";
import { extractColorSize, URL } from "../../../../util";

import { getProduct } from "../../../../services/product/product.service";
import styles from "./product.module.scss";

const TempLink = ({ children, product }) => {
  if (product.sku)
    return <Link to={`/product/${product.sku}`}>{children} </Link>;

  return <a href={product.uri}>{children}</a>;
};

const ProductCard = ({
  product,
  index,
  isProduct = false,
  pageColumns = 2,
  extraOridnary
}) => {
  const { custom_attributes, id, image, name } = product;
  console.log(product,"ui")
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
    origprice = `$${parseFloat(origpriceWithoutCurrency)?.toFixed(2)}`;
    priceWithoutCurrency = price;
    price = `$${parseFloat(price).toFixed(2)}`;
  }
  const wishList = useSelector((state) => state.wishlist.data);

  const [attributes, setattributes] = useState({ colors: [], size: [] });

  useEffect(() => {
    if (product?.extension_attributes?.configurable_product_options) {
      const { colors, size } = extractColorSize(
        product?.extension_attributes?.configurable_product_options || []
      );

      setattributes({ colors, size });
    }
  }, [product]);

  const dispatch = useDispatch();

  const handleWishList = async () => {
    const res = await getProduct(product.sku);

    const { colors, size } = extractColorSize(
      res.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...product,
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
    dispatch(toggleWishlist(p));
  };

  const handleQuickView = async () => {
    const res = await getProduct(product.sku);

    const { colors, size } = extractColorSize(
      res.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...product,
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
    dispatch(toggleQuickView(p));
  };
  const isAddedToWishlist = !!wishList.find((w) => w.id == product.id);

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
            className={`no-border bg-transparent c-pointer`}
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
            className={`${styles.productBtn} no-border bg-transparent c-pointer`}
            onClick={handleQuickView}
          >
            <span className="material-icons-outlined font-light-black">
              search
            </span>
          </button>
        </div>
        <div>
          <TempLink product={product}>
            <button
              type="button"
              className={`${styles.productBtn} no-border bg-transparent c-pointer`}
            >
              <span className={`material-icons-outlined font-light-black`}>
                shopping_cart
              </span>
            </button>
          </TempLink>
        </div>
      </div>
      <TempLink product={product}>
        <div
          className={`${!extraOridnary ?  styles.productName: styles.extraOridnary} two-lines-text ${
            !isProduct ? "text-center " : "d-flex"
          }`}
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
            <div className={styles.was}>Was {origprice || ""}</div>
          ) : null}
          <div className={styles.now}>
            {origpriceWithoutCurrency > priceWithoutCurrency ? "Now" : ""}{" "}
            {price}
          </div>
        </div>
        <div
          className={`${styles.productColors} ${
            !isProduct ? "text-center justify-content-center" : "d-none"
          }`}
        >
          <div>
            {attributes.colors?.map((c) => (
              <div className={styles.text}>{c.label} </div>
            ))}
          </div>
        </div>
      </TempLink>
    </div>
  );
};
export default ProductCard;
