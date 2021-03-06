import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useHistory } from "react-router-dom";

import styles from "./components/Tab2Content/Tab2Content.module.scss";

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
    border: "1px solid #ddd",
    borderLeft: "0",
  },
  arabicIcon: {
    marginLeft: "10px",
    whiteSpace: "noWrap",
  },
}));
const selectedIndicatorStyle = {
  width: "4px",
  background: "#000",
  left: "0",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}



const PaymentTabs = React.memo(
  ({ paymentMode, cartPaymentInfo, store, loading, setLoading }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [checkoutId, setCheckoutId] = React.useState(0);
    const [paymentType, setPaymentType] = React.useState(null);
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [paymentMethod, setPaymentMethod] = useState([]);
    const { language } = useSelector((state) => state?.common?.store);
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
        url: `${process.env.REACT_APP_DEV}/webapi/gettapinfo?method=${paymentMethod[fnValue]?.code}`,
        silent: true,
      };
      await axios(configTap).then((res) => {
        setPaymentType(res?.data[0]?.checkoutcom_card_payment?.active_pk);
      });
    };
    const getPaymentForHyperPay = async (fnValue) => {
      const config = {
        method: "post",
        url: `${process.env.REACT_APP_DEV}/webapi/gethyperpayid?method=${
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
    return (
      <div className="d-flex my-20px w-80">
        <Tabs
          className={classes.tabs}
          TabIndicatorProps={{ style: selectedIndicatorStyle }}
          orientation="vertical"
          variant="scrollable"
          value={value}
          style={{ background: "#f4f4f5" }}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          {paymentMethod?.map((tab, i) => (
            <Tab
              id={tab.code}
              className={`${classes.tab} ${
                value === i ? classes.selectedTabLink : ""
              }`}
              disableRipple
              label={
                <div className="d-flex align-items-center w-100" id={tab.code}>
                  <span
                    id={tab.code}
                    className={
                      language === "Arabic"
                        ? `${classes.icon} ${classes.arabicIcon}`
                        : `${classes.icon}`
                    }
                  >
                    {tab?.icon || <tabIcons.Icon2 />}
                  </span>{" "}
                  <span
                    id={tab.code}
                    className={
                      language === "Arabic"
                        ? `${classes.tbText} ${classes.arabicIcon}`
                        : `${classes.tbText}`
                    }
                  >
                    {tab.title}
                  </span>
                </div>
              }
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
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
      </div>
    );
  }
);

export default PaymentTabs;
