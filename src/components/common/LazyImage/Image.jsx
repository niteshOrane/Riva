import React, { useState } from "react";
import PropTypes from "prop-types";
import { URL } from "../../../util";
// import {
//   Magnifier,
//   GlassMagnifier,
//   SideBySideMagnifier,
//   PictureInPictureMagnifier,
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION,
//   MagnifierContainer,
//   MagnifierPreview,
//   MagnifierZoom,
// } from "react-image-magnifiers";
import ReactImageZoom from "react-image-zoom";

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
  const propsImg = {
    width: 500,
    height: 600,
    zoomWidth: 500,
    img: !error
      ? srcImage
      : defaultImage
      ? defaultImage
      : "https://via.placeholder.com/295x295?text=Image+Not+Available",
    zoomStyle:
      "z-index:10;right:-31px;border:1px solid black;box-shadow: rgba(0, 0, 0) 0px 3px 8px;",
  };

  if (isZoom) {
    return (
      <div>
        <ReactImageZoom {...propsImg} />
      </div>
    );
  }

  return (
    <img
      src={
        !error
          ? srcImage
          : defaultImage
          ? defaultImage
          : "https://via.placeholder.com/295x295?text=Image+Not+Available"
      }
      onError={onImageError}
      width={width}
      height={height}
      alt={alt || "No image available"}
      style={customeStyle}
      className={classname}
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
