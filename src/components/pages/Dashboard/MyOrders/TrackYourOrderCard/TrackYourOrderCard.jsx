import React from "react";
import styles from "./TrackYourOrderCard.module.scss";
const TrackYourOrderCard = ({ value, handleChange, handleSubmit,loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.card}>
        <div className={styles.inpContainer}>
          <p>Order Number:-</p>
          <input
            type="text"
            onChange={handleChange}
            id="trackingId"
            name="trackOrder"
            value={value}
          />
        </div>
      </div>
      <button type="submit" className={styles.trackOrderBtn}>
       {!loading ? "TRACK ORDER" : "TRACKING..." } 
      </button>
    </form>
  );
};

export default TrackYourOrderCard;
