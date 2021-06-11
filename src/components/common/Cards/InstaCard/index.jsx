import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../../LazyImage/Image';
import './InstaCard.module.scss';

const InstaCard = ({ product }) => {
  const [color, setColor] = useState('');

  const { id, src, name, wasPrice, nowPrice } = product;
  return (
    <div key={id} className="product-card">
      <Image width="100%" src={src} />
    </div>
  );
};

InstaCard.propTypes = {
  product: PropTypes.object.isRequired,
};

InstaCard.defaultProps = {
  products: {},
};

export default InstaCard;
