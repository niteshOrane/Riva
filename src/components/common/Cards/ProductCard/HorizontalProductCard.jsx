import React from "react";
import styles from "./horizontalProductCard.module.scss";

const VerticalProductCard = ({ product }) => {
  const { name, src, was, now, size } = product;

  return (
    <div className={`${styles.horizontalProductCard} d-flex gap-12px`}>
      <div>
        <img src={src} alt={name} />
      </div>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>
          <div className={styles.was}>Was {was}$</div>
          <div className={styles.now}>Now {now}$</div>
        </div>
        <div className={styles.size}>
          <div className="gap-12px d-flex align-items-center">
            <span className={styles.title}>Size:</span>
            <span className={styles.text}>{size}</span>
          </div>
          <div
            className={`${styles.options} gap-12px d-flex align-items-center`}
          >
            {["S", "M", "L", "XL", "2XL"].map((sizeValue) => {
              return <div className={styles.option}>{sizeValue}</div>;
            })}
          </div>
          <div className={`${styles.otherOptions} d-flex`}>
            Other similar options
            <span className="material-icons-outlined font-light-black">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCard;
