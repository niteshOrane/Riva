import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import * as icons from "../../../../../common/Icons/Icons";
import styles from "./SizeGuide.module.scss";

function SizeGuide({ handleClose, open, imageSelected, language }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const sizes = ["M", "L", "S"];
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]);
  return (
    <Drawer anchor={language === 'Arabic' ? 'left' : 'right'} dir={language === 'Arabic' ? 'rtl' : 'ltr'} onClose={handleClose} open={open}>
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
          <div className={styles.arrows}>
            <div className={styles.arrow}>
              <div className={styles.unit}>90 cm</div>
              <div className={styles.arrowLine} />
            </div>
            <div className={styles.arrow}>
              <div className={styles.unit}>70 cm</div>
              <div className={styles.arrowLine} />
            </div>
          </div>
          <img
            src={imageSelected}
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
        <div
          className={styles.dropdown}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="d-flex align-items-center justify-content-between">
            <span>{selectedSize}</span>
            <span className="material-icons-outlined">arrow_right</span>
          </div>

          <div
            className={`${showDropdown ? styles.show : ""} ${styles.dropdownBody
              }`}
          >
            {sizes.map((size) => (
              <div
                className={styles.item}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SizeGuide;
