import React from 'react';
import styles from './productGoWithCard.module.scss';

const ProductGoWithCard = ({ product, i }) => {
  return (
    <div className={styles.card}>
      <img src={product.src} width="100%" />
      <div className={`${styles.btn} d-flex`}>
        <div className={`${styles.name} ${i === 1 ? styles.blackCard : ''}`}>
          <span>SHOP THIS LOOK</span>
        </div>
        <div className={styles.icon}>
          <span className="material-icons-outlined">east</span>
        </div>
      </div>
    </div>
  );
};

export default ProductGoWithCard;
