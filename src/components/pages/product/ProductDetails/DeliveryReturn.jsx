import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as icons from "../../../../components/common/Icons/Icons";
import { useDispatch } from "react-redux";
import { deliveryAndReturnService } from "../../../../services/product/product.service";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function DeliveryReturn({ language, translate }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      height: "fit-content",
      width: 800,
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
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    deliveryIcon: {
      fontSize: "4rem",
      color: "gray",
    },
    medium: {
      fontSize: "2rem",
      color: "gray",
    },
    btn: {
      padding: "6px",
      border: "none",
      outline: "none",
      backgroundColor: "black",
      color: "white",
      cursor: "pointer",
      margin: "10px 3px",
    },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [deliveryDetail, setDeliveryDetail] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const getDeliveryDetail = async () => {
    const res = await deliveryAndReturnService();
    if (res?.status === 200) {
      setDeliveryDetail(res?.data);
    }
  };
  useEffect(() => {
    if (deliveryDetail) {
      setOpen(true);
    }
  }, [deliveryDetail]);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <section className={classes.content}>
        <div className="d-flex justify-content-center align-items-center">
          <span className={`material-icons-outlined ${classes.deliveryIcon}`}>
            local_shipping
          </span>
          <span className={`material-icons-outlined ${classes.medium}`}>
            compare_arrows
          </span>
          <span className={`material-icons-outlined ${classes.deliveryIcon}`}>
            assignment_return
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: deliveryDetail?.["delivery-returns"],
          }}
          style={{lineHeight:"30px"}}
        ></div>
        <section>
          <button
            onClick={() => setOpen(false)}
            type="button"
            className={classes.btn}
          >
            I Understand
          </button>
        </section>
      </section>
    </div>
  );

  return (
    <div>
      <span
        onClick={() => {
          getDeliveryDetail();
        }}
      >
        {translate?.details?.DEL}
      </span>
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
