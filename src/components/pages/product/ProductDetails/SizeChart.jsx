import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as icons from "../../../../components/common/Icons/Icons";
import styles from "./productDetails.module.scss"

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SizeChart({ img,language }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      // display: "flex",
      position: "absolute",
      height: 300,
      width: 640,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      border: "none",
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
    table:{
      marginTop:"2rem",
      marginLeft:"1.5rem"
    }
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const body = (
    <div style={modalStyle} className={classes.paper}>
      <button onClick={handleClose} type="button" className={classes.closeBtn}>
        <icons.Close />
      </button>
      <section className="d-flex">
      <div className={classes.sizeHead}>WOMEN'S CLOTHING SIZE GUIDE</div>
      <section >
        <div className = {classes.table}>
          <table className={styles.sizeChartTable}>
            <tr>
              <th>SIZE</th>
              <th>CHEST</th>
              <th>WAIST</th>
              <th>HP</th>
            </tr>
            <tr>
              <td>S</td>
              <td>89</td>
              <td>66</td>
              <td>66</td>
            </tr>
            <tr>
              <td>M</td>
              <td>92</td>
              <td>72</td>
              <td>72</td>
            </tr>
            <tr>
              <td>L</td>
              <td>98</td>
              <td>78</td>
              <td>78</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>104</td>
              <td>85</td>
              <td>85</td>
            </tr>
          </table>
        </div>
      </section>
      </section>
      <div className={styles.sizeGuideInfo}>
        <strong>All Sizes are in CMs</strong>
        <span>Measure your, height and waist and then compare with the size cart.</span>
      </div>
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
