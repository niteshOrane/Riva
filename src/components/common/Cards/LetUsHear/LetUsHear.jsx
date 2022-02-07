import React from "react";
import * as icons from "../../Icons/Icons";
import style from "./LetUsHear.module.scss";

const LetUsHear = ({translate}) => {
  return (
    <div className={style.contactCard}>
      <div className={style.contactIcon}>
        <icons.HeadPhones />
      </div>
      <h4 className={style.contactCardTitle}>{translate?.deliveryAddress?.LET}</h4>
      <p>
        <strong>
          <a className="color-black" href="tel: +971 800 7482">
            +971 800 7482
          </a>
        </strong>
        <span className="font-light-black">
        {translate?.deliveryAddress?.BOX}
        </span>
      </p>
    </div>
  );
};

export default LetUsHear;
