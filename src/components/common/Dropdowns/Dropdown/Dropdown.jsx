import React, { useState } from "react";
import style from "./Dropdown.module.scss";

const SimpleDropdown = ({ depth, children, item }) => {
  const [open, setOpen] = useState(
    item?.children?.length || item.color?.length
  );

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div className={`${style.dropdown} ${item.isParent ? style.dpParent : ""} `}>
      <div
        onClick={handleClose}
        className={`${style.header} ${item.isParent ? style.dpHeader : ""} ${style.dropdownCollapse}`}
      >
        {item?.isParent ? <h4>{item.title}</h4> : <h5>{item.title}</h5>}
        {item?.isParent ? (
          <span className={`material-icons ${style.icon}`}>{`keyboard_arrow_${
            open ? "up" : "down"
          }`}</span>
        ) : (
          <span className="material-icons">{open ? "remove" : "add"}</span>
        )}
      </div>

      <div>{open && children}</div>
    </div>
  );
};

export default SimpleDropdown;
