import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";
import { useSelector } from "react-redux";
import { getOrderList } from "../../services/order/order.services";
import styles from "./Delivered.module.scss"

import CircularProgress from "@material-ui/core/CircularProgress";

function Delivered({ title = "Delivered" }) {
  const { customer } = useSelector((state) => state.auth);

  const { language } = useSelector((state) => state?.common?.store);
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
      setOrderList(temp);
    }
  };
  React.useEffect(() => {
    getOrders(customer?.customerID);
  }, []);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
      
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">{title}</h2>

            {/* {orderList.length>0  &&  <DeliveredOrders products = {orderList}  />} */}
            {orderList.length > 0 ? (
              orderList
                ?.filter((li) => li.status !== "canceled")
                ?.map((li) => (
                  <DeliveredOrders
                    products={li.list}
                    status={li.status}
                    code={li?.currency_code}
                    increment_id={li?.increment_id}
                    language={language}
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

export default Delivered;
