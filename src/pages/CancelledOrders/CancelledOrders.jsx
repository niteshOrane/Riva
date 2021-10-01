import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import styles from "./CancelledOrders.module.scss";
import { useSelector } from "react-redux";
import CancelledOrdersCards from "../../components/pages/Dashboard/MyOrders/CancelledOrdersCards/CancelledOrdersCards";
import { getOrderList } from "../../services/order/order.services";
import CircularProgress from "@material-ui/core/CircularProgress";
const randomProducts = [
  {
    image:
      "https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/706fcd90-13fe-473f-9cd0-26330c64249a.png",
    name: "High Waist Slim Fit Trouser",
    color: "White",
    size: "XL",
    price: "25.00",
    refundId: "#R0374915036",
  },
];

function CancelledOrders() {
  const { customer } = useSelector((state) => state.auth);
  const [orderList, setOrderList] = React.useState([]);
  const getOrders = async (id) => {
    const res = await getOrderList(id);
    if (res?.status === 200 && res?.data) {
      const temp = res?.data?.items?.map((li) => ({
        increment_id: li?.increment_id,
        currency_code: li?.base_currency_code,
        status: li.status,
        list: li?.items?.filter((a) => a.product_type === "simple"),
      }));
      setOrderList(temp?.filter((li) => li.status === "canceled"));
    }
  };
  React.useEffect(() => {
    getOrders(customer?.customerID);
  }, []);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className={styles.circlesContainer}>
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">Order Cancelled</h2>
            {orderList.length ? (
              orderList?.map((li) => (
                <CancelledOrdersCards
                  products={li?.list}
                  code={li?.currency_code}
                  increment_id={li?.increment_id}
                />
              ))
            ) : (
              <div className = {styles.progress}>
                <CircularProgress size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelledOrders;
