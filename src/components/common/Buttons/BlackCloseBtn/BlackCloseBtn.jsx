import React from "react";
import style from "./BlackCloseBtn.module.scss";

const BlackCloseBtn = ({ handleClose, drawerPosition }) =>  (
    <button type="button"
      onClick={handleClose}
      title="Close"
      className={`${style.btn} ${drawerPosition === "top" && style.top}`}
    >
      <span className="material-icons">close</span>
    </button>
  );
  
export default BlackCloseBtn;
