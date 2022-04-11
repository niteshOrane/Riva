import React, { useEffect, useState } from "react";

import ReactImageZoom from "react-image-zoom";
import PropTypes from "prop-types";
import { URL } from "../../../util";
import styles from "./lazyImage.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./lazyImage.css";

const LazyImage = (props) => {
  const {
    src,
    width,
    height,
    alt,
    customeStyle,
    classname,
    defaultImage,
    isCategory,
    isZoom,
    type = "",
    zoomPos,
    loading,
  } = props;
  const [error, setError] = useState(false);

  const srcImage =
    src?.indexOf("http") > -1
      ? src
      : `${
          type === "product-details" ? URL.baseUrlProduct : URL.baseUrl
        }/${src}`;

  const onImageError = () => {
    setError(true);
  };

  if (loading) {
    <Skeleton />;
  }
  return (
    <img
      src={
        !error
          ? srcImage
          : defaultImage
          ? defaultImage
          : "https://www.rivafashion.com/media/catalog/product/placeholder/default/placeholder_1.jpg"
      }
      onError={onImageError}
      width={width}
      height={height}
      alt={alt || "No image available"}
      style={customeStyle}
      className={isCategory ? `${styles.category}` : classname}
    />
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  defaultImage: PropTypes.string,
  customeStyle: PropTypes.string,
  classname: PropTypes.string,
};

export default LazyImage;
