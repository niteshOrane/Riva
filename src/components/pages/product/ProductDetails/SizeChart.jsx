import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./sizeChart.css";
import { useDispatch } from "react-redux";
import { getSizeGuide } from "../../../../services/product/product.service";
import useArabic from "../../../common/arabicDict/useArabic";
import { showSnackbar } from "../../../../store/actions/common";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SizeChart({ language }) {
  const { translate } = useArabic();
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      height: 640,
      width: 800,
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

  // const getSizeByType = async (type) => {
  //   const res = await getSizeGuide(type);
  //   if (res?.status === 200 && res?.data?.["size-guide"]) {
  //     setSizeType(res?.data?.["size-guide"]);

  //     const list = [
  //       ...document
  //         .getElementsByClassName("size-menu")?.[0]
  //         ?.getElementsByTagName("li"),
  //     ]?.map((li) => li?.innerText);
  //     setMenu(list);
  //   } else {
  //     setSizeType("No Size Found");
  //   }
  // };
  const handleOpen = () => {
    // getSizeByType("dress-size-guide");
    setOpen(true);
  };
  useEffect(() => {
    // if (menu) {
    //   const sizeMenu = [
    //     ...document
    //       .getElementsByClassName("size-menu")?.[0]
    //       ?.getElementsByTagName("li"),
    //   ];
    //   if (sizeMenu) {
    //     sizeMenu.map((item, idx) => {
    //       const link = item?.getElementsByTagName("a")?.[0];
    //       link.removeAttribute("href");
    //       item.addEventListener("click", () => handleChange(idx));
    //     });
    //   }
    //   const imgTag = [...document.getElementsByClassName("size-ico")];
    //   imgTag.forEach((item) => {
    //     const src = [...item.attributes][0];
    //     const fullUrl = `https://m2dev.rivafashion.com${src.nodeValue}`;
    //     item.setAttribute("src", fullUrl);
    //   });
    //   // tab
    //   try {
    //     const withBorder = [
    //       ...document.getElementsByClassName("with-border"),
    //     ][0]?.childNodes[0];
    //     const withBorderImg = [...withBorder?.attributes][0];
    //     const withBorderFullUrl = `https://m2dev.rivafashion.com${withBorderImg?.nodeValue}`;
    //     withBorder.setAttribute("src", withBorderFullUrl);
    //     const sizeBorder = [...document.getElementsByClassName("size-image")][0]
    //       .childNodes[1];
    //     const sizeImg = [...sizeBorder?.attributes][0];
    //     const sizeFullUrl = `https://m2dev.rivafashion.com${sizeImg?.nodeValue}`;
    //     sizeBorder.setAttribute("src", sizeFullUrl);
    //     const choiceLogo = [
    //       ...document.getElementsByClassName("size-choice"),
    //     ][0].childNodes[1];
    //     const choiceImg = [...choiceLogo?.attributes][0];
    //     const choiceFullUrl = `https://m2dev.rivafashion.com${choiceImg?.nodeValue}`;
    //     choiceLogo.setAttribute("src", choiceFullUrl);
    //   } catch (error) {
    //     dispatch(showSnackbar("something went wrong"));
    //   }
    // }
  }, [menu]);

  // const handleChange = (newValue) => {
  //   const sizeMenu = [
  //     ...document
  //       .getElementsByClassName("size-menu")?.[0]
  //       ?.getElementsByTagName("li"),
  //   ];
  //   sizeMenu?.[newValue].classList.add("active-now");
  //   switch (newValue) {
  //     case 0:
  //       getSizeByType("dress-size-guide");
  //       setValue(newValue);

  //       break;
  //     case 1:
  //       getSizeByType("trouser-size-guide");
  //       setValue(newValue);
  //       break;
  //     case 2:
  //       getSizeByType("tops-size-guide");
  //       setValue(newValue);
  //       break;
  //     case 3:
  //       getSizeByType("coat-size-guide");
  //       setValue(newValue);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <section
        dangerouslySetInnerHTML={{
          __html: sizeType ? sizeType : "No size found",
        }}
      ></section> */}
      <iframe
        height="100%"
        width="100%"
        title="sizeGuide"
        src="https://www.rivafashion.com/size-guide/girls-dresses.html"
      ></iframe>
    </div>
  );

  return (
    <div>
      <span onClick={handleOpen}>{translate?.details?.GUIDE}</span>
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
