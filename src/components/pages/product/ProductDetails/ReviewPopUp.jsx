import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./productDetails.module.scss";
import {
  createReview,
  getReviewList,
} from "../../../../services/product/product.service";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../../../store/actions/common";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";

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
}));

const dummyData = [
  {
    star: 4,
    review: "Love Shopping on ths site.",
    name: "Maghna",
    date: "17days ago",
    like: 2,
    dislike: 0,
  },
  {
    star: 4,
    review: "Not bad value for money",
    name: "Shopia",
    date: "a month ago",
    like: 2,
    dislike: 0,
  },
  {
    star: 4,
    review: "Love Shopping on ths site.",
    name: "Maghna",
    date: "17days ago",
    like: 2,
    dislike: 0,
  },
];

export default function ReviewModal({ id, sku }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reviewRes, setReviewRes] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getReviewListForProduct = async (val) => {
    const res = await getReviewList(val);
    if (res.status === 200 && res?.data) {
      setReviewRes(res?.data);
    }
  };
  const addReview = async (e) => {
    if (!auth?.isAuthenticated)
      return dispatch(showSnackbar("Please sign in to add a review", "error"));
    e.preventDefault();
    const { firstname } = auth?.customer;
    if (!title) {
      return dispatch(showSnackbar("Please add title", "error"));
    }
    if (!description) {
      return dispatch(showSnackbar("Please add description", "error"));
    }
    if (!value) {
      return dispatch(showSnackbar("Please rate with star", "error"));
    }
    const res = await createReview(title, description, value, id, firstname);
    if (res.status === 200 && res?.data) {
      dispatch(showSnackbar("review added successfully", "success"));
      getReviewListForProduct(sku);
      setDescription("");
      setTitle("");
      setValue(0);
    }
  };

  React.useEffect(() => {
    if (sku) {
      getReviewListForProduct(sku);
    }
  }, [sku]);

  const calculateAvgReview = () => {
    let sum = reviewRes?.reduce((acc, li) => acc + li?.ratings[0]?.value, 0);
    return isNaN(parseFloat(sum / reviewRes?.length)?.toFixed(1))
      ? 0
      : parseFloat(sum / reviewRes?.length)?.toFixed(1);
  };
  return (
    <div>
      <span onClick={handleOpen}>Review</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <button onClick={handleClose} className={styles.reviewCls}>
              X
            </button>
            <h2>Rate this product</h2>
            <div>
              {/* {[1, 2, 3, 4, 5].map((_) => (
                <span
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                  className="material-icons-outlined"
                >
                  star_border
                </span>
              ))} */}
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
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
                <button type="submit" className={styles.reviewSubmit}>
                  Submit
                </button>
              </div>
            </form>
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
                  {reviewRes?.reduce(
                    (acc, li) => acc + li?.ratings[0]?.value,
                    0
                  )}{" "}
                  ratings and {reviewRes?.length} reviews
                </span>
              </div>
            </section>
            {reviewRes?.map((li) => (
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
                <section className={styles.nameDateWrap}>
                  <div className={styles.nameDate}>
                    <span>{li?.nickname}</span>
                    <span className={`${styles.reviewName} ${styles.dateSpan}`}>
                      {moment(li?.created_at)?.calendar()}
                    </span>
                  </div>
                  <div className={styles.likeDislike}>
                 
                    <div className={styles.likeDislike}>
                      <span class="material-icons-outlined">thumb_up_alt</span>
                      <span className={styles.numLike}>{li.like}</span>
                    </div>
                    <div>
                      <div className={styles.dislikeThumb}>
                        <span class="material-icons-outlined">thumb_down</span>
                        <span className={styles.numLike}>{li.dislike}</span>
                      </div>
                    </div>
                    <span  class="material-icons-outlined">delete</span>
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
