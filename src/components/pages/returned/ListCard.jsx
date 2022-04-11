import React from "react";
import styles from "./return.module.scss"

function ListCard({ product }) {
  return (
    <div className={styles.listCardWrap}>
      <section className={styles.orderId}>
        <p>Order ID: </p>
        <strong>{product?.order_increment_id}</strong>
      </section>
    </div>
  );
}

export default ListCard;
