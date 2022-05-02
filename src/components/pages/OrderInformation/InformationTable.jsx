import React from "react";
import { extractColorSize } from "../../../util";

import Image from "../../common/LazyImage/Image";
import * as icons from "../../common/Icons/Icons";
import styles from "./Information.module.scss";

function InformationTable({ orderDetails }) {
  const { product, status, orderCurrency } = orderDetails;
  console.log({ product });
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options?.map((o) => ({
        label: o.option_id === "92" ? "Color" : "Size",
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id,
      }))
    );

    return { colors, size };
  };

  const displayColorSize = (type) => {
    const colorSize = getColorSize(type);
    return colorSize;
  };

  const colorObj = {
    processing: "green",
    complete: "green",
    pending: "orange",
    cancelled: "red",
  };
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tblBody}>
          <div className="d-flex align-items-center w-100">
            <div className={styles.bgDarkGrey}>Product:</div>
            <div className={styles.bgLightGrey}>Product Name:</div>
            <div className={styles.bgDarkGrey}>SKU:</div>
            <div className={styles.bgLightGrey}>Price:</div>
            <div className={styles.bgDarkGrey}>Qty:</div>
            <div className={styles.bgLightGrey}>Subtotal:</div>
          </div>
          {product
            ?.filter((li) => li?.product_type === "simple")
            ?.map((pro) => (
              <div
                id={styles.orderInfo}
                className="d-flex align-items-start w-100"
              >
                <div className="d-flex justify-content-center align-items-center">
                  {pro?.extension_attributes?.product_thumbnail_image ? (
                    <Image
                      src={pro?.extension_attributes?.product_thumbnail_image}
                      customeStyle={{ padding: 10 }}
                      width="100%"
                    />
                  ) : (
                    <div
                      style={{ backgroundColor: colorObj[status] }}
                      className={styles.statusBox}
                    >
                      <span>{status}</span>
                    </div>
                  )}
                </div>
                <div className={styles.highWrap}>
                  <div>
                    <div className={styles.high}>{pro?.name}</div>
                  </div>
                </div>
                <div className={styles.pad}>{pro?.sku}</div>
                <div className={styles.pad}>
                  {orderCurrency}
                  {pro?.parent_item?.price}
                </div>
                <div className={styles.qty}>
                  <span>{pro?.qty_ordered} </span>
                </div>
                <div className={styles.pad}>
                  {orderCurrency}
                  {pro?.parent_item?.price}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default InformationTable;
