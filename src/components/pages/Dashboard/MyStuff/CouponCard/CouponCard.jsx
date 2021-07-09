import React from "react";
import styles from "./CouponCard.module.scss";
import { MyStuf, AngleRight } from "../../../../common/Icons/Icons";
const CouponCard = () => {
  return (
    <div className="my-20px">
      <div className={styles.card}>
        <div className={styles.icon}>
          <MyStuf />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className={styles.title}>Extra 10% off On Select Fashion</h4>
          <p>Code: PREMIUM500</p>
        </div>
        <div className={styles.dottedBorder}></div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="font-size-small">
            Buy worth $10-30 save 10% Buy worth $50 save $10
          </span>
          <span className="font-size-small greyText">
            View T&C &nbsp;
            <AngleRight />
          </span>
        </div>
        <p className="font-size-small greyText mt-12px">
          Valid till 31 May, 2021
        </p>
      </div>
    </div>
  );
};

export default CouponCard;
