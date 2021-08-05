import React from "react";
import styles from "./ImageDropdown.module.scss";
const ImageDropdown = () => {
  return (
    <a href="#complete-your-look">
      <div className={styles.howToWareItDropdown}>
        <div className="d-flex align-items-center">
          <span>How to Ware it</span>
          <span className={styles.icon}>
            <span className="material-icons-outlined">arrow_right</span>
          </span>
        </div>
      </div>
    </a>
  );
};

export default ImageDropdown;
