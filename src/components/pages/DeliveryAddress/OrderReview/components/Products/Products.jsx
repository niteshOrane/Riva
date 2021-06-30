import React from "react";
import styles from "./Products.module.scss";
function Products({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.col1}>
          <h4 className="font-weight-normal">PRODUCTS</h4>
        </div>
        <div className={styles.col2}>
          <p className={styles.greyText}>QTY:</p>
        </div>
        <div className={styles.col3}>
          <p className={styles.greyText}>SUBTOTAL</p>
        </div>
      </div>

      {products?.map((product) => (
        <div className={styles.grid}>
          <div className={styles.col1}>
            <div className="d-flex">
              <div className={styles.image}>
                <img src={product.image} alt={product?.name} />
              </div>
              <div>
                <h4 className="font-weight-normal">{product?.name}</h4>
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
          <div className={styles.col2}>
            <strong>{product?.quantity}</strong>
          </div>
          <div className={styles.col3}>
            <strong>${product?.subTotal}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
