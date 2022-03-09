import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import styles from "./components/Tab2Content/Tab2Content.module.scss";

import Tab2Content from "./components/Tab2Content/Tab2Content";

import { showSnackbar } from "../../../../store/actions/common";
import { cartPaymentAction } from "../../../../services/cart/cart.service";

import * as DATA_TYPES from "../../../../store/types";
import Loader from "../../../common/Loader";
import { getCartId, getCurrencyCode } from "../../../../util";
import GoSellTap from "./components/Tab2Content/GoSellTap";
import GooglePay from "./components/GooglePay";
import ApplePay from "./components/ApplePay";
import PaymentFooter from "./components/PaymentFooter";
import {
  processCodPayment,
  processCodPaymentFurther,
} from "../../../../services/payment/payment.service";
import { getCustomerCartPayments } from "../../../../store/actions/cart";
import Cod from "./components/Cod";
import TagManager from "react-gtm-module";

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

const tagManagerArgs = {
  gtmId: "GTM-K8HHCZF",
};
TagManager.initialize(tagManagerArgs);

export default function DetailTabs({
  translate,
  paymentMode,
  cartPaymentInfo,
  store,
  loading,
  setLoading,
  customObj,
}) {
  // const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState({
    title: "Tap",
    code: "tap",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const [checkoutId, setCheckoutId] = React.useState(0);
  const [paymentType, setPaymentType] = React.useState(null);
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [codInfo, setCodInfo] = useState(null);
  const [renderTab, setRenderTab] = useState(null);

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
        window.dataLayer.push({
          event: "event",
          eventProps: {
            category: "purchase",
            action: "purchase",
            label: "buy",
            value: 10,
          },
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
  useEffect(() => {
    const obj = {
      tap: <GoSellTap translate={translate} />,
      checkoutcom_card_payment: paymentType ? (
        <Tab2Content onPayNow={onPayNow} paymentType={paymentType} />
      ) : null,
    };
    setRenderTab(obj);
  }, [customObj, paymentType]);
  const getPaymentForTapCheckout = async (fnValue) => {
    const configTap = {
      method: "get",
      url: `${process.env.REACT_APP_DEV}/webapi/gettapinfo?method=${fnValue}`,
      silent: true,
    };
    await axios(configTap)
      .then((res) => {
        setPaymentType(res?.data[0]?.checkoutcom_card_payment?.active_pk);
      })
      .catch((err) => console.log(err));
  };
  const getPaymentForHyperPay = async (fnValue) => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_DEV}/webapi/gethyperpayid?method=${
        paymentMode[fnValue].code
      }&quoteId=${getCartId()}&currency=${getCurrencyCode()}&paymentType=DB`,
      silent: true,
    };
    await axios(config)
      .then((res) => {
        setCheckoutId(JSON.parse(res?.data)?.id);
      })
      .catch((err) => console.log(err));
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
      if (value === 1) {
        tabName = "renderPaymentformOne";
      } else if (value === 3) {
        tabName = "renderPaymentformThree";
      } else if (value === 5) {
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
    if (value === 1) {
      tabName = "renderPaymentformOne";
    } else if (value === 3) {
      tabName = "renderPaymentformThree";
    } else if (value === 5) {
      tabName = "renderPaymentformFive";
    }
    const isEmpty = document.getElementById(tabName)?.innerHTML === "";
    getPaymentForHyperPay(value);
    if (isEmpty) {
      const item = document.getElementById(tabName);
      item.innerHTML = "<div><h4>Hang On!! loading your card...</h4><div>";
    }
  }, [value]);
  const processCod = async (fnValue) => {
    if (fnValue === "cashondelivery") {
      const res = await processCodPayment();
      if (res?.status === 200) {
        const processedCod = await processCodPaymentFurther();
        if (processedCod.status === 200) {
          setCodInfo(processedCod?.data);
        }
      }
    }
  };

  const handleChange = async (newValue) => {
    switch (newValue) {
      case "tap":
        dispatch(getCustomerCartPayments());
        // getPaymentForHyperPay(newValue);
        // setValue(newValue);
        setName({
          ...name,
          code: newValue,
        });
        break;
      case "checkoutcom_card_payment":
        // setValue(newValue);
        // getPaymentForHyperPay(newValue);
        dispatch(getCustomerCartPayments());
        getPaymentForTapCheckout(newValue);
        setName({
          ...name,
          code: newValue,
        });
        break;
      case 2:
        // setValue(newValue);
        // getPaymentForHyperPay(newValue);
        dispatch(getCustomerCartPayments());
        setValue(newValue);
        processCod("cashondelivery");
        break;
      case 3:
        // setValue(newValue);
        dispatch(getCustomerCartPayments());
        getPaymentForHyperPay(newValue);
        setValue(newValue);
        break;
      case 4:
        // getPaymentForHyperPay(newValue);
        dispatch(getCustomerCartPayments());
        setValue(newValue);
        break;
      case 5:
        // setValue(newValue);
        dispatch(getCustomerCartPayments());
        getPaymentForHyperPay(newValue);
        setValue(newValue);
        break;
      default:
        setValue(newValue);
        break;
    }
  };
  const changeStyle = (fn, newValue, code) => {
    handleChange(code);
    setName({
      title: fn,
      code,
    });
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <h5 className={styles.payWith}>{translate?.deliveryAddress?.PAY}</h5>
          <div
            value={value}
            className={styles.reGrid}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {paymentMethod?.map((li, idx) => (
              <div
                onClick={() => changeStyle(li?.title, idx, li?.code)}
                className={styles.rePayment}
                label={li?.title}
                style={{
                  background: li?.title === name.title ? "#676666" : null,
                  color: li?.title === name.title ? "#ffffff" : "#000000",
                  marginBottom: "0.5rem",
                  marginRight: "10px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.16)",
                }}
                {...a11yProps(idx)}
              >
                {" "}
                <div className={styles.rePaymenttitle}>{li?.title}</div>
              </div>
            ))}
          </div>
        </Box>

        <div className={classes.tabContent}>
          {/* <TabPanel className={styles.goSellWrap} value={value} index={0}>
            <GoSellTap translate={translate} />
           
          </TabPanel>
          <TabPanel value={value} index={2}>
          {paymentType && (
              <Tab2Content onPayNow={onPayNow} paymentType={paymentType} />
            )}
            {codInfo && <Cod codInfo={codInfo} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {paymentType && (
              <Tab2Content onPayNow={onPayNow} paymentType={paymentType} />
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div id="renderPaymentformThree">{renderPaymentform()}</div>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <GooglePay
              style={styles}
              id="renderPaymentformFour"
              cartPaymentInfo={cartPaymentInfo}
              store={store}
            />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <div id="renderPaymentformFive">{renderPaymentform()}</div>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ApplePay />
          </TabPanel> */}
          {renderTab && renderTab[name.code]}
          {loading && <span>Please wait processing you payment...</span>}
        </div>
      </Box>
      <PaymentFooter translate={translate} />
    </>
  );
}
