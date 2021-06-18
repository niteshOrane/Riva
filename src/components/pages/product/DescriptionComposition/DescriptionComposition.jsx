import React from "react";
import styles from "./DescriptionComposition.module.scss";
const DescriptionComposition = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <p className={styles.title}>Description</p>
          <div className="opacity-7">
            <p>Model size: {product.modelSize}</p>
            <p>Model height: {product.modelHeight}</p>
            <p>Colour: {product.color}</p>
            <div className={styles.text}>{product.description}</div>
          </div>
        </div>
        <div className={styles.col}>
          <p className={styles.title}>Composition</p>
          <strong className="my-10px d-inline-block">Outer</strong>
          <div className="my-10">
            <p className="opacity-7">{product.polyester}% polyester</p>
            <p className="opacity-7">{product.viscose}% viscose</p>
            <div className="mt-12px">
              <h3>Care</h3>
              <div className="mt-12px d-flex align-items-center gap-12">
                <div>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/41449d01-62c2-4cb3-9ef2-b4626a59a142.png"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/c41cdab8-7614-4763-9aa6-c286154c56eb.svg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/ed1e0d5f-9869-40a4-afac-601b95ae7843.svg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/f742176e-d34a-4d73-90d5-5fcecc1986cb.svg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    width="30px"
                    className="object-fit-contain"
                    src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/d6edf3b1-b7b8-44a4-9c4e-49cb932e2240.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionComposition;
