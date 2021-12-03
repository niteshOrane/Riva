import React from "react";
import styles from "./Products.module.scss";
import { extractColorSize } from "../../../../../../util";
import Image from "../../../../../common/LazyImage/Image";

function Products({ products, currency_symbol, language }) {
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
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.col1}>
          <h4 className="font-weight-normal">PRODUCTS</h4>
        </div>
        {/* <div className={styles.col2}>
          <p className={styles.greyText}>QTY:</p>
        </div>
        <div className={styles.col3}>
          <p className={styles.greyText}>SUBTOTAL</p>
        </div> */}
      </div>

      {products?.map((product) => (
        <div className={styles.grid}>
          <div className={styles.col1}>
            <div className="d-flex">
              <div className={styles.image}>
                <Image
                  src={product.src}
                  width="72px"
                  height="110px"
                  alt={product.name}
                  type="product-details"
                />
              </div>
              <div className={styles.textArea}>
                <span className="font-weight-normal">{product?.name}</span>
                <div className={styles.colorSize}>
                  <span>Color: </span>

                  <span className={styles.greyText}>
                    {product?.color?.label ||
                      getColorSize(
                        product?.product_option?.extension_attributes
                          ?.configurable_item_options || []
                      ).colors?.[0]?.label}
                  </span>
                </div>
                <div  className={styles.colorSize}>
                  <span>Size: </span>
                  <span className={styles.greyText}>
                    {product?.size?.label ||
                      getColorSize(
                        product?.product_option?.extension_attributes
                          ?.configurable_item_options || []
                      ).size?.[0]?.label}
                  </span>
                </div>
                <div className={styles.colorSize}>
                  <span>Qty: </span>
                  <span className={styles.greyText}>
                    <strong>{product?.qty}</strong>
                  </span>
                </div>
                <div style = {{marginBottom:language==="Arabic"?"30px":"0"}}  className={styles.colorSize}>
                  <span>Price: </span>
                  <span className={styles.greyText}>
                    <strong>{currency_symbol} {parseFloat(product?.price * product?.qty).toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Products;
