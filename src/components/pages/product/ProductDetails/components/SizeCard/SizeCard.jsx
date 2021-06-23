import React from "react";
import Dialog from "@material-ui/core/Dialog";
import styles from "./SizeCard.module.scss";
import * as icons from "../../../../../common/Icons/Icons";
const SizeCard = ({ handleClose, open }) => {
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <div>
        <button
          type="button"
          onClick={handleClose}
          title="Close"
          className={`bg-transparent no-border ${styles.close}`}
        >
          <icons.Close />
        </button>
        <div className="my-12px p-12">
          <div className="d-flex">
            <div className={styles.img}>
              <img
                src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/f7c18f6a-acb3-4c3a-9327-b311374829e9.png"
                width="100%"
                alt=""
              />
            </div>
            <div className={styles.details}>
              <p className={styles.title}>WE HELP YOU FIND THE RIGHT SIZE</p>
              <p className={styles.smallFonts}>
                We calculate the perfect fit based on your unique measurements
              </p>

              <div className={styles.measurements}>
                <div className="d-flex align-items-center justify-content-between my-12px">
                  <h4 className={`font-weight-600 ${styles.mearTitle}`}>
                    Measurements
                  </h4>
                  <div className={styles.mearUnits}>
                    <button
                      type="button"
                      className="bg-transparent no-border c-pointer"
                    >
                      <span className="font-weight-500 underline">CM</span>
                    </button>
                    <span className="color-grey">|</span>
                    <button
                      className="bg-transparent no-border c-pointer"
                      type="button"
                    >
                      <span>IN</span>
                    </button>
                  </div>
                </div>

                <p className={styles.smallFonts}>Your height and weight:</p>

                <div className={styles.mearSliders}>
                  <div className="mt-12px d-flex align-items-center justify-content-between">
                    <p>Height</p>
                    <div className={styles.slider}></div>
                    <p className={styles.smallFonts}>0 CM</p>
                  </div>
                  <div className="mt-12px d-flex align-items-center justify-content-between">
                    <p>Weight</p>
                    <div className={styles.slider}></div>
                    <p className={styles.smallFonts}>0 CM</p>
                  </div>
                </div>
              </div>

              <div className={styles.measurements}>
                <div className="d-flex align-items-center justify-content-between my-12px">
                  <h4 className={`font-weight-600 ${styles.mearTitle}`}>
                    Preference
                  </h4>
                </div>

                <p className={styles.smallFonts}>How do you want it to fit?</p>

                <div className={`mt-12px ${styles.mearSliders}`}>
                  <div className={`w-100 ${styles.slider}`}></div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Tighter</span>
                    <span>Perfect </span>
                    <span>Looser</span>
                  </div>
                </div>
              </div>
              <button type="button" className={styles.findSizeBtn}>
                FIND MY SIZE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SizeCard;
