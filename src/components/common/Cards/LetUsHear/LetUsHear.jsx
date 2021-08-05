import React from "react";
import * as icons from "../../Icons/Icons";
import style from "./LetUsHear.module.scss";

const LetUsHear = () => {
  return (
    <div className={style.contactCard}>
      <div className={style.contactIcon}>
        <icons.HeadPhones />
      </div>
      <h4 className={style.contactCardTitle}>Let us hear from you at</h4>
      <p>
        <strong>
          <a className="color-black" href="tel: +971 800 7482">
            +971 800 7482
          </a>
        </strong>
        <span className="font-light-black">
          we are available to serve you 24 hours all week long & always happy to
          help you.
        </span>
      </p>
    </div>
  );
};

export default LetUsHear;
