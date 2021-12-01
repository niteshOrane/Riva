import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./CancelledOrdersCards.module.scss";
import * as icons from "../../../../common/Icons/Icons";
import { extractColorSize } from "../../../../../util";


import { addCartId } from '../../../../../store/actions/auth';

import { getCart } from "../../../../../store/actions/cart";

import {
  buyAgainOrder
} from "../../../../../services/order/order.services";


import { showSnackbar } from "../../../../../store/actions/common";


const CancelledOrdersCards = ({ products, code, increment_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  const colorSize = getColorSize(
    products[0]?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );
  return products?.map((product) => (
    <div className={styles.card}>
      <div className={styles.incrementWrap}>
        <div>
          <span className="greyText">Order Number: #{increment_id}</span>
          <br />
        </div>
        {/* {moment(product?.created_at).format("MMMM Do YYYY")} */}
        <div className="d-flex align-items-center mt-12px" onClick={() => { reOrder(product?.order_id) }}>
          <span className={styles.icon}>
            <icons.MyOrders height='20' width='15' />
          </span>
          <span className={styles.reorder}>Reorder</span>
        </div>
      </div>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            {/* <img src={product?.image} width="100%" alt={product?.name} /> */}
            <h4 className="greyText">
              <span className={styles.deliveredIcon}>Cancelled</span> 
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
          <p className={`mt-12px greyText ${styles.fontSmall}`}>
            You requested a cancellation because you changed your mind about
            this product.
          </p>
        </div>
      </div>
      <div className="my-20px">
        <span className={styles.greenText}>Refund Completed</span>
        &nbsp;&nbsp;&nbsp;
        <span className="greyText">(Refund ID: {product?.refundId})</span>
        <p className={`greyText ${styles.fontSmall}`}>
          {product?.amount_refunded} has been refunded to your PhonePe Wallet on
          May 21.Credit Card refunds will take 7 business days.
        </p>
        <p className={`greyText ${styles.fontSmall}`}>
          For any questions, please contact your bank with reference number
          P2105111838047111096235.
        </p>
      </div>
    </div>
  ));
};

export default CancelledOrdersCards;
