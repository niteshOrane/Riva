import React from "react";
import style from "./ButtonWithArrows.module.scss";
const ButtonWithArrows = ({ type, btnClass, onclick, text,isFestiveCard }) => {
  return (
    <button title={text}
      className={`${btnClass}  ${style.btn}`}
      type={type}
      onClick={onclick}
    >
      <span>{text}</span>
      <div style={isFestiveCard ? {top:"-1px"} : null} className={style.before}>
        {/* <span className="material-icons-outlined">navigate_before</span> */}
        <img className={isFestiveCard ? style.shopIcon : null} src="/assets/images/leftShop.png" alt="" />
      </div>
      <div style={isFestiveCard ? {bottom:"-1px"} : null} className={style.next}>
        {/* <span className="material-icons-outlined">navigate_next</span> */}
        <img  className={isFestiveCard ? style.shopIcon : null} src="/assets/images/rightShop.png" alt="" />
      </div>
    </button>
  );
};

export default ButtonWithArrows;
