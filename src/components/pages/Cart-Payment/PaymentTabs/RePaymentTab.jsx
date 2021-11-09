import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./components/Tab2Content/Tab2Content.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import * as tabIcons from "../Icons/Icons";
import Tab2Content from "./components/Tab2Content/Tab2Content";

import { showSnackbar } from "../../../../store/actions/common";
import { cartPaymentAction } from "../../../../services/cart/cart.service";

import * as DATA_TYPES from "../../../../store/types";
import Loader from "../../../common/Loader";

import { getCartId, getCurrencyCode } from "../../../../util";
import GoSellTap from "./components/Tab2Content/GoSellTap";
import GooglePay from "./components/GooglePay";
import ApplePay from "./components/ApplePay";
import RePaymentTab from "./RePaymentTab";

const dummyPay = [
  "TAP",
  "MADA DEBIT CARD",
  "HYPERPAY VISA",
  "HYPERPAY MASTERCARD",
  "GOOGLE PAY",
  "APPLE PAY",
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  selectedTabLink: {
    background: "#fff",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    maxWidth: "46%",
    width: "100%",
  },
  tab: {
    maxWidth: "100%",
  },
  icon: {
    display: "inline-block",
    width: "20px",
  },
  tbText: {
    display: "inline-block",
    textAlign: "left",
    paddingLeft: "12px",
    maxWidth: "fit-content",
    fontSize: ".9rem",
  },
  tabContent: {
    maxWidth: "50%",
    width: "100%",
    // border: "1px solid #ddd",
    borderLeft: "0",
  },
  arabicIcon: {
    marginLeft: "10px",
    whiteSpace: "noWrap",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailTabs({
  paymentMode,
  cartPaymentInfo,
  store,
  loading,
  setLoading,
}) {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("mada debit card");
  const history = useHistory();
  const dispatch = useDispatch();
  const [checkoutId, setCheckoutId] = React.useState(0);
  const [paymentType, setPaymentType] = React.useState(null);
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const onPayNow = async (e) => {
    if (e) {
      setLoading(true);
      const res = await cartPaymentAction(e, "checkoutcom_card_payment");
      if (res.status === 200) {
        setLoading(false);
        dispatch(showSnackbar("Payment success", "success"));
        dispatch({
          type: DATA_TYPES.SET_CART_ID,
          payload: { cart_id: 0 },
        });
        dispatch({
          type: DATA_TYPES.SET_BULK_CART,
          payload: [],
        });
        history.push(
          `/order-confirmed/${res.data?.[0]["order_id"]}/${res.data?.[0]["display_order_id"]}`
        );
      } else {
        setLoading(false);
        dispatch(showSnackbar("Payment Failed", "error"));
      }
    }
  };
  const getPaymentForTapCheckout = async (fnValue) => {
    const configTap = {
      method: "get",
      url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/gettapinfo?method=${paymentMethod[fnValue]?.code}`,
      silent: true,
    };
    await axios(configTap).then((res) => {
      setPaymentType(res?.data[0]?.checkoutcom_card_payment?.active_pk);
    });
  };
  const getPaymentForHyperPay = async (fnValue) => {
    const config = {
      method: "post",
      url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/gethyperpayid?method=${
        paymentMode[fnValue].code
      }&quoteId=${getCartId()}&currency=${getCurrencyCode()}&paymentType=DB`,
      silent: true,
    };
    await axios(config).then((res) => {
      setCheckoutId(JSON.parse(res.data).id);
    });
  };
  useEffect(() => {
    if (paymentMode && paymentMode.length > 0) {
      setPaymentMethod(paymentMode);
    }
  }, [paymentMode]);

  const renderPaymentform = () => {
    if (checkoutId) {
      const script = document.createElement("script");
      script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.async = true;
      document.body.appendChild(script);
      const form = document.createElement("form");
      form.action = `${window.location.origin}/#/result/${paymentMode[value].code}`;
      form.setAttribute("class", "paymentWidgets");
      form.setAttribute(
        "data-brands",
        "VISA MASTER AMEX" || paymentMode[value].tbText
      );

      let tabName;
      if (value === 0) {
        tabName = "renderPaymentformOne";
      } else if (value === 2) {
        tabName = "renderPaymentformThree";
      } else if (value === 4) {
        tabName = "renderPaymentformFive";
      }
      let menu = document.getElementById(tabName);

      let child = menu?.lastElementChild;
      while (child) {
        menu?.removeChild(child);
        child = menu?.lastElementChild;
      }

      if (menu && menu != null) {
        menu.innerHTML = "";
        menu = menu?.append(form);
      }
    }
  };
  useEffect(() => {
    let tabName;
    if (value === 0) {
      tabName = "renderPaymentformOne";
    } else if (value === 2) {
      tabName = "renderPaymentformThree";
    } else if (value === 4) {
      tabName = "renderPaymentformFive";
    }
    const isEmpty = document.getElementById(tabName)?.innerHTML === "";
    getPaymentForHyperPay(value);
    if (isEmpty) {
      const item = document.getElementById(tabName);
      item.innerHTML = "<div><h4>Hang On!! loading your card...</h4><div>";
    }
  }, [value]);
 const handleChangeVal = (event, newValue) => {
    setValue(newValue);
    // handleChange()
  };
  const handleChange = async (_, newValue) => {
    switch (newValue) {
      case 1:
        setValue(newValue);
        getPaymentForTapCheckout(newValue);
        break;
      case 2:
        setValue(newValue);
        getPaymentForHyperPay(newValue);
        break;
      case 3:
        setValue(newValue);
        break;
      case 4:
        getPaymentForHyperPay(newValue);
        setValue(newValue);
        break;
      case 5:
        setValue(newValue);
        break;
      default:
        setValue(newValue);
        break;
    }
  };
  if (loading)
    return (
      <div className={styles.tapLoader}>
        <Loader />
      </div>
    );

  const selectedIndicatorStyle = {
    width: "0px",
    background: "#000",
    left: "0",
  };
 
  const changeStyle = (fn) => {
    setName(fn);
  };

  return (
    <>
      {/* <h2 className={styles.choose}>Choose Payment Mode</h2> */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <h5 className={styles.payWith}>Pay With</h5>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={`${styles.reGrid}`}
            variant="scrollable"
            orientation="horizontal"
            TabIndicatorProps={{ style: selectedIndicatorStyle }}
          >
            {paymentMethod?.map((li, idx) => (
              <Tab
                onClick={() => changeStyle(li?.title)}
                className={styles.rePayment}
                label={li.title}
                style={{
                  background: li?.title === name ? "#676666" : null,
                  color: li?.title === name ? "#ffffff" : "#000000",
                  marginBottom: "1.5rem",
                }}
                {...a11yProps(idx)}
              />
            ))}
          </Tabs>
        </Box>
        <div className={classes.tabContent}>
          <TabPanel className={styles.goSellWrap} value={value} index={0}>
            <div id="renderPaymentformOne">{renderPaymentform()}</div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {paymentType && (
              <Tab2Content onPayNow={onPayNow} paymentType={paymentType} />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div id="renderPaymentformThree">{renderPaymentform()}</div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <GooglePay
              style={styles}
              id="renderPaymentformFour"
              cartPaymentInfo={cartPaymentInfo}
              store={store}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div id="renderPaymentformFive">{renderPaymentform()}</div>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ApplePay />
          </TabPanel>
        </div>
      </Box>
    </>
  );
}
