import React from "react";
import style from "./BlackCloseBtn.module.scss";

const BlackCloseBtn = ({ handleClose, drawerPosition,filter }) =>  (
    <button type="button"
      onClick={handleClose}
      title="Close"
      className={`${!filter ? style.btn : style.filterBtn } ${drawerPosition === "top" && style.top}`}
    >
      <span className="material-icons">close</span>
    </button>
  );
  
export default BlackCloseBtn;
