import React from "react";
import ReactImageZoom from "react-image-zoom";
import Image from "../../LazyImage/Image";
import styles from "./imageCard.module.scss";

const ImageCard = ({ isDetail, product, count }) => {

  return (
    <div>
      {isDetail ? (
        <div className={styles.cardWrapper}>
          <Image
            src={product.src}
            width={count > 1 ? "100%" : "auto"}
            className="object-fit-contain"
            alt="change me"
            type="product-details"
          />
        </div>
      ) : (
        <Image
          src={product.src}
          width={count > 1 ? "100%" : "auto"}
          className="object-fit-contain"
          alt="change me"
          type="product-details"
        />
      )}
    </div>
  );
};

export default ImageCard;
