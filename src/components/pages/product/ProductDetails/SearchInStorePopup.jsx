import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as icons from "../../../../components/common/Icons/Icons";
import { searchInStore } from "../../../../services/product/product.service";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { height } from "@mui/system";
import { showSnackbar } from "../../../../store/actions/common";
import { useDispatch } from "react-redux";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleModal({ image, sizes, language, sku }) {
  const { country_id } = useSelector((state) => state?.common?.store);
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      overflowY: "scroll",
      height: 600,
      width: 740,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      border: "none",
    },
    contentWrap: {
      display: "flex",
      width: "100%",
      height: "59%",
    },
    box: {
      width: "40%",
      height: "117%",
    },
    box2: {
      width: "50%",
      height: "100%",
      paddingLeft: language === "Arabic" ? "0" : "10px",
      paddingRight: language === "Arabic" ? "10px" : "0",
    },
    para: {
      marginTop: "10px",
      marginBottom: "5px",
    },
    size: {
      marginLeft: language === "Arabic" ? "0" : "5px",
      marginRight: language === "Arabic" ? "5px" : "0",
      border: "1px solid #c8c0c0",
      padding: "2px",
      marginTop: "50px",
      cursor: "pointer",
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
      marginBottom: "15px",
    },
    span: {
      fontSize: "13px",
      color: "#2d2d2d",
    },
    btn: {
      padding: "15px",
      backgroundColor: "#000",
      color: "#fff",
      marginTop: "20px",
      border: "none",
      cursor: "pointer",
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
    loader: {
      marginTop: "10px",
      marginLeft: "10px",
    },
    listSection: {
      lineHeight: "24px",
      display: "flex",
      flexDirection: "column",
      border: "1px outset gray",
      padding: "20px",
      cursor: "pointer",
      "&:hover": {
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        border: "none",
      },
    },
    listWrap: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "5px",
    },
    init: {
      width: "194%",
      height: "43%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px dashed lightgray",
    },
    noStore: {
      color: "gray",
    },
    noStoreFound: {
      color: "black",
    },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [storeList, setStoreList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const searchStore = async (e) => {
    e.preventDefault();
    if (!selectedSize) return dispatch(showSnackbar("Select a size", "error"));
    setLoading(true);
    const res = await searchInStore(sku, country_id);
    if (res?.status === 200 && res?.data?.length > 0) {
      const list = res?.data;
      setStoreList(list);
      setLoading(false);
    } else {
      setLoading(false);
      setStatus(true);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <button type="button" onClick={handleClose} className={classes.closeBtn}>
        <icons.Close />
      </button>
      <div className={classes.contentWrap}>
        <div className={classes.box}>
          <img style={{ width: "100%", height: "80%" }} src={image} alt="" />
        </div>
        <div className={classes.box2}>
          <h3 style={{ color: "#161616" }} className={classes.para}>
            WOULD YOU LIKE TO KNOW IF THIS ITEM IS AVAILABLE IN STORE?
          </h3>
          <span className={`${classes.para} ${classes.span}`}>
            To check in store availability, enter a city or post code. Please
            keep in mind that stocks are indicative only and w recommend that
            you call the store to make sure they have the item you are
            interested in.
          </span>
          <section className={classes.sizeWrapper}>
            <strong>Size: </strong>
            {sizes?.map((li) => (
              <div>
                <span
                  className={classes.size}
                  style={{
                    backgroundColor: selectedSize === li?.label && "lightgray",
                  }}
                  onClick={() => setSelectedSize(li?.label)}
                >
                  {li?.label}
                </span>
              </div>
            ))}
          </section>
          <h5 className={classes.para}>Tell us your area</h5>
          <span className={`${classes.para} ${classes.span}`}>
            We’ll show you availability for the stores closest to your location.
          </span>
          <div className="d-flex align-items-center">
            <button
              disabled={loading}
              type="button"
              onClick={searchStore}
              className={classes.btn}
            >
              SEARCH FOR STORES
            </button>
            {loading && (
              <div className={classes.loader}>
                <CircularProgress size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
      <section className={classes.listWrap}>
        {storeList?.length > 0 ? (
          storeList?.map((store) => (
            <section className={classes.listSection}>
              <span>
                {store?.ADDRESS1}, {store.ADDRESS2}
              </span>
              <span>{store?.LOCATION_NAME}</span>
              {store?.STORE_TYPE !== "WAREHOUSE" && (
                <span>Store Type: {store?.STORE_TYPE}</span>
              )}
              <span>{store?.SUB_COMPANY_CODE}</span>
            </section>
          ))
        ) : !status ? (
          <section className={classes.init}>
            <span className={classes.noStore}>
              Search for store, If we find any it will appear hear.
            </span>
          </section>
        ) : (
          <section className={classes.init}>
            <span className={classes.noStoreFound}>No Stores Found !!!</span>
          </section>
        )}
      </section>
    </div>
  );

  return (
    <div>
      <span onClick={handleOpen}>Search In Store</span>
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
