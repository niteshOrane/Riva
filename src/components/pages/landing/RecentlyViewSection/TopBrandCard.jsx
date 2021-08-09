import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../common/LazyImage/Image";
import style from "./TopBrandCard.module.scss";

const TempLink = ({ children, product }) => {
  if (product.sku)
    return (
      <Link to={`/product/${product.sku}`} className={style.card}>
        {children}{" "}
      </Link>
    );

  return (
    <a href={product.uri} className={style.card}>
      {children}
    </a>
  );
};

const TopBrandCard = ({ item }) => {
  const {
    origprice = 0,
    origpriceWithoutCurrency,
    priceWithoutCurrency,
    price,
  } = item;
  return (
    <TempLink product={item}>
      <div className={`d-flex align-items-cetner ${style.cardBody}`}>
        <div className={style.cardImg}>
          <Image src={item.image || item.src} width="100%" alt=""  type = 'product-details' />
          <div className={style.cartImage}>
            <span className="material-icons-outlined">shopping_cart</span>
          </div>
        </div>
        <div className={style.cardText}>
          <p className={`two-lines-text ${style.title}`}>
            {item.title || item.name || item.src || ""}
          </p>
          <div className="d-flex align-items-center">
            {origpriceWithoutCurrency > priceWithoutCurrency ? (
              <s className={style.crosedPrice}>Was {origprice || ""}</s>
            ) : null}
            <p className={`${style.price} color-primary`}>{price || ""}</p>
          </div>
        </div>
      </div>
    </TempLink>
  );
};

export default TopBrandCard;
