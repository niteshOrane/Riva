import React from "react";
import * as icons from "../../common/Icons/Icons";
import styles from "./Information.module.scss";

function InformationTable() {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tblBody}>
          <div className="d-flex align-items-center w-100">
            <div className={styles.bgLightGrey}>Product Name:</div>
            <div className={styles.bgDarkGrey}>SKU:</div>
            <div className={styles.bgLightGrey}>Price:</div>
            <div className={styles.bgDarkGrey}>Qty:</div>
            <div className={styles.bgLightGrey}>Subtotal:</div>
          </div>
          <div id={styles.orderInfo} className="d-flex align-items-start w-100">
            <div className={styles.highWrap}>
              <img src="" alt="" />
              <div className={styles.high}>High Waist Slim</div>
              <div>
                <div>
                  <span>Color:</span> <span>White</span><br/>
                  <span>Size:</span> <span>XL</span>
                </div>
              </div>
            </div>
            <div className={styles.pad}>
              102101-20042-529-SML
              {/* <span className="color-black font-weight-600">|</span>&nbsp;
              <icons.ShipperPhone /> */}
              {/* <a className="d-block" href="#">
                test
              </a> */}
            </div>
            <div className={styles.pad}>KWD46.90</div>
            <div className={styles.highWrap}>
              <span>Ordered:1 </span>
              <span> Canceled:1</span>
            </div>
            <div className={styles.pad}>KWD46.90</div>
          </div>
          <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span>Subtotal:{" "}</span>
              <span className = {styles.price}>KWD123</span>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span>Shipping & Handling:{" "}</span>
              <span className = {styles.price}>KWD123</span>
            </div>
          </div>

          <hr className={styles.line} />
          <div className={styles.pay}>
            <div className={styles.payBox}>
              <span>Grand Total:{" "}</span>
              <span className = {styles.price}>KWD123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationTable;
