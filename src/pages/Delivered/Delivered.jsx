import React from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";
import { useSelector } from "react-redux";
import { getOrderList } from "../../services/order/order.services";


function Delivered({ title = "Delivered" }) {
  const { customer } = useSelector((state) => state.auth);
  const [orderList, setOrderList] = React.useState([]);
  const getOrders = async (id) => {
    const res = await getOrderList(id);
    console.log(res)
    if (res?.status === 200 && res?.data) {
      const temp = res?.data?.items?.map((li) => ({
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
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">{title}</h2>

            {/* {orderList.length>0  &&  <DeliveredOrders products = {orderList}  />} */}
            {orderList.length > 0 &&
              orderList.map((li) => (
                <DeliveredOrders products={li.list} status={li.status} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
