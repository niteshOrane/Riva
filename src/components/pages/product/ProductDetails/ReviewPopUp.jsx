import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./productDetails.module.scss";

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
    position:"relative"
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

export default function ReviewModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <button onClick={handleClose} className={styles.reviewCls}>X</button>
            <h2>Rate this product</h2>
            <div>
              {[1, 2, 3, 4, 5].map((_) => (
                <span
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                  className="material-icons-outlined"
                >
                  star_border
                </span>
              ))}
            </div>
            <hr />
            <h3 className={styles.reviewPro}>Review this product</h3>
            <form>
              <div className={styles.reviewTextArea}>
                <label>Description</label>
                <textarea placeholder="Description" className={styles.desc} />
              </div>
              <div className={styles.reviewTextArea}>
                <label>Title (optional)</label>
                <input placeholder="Review Title" className={styles.reviewInput} />
              </div>
              <div className={styles.submitBtn}>
                <button className={styles.reviewSubmit}>Submit</button>
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
                  <b>4.2</b>
                </div>
                <span>60 ratings and 12 reviews</span>
              </div>
            </section>
            {dummyData?.map((li) => (
              <section>
                <section className={styles.sectionWrapOne}>
                  <div className={styles.mapReview}>
                    <span
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                      className="material-icons-outlined"
                    >
                      star_border
                    </span>
                    <b>4.2</b>
                  </div>
                  <h4 className={styles.reviewName}>{li.review}</h4>
                </section>
                <section className={styles.nameDateWrap}>
                  <div className={styles.nameDate}>
                    <span>{li.name}</span>
                    <span className={`${styles.reviewName} ${styles.dateSpan}`}>{li.date}</span>
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
                  </div>
                </section>
                <hr style={{marginBottom:"15px"}} />
              </section>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
