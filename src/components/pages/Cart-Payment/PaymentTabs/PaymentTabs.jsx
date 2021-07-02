import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as tabIcons from "../Icons/Icons";
import Tab2Content from "./components/Tab2Content/Tab2Content";

const tabLinks = [
  { text: "CASH ON DELIVERY (CASH/CARD/UP)", icon: <tabIcons.Icon1 /> },
  { text: "CREDIT/DEBIT CARD", icon: <tabIcons.Icon2 /> },
  { text: "PHONEPE/GOOGLE PAY/BHIM UPI", icon: <tabIcons.Icon3 /> },
  { text: "PAYTM/PAYZAPP/WALLETS", icon: <tabIcons.Icon4 /> },
  { text: "NET BANKING", icon: <tabIcons.Icon5 /> },
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

export default function PaymentTabs() {
  const [value, setValue] = React.useState(1);
  const classes = useStyles();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

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
        {tabLinks.map((tab, i) => (
          <Tab
            className={`${classes.tab} ${
              value === i ? classes.selectedTabLink : ""
            }`}
            disableRipple
            label={
              <div className="d-flex align-items-center w-100">
                <span className={classes.icon}>{tab.icon}</span>{" "}
                <span className={classes.tbText}>{tab.text}</span>
              </div>
            }
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      <div className={classes.tabContent}>
        <TabPanel value={value} index={0}>
          cash on delivery
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tab2Content />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    </div>
  );
}
