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
import { getCartId, getCurrencyCode, getStoreData } from "../../../../util";
import GoSellTap from "./components/Tab2Content/GoSellTap";
import GooglePay from "./components/GooglePay";
import ApplePay from "./components/ApplePay";
import PaymentFooter from "./components/PaymentFooter";
import {
  processCodPayment,
  processCodPaymentFurther,
  processGpayPaymentFurther,
} from "../../../../services/payment/payment.service";
import { getCustomerCartPayments } from "../../../../store/actions/cart";
import Cod from "./components/Cod";
import TagManager from "react-gtm-module";
import API_URL from "../../../../enviroments/index";

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
  customObj,
  getFreeDeliveryInfo,
  
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
  const [loading, setLoading] = useState(false);
  const [gPayData, setGPayData] = useState(null);

  const onPayNow = async (e) => {
    if (e) {
      setLoading(true);
      const res = await cartPaymentAction(e, "checkoutcom_card_payment");
      if (
        res.status === 200 &&
        res.data?.[0]["order_id"] &&
        res.data?.[0]["display_order_id"]
      ) {
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
        dispatch(showSnackbar("Payment Failed, redirecting to cart", "error"));
        setTimeout(() => {
          history.push("/shopping-cart");
        }, 1500);
      }
    }
  };

  useEffect(() => {
    const obj = {
      tap: <GoSellTap translate={translate} />,
      checkoutcom_card_payment: paymentType ? (
        <Tab2Content onPayNow={onPayNow} paymentType={paymentType} />
      ) : null,
      checkoutcom_google_pay: gPayData ? (
        <GooglePay
          cartPaymentInfo={cartPaymentInfo}
          store={store}
          styles={styles}
          gPayData={gPayData}
        />
      ) : null,
      cashondelivery: <Cod codInfo={codInfo && codInfo} />,
    };
    setRenderTab(obj);
  }, [customObj, paymentType,gPayData]);

  const getPaymentForTapCheckout = async (payValue) => {
    const configTap = {
      method: "get",
      url: `${API_URL}/rest/${
        getStoreData()?.store_code
      }/V1/webapi/gettapinfo?method=${payValue}`,
      silent: true,
    };
    await axios(configTap)
      .then((res) => {
        setPaymentType(res?.data[0]?.checkoutcom_card_payment?.active_pk);
      })
      .catch((err) => console.log(err));
  };

  // const getPaymentForHyperPay = async (fnValue) => {
  //   const config = {
  //     method: "post",
  //     url: `${API_URL}/rest/${
  //       getStoreData()?.store_code
  //     }/V1/webapi/gethyperpayid?method=${
  //       paymentMode[fnValue].code
  //     }&quoteId=${getCartId()}&currency=${getCurrencyCode()}&paymentType=DB`,
  //     silent: true,
  //   };
  //   await axios(config)
  //     .then((res) => {
  //       setCheckoutId(JSON.parse(res?.data)?.id);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   let tabName;
  //   if (value === 1) {
  //     tabName = "renderPaymentformOne";
  //   } else if (value === 3) {
  //     tabName = "renderPaymentformThree";
  //   } else if (value === 5) {
  //     tabName = "renderPaymentformFive";
  //   }
  //   const isEmpty = document.getElementById(tabName)?.innerHTML === "";
  //   getPaymentForHyperPay(value);
  //   if (isEmpty) {
  //     const item = document.getElementById(tabName);
  //     item.innerHTML = "<div><h4>Hang On!! loading your card...</h4><div>";
  //   }
  // }, [value]);

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

  const processGPay = async (fnValue) => {
    const configTap = {
      method: "get",
      url: `${API_URL}/rest/${
        getStoreData()?.store_code
      }/V1/webapi/gettapinfo?method=${fnValue}`,
      silent: true,
    };
    await axios(configTap)
      .then((res) => {
        setGPayData(res?.data[0]);
      })
      .catch((err) => console.log(err));
  };
 
  useEffect(() => {
    if (paymentMode && paymentMode.length > 0) {
      setPaymentMethod(paymentMode);
    
    }
  }, [paymentMode]);

  const handleChange = async (newValue) => {
    switch (newValue) {
      case "tap":
        dispatch(getCustomerCartPayments());
        getFreeDeliveryInfo()
        setName({
          ...name,
          code: newValue,
        });
        break;
      case "checkoutcom_card_payment":
        dispatch(getCustomerCartPayments());
        getFreeDeliveryInfo()
        getPaymentForTapCheckout(newValue);
        setName({
          ...name,
          code: newValue,
        });
        break;
      case "cashondelivery":
        dispatch(getCustomerCartPayments());
        getFreeDeliveryInfo()
        setName({
          ...name,
          code: newValue,
        });
        processCod("cashondelivery");
        break;
      case "checkoutcom_google_pay":
        dispatch(getCustomerCartPayments());
        getFreeDeliveryInfo()
        setName({
          ...name,
          code: newValue,
        });
        processGPay("checkoutcom_google_pay");
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
          {renderTab && renderTab[name.code]}
          {loading && (
            <div className={styles.checkLoading}>
              <span>Please wait processing you payment...</span>
            </div>
          )}
        </div>
      </Box>
      <PaymentFooter translate={translate} />
    </>
  );
}
