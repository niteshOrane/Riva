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
import { buyAgainOrder, cancelOrder } from "../../../../../services/order/order.services";
import { showSnackbar } from "../../../../../store/actions/common";


const DeliveredOrders = ({ product, language, cancelOrderOnTap }) => {
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

  const cancelOrderMyOrder = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to cancel order.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        cancelOrderOnTap(id);
      }
    });
  };

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
        <Link to={`/order-details/${product?.increment_id}`}>
          <span className="greyText">
            Order Number: #{product?.increment_id}
          </span>
        </Link>
      </div>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <Link to={`/order-details/${product?.increment_id}`}>
            <div className={styles.img}>
              {product?.extension_attributes?.product_thumbnail_image ?
                 <Image src={product?.extension_attributes?.product_thumbnail_image} width="100%" /> : <span
                  className={
                    product?.status === "processing"
                      ? styles.processIcon
                      : styles.deliveredIcon
                  }
                >
                  {" "}
                  {product?.status}{" "}
                </span>}{" "}
              <div className={styles.orderDate}>
                {moment(product?.created_at).format("MMMM DD YYYY")}
              </div>
            </div>
          </Link>

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
            {product?.order_currency_code}
            {product?.parent_item?.price}
          </strong>
        </div>

        <div>
          <div className="d-flex align-items-center mt-12px">
            <span className={`material-icons-outlined ${styles.icon}`}>
              update
            </span>
            <h4 className="c-pointer font-weight-normal greyText">
              {product?.status?.[0]?.toUpperCase() + product?.status?.slice(1)}
            </h4>
          </div>
          <div className="d-flex align-items-center mt-12px">
            <span className={styles.icon}>
              <icons.Star />
            </span>
            <h4 className="underline underline-hovered c-pointer font-weight-normal greyText">
              <ReviewModal
                id={product?.product_id}
                sku={product?.sku}
                language={language}
              />
            </h4>
          </div>
          <div className="d-flex align-items-center mt-12px">
            <span className={styles.icon}>
              <icons.Undo />
            </span>
            <h4 className="c-pointer font-weight-normal greyText">Return</h4>
          </div>
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
          {/* {product?.status === "pending" &&  (
            <div
              className="d-flex align-items-center mt-12px"
              onClick={() => {
                cancelOrderMyOrder(product?.increment_id);
              }}
            >
              <span
                style={{ fontSize: "18px" }}
                className={`material-icons ${styles.icon}`}
              >
                not_interested
              </span>
              <span className={styles.reorder}>Cancel Order</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;
