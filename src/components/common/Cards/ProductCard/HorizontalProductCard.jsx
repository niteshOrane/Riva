import React, { useState, useEffect } from "react";
import styles from "./horizontalProductCard.module.scss";
import Image from "../../../common/LazyImage/Image";
import axios from "axios";
import {
  getProduct,
  getProductColor,
} from "../../../../services/product/product.service";
import { Link } from "react-router-dom";

const TempLink = ({ children, product }) => {
  if (product?.sku)
    return <Link to={`/product/${product?.sku}`}>{children} </Link>;

  return <a href={product?.uri}>{children}</a>;
};

const VerticalProductCard = ({
  product,
  setSelectedColorSize,
  selectedColorSize,
  setAttrValue,
  attrValue,
}) => {
  const {
    id,
    name = "not available",
    image: src,
    origprice: was,
    price: now,
    size = "unavailable",
  } = product;

  const [colorImg, setColorImg] = useState();
  const getDetails = async (fnValue, fnLabel) => {
    if (fnValue && fnLabel) {
      const res = await getProductColor(fnValue);
      if (res.status === 200) {
        const item = res?.data?.databind?.find((li) => li.color === fnLabel);
        setColorImg(item);
      }
    }
  };

  const colors =
    product?.options && product?.options.length
      ? Object.keys(
          product?.options?.filter((e) => e.label === "Color")?.[0]?.values
        )
      : [];
  const sizes =
    product?.options && product?.options.length
      ? Object.keys(
          product?.options?.filter((e) => e.label === "Size")?.[0]?.values
        )
      : [];

  useEffect(() => {
    getDetails(
      id,
      colors.map(
        (li) =>
          product?.options.filter((e) => e.label === "Color")?.[0]?.values[li]
      )?.[0]?.label
    );
  }, []);
  return (
    <div className={`${styles.horizontalProductCard} d-flex gap-12px`}>
      <div>
        <TempLink product = {product}>
          <Image src={colorImg?.file || src} alt={name} />
        </TempLink>
      </div>
      <div>
        <div className={styles.name}>Name: {name || "---"}</div>
        <div className={styles.price}>
          <div className={styles.was}>Was {was}$</div>
          <div className={styles.now}>Now {now}$</div>
        </div>
        <div className={styles.size}>
          <div
            style={{ marginBottom: "6px" }}
            className="gap-12px d-flex align-items-center"
          >
            <span className={styles.title}>Color:</span>
            {colors.map((color, index) => {
              const colorItem = product?.options.filter(
                (e) => e.label === "Color"
              )?.[0]?.values[color];
              return (
                <>
                  <span
                    onClick={() => {
                      // setColorSizeWithValue(colorItem.label,color)
                      // setColorSize(colorItem, product, index, "color")
                      setSelectedColorSize({
                        ...selectedColorSize,
                        color: colorItem.label,
                        id,
                      });
                      setAttrValue({ ...attrValue, colorValue: color });
                      getDetails(id, colorItem.label);
                    }}
                    className={styles.text}
                    style={{
                      transform:
                        colorItem.label === selectedColorSize.color &&
                        id == selectedColorSize?.id
                          ? "scale(1)"
                          : "scale(.9)",
                      border:
                        colorItem.label === selectedColorSize.color &&
                        id == selectedColorSize?.id
                          ? "1px solid red"
                          : null,
                    }}
                  >
                    {colorItem.label}
                  </span>
                  <span>{colors.length > index + 1 ? "|" : ""}</span>
                </>
              );
            })}
          </div>
          <div className="gap-12px d-flex align-items-center">
            <span className={styles.title}>Size:</span>
            {sizes?.map((sizeName) => {
              const sizeItem = product?.options.filter(
                (e) => e.label === "Size"
              )[0].values[sizeName];
              return (
                <span
                  onClick={() => {
                    setSelectedColorSize({
                      ...selectedColorSize,
                      size: sizeItem.label,
                      id,
                    });
                    setAttrValue({ ...attrValue, sizeValue: sizeName });
                  }}
                  className={styles.option}
                >
                  {sizeItem.label}
                </span>
              );
            })}
          </div>
          <div
            className={`${styles.options} gap-12px d-flex align-items-center`}
          >
            {sizes?.map((color) => {
              const sizeItem = product?.options.filter(
                (e) => e.label === "Size"
              )[0].values[color];
              return (
                <span
                  onClick={() => {
                    setSelectedColorSize({
                      ...selectedColorSize,
                      size: sizeItem.label,
                      id,
                    });
                    setAttrValue({ ...attrValue, sizeValue: color });
                  }}
                  style={{
                    transform:
                      sizeItem.label === selectedColorSize.size &&
                      id == selectedColorSize?.id
                        ? "scale(1)"
                        : "scale(.9)",
                    border:
                      sizeItem.label === selectedColorSize.size &&
                      id == selectedColorSize?.id
                        ? "1px solid red"
                        : null,
                  }}
                  className={styles.option}
                >
                  {/* {
                    product?.options.filter((e) => e.label === "Size")[0]
                      .values[color].label
                  } */}
                  {sizeItem.label}
                </span>
              );
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
