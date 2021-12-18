import React from "react";
import { extractColorSize } from "../../../util";

import Image from "../../common/LazyImage/Image";
import * as icons from "../../common/Icons/Icons";
import styles from "./Information.module.scss";

function InformationTable({ orderDetails }) {
  const { product, status, currency, paymentInfo,
    orderCurrency } = orderDetails;
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
  const colorSize = getColorSize(
    product?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );

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
            <div className={styles.bgDarkGrey}>Status:</div>
            <div className={styles.bgLightGrey}>Product Name:</div>
            <div className={styles.bgDarkGrey}>SKU:</div>
            <div className={styles.bgLightGrey}>Price:</div>
            <div className={styles.bgDarkGrey}>Qty:</div>
            <div className={styles.bgLightGrey}>Subtotal:</div>
          </div>
          <div id={styles.orderInfo} className="d-flex align-items-start w-100">
            <div className="d-flex justify-content-center align-items-center">

              {product?.extension_attributes?.product_thumbnail_image ?
                <Image src={product?.extension_attributes?.product_thumbnail_image} customeStyle={{ padding: 10}} width="100%" />
                :
                <div
                  style={{ backgroundColor: colorObj[status] }}
                  className={styles.statusBox}
                >
                  <span>{status}</span>
                </div>
              }
            </div>
            <div className={styles.highWrap}>
              <div>
                <div className={styles.high}>{product?.name}</div>
                <span>Color:</span> <span>{colorSize?.colors?.[0]?.label}</span>
                <br />
                <span>Size:</span> <span>{colorSize.size?.[0]?.label}</span>
              </div>
            </div>
            <div className={styles.pad}>{product?.sku}</div>
            <div className={styles.pad}>
              {orderCurrency}
              {product?.parent_item?.price}
            </div>
            <div className={styles.qty}>
              <span>Ordered:{product?.qty_ordered} </span>
              <span> Canceled:{product?.qty_canceled}</span>
            </div>
            <div className={styles.pad}>
              {orderCurrency}
              {product?.parent_item?.price}
            </div>
          </div>
          {/* <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span className={styles?.payTitle}>Subtotal: </span>
              <span className={styles.price}>
                {currency}
                {paymentInfo?.subtotal}
              </span>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span className={styles?.payTitle}>Shipping & Handling: </span>
              <span className={styles.price}>
                {currency}
                {paymentInfo?.shippingAmount}
              </span>
            </div>
          </div>

          <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span className={styles?.payTitle}>Grand Total: </span>
              <span className={styles.price}>
                {currency}
                {paymentInfo?.grandTotal}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default InformationTable;
