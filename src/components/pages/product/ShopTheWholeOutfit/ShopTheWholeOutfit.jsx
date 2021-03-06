import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import HorizontalProductCard from "../../../common/Cards/ProductCard/HorizontalProductCard";
import Image from "../../../common/LazyImage/Image";
import styles from "./shopTheWholeOutfit.module.scss";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addToCart, removeFromCart } from "../../../../store/actions/cart";
import { useEffect } from "react";
import { outOfStockCheck } from "../../../../services/product/product.service";
import { showSnackbar } from "../../../../store/actions/common";

const ShopTheWholeoutfit = ({ mainProd, data }) => {
  const [selected, setSelected] = useState([]);
  const [dataItems, setDataItems] = useState(data || []);

  const { data: items = [] } = useSelector((state) => state.cart);
  const [selectedColorSize, setSelectedColorSize] = useState({
    id: null,
    color: null,
    size: null,
  });
  const [attrValue, setAttrValue] = useState({
    colorValue: null,
    sizeValue: null,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getOutOfStock = async (val) => {
    if (dataItems?.length > 0) {
      const { color, size, id } = selectedColorSize;
      if ((color, size, id)) {
        setLoading(true);
        const res = await outOfStockCheck(id, color, size);
        if (res && res?.data?.data) {
          if (res?.data?.data?.Stock === 1) {
            setLoading(false);
            setSelectedColorSize({ color: null, size: null, id: null });
            return true;
          }
          if (res?.data?.data?.Stock === 0) {
            dispatch(showSnackbar("Product is out of stock", "error"));
            setSelectedColorSize({ color: null, size: null, id: null });
            setLoading(false);
            return false;
          }
        } else {
          dispatch(showSnackbar("This product is not available", "error"));
          setSelectedColorSize({ color: null, size: null, id: null });
          setLoading(false);
        }
        setLoading(false);
      } else {
        dispatch(showSnackbar("Please select one color and size", "error"));
      }
    }
  };

  const handleSelected = async (checked, product) => {
    if (checked) {
      return setSelected(selected.filter((c) => c.id !== product.id));
      // const pro = items?.find((li) => li?.sku.slice(0, -4) == product?.sku);
      // if (pro) {
      //   dispatch(removeFromCart(pro));
      // }
    }
    const isProductInStock = await getOutOfStock(product?.id);
    product["color"] = attrValue?.colorValue;
    product["size"] = attrValue?.sizeValue;
    setAttrValue({ ...attrValue, colorValue: null, sizeValue: null });
    if (isProductInStock) {
      setSelectedColorSize({ color: null, size: null, id: null });
      return setSelected((s) => [...s, product]);
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

  const handleRemoveFromCart = (product) => {
    const pro = items?.find((li) => li?.sku.slice(0, -4) == product?.sku);
    if (pro) {
      dispatch(removeFromCart(pro));
    }
  };

  const addToCardHandler = () => {
    if (selected && selected.length > 0) {
      selected.map((product) => {
        setTimeout(() => {
          dispatch(
            addToCart({
              ...product,
              id: `${product.id}`,
              name: product.name,
              src: product.image,
              qty: 1,
              price: product.price,
              color: { value: product?.color },
              size: { value: product?.size },
            })
          );
        }, 2000);
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
        <div className={styles.checkboxWrap}>
          {dataItems.map((product, index) => (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => handleRemoveFromCart(product)}
                className={styles.checkboxCancelBtn}
              >
                {items?.find((li) => li?.sku.slice(0, -4) == product?.sku) && (
                  <CancelIcon />
                )}
              </div>{" "}
              <div style={{ position: "absolute", top: -10, left: -10 }}>
                {loading && selectedColorSize?.id === product?.id ? (
                  <CircularProgress size={20} />
                ) : (
                  <Checkbox
                    checked={
                      selected.filter((s) => s.id === product.id).length > 0
                    }
                    color="default"
                    onClick={(e) => handleSelected(!e.target.checked, product)}
                  />
                )}{" "}
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
