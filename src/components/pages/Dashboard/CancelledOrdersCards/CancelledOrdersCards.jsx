import React from "react";
import { useSelector } from "react-redux";
import * as icons from "../../../common/Icons/Icons";
import styles from "./CancelledOrdersCards.module.scss";
import {getOrderList} from "../../../../services/order/order.services"

const CancelledOrdersCards = ({ products }) => {
  const { customer } = useSelector((state) => state.auth);

  const [orderList, setOrderList] = React.useState([]);
  const [status, setStatus] = React.useState(null);

  const getOrders = async (id) => {
    const res = await getOrderList(id);
    if (res?.status === 200 && res?.data) {
      const temp = res?.data?.items?.map((li) => ({
        status: li.status,
        list: li?.items?.filter((a) => a.product_type === "simple"),
      }));
      setOrderList(temp);
    }
    setStatus(res?.status);
  };
  React.useEffect(() => {
    getOrders(customer?.customerID);
  }, []);
  return products?.map((product) => (
    <div className={styles.card}>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            <img src={product?.image} width="100%" alt={product?.name} />
          </div>
          <div>
            <h3 className="font-weight-normal">{product?.name}</h3>
            <div className="mt-12px">
              <div className={styles.colorSize}>
                <span>Color: </span>
                <span className={styles.greyText}>{product?.color}</span>
              </div>
              <div className={styles.colorSize}>
                <span>Size: </span>
                <span className={styles.greyText}>{product?.size}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>${product?.price}</strong>
        </div>
        <div>
          <h4 className="greyText">
            <span className={styles.deliveredIcon}>Cancelled</span> 
          </h4>
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
          $184.17 has been refunded to your PhonePe Wallet on May 21.Credit Card
          refunds will take 7 business days.
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
