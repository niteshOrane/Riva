import React from "react";
import style from "./filters.module.scss";

const CheckBoxComponent = ({ handleCheckboxChange, item, selectedTags }) => {
  return (
    <div className={`d-flex align-items-center ${style.checkBoxContainer}`}>
      <input
        className="c-pointer"
        type="checkbox"
        id={item.id}
        onChange={(e) => handleCheckboxChange(item,e)}
      />
      <label
        className="c-pointer w-100"
        style={{ marginLeft: "12px",paddingRight:"10px" }}
        htmlFor={item.id}
      >
        {item.title}
      </label>
    </div>
  );
};

export default CheckBoxComponent;
