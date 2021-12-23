import React from "react";
import styles from "./myReview.module.scss";
import moment from "moment";
import ReviewModal from "../product/ProductDetails/ReviewPopUp";

function MyReviews({ li, deleteReviewAction,getMyReview }) {
  return (
    <div>
      <section>
        <div className={styles.box}>
          <div>
            <img src={li?.image} alt={li?.name} />
          </div>
          <div className={styles.content}>
            <p>{li.name}</p>
            <div className={styles.starBox}>
              <span style={{ fontSize: "16px" }} className="material-icons">
                star_rate
              </span>
              <span>{li?.ratings?.[0]?.value}</span>
            </div>
            <span className={styles.reviewTitle}>{li?.title}</span>
            <span className={styles.reviews}>{li?.detail}</span>
            <div className={styles.date}>
              {moment(li?.created_at)?.calendar()}
            </div>
            <div className={styles.links}>
              <button className={styles.action} type="button">
                <ReviewModal isEdit singleReview={li} getMyReview={getMyReview} />
              </button>
              <button
                className={styles.action}
                type="button"
                onClick={() => deleteReviewAction(li?.id)}
                style={{ marginLeft: "20px" }}
              >
                Delete
              </button>
            </div>
            {/* <div className={styles.act}>
              <span className="material-icons-outlined">thumb_up_alt</span>
              <span className="material-icons-outlined">thumb_down</span>
            </div> */}
          </div>
        </div>
        <hr className={styles.line} />
      </section>
    </div>
  );
}

export default MyReviews;
