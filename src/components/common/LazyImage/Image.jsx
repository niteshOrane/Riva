import React, { useState } from "react";
import PropTypes from "prop-types";
import { URL } from "../../../util";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from "react-image-magnifiers";

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
  if (isZoom) {
    return (
      <div style={{ width: width, height: height }}>
        <SideBySideMagnifier
          imageSrc={[srcImage,"https://via.placeholder.com/295x295?text=Image+Not+Available"]}
          imageAlt={alt || "No image available"}
          zoomContainerBorder="1px solid black"
          alwaysInPlace
          style={{zIndex:0}}
        />
    
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
