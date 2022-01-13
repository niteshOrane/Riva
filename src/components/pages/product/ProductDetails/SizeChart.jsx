import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as icons from "../../../../components/common/Icons/Icons";
import "./sizeChart.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getSizeGuide } from "../../../../services/product/product.service";
import { listItemIconClasses } from "@mui/material";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

export default function SizeChart({ img, language }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      height: 600,
      width: 750,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      border: "none",
      overflowY: "scroll",
      overflowX: "scroll",
    },
    closeBtn: {
      position: "absolute",
      top: "3%",
      left: language === "Arabic" ? "0%" : "95%",
      right: language === "Arabic" ? "95%" : "0%",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [sizeType, setSizeType] = React.useState(null);
  const [menu, setMenu] = React.useState(null);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
    getSizeByType("dress-size-guide");
  };

  const getSizeByType = async (type) => {
    const res = await getSizeGuide(type);
    if (res?.status === 200 && res?.data?.["size-guide"]) {
      setSizeType(res?.data?.["size-guide"]);

      const list = [
        ...document
          .getElementsByClassName("size-menu")?.[0]
          ?.getElementsByTagName("li"),
      ]?.map((li) => li?.innerText);
      setMenu(list);
    } else {
      setSizeType("No Size Found");
    }
  };
  useEffect(() => {
    if (menu) {
      const sizeMenu = [
        ...document
          .getElementsByClassName("size-menu")?.[0]
          ?.getElementsByTagName("li"),
      ];
      console.log({ sizeMenu });
      if (sizeMenu) {
        sizeMenu.map((item, idx) => {
          const link = item?.getElementsByTagName("a")?.[0];
          link.removeAttribute("href");
          item.addEventListener("click", () => handleChange(idx));
        });
      }
    }
  }, [menu]);

  const handleChange = (newValue) => {
    console.log("type");
    const sizeMenu = [
      ...document
        .getElementsByClassName("size-menu")?.[0]
        ?.getElementsByTagName("li"),
    ];
    sizeMenu?.[newValue].classList.add("active-now");
    switch (newValue) {
      case 0:
        getSizeByType("dress-size-guide");
        setValue(newValue);

        break;
      case 1:
        getSizeByType("trouser-size-guide");
        setValue(newValue);
        break;
      case 2:
        getSizeByType("tops-size-guide");
        setValue(newValue);
        break;
      case 3:
        getSizeByType("coat-size-guide");
        setValue(newValue);
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <section
        dangerouslySetInnerHTML={{
          __html: sizeType ? sizeType : "No size found",
        }}
      >
        {/* <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {menu?.map((li, idx) => (
            <Tab label={li} {...a11yProps(idx)} />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <div
            dangerouslySetInnerHTML={{
              __html: sizeType ? sizeType : "No size found",
            }}
          ></div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div
            dangerouslySetInnerHTML={{
              __html: sizeType ? sizeType : "No size found",
            }}
          ></div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div
            dangerouslySetInnerHTML={{
              __html: sizeType ? sizeType : "No size found",
            }}
          ></div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div
            dangerouslySetInnerHTML={{
              __html: sizeType ? sizeType : "No size found",
            }}
          ></div>
        </TabPanel> */}
      </section>
    </div>
  );

  return (
    <div>
      <span onClick={handleOpen}>Size Guide</span>
      <Modal
        open={open}
        onClose={handleClose}
        dir={language === "Arabic" ? "rtl" : "ltr"}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
