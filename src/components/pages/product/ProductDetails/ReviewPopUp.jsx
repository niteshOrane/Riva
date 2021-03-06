import React, { useEffect } from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./productDetails.module.scss";
import {
  createReview,
  getReviewList,
  deleteReviewFromList,
  updateReviewFromList,
} from "../../../../services/product/product.service";
import { showSnackbar } from "../../../../store/actions/common";
import { setAttributeFormatter } from "validatorjs";
import CircularProgress from "@material-ui/core/CircularProgress";
import useArabic from "../../../common/arabicDict/useArabic"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 714,
    height: 641,
    overflowY: "scroll",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "relative",
  },
  viewAll: {
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

export default function ReviewModal({
  id,
  sku,
  isDetail,
  isTop,
  setReviewState,
  isEdit,
  singleReview,
  getMyReview,
}) {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state?.common?.store);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reviewRes, setReviewRes] = React.useState(null);
  const [rate, setRate] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const {translate} = useArabic();

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (isEdit && singleReview) {
      const rating = singleReview?.ratings?.[0]?.value;
      const desc = singleReview?.detail;
      const titleEdit = singleReview?.title;
      setRate(rating);
      setDescription(desc);
      setTitle(titleEdit);
    }
  }, [singleReview]);
  const handleClose = () => {
    setOpen(false);
    if (isDetail || isTop) {
      setReviewState((prev) => !prev);
    }
  };
  const onChange = (event, newValue) => {
    setRate(newValue);
  };
  const getReviewListForProduct = async (val) => {
    const res = await getReviewList(val);
    if (res.status === 200 && res?.data) {
      setReviewRes(res?.data);
    }
  };
  const addReview = async (e) => {
    e.preventDefault();

    if (!auth?.isAuthenticated) {
      dispatch(showSnackbar("Please sign in to add a review", "error"));
    } else if (isEdit) {
      const { firstname, customerID } = auth?.customer;
      if (!title) {
        return dispatch(showSnackbar("Please add title", "error"));
      }
      if (!description) {
        return dispatch(showSnackbar("Please add description", "error"));
      }
      if (!rate) {
        return dispatch(showSnackbar("Please rate with star", "error"));
      }
      const res = await updateReviewFromList(
        title,
        description,
        rate,
        singleReview?.entity_pk_value,
        singleReview?.nickname,
        singleReview?.store_id,
        singleReview?.review_status,
        singleReview?.review_type,
        singleReview?.customer_id
      );
      if (res.status === 200 && res?.data) {
        dispatch(showSnackbar("review Uploaded successfully", "success"));
        setDescription("");
        setTitle("");
        setRate(0);
        getMyReview();
        setLoading(false);
        setOpen(false);
      } else {
        setLoading(false);
      }
    } else {
      const { firstname, customerID } = auth?.customer;
      if (!title) {
        return dispatch(showSnackbar("Please add title", "error"));
      }
      if (!description) {
        return dispatch(showSnackbar("Please add description", "error"));
      }
      if (!rate) {
        return dispatch(showSnackbar("Please rate with star", "error"));
      }
      setLoading(true);
      const res = await createReview(
        title,
        description,
        rate,
        id,
        firstname,
        customerID
      );
      if (res.status === 200 && res?.data) {
        dispatch(showSnackbar("review added successfully", "success"));
        getReviewListForProduct(sku);
        setDescription("");
        setTitle("");
        setRate(0);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const deleteReviewAction = async (fnValue) => {
    setLoading(true);
    const res = await deleteReviewFromList(fnValue);
    if (res.status === 200) {
      dispatch(showSnackbar("review deleted successfully", "success"));
      getReviewListForProduct(sku);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getAllReviews = () => {
    if (sku) {
      getReviewListForProduct(sku);
    }
  };

  const calculateAvgReview = () => {
    let sum = reviewRes?.reduce(
      (acc, li) => (li?.ratings?.length ? acc + li?.ratings[0]?.value : null),
      0
    );
    return isNaN(parseFloat(sum / reviewRes?.length)?.toFixed(1))
      ? 0
      : parseFloat(sum / reviewRes?.length)?.toFixed(1);
  };
  return (
    <div>
      <span
        onClick={() => {
          handleOpen();
          getAllReviews();
        }}
      >
        {isDetail ? 
          translate?.details?.REV
         : isEdit ? (<span className={classes.viewAll}>Edit</span>) : (
          <span className={classes.viewAll}>{translate?.details?.GUIDE}</span>
        )}
      </span>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        dir={language === "Arabic" ? "rtl" : "ltr"}
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <button
              type="submit"
              onClick={handleClose}
              className={styles.reviewCls}
            >
              X
            </button>
            <h2>Rate this product</h2>
            <div>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => onChange(event, newValue)}
              />
            </div>
            <hr />
            <h3 className={styles.reviewPro}>Review this product</h3>
            <form onSubmit={addReview}>
              <div className={styles.reviewTextArea}>
                <label>Description</label>
                <textarea
                  placeholder="Description"
                  className={styles.desc}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className={styles.reviewTextArea}>
                <label>Title</label>
                <input
                  placeholder="Review Title"
                  className={styles.reviewInput}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className={styles.submitBtn}>
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className={styles.reviewSubmit}
                >
                  {isEdit ? "Update" : "Submit"}
                </button>
              </div>
            </form>
            {!isEdit && (
              <section>
                <div className={styles.secWrap}>
                  <h3>Ratings & Reviews</h3>
                  <div className={styles.avg}>
                    <span
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                      className="material-icons-outlined"
                    >
                      star_border
                    </span>
                    <b>{calculateAvgReview()}</b>
                  </div>
                  <span>
                    {isNaN(
                      reviewRes?.reduce(
                        (acc, li) => acc + li?.ratings[0]?.value,
                        0
                      )
                    )
                      ? 0
                      : reviewRes?.reduce(
                          (acc, li) => acc + li?.ratings[0]?.value,
                          0
                        )}{" "}
                    ratings and {reviewRes?.length} reviews
                  </span>
                </div>
              </section>
            )}
            {!isEdit &&
              reviewRes?.map((li) => (
                <section>
                  <section className={styles.sectionWrapOne}>
                    <div className={styles.mapReview}>
                      <span
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                        className="material-icons-outlined"
                      >
                        star_border
                      </span>
                      <b>{li?.ratings[0]?.value}</b>
                    </div>
                    <h4 className={styles.reviewName}>{li?.title}</h4>
                  </section>
                  <span className={styles.reviewDesc}>{li?.detail}</span>
                  <section className={styles.nameDateWrap}>
                    <div className={styles.nameDate}>
                      <span>{li?.nickname}</span>
                      <span
                        className={`${styles.reviewName} ${styles.dateSpan}`}
                      >
                        {moment(li?.created_at)?.calendar()}
                      </span>
                    </div>
                    <div className={styles.likeDislike}>
                      <div className={styles.likeDislike}>
                        <span className="material-icons-outlined">
                          thumb_up_alt
                        </span>
                        <span className={styles.numLike}>{li.like}</span>
                      </div>
                      <div>
                        <div className={styles.dislikeThumb}>
                          <span className="material-icons-outlined">
                            thumb_down
                          </span>
                          <span className={styles.numLike}>{li.dislike}</span>
                        </div>
                      </div>
                      {li?.nickname === auth?.customer?.firstname ? (
                        !loading ? (
                          <span
                            onClick={() => deleteReviewAction(li?.id)}
                            className="material-icons-outlined c-pointer"
                          >
                            delete
                          </span>
                        ) : (
                          <CircularProgress size={10} />
                        )
                      ) : null}
                    </div>
                  </section>
                  <hr style={{ marginBottom: "15px" }} />
                </section>
              ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
