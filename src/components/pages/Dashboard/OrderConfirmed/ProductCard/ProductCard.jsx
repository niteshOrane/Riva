import React from "react";
import styles from "./ProductCard.module.scss";
import { extractColorSize } from '../../../../../util';

function ProductCard({ product, cancelOrderFn }) {
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options.map((o) => ({
        label: o.option_id === '92' ? 'Color' : 'Size',
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id
      }))
    );

    return { colors, size };
  };
  const colorSize = getColorSize(product?.parent_item?.product_option.extension_attributes?.configurable_item_options)
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={product?.image} width="100%" alt={product?.name} />
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
        <div className="underline underline-hovered c-pointer font-weight-normal color-blue" onClick={(e) => { cancelOrderFn(e, product?.order_id) }}>Cancel order</div>
      </div>
    </div>
  );
}

export default ProductCard;
