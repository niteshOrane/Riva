import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LazyImage = (props) => {
  const { src, width, height, alt, customeStyle, classname } = props;
  const [error, setError] = useState(false);

  const onImageError = () => {
    setError(true);
  };

  return (
    <img
      src={
        !error
          ? src
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
};

export default LazyImage;
