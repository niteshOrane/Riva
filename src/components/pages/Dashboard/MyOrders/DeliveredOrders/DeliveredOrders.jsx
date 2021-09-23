import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./DeliveredOrders.module.scss";
import ReviewModal from "../../../product/ProductDetails/ReviewPopUp";
import { extractColorSize } from "../../../../../util";
import { addCartId } from '../../../../../store/actions/auth';
import { getCart } from "../../../../../store/actions/cart";
import {
  buyAgainOrder
} from "../../../../../services/order/order.services";
import { showSnackbar } from "../../../../../store/actions/common";

const DeliveredOrders = ({ products, status, code, increment_id, language }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reOrder = async (orderId) => {
    if (orderId) {
      const response = await buyAgainOrder(orderId);

      if (typeof response.data === "string") {
        response.data = JSON.parse(response.data);
      }
      if (response.status === 200 && !response?.data?.error) {
        dispatch(addCartId(response?.data?.quote_id));
        await dispatch(getCart());
        history.push("/shopping-cart");
      } else {
        dispatch(showSnackbar(response?.data?.message, "error"));
      }
    }
  };
  return products?.map((product) => {
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
    const colorSize = getColorSize(
      product?.parent_item?.product_option.extension_attributes
        ?.configurable_item_options
    );

    return (
      <div className={styles.card}>
        <div className={styles.incrementWrap}>
          <span className="greyText">Order Number: #{increment_id}</span><br />

        </div>

        <div className={styles.carItem}>
          <div className={styles.col1}>
            <div className={styles.img}>
              <h4 className="greyText">
                <span
                  className={
                    status === "processing"
                      ? styles.processIcon
                      : styles.deliveredIcon
                  }
                ></span>{" "}
                {status} {product.deliveryDate}
              </h4>
            </div>
            <div>
              <h3 className="font-weight-normal">{product?.name}</h3>
              <div className="mt-12px">
                <div className={styles.colorSize}>
                  <span>Color: </span>
                  <span className={styles.greyText}>
                    {colorSize?.colors?.[0]?.label}
                  </span>
                </div>
                <div className={styles.colorSize}>
                  <span>Size: </span>
                  <span className={styles.greyText}>
                    {colorSize.size?.[0]?.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <strong>
              {code}
              {product?.parent_item?.price}
            </strong>
          </div>
          <div>
            <div className="d-flex align-items-center mt-12px">
              <span className={styles.icon}>
                <icons.Star />
              </span>
              <h4 className="underline underline-hovered c-pointer font-weight-normal greyText">
                <ReviewModal id={product?.product_id} sku={product?.sku}  language={language} />
              </h4>
            </div>
            <div className="d-flex align-items-center mt-12px">
              <span className={styles.icon}>
                <icons.Undo />
              </span>
              <h4 className="c-pointer font-weight-normal greyText">Return</h4>
            </div>
            <div className="d-flex align-items-center mt-12px" onClick={() => { reOrder(product?.order_id) }}>
              <span className={styles.icon}>
                <icons.MyOrders height='20' width='15' />
              </span>
              <span className={styles.reorder}>Reorder</span>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default DeliveredOrders;
