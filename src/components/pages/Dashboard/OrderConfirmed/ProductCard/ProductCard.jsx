import React from "react";
import styles from "./ProductCard.module.scss";
import { extractColorSize } from '../../../../../util';

function ProductCard({ product }) {
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options.map((o) => ({
        label: o.option_id === '92' ? 'Color' : 'Size',
        values: [{ value_index: o.option_value }],
      }))
    );

    return { colors, size };
  };
  const colorSize = getColorSize(product?.parent_item?.product_option.extension_attributes?.configurable_item_options)
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/b4bac6c2-516e-4778-89c1-fdf75fc725ce.png" width="100%" alt={product?.name} />
      </div>
      <div className={styles.productDetails}>
        <h4 className={styles.name}>{product?.name}</h4>
        <div className="d-flex align-items-center">
          <span className={`${styles.sizeColor} ${styles.mt4}`}>Color: </span>{" "}
          <span>{colorSize?.colors?.[0]?.label}</span>
        </div>
        <div className="d-flex align-items-center">
          <span className={styles.sizeColor}>Size: </span>{" "}
          <span>{colorSize.size?.[0]?.label}</span>
        </div>
        {/* <p className={styles.mt4}>Order Placed @ nitesh{product?.placedDate}</p> */}
        <p>Order ID #{product?.order_id}</p>
        <p>Payment: {product?.parent_item?.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
