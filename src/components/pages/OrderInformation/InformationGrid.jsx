import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router";
import moment from "moment";
import { getOrderList } from "../../../services/order/order.services";
import { showSnackbar } from "../../../store/actions/common";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import styles from "./Information.module.scss";
import InformationTable from "./InformationTable";
import { Link } from "react-router-dom";

function InformationGrid() {
  const { customer } = useSelector((state) => state.auth);
  const [orderInfo, setOrderInfo] = React.useState(null);
  const [orderDetails, setOrderDetails] = React.useState({
    product: null,
    status: null,
  });
  const dispatch = useDispatch();
  const { number } = useParams();

  const getOrderDetail = async () => {
    if (number) {
      const res2 = await getOrderList(customer?.customerID);
      if (res2.status === 200 && res2?.data?.items) {
        const property = res2?.data?.items?.find(
          (li) => li?.increment_id === number
        );
        setOrderDetails({
          ...orderDetails,
          product: property?.items?.find((li) => li.product_type === "simple"),
          status: property?.status,
          currency: property?.base_currency_code,
          paymentInfo: {
            price: property?.items?.find((li) => li.product_type === "simple")
              ?.price,
            grandTotal: property?.grand_total,
            shippingAmount: property?.shipping_amount,
            subtotal: property?.subtotal,
          },
        });
        setOrderInfo({
          shippingAddress: property?.billing_address,
          shippingDescription: property?.shipping_description,
          billingAddress: property?.billing_address,
          payment: property?.payment,
        });
      } else {
        dispatch(showSnackbar("No product found"), "error");
      }
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  if (!orderInfo) {
    return (
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.loader}>
            <h2>Fetching Order Details</h2>
            <div className={styles.ske}>
              <Skeleton width="40rem" height="30rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    shippingAddress = { street: "", city: "", region: "", postcode: "" },
    shippingDescription,
    payment,
  } = orderInfo;
  const {
    street = "",
    city = "",
    region = "",
    postcode = "",
  } = shippingAddress;
  return (
    <div className="container-with-circles my-20px">
      <div className="d-flex h-100">
        <Sidebar />
        <div>
          <h2>Order Information</h2>

          <div className="d-flex justify-content-between">
            <h4 className={styles.headInfo}>Order Number #{number}</h4>
            <h4 className={styles.headInfo}>
              {" "}
              Order Place Date:{" "}
              {moment(orderDetails?.product?.created_at).format("MMMM DD YYYY")}
            </h4>
          </div>
          <hr />
          <div className={styles.mainBox}>
            <section className={styles.grid}>
              <div>
                <span className={styles.heading}>Shipping Address</span>
                <hr className={styles.divider} />
                <div className={styles.addr}>
                  <p>
                    {street?.[0]}, {city},
                  </p>

                  <p>{region},</p>
                  <p>{postcode}</p>
                </div>
              </div>
            </section>
            <section className={styles.grid}>
              <div>
                <span className={styles.heading}>Shipping Method</span>
                <hr className={styles.divider} />
                <div className={styles.addr}>
                  <p>{shippingDescription}</p>
                </div>
              </div>
            </section>
            <section className={styles.grid}>
              <div>
                <span className={styles.heading}>Billing Address</span>
                <hr className={styles.divider} />
                <div className={styles.addr}>
                  <p>{street?.[0]},</p>
                  <p>{city},</p>
                  <p>{region},</p>
                  <p>{postcode}</p>
                </div>
              </div>
            </section>
            <section className={styles.grid}>
              <div>
                <span className={styles.heading}>Payment Method</span>
                <hr className={styles.divider} />
                <div className={styles.addr}>
                  <p>{payment?.method}</p>
                </div>
              </div>
            </section>
          </div>
          <div>
            <InformationTable orderDetails={orderDetails} />
          </div>
          <hr/>
          <div className = {styles.trackLink}>
            <Link
              to={{
                pathname: "/track-orders",
                state: number,
              }}
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationGrid;
