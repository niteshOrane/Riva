import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as tabIcons from "../Icons/Icons";
import Tab2Content from "./components/Tab2Content/Tab2Content";

import { showSnackbar } from "../../../../store/actions/common";
import { cartPaymentAction } from "../../../../services/cart/cart.service";

import * as DATA_TYPES from "../../../../store/types";
import Loader from "../../../common/Loader";
import { compose } from "redux";
import { getCartId } from "../../../../util";

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
    fontWeight: "600",
    maxWidth: "fit-content",
    fontSize: ".9rem",
  },
  tabContent: {
    maxWidth: "50%",
    width: "100%",
    border: "1px solid #ddd",
    borderLeft: "0",
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

export default React.memo(({ paymentMode, cartPaymentInfo }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [checkoutId, setCheckoutId] = React.useState(0);
  const [paymentType, setPaymentType] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const onPayNow = async (e) => {
    if (e) {
      setLoading(true);
      const res = await cartPaymentAction(e);
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
      form.action = `http://65.0.141.49/#/result`;
      form.setAttribute("class", "paymentWidgets");
      form.setAttribute(
        "data-brands",
        "VISA MASTER AMEX" || paymentMode[value].tbText
      );

      let tabName;
      if (value === 1) {
        tabName = "renderPaymentformOne";
      } else if (value === 2) {
        tabName = "renderPaymentformTwo";
      } else if (value === 3) {
        tabName = "renderPaymentformThree";
      } else if (value === 4) {
        tabName = "renderPaymentformFour";
      }

      let menu = document.getElementById(tabName);

      let child = menu?.lastElementChild;
      while (child) {
        menu?.removeChild(child);
        child = menu?.lastElementChild;
      }

      if (menu && menu != null) {
        menu = menu?.append(form);
      }
    }
  };
  const handleChange = async (_, newValue) => {
    console.log(newValue);
    switch (newValue) {
      case 0:
        const configTap = {
          method: "get",
          url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/gettapinfo?method=tap`,
          silent: true,
        };
        await axios(configTap).then((res) => {
          console.log(res);
          setPaymentType(res?.data[0]?.tap?.active_pk);
        });
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        const config = {
          method: "post",
          url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/gethyperpayid?method=${
            paymentMode[newValue].code
          }&quoteId=${getCartId()}&currency=EUR&paymentType=DB`,
          silent: true,
        };
        await axios(config).then((res) => {
          setCheckoutId(JSON.parse(res.data).id);
          setValue(newValue);
        });
        setValue(newValue);
        break;
      default:
        setValue(newValue);
        break;
    }
  };
  if (loading) return <Loader />;
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
                <span id={tab.code} className={classes.icon}>
                  {tab?.icon || <tabIcons.Icon2 />}
                </span>{" "}
                <span id={tab.code} className={classes.tbText}>
                  {tab.title}
                </span>
              </div>
            }
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      <div className={classes.tabContent}>
        <TabPanel value={value} index={0}>
          <Tab2Content onPayNow={onPayNow} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div id="renderPaymentformOne">{renderPaymentform()}</div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div id="renderPaymentformTwo">{renderPaymentform()}</div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div id="renderPaymentformThree">{renderPaymentform()}</div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div id="renderPaymentformFour">{renderPaymentform()}</div>
        </TabPanel>
      </div>
    </div>
  );
});
