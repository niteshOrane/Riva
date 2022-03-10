import React from "react";
import { Link } from "react-router-dom";
import styles from "./return.module.scss";
import Image from "../../common/LazyImage/Image";
import moment from "moment";
import { extractColorSize } from "../../../util";

function ReturnCard({ product }) {
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
    product?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );
  return (
    <div className={styles.card}>
      <div className={styles.incrementWrap}>
        <span className="greyText">Order Number: #{product?.increment_id}</span>
      </div>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <Link to={`/order-details/${product?.increment_id}`}>
            <div className={styles.img}>
              {product?.extension_attributes?.product_thumbnail_image ? (
                <Image
                  src={product?.extension_attributes?.product_thumbnail_image}
                  width="100%"
                />
              ) : (
                <span
                  className={
                    product?.status === "processing"
                      ? styles.processIcon
                      : styles.deliveredIcon
                  }
                >
                  {" "}
                  {product?.status}{" "}
                </span>
              )}{" "}
              <div className={styles.orderDate}>
                {moment(product?.created_at).format("MMMM DD YYYY")}
              </div>
            </div>
          </Link>

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
            {product?.order_currency_code}
            {product?.parent_item?.price}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default ReturnCard;
