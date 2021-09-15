import React from "react";
import styles from "./CancelledOrdersCards.module.scss";
import { extractColorSize } from "../../../../../util";

const CancelledOrdersCards = ({ products, code, increment_id }) => {
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options.map((o) => ({
        label: o.option_id === "92" ? "Color" : "Size",
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id,
      }))
    );

    return { colors, size };
  };
  const colorSize = getColorSize(
    products[0]?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );
  return products?.map((product) => (
    <div className={styles.card}>
      <div className={styles.incrementWrap}>
        <div>
          <span className="greyText">Order Id {increment_id}</span>
          <br />
        </div>

        <span className={styles.reorder}>Reorder</span>
      </div>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            {/* <img src={product?.image} width="100%" alt={product?.name} /> */}
            <h4 className="greyText">
              <span className={styles.deliveredIcon}></span> Cancelled
            </h4>
          </div>
          <div>
            <h3 className="font-weight-normal">{product?.name}</h3>
            <div className="mt-12px">
              <div className={styles.colorSize}>
                <span>Color: </span>
                <span className={styles.greyText}>
                  {colorSize?.colors?.[0]?.label}
                </span>
              </div>
              <div className={styles.colorSize}>
                <span>Size: </span>
                <span className={styles.greyText}>
                  {colorSize.size?.[0]?.label}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>
            {code}
            {product?.parent_item?.price}
          </strong>
        </div>
        <div>
          <p className={`mt-12px greyText ${styles.fontSmall}`}>
            You requested a cancellation because you changed your mind about
            this product.
          </p>
        </div>
      </div>
      <div className="my-20px">
        <span className={styles.greenText}>Refund Completed</span>
        &nbsp;&nbsp;&nbsp;
        <span className="greyText">(Refund ID: {product?.refundId})</span>
        <p className={`greyText ${styles.fontSmall}`}>
          {product?.amount_refunded} has been refunded to your PhonePe Wallet on
          May 21.Credit Card refunds will take 7 business days.
        </p>
        <p className={`greyText ${styles.fontSmall}`}>
          For any questions, please contact your bank with reference number
          P2105111838047111096235.
        </p>
      </div>
    </div>
  ));
};

export default CancelledOrdersCards;
