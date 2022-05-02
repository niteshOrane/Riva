import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../common/LazyImage/Image";
import * as icons from "../../../common/Icons/Icons";
import styles from "./Card.module.scss";
import { extractColorSize, URL } from "../../../../util";
import LoaderButton from "../../../common/Buttons/LoaderButton";
import { getProduct } from "../../../../services/product/product.service";
import {
  showSnackbar,
  toggleQuickView,
} from "../../../../store/actions/common";
import { useDispatch, useSelector } from "react-redux";

function Card({
  src,
  name,
  priceWas,
  priceIs,
  remove,
  sku,
  currency_symbol,
  loading,
}) {
  const srcImage =
    src?.indexOf("http") > -1 ? src : `${URL.baseUrlProduct}/${src}`;
  const dispatch = useDispatch();
  const handleQuickView = async (isFromWishlist) => {
    const res = await getProduct(sku);
    if (res?.status === 200 && res?.data) {
      const { colors, size } = extractColorSize(
        res.data?.extension_attributes?.configurable_product_options || []
      );

      const p = {
        // ...productItem,
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
        isFromWishlist
      };
      dispatch(toggleQuickView(p));
    } else if (res?.message) {
      dispatch(showSnackbar(`${res?.message}`, "warning"));
    } else {
      dispatch(showSnackbar(`Something went wrong`, "error"));
    }
  };
  return (
    <div className={styles.cardStyle}>
      <div className={styles.quick}>
        <button
          type="button"
          className={`no-border bg-transparent c-pointer`}
          onClick={() => handleQuickView(true)}
        >
          ADD TO CART
        </button>
      </div>

      <button
        type="button"
        title="Remove"
        onClick={remove}
        className={`${styles.closeStyle} closeBtn no-border bg-transparent position-absolute`}
      >
        {!loading ? (
          <icons.Close />
        ) : (
          <span className="material-icons-outlined">hourglass_top</span>
        )}
      </button>

      <Link to={`/product/${sku}`}>
        <div className={styles.imgContainer_P}>
          <div className={styles.imgContainer}>
            <Image src={srcImage} width="100%" />
          </div>
        </div>
      </Link>
      <div className="my-12px">
        <p className={`font-size-600 ${styles.boldFont}`}>{name}</p>
      </div>
      <div className="d-flex">
        {priceWas !== priceIs && (
          <s className="color-grey">
            Was {currency_symbol} {parseFloat(priceWas)?.toFixed(2)}
          </s>
        )}
       
        <span>
          Now {currency_symbol}{" "}
          {isNaN(parseFloat(priceIs)?.toFixed(2))
            ? 0
            : parseFloat(priceIs)?.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Card;
