import React from 'react';
import styles from './horizontalProductCard.module.scss';

const VerticalProductCard = ({ product, index, setColorSize }) => {


  const {
    name = 'not available',
    image: src,
    origprice: was,
    price: now,
    size = 'unavailable',
  } = product;
  const colors = product?.options && product?.options.length ? Object.keys(product?.options?.filter(e => e.label === "Color")?.[0]?.values) : [];
  const sizes = product?.options && product?.options.length ? Object.keys(product?.options?.filter(e => e.label === "Size")?.[0]?.values) : [];
  return (
    <div className={`${styles.horizontalProductCard} d-flex gap-12px`}>
      <div>
        <img src={src} alt={name} />
      </div>
      <div>
        <div className={styles.name}>{name || ''}</div>
        <div className={styles.price}>
          <div className={styles.was}>Was {was}$</div>
          <div className={styles.now}>Now {now}$</div>
        </div>
        <div className={styles.size}>
          <div className="gap-12px d-flex align-items-center">
            <span className={styles.title}>Color:</span>
            {colors.map((color, index) => {
              const colorItem = product?.options.filter(e => e.label === "Color")?.[0]?.values[color];
              return (
                <span onClick={() => setColorSize(colorItem, product, index, 'color')}
                  className={styles.text}>{colorItem.label} {colors.length > index + 1 ? '|' : ''}</span>
              )
            })}
          </div>
          <div className="gap-12px d-flex align-items-center">
            <span className={styles.title}>Size:</span>
            {sizes?.map((sizeName) => {
              const sizeItem = product?.options.filter(e => e.label === "Size")[0].values[sizeName];
              return (
                <span onClick={() => setColorSize(sizeItem, product, index, "Size")} className={styles.text}>{sizeItem.label}</span>
              )
            })}
          </div>
          <div
            className={`${styles.options} gap-12px d-flex align-items-center`}
          >
            {sizes?.map((color) => {
              return (
                <span className={styles.option}>{product?.options.filter(e => e.label === "Size")[0].values[color].label}</span>
              )
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
