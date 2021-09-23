import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as icons from "../../../../components/common/Icons/Icons";




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleModal({ image, sizes, language }) {

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      position: "absolute",
      height: 420,
      width: 740,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      border: "none"
    },
    box: {
      width: "50%",
      height: "100%",
    },
    box2: {
      width: "50%",
      height: "100%",
      paddingLeft: "10px",
    },
    para: {
      marginTop: "10px",
      marginBottom: "5px",
    },
    size: {
      marginLeft: "5px",
      border: "1px solid #c8c0c0",
      padding: "2px",
      marginTop: "50px",
    },
    input: {
      height: 42,
      width: 300,
      padding: "3px",
      border: "2px solid black",
      outline: "none",
      marginTop: "20px",
    },
    sizeWrapper: {
      display: "flex",
      marginTop: "15px",
      marginBottom: "15px"
    },
    span: {
      fontSize: "13px",
      color: "#2d2d2d"
    },
    btn: {
      padding: "15px",
      backgroundColor: "#000",
      color: "#fff",
      marginTop: "20px",
      border: "none",
      cursor: "pointer"
    },
    closeBtn: {
      position: "absolute",
      top: "3%",
      left: language === 'Arabic' ? '0%' : '95%',
      right: language === 'Arabic' ? '95%' : '0%',
      background: "transparent",
      border: "none",
      cursor: "pointer"
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
      <button onClick={handleClose} className={classes.closeBtn}>
        <icons.Close />
      </button>
      <div className={classes.box}>
        <img style={{ width: "100%", height: "100%" }} src={image} alt="" />
      </div>
      <div className={classes.box2}>
        <h3 style={{ color: "#161616" }} className={classes.para}>
          WOULD YOU LIKE TO KNOW IF THIS ITEM IS AVAILABLE IN STORE?
        </h3>
        <span className={`${classes.para} ${classes.span}`}>
          To check in store availability, enter a city or post code. Please keep
          in mind that stocks are indicative only and w recommend that you call
          the store to make sure they have the item you are interested in.
        </span>
        <section className={classes.sizeWrapper}>
          <strong>Size: </strong>
          {sizes?.map((li) => (
            <div>
              <span className={classes.size}>{li?.label}</span>
            </div>
          ))}
        </section>
        <h5 className={classes.para}>Tell us your area</h5>
        <span className={`${classes.para} ${classes.span}`}>
          We’ll show you availability for the stores closest to your location.
        </span>
        <div>
          <input
            className={classes.input}
            placeholder="Address, city, or postcode*"
          />
        </div>
        <div>
          <button className={classes.btn}>SEARCH FOR STORES</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <span onClick={handleOpen}>Search In Store</span>
      <Modal
        open={open}
        onClose={handleClose}
        dir={language === 'Arabic' ? 'rtl' : 'ltr'}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
