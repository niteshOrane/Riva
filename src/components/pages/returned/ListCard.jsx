import React from "react";
import moment from "moment";
import styles from "../Dashboard/MyOrders/DeliveredOrders/DeliveredOrders.module.scss";
import Image from "../../../components/common/LazyImage/Image";
import { useSelector } from "react-redux";


const statusColor = {
  pending:"orange",
  authorized:"green",
  denied:"#FF1818"

}
const statusIcon = {
  pending:"hourglass_top",
  authorized:"task_alt",
  denied:"do_not_disturb_off"
}

const DeliveredOrders = ({ product }) => {
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  return (
    <div className={styles.card}>
      <div className={styles.carItem}>
        <div className={styles.col1}>
          <div className={styles.img}>
            <Image src={product?.image} width="100%" />
            <div className={styles.orderDate}>
              {moment(product?.date_requested).format("MMMM DD YYYY")}
            </div>
          </div>

          <div>
            <h3 className="font-weight-normal">{product?.product_name}</h3>
            <div className="mt-12px">
              <div>
                <span className={styles.colorSize}>Order#:</span>{" "}
                <span className={styles.greyText}>
                  {product?.order_increment_id}
                </span>
              </div>
              <div className={styles.colorSize}>
                <span>Color: </span>
                <span className={styles.greyText}>{product?.color}</span>
              </div>
              <div className={styles.colorSize}>
                <span>Size: </span>
                <span className={styles.greyText}>{product?.size}</span>
              </div>
              <div className={styles.colorSize}>
                <span>Quantity: </span>
                <span className={styles.greyTextQty}>
                  {Math.round(product?.qty_requested)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <strong>
            {currency_symbol} {parseFloat(product?.price)?.toFixed(2)}
          </strong>
        </div>
        <div>
          <div className="d-flex align-items-center mt-12px">
            <span style={{color:statusColor[product?.itemstatus]}} className={`material-icons-outlined ${styles.icon}`}>
              {statusIcon[product?.itemstatus]}
            </span>
            <h4 style={{color:statusColor[product?.itemstatus]}} className="c-pointer font-weight-normal greyText">
              {product?.itemstatus?.[0]?.toUpperCase()+product?.itemstatus?.slice(1)}
            </h4>
          </div>
        
          <div className="d-flex align-items-center mt-12px">
            <span className={`material-icons-outlined ${styles.icon}`}>
              credit_card
            </span>
            <h4 className="c-pointer font-weight-normal greyText">
              {product?.resolution}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredOrders;
