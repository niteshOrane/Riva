import React from "react";
import styles from "./SizeGuide.module.scss";
import { Drawer } from "@material-ui/core";
import * as icons from "../../../../../common/Icons/Icons";

function SizeGuide({ handleClose, open }) {
  return (
    <Drawer anchor="right" onClose={handleClose} open={open}>
      <button
        type="button"
        onClick={handleClose}
        title="Close"
        className={`bg-transparent no-border ${styles.close}`}
      >
        <icons.Close />
      </button>
      <div className={styles.card}>
        <p className={styles.title}>Size Guide</p>
        <div className="d-flex justify-content-between align-items-center my-12px">
          <p className={styles.nameFontsize}> T-Shirt</p>
          <p> عربى </p>
        </div>
        <div className={styles.img}>
          <img
            src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/e80e3613-85cf-4fb2-bdb6-af340dd43462.png"
            width="100%"
            alt=""
          />
        </div>
        <div className="mt-12px">
          <small className="color-grey">*All Measurements in centimeters</small>
        </div>
        <p className={`font-weight-600 ${styles.nameFontsize}`}>
          Choose a size
        </p>
        <div className={styles.dropdown}>
          <div className="d-flex align-items-center justify-content-between">
            <span>M</span>
            <span className="material-icons-outlined">arrow_right</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SizeGuide;
