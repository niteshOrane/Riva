import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import HorizontalProductCard from "../../../common/Cards/ProductCard/HorizontalProductCard";
import Image from "../../../common/LazyImage/Image";
import styles from "./shopTheWholeOutfit.module.scss";
import CancelIcon from "@material-ui/icons/Cancel";

import { addToCart } from "../../../../store/actions/cart";
import { useEffect } from "react";
import { outOfStockCheck } from "../../../../services/product/product.service";
import { showSnackbar } from "../../../../store/actions/common";

const ShopTheWholeoutfit = ({ mainProd, data }) => {
  const [selected, setSelected] = useState([]);
  const [dataItems, setDataItems] = useState(data || []);
  const [selectedColorSize, setSelectedColorSize] = useState({
    id: null,
    color: null,
    size: null,
  });
  const [attrValue, setAttrValue] = useState({
    colorValue: null,
    sizeValue: null,
  });

  const dispatch = useDispatch();
  const getOutOfStock = async (val) => {
    if (dataItems?.length > 0) {
      // const temp = dataItems?.find((li) => li.id === val);
      // const id = temp?.id;
      // const colorIndex = Object.keys(
      //   temp?.options?.filter((e) => e.label === "Color")?.[0]?.values
      // );
      // const color = temp?.options.filter((e) => e.label === "Color")?.[0]
      //   ?.values[colorIndex[0]]?.label;
      // const sizeIndex = Object.keys(
      //   temp?.options?.filter((e) => e.label === "Size")?.[0]?.values
      // );
      // const size = temp?.options.filter((e) => e.label === "Size")?.[0]?.values[
      //   sizeIndex[0]
      // ]?.label;

      const { color, size, id } = selectedColorSize;
      if (color && size) {
        const res = await outOfStockCheck(id, color, size);
        if (res && res?.data) {
          if (res?.data?.data?.Stock === 1) {
            setSelectedColorSize({ color: null, size: null, id: null });
            return true;
          }
          if (res?.data?.data?.Stock === 0) {
            dispatch(showSnackbar("Product is out of stock", "error"));
            setSelectedColorSize({ color: null, size: null, id: null });
            return false;
          }
        } else {
          dispatch(showSnackbar("something went wrong", "error"));
        }
      } else {
        dispatch(showSnackbar("Please select a color and size", "error"));
      }
    }
  };

  const handleSelected = async (checked, product) => {
    const isProductInStock = await getOutOfStock(product?.id);
    if (isProductInStock) {
      if (checked) setSelected(selected.filter((c) => c.id !== product.id));
      else setSelected((s) => [...s, product]);
    } else {
      return null;
    }
  };
  useEffect(() => {
    setDataItems(data);
  }, []);
  const setColorSize = (attr, product, index, type) => {
    product[type] = attr;
    // setProId(product);
    dataItems[index] = product;
    setDataItems([...dataItems]);
    // getOutOfStock()
  };

  const addToCardHandler = () => {
    if (selected && selected.length > 0) {
      selected.map((product) => {
        dispatch(
          addToCart({
            ...product,
            id: `${product.id}`,
            name: product.name,
            src: product.image,
            qty: 1,
            price: product.price,
            color: { value: attrValue?.colorValue },
            size: { value: attrValue?.sizeValue },
          })
        );
      });
    }
  };
  return (
    <div className={styles.wholeOutfit}>
      <div className={styles.header}>Shop the Whole Outfit</div>
      <div className={styles.sections}>
        <div className={styles.primaryProduct}>
          <div>
            <Image src={mainProd.image} type="product-details" width="400px" />
          </div>
          <div className={styles.name}>{mainProd.name}</div>
          <div className={styles.sku}>
            <span className="color-black">SKU:</span> {mainProd.sku}
          </div>
          {/* <div className={styles.description}>{data.mainCard.description}</div> */}
        </div>
        <div>
          {dataItems.map((product, index) => (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: -10, left: -10 }}>
                <div className={styles.checkboxCancelBtn}>
                  <CancelIcon />
                </div>{" "}
                <Checkbox
                  checked={
                    selected.filter((s) => s.id === product.id).length > 0
                  }
                  color="default"
                  onClick={(e) => handleSelected(!e.target.checked, product)}
                />{" "}
              </div>
              <HorizontalProductCard
                product={product}
                index={index}
                setColorSize={setColorSize}
                getOutOfStock={getOutOfStock}
                selectedColorSize={selectedColorSize}
                setSelectedColorSize={setSelectedColorSize}
                attrValue={attrValue}
                setAttrValue={setAttrValue}
              />
              <hr className="my-10px" />
            </div>
          ))}
        </div>
        <div className={styles.cart}>
          <div className={styles.header}>
            Get 10% discount - select all products
          </div>
          <div>
            <div className={styles.pie}>
              <PieChart
                data={[
                  {
                    title: "One",
                    value: selected.length,
                    color: "black",
                  },
                  {
                    title: "Two",
                    value: data.length - selected.length,
                    color: "#b2aeae",
                  },
                ]}
                lineWidth={5}
                label={() => `${selected.length}/${data.length}`}
                labelPosition={0}
              />
            </div>
            <div className={styles.selectedCount}>
              {selected.length} out of {dataItems.length} products selected
            </div>
          </div>
          {dataItems?.discount?.discounts?.map((discount) => (
            <div
              className={`${styles.discount} d-flex p-12px justify-content-between`}
            >
              <div className={styles.name}>{discount.name}</div>
              <div className={styles.total}>USD {discount.amount}</div>
            </div>
          ))}
          <hr />
          <div
            className={`${styles.discount} d-flex p-12px justify-content-between`}
          >
            <div className={styles.name}>
              {selected.length} items | Subtotal
            </div>
            <div className={styles.total}>
              USD {selected.reduce((t, s) => s.priceWithoutCurrency + t, 0)}
            </div>
          </div>
          <div className={styles.addToCart} onClick={() => addToCardHandler()}>
            <span className={styles.text}>
              Add {selected.length} of {dataItems.length} items to cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopTheWholeoutfit;
