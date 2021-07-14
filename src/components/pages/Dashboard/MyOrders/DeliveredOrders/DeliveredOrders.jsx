import React from "react";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./DeliveredOrders.module.scss";
const DeliveredOrders = ({ products }) => {
  return products?.map((product) => (
    <div className={styles.card}>
      <span className="greyText">Order Id {product?.orderId}</span>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            <img src={product?.image} width="100%" alt={product?.name} />
          </div>
          <div>
            <h3 className="font-weight-normal">{product?.name}</h3>
            <div className="mt-12px">
              <div className={styles.colorSize}>
                <span>Color: </span>
                <span className={styles.greyText}>{product?.color}</span>
              </div>
              <div className={styles.colorSize}>
                <span>Size: </span>
                <span className={styles.greyText}>{product?.size}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>${product?.price}</strong>
        </div>
        <div>
          <h4 className="greyText">
            <span className={styles.deliveredIcon}></span> Delivered on{" "}
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
  ));
};

export default DeliveredOrders;
