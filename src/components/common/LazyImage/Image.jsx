import React, { useState } from "react";

import ReactImageZoom from "react-image-zoom";
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
      : `${type === "product-details" ? URL.baseUrlProduct : URL.baseUrl
      }/${src}`;

  const onImageError = () => {
    setError(true);
  };
  const propsImg = {
    img: !error
      ? srcImage
      : defaultImage
        ? defaultImage
        : "https://via.placeholder.com/295x295?text=Image+Not+Available",
    zoomStyle:
      "z-index:10;right:-11px;border:1px solid black",
  };
  React.useEffect(() => {
    //   window.addEventListener("load", event => {
    //     var image = document.querySelector('img');
    //     var isLoaded = image.complete && image.naturalHeight !== 0;
    //     alert(isLoaded);
    // });
  }, [srcImage])

  if (isZoom) {
    return (
      <div>
        <ReactImageZoom
          {...propsImg}
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
