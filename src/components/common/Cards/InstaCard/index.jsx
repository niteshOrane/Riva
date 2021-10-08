import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "../../LazyImage/Image";
import styles from  "./InstaCard.module.scss";

const InstaCard = ({ product }) => {

  const { media_url} = product;
  return (
    <div className={styles.productCard}>
      <Image width="100%" height="100%" src={media_url} />
    </div>
  );
};

InstaCard.propTypes = {
  product: PropTypes.object.isRequired,
};


export default InstaCard;
