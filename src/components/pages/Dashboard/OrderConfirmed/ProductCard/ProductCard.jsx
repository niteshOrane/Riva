import React from "react";
import styles from "./ProductCard.module.scss";
function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={product?.src} width="100%" alt={product?.name} />
      </div>
      <div className={styles.productDetails}>
        <h4 className={styles.name}>{product?.name}</h4>
        <h4 className={styles.price}>{product?.price}</h4>
        <div className="d-flex align-items-center">
          <span className={`${styles.sizeColor} ${styles.mt4}`}>Color: </span>{" "}
          <span>{product?.color}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className={styles.sizeColor}>Size: </span>{" "}
          <span>{product?.size}</span>
        </div>
        <p className={styles.mt4}>Order Placed @{product?.placedDate}</p>
        <p>Order ID #${product?.orderId}</p>
        <p>Payment {product?.payment}</p>
      </div>
    </div>
  );
}

export default ProductCard;
