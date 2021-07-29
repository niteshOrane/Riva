import React from "react";
import styles from "./ProductCard.module.scss";
function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/b4bac6c2-516e-4778-89c1-fdf75fc725ce.png" width="100%" alt={product?.name} />
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
        {/* <p className={styles.mt4}>Order Placed @ nitesh{product?.placedDate}</p> */}
        <p>Order ID #${product?.order_id}</p>
        <p>Payment {product?.payment}</p>
      </div>
    </div>
  );
}

export default ProductCard;
