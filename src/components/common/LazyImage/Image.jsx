import React, { useState } from 'react';
import PropTypes from 'prop-types';

const baseUrl =
  'http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image'; //process.env.REACT_IMAGE_BASEURL;

const LazyImage = (props) => {
  const { src, width, height, alt, customeStyle, classname, defaultImage } =
    props;
  const [error, setError] = useState(false);

  const srcImage = src?.indexOf('http') > -1 ? src : `${baseUrl}/${src}`;

  const onImageError = () => {
    setError(true);
  };

  return (
    <img
      src={
        !error
          ? srcImage
          : defaultImage
          ? defaultImage
          : 'https://via.placeholder.com/295x295?text=Image+Not+Available'
      }
      onError={onImageError}
      width={width}
      height={height}
      alt={alt || 'No image available'}
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
