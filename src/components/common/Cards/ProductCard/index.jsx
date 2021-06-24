import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../../LazyImage/Image';
import styles from './product.module.scss';

import { URL } from '../../../../util';

const ProductCard = ({ product, handleQuickView }) => {
  const { id, image, name, price, sku = '' } = product;

  const srcImage =
    image.indexOf('http') > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  return (
    <div key={id} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Link to={`/product/${sku}`}>
          <Image
            src={srcImage}
            defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
          />
        </Link>
      </div>
      {product.sale && <div className={styles.sale}>Sale</div>}
      <div className={styles.actionContainer}>
        <div>
          <button
            type="button"
            className="no-border bg-transparent"
            onClick={handleQuickView}
          >
            <span className="material-icons-outlined font-light-black">
              favorite_border
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="no-border bg-transparent"
            onClick={handleQuickView}
          >
            <span className="material-icons-outlined font-light-black">
              search
            </span>
          </button>
        </div>
        <div>
          <span className="material-icons-outlined font-light-black">
            shopping_cart
          </span>
        </div>
      </div>
      <Link to={`/product/${sku}`}>
        <div className={`${styles.productName} two-lines-text`} title={name}>
          {name}
        </div>
        <div className={styles.productPrice}>
          <div className={styles.was}>Was {price + 50}$</div>
          <div className={styles.now}>Now {price}$</div>
        </div>
        <div className={styles.productColors}>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_red}`} />
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_oranage}`} />
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_blue}`} />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
