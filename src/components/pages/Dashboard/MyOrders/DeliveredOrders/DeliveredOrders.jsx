import React from "react";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./DeliveredOrders.module.scss";
import { extractColorSize } from "../../../../../util";
const DeliveredOrders = ({ products,status }) => {
  return products?.map((product) => {
    const getColorSize = (options) => {
      const { colors, size } = extractColorSize(
        options.map((o) => ({
          label: o.option_id === "92" ? "Color" : "Size",
          values: [{ value_index: o.option_value }],
        }))
      );
  
      return { colors, size };
    };
    const colorSize = getColorSize(product?.parent_item?.product_option.extension_attributes?.configurable_item_options)

    return <div className={styles.card}>
      <span className="greyText">Order Id {product?.order_id}</span>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/54ec64f9-21e9-4968-8d23-f376f3eeff2f.png"
              width="100%"
              alt={product?.name}
            />
          </div>
          <div>
            <h3 className="font-weight-normal">{product?.name}</h3>
            <div className="mt-12px">
              <div className={styles.colorSize}>
                <span>Color: </span>
                <span className={styles.greyText}>{colorSize?.colors?.[0]?.label}</span>
              </div>
              <div className={styles.colorSize}>
                <span>Size: </span>
                <span className={styles.greyText}>{colorSize.size?.[0]?.label}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>${product?.parent_item?.price}</strong>
        </div>
        <div>
          <h4 className="greyText">
            <span className={status==="processing" ? styles.processIcon : styles.deliveredIcon}></span> {status}{" "}
            {product.deliveryDate}
          </h4>
          <p className="mt-12px">
            <small className="greyText">Your item has been delivered</small>
          </p>
          <div className="d-flex align-items-center mt-12px">
            <span className={styles.icon}>
              <icons.Star />
            </span>
            <h4 className="underline underline-hovered c-pointer font-weight-normal greyText">
              Rate & Review Product
            </h4>
          </div>
          <div className="d-flex align-items-center mt-12px">
            <span className={styles.icon}>
              <icons.Undo />
            </span>
            <h4 className="c-pointer font-weight-normal greyText">Return</h4>
          </div>
        </div>
      </div>
    </div>
  });
};

export default DeliveredOrders;
