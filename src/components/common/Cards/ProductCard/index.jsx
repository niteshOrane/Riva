import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../LazyImage/Image';
import styles from './product.module.scss';

import { URL } from '../../../../util';

const ProductCard = ({ product }) => {
  const { id, image, name, price } = product;

  const srcImage =
    image.indexOf('http') > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  return (
    <div key={id} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image src={srcImage} defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"  />
      </div>
      {product.sale && <div className={styles.sale}>Sale</div>}
      <div className={styles.actionContainer}>
        <div>
          <span className="material-icons-outlined font-light-black">
            favorite_border
          </span>
        </div>
        <div>
          <span className="material-icons-outlined font-light-black">
            search
          </span>
        </div>
        <div>
          <span className="material-icons-outlined font-light-black">
            shopping_cart
          </span>
        </div>
      </div>
      <div className={styles.productName}>{name}</div>
      <div className={styles.productPrice}>
        <div className={styles.was}>Was {price + 50}$</div>
        <div className={styles.now}>Now {price}$</div>
      </div>
      <div className={styles.productColors}>
        <div className={`${styles.color} ${styles.color_red}`} />
        <div className={`${styles.color} ${styles.color_oranage}`} />
        <div className={`${styles.color} ${styles.color_blue}`} />
      </div>
    </div>
  );
};
export default ProductCard;
