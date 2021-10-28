import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./components/Tab2Content/Tab2Content.module.scss";

const dummyPay = [
  "TAP",
  "MADA DEBIT CARD",
  "HYPERPAY VISA",
  "HYPERPAY MASTERCARD",
  "GOOGLE PAY",
];

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

export default function DetailTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
      <h2 className = {styles.choose}>Choose Payment Mode</h2>
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style = {{overflowX:"auto"}}
          className = {styles.reGrid}
        >
          {dummyPay?.map((li, idx) => (
            <Tab className = {styles.rePayment} label={li} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        TAP
      </TabPanel>
      <TabPanel value={value} index={1}>
        MADA DEBIT CARD
      </TabPanel>
      <TabPanel value={value} index={2}>
        HYPERPAY VISA
      </TabPanel>
      <TabPanel value={value} index={3}>
        HYPERPAY MASTERCARD
      </TabPanel>
      <TabPanel value={value} index={4}>
        GOOGLE PAY
      </TabPanel>
    </Box>
    </>
  );
}
