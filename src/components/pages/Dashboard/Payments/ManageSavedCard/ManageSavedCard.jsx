import React from "react";
import * as icons from "../../../../common/Icons/Icons";
import styles from "./ManageSavedCard.module.scss";
const ManageSavedCard = () => {
  return (
    <div>
      {[1, 2].map((card) => (
        <div className={styles.card}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="font-weight-normal">
              Standard Chartered Bank Credit Card
            </h4>
            <div className={styles.editRemove}>
              <div className={styles.edit}>
                <span className="font-size-small">
                  <icons.Pencil />
                </span>
                <span className="font-size-normal c-pointer underline underline-hovered">
                  Edit
                </span>
              </div>
              <div>
                <span className="font-size-small">
                  <icons.Close />
                </span>
                <span className="font-size-normal c-pointer underline underline-hovered">
                  Remove
                </span>
              </div>
            </div>
          </div>
          <div className={styles.visa}>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/03e1b597-caff-493f-896b-b3a90632e539.png"
              width="100%"
              alt=""
            />
            <span className="font-size-small greyText">
              5518 68 * * **** 9785
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageSavedCard;
