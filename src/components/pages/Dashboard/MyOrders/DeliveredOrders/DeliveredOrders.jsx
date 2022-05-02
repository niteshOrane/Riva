import React from "react";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import Image from "../../../../common/LazyImage/Image";

import * as icons from "../../../../common/Icons/Icons";
import styles from "./DeliveredOrders.module.scss";
import ReviewModal from "../../../product/ProductDetails/ReviewPopUp";

import { extractColorSize } from "../../../../../util";
import { addCartId } from "../../../../../store/actions/auth";
import { getCart } from "../../../../../store/actions/cart";
import {
  buyAgainOrder,
  cancelOrder,
} from "../../../../../services/order/order.services";
import { showSnackbar } from "../../../../../store/actions/common";
import { number } from "prop-types";

const DeliveredOrders = ({
  product,
  language,
  cancelOrderOnTap,
  order_currency_code,
  status,
  check,
  handleReturn,
  increment_id,
}) => {
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

  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options?.map((o) => ({
        label: o.option_id === "92" ? "Color" : "Size",
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id,
      }))
    );
    return { colors, size };
  };

  const handleOrderDetails = (number) => {
    history.push(`/order-details/${number}`);
  };
  const colorSize = getColorSize(
    product?.parent_item?.product_option.extension_attributes
      ?.configurable_item_options
  );

  return (
    <div className={styles.card}>
      {/* <div className={styles.incrementWrap}>
        <Link to={`/order-details/${product?.increment_id}`}>
          <span className="greyText">
            Order Number: #{product?.increment_id}
          </span>
        </Link>
      </div> */}
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            {product?.extension_attributes?.product_thumbnail_image ? (
              <>
                {check &&
                  product?.qty_ordered > product?.qty_returned &&
                  product?.qty_ordered > product?.qty_refunded &&
                  product?.qty_ordered >
                    Number(product?.extension_attributes?.qty_requested) && (
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleReturn(e.target.checked, {
                          ...product,
                          currency: order_currency_code,
                          status,
                          increment_id,
                        })
                      }
                    />
                  )}
                <div
                  onClick={() => handleOrderDetails(increment_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={product?.extension_attributes?.product_thumbnail_image}
                    width="100%"
                  />
                </div>
              </>
            ) : (
              <span
                className={
                  product?.status === "processing"
                    ? styles.processIcon
                    : styles.deliveredIcon
                }
              >
                {" "}
                {product?.status}{" "}
              </span>
            )}{" "}
            <div className={styles.orderDate}>
              {moment(product?.created_at).format("MMMM DD YYYY")}
            </div>
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
              <div className={styles.colorSize}>
                <span>Quantity: </span>
                <span className={styles.greyTextQty}>
                  {product?.qty_ordered}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>
            {order_currency_code}
            {product?.parent_item?.price}
          </strong>
        </div>

        <div>
          <div className="d-flex align-items-center mt-12px">
            <span className={`material-icons-outlined ${styles.icon}`}>
              update
            </span>
            <h4 className="c-pointer font-weight-normal greyText">
              {status?.[0]?.toUpperCase() + status?.slice(1)}
            </h4>
          </div>
          {Number(product?.extension_attributes?.qty_requested) !== 0 && (
            <div className="d-flex align-items-center mt-12px">
              <span className={`material-icons-outlined ${styles.returnIcon}`}>
                assignment_return
              </span>
              <h4 className="c-pointer font-weight-normal greyText">
                RMA created
              </h4>
            </div>
          )}
          <div
            className="d-flex align-items-center mt-12px"
            onClick={() => {
              reOrder(product?.order_id);
            }}
          >
            <span className={styles.icon}>
              <icons.MyOrders height="20" width="15" />
            </span>
            <span className={styles.reorder}>Reorder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;
