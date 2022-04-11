/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import TagManager from "react-gtm-module";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";

import { cancelOrder, getOrderList } from "../../services/order/order.services";
import styles from "./Delivered.module.scss";

import Pagination from "./Pagination";
import { showSnackbar } from "../../store/actions/common";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import { addToReturn } from "../../store/actions/stats";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";
import { Divider } from "@material-ui/core";

const excludeList = ["pending", "canceled", "closed"];

function Delivered() {
  const { customer } = useSelector((state) => state.auth);
  const { orderType } = useParams();
  const dispatch = useDispatch();
  useAnalytics();
  useDocumentTitle(orderType);
  const { language } = useSelector((state) => state?.common?.store);

  const [orderList, setOrderList] = React.useState([]);
  const [status, setStatus] = React.useState(null);
  const [returnedProduct, setReturnedProduct] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [expanded, setExpanded] = React.useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [finalList, setFinalList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [isMore, setIsMore] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setShowCheck(false);
    setExpanded(isExpanded ? panel : false);
  };
  const getOrders = async (id) => {
    setStatus(null);
    const res = await getOrderList(id, currentPage);
    if (res?.status === 200 && res?.data) {
      if (orderType === "delivered") {
        setOrderList(
          res?.data?.items?.filter((li) => li?.status === "delivered")
        );
        setStatus(res?.status);
        setTotalCount(res?.data?.total_count);
      } else {
        setOrderList(res?.data?.items);
        setStatus(res?.status);
        setTotalCount(res?.data?.total_count);
      }
    }
  };
  const cancelOrderOnTap = async (id) => {
    const res = await cancelOrder(id);
    if (res?.status === 200) {
      dispatch(showSnackbar("Order Cancelled successfully", "success"));
    }
  };
  const handleReturn = (value, item) => {
    if (value) {
      setReturnedProduct((prev) => {
        return [...prev, item];
      });
    } else {
      setReturnedProduct((prev) => {
        return prev?.filter((li) => li?.sku !== item?.sku);
      });
    }
  };
  const dispatchList = () => {
    dispatch(addToReturn(returnedProduct));
  };
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: process.env.REACT_APP_GTM,
    };
    TagManager.initialize(tagManagerArgs);
  }, []);
  React.useEffect(() => {
    getOrders(customer?.customerID, currentPage);
  }, [currentPage]);
  React.useEffect(() => {
    getOrders(customer?.customerID, currentPage);
  }, [orderType]);
  React.useEffect(() => {
    if (orderType === "orders") {
      const data = orderList?.filter((pro) => {
        if (pro.status !== "canceled") {
          return pro;
        }
      }, []);
      if (data) {
        setFinalList(data);
        setIsMore((prev) => prev + data?.length);
      }
    } else if (orderType === "delivered") {
      const data = orderList?.filter((pro) => {
        if (pro.status === "delivered") {
          return pro;
        }
      }, []);
      if (data) {
        setFinalList(data);
        setIsMore((prev) => prev + data?.length);
      }
    }
  }, [orderType, orderList]);
  const changePageFor = () => {
    if (totalCount > finalList.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const changePageBack = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">
              {orderType?.[0]?.toUpperCase() + orderType.slice(1)}
            </h2>
            {finalList.length > 0 ? (
              finalList?.map((li) => (
                <Accordion
                  expanded={expanded === li?.increment_id}
                  onChange={handleChange(li?.increment_id)}
                  style={{
                    margin: "20px 0px",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>
                      Order ID: <strong>#{li?.increment_id}</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {showCheck && (
                      <Alert severity="success">
                        Select the product you want to return
                      </Alert>
                    )}
                    {li?.items
                      ?.filter((value, idx) => idx % 2)
                      ?.map((a) => (
                        <div>
                          <DeliveredOrders
                            product={a}
                            language={language}
                            cancelOrderOnTap={cancelOrderOnTap}
                            order_currency_code={li?.order_currency_code}
                            status={li?.status}
                            check={showCheck}
                            handleReturn={handleReturn}
                            increment_id={li?.increment_id}
                          />
                        </div>
                      ))}
                  </AccordionDetails>
                  <section className={styles.detailCard}>
                    <Card className={styles.detailSubCard}>
                      <div>
                        <span>Order Total: </span>
                        <strong>
                          {li?.order_currency_code}{" "}
                          {li?.grand_total}
                        </strong>
                      </div>
                      <Divider />
                      <div>
                        <span>Shipping Discription: </span>
                        <strong>{li?.shipping_description}</strong>
                      </div>
                      <Divider />
                      <div>
                        <span>Shipping Amount: </span>
                        <strong>
                          {li?.order_currency_code}{" "}
                          {li?.shipping_amount}
                        </strong>
                      </div>
                      <Divider />
                      <div>
                        <span>Shipping Inclusive Tax: </span>
                        <strong>
                          {li?.order_currency_code}{" "}
                          {li?.shipping_incl_tax}
                        </strong>
                      </div>
                      <Divider />
                      <div>
                        <span>Discount: </span>
                        <strong>
                          {li?.order_currency_code}{" "}
                          {li?.base_discount_amount}
                        </strong>
                      </div>
                      <Divider />
                      <div>
                        <span>Shipping Address: </span>
                        <strong>
                          {li?.extension_attributes?.shipping_address
                            ?.extension_attributes?.building_name_number ??
                            li?.extension_attributes?.shipping_address
                              ?.street?.[0]}
                          ,{" "}
                          {li?.extension_attributes?.shipping_address
                            ?.extension_attributes?.house_name_number ??
                            li?.extension_attributes?.shipping_address
                              ?.street?.[1]}
                          ,{" "}
                          {li?.extension_attributes?.shipping_address
                            ?.extension_attributes?.block ??
                            li?.extension_attributes?.shipping_address?.city}
                          ,{" "}
                          {li?.extension_attributes?.shipping_address?.region ??
                            li?.extension_attributes?.shipping_address?.city}
                          , {li?.extension_attributes?.shipping_address?.city},{" "}
                          {li?.extension_attributes?.shipping_address?.postcode}
                        </strong>
                      </div>
                    </Card>
                  </section>
                  {!excludeList.includes(li?.status) && (
                    <section className={styles.reqBtn}>
                      {returnedProduct?.length === 0 && (
                        <button
                          onClick={() => setShowCheck(!showCheck)}
                          type="button"
                        >
                          Request Return
                        </button>
                      )}
                      {returnedProduct?.length > 0 && (
                        <Link to="/retur-order">
                          <button onClick={dispatchList} type="button">
                            Continue to return
                          </button>
                        </Link>
                      )}
                    </section>
                  )}
                </Accordion>
              ))
            ) : !status ? (
              <div className={styles.progress}>
                <CircularProgress size={50} />
              </div>
            ) : (
              <div className={styles.progress}>No record</div>
            )}
            <section className={styles.pageSec}>
              <div>
                <button
                  className={styles.prevNextBtn}
                  type="button"
                  onClick={changePageBack}
                  style={{
                    backgroundColor: currentPage === 1 ? "gray" : "black",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={styles.prevNextBtn}
                  type="button"
                  onClick={changePageFor}
                  disabled={finalList.length === 0}
                  style={{
                    backgroundColor: finalList.length === 0 ? "gray" : "black",
                    cursor: finalList.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Next
                </button>
              </div>

              <span>
                current page: <strong>{currentPage}</strong>
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
