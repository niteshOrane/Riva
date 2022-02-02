import React from "react";
import useArabic from "../../../../common/arabicDict/useArabic";
import styles from "./TrackYourOrderCard.module.scss";
const TrackYourOrderCard = ({ value, handleChange, handleSubmit,loading }) => {
  const {translate} = useArabic()
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.card}>
        <div className={styles.inpContainer}>
          <p> {translate?.dash?.NUM}:-</p>
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
      {translate?.dash?.TRACK}
      </button>
    </form>
  );
};

export default TrackYourOrderCard;
