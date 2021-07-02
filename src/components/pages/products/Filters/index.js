/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import BlackCloseBtn from "../../../common/Buttons/BlackCloseBtn/BlackCloseBtn";
import Dropdown from "../../../common/Dropdowns/Dropdown/Dropdown";
import CheckBoxComponent from "./CheckBoxComponent";
import { data } from "./RandomData";
import RangeSlider from "./RangeSlider";
import style from "./filters.module.scss";

// SMALL COMPONENTS
const List = ({ item }) => (
  <div key={item.id} className={style.listContainer}>
    <span />
    <span>{item.title}</span>
  </div>
);

const Colors = ({ colors }) => (
  <div className="d-flex align-items-center flex-wrap gap-12">
    {colors.map((color, i) => (
      <div
        className="position-relative border-radius-50 c-pointer"
        key={i}
        id={style.color}
        style={{
          backgroundColor: `#${color}`,
          width: "30px",
          height: "30px",
          border: "1px solid #ddd",
        }}
      >
        <span class={style.tooltiptext}>{color}</span>
      </div>
    ))}
  </div>
);

const Info = ({ info }) => (
  <div>
    <div>
      <h4 style={{ margin: "12px 0" }}>{info.title}</h4>
      <p>{info.description}</p>
    </div>
  </div>
);

const Tags = ({ tags }) => (
  <div className="d-flex flex-wrap">
    {tags.tags.map((tag, i) => (
      <div key={i} className={style.tag}>
        <span>{tag}</span>
        <span className="material-icons-outlined">close</span>
      </div>
    ))}
  </div>
);

function Filters() {
  const drawerPosition = "top";
  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };
  const openDrawer = () => {
    setOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const renderFilters = () => {
    const renderComponent = (item) => {
      const handleCheckboxChange = () => {};
      switch (item.type) {
        case "checkbox":
          return (
            <CheckBoxComponent
              item={item}
              handleCheckboxChange={handleCheckboxChange}
            />
          );
        case "list":
          return <List item={item} />;
        case "range":
          return <RangeSlider />;
        case "colors":
          return <Colors colors={item.colors} />;
        case "info":
          return <Info info={item} />;
        case "tags":
          return <Tags tags={item} />;
        default:
          return item;
      }
    };

    const menu = (items, depth) => (
      <>
        <Dropdown depth={depth} item={items}>
          <>
            {items?.children?.map((item) =>
              item?.children ? menu(item, depth + 1) : renderComponent(item)
            )}
          </>
        </Dropdown>
      </>
    );

    return (
      <>
        <button
          className="no-border bg-transparent c-pointer"
          type="button"
          onClick={openDrawer}
        >
          <div className={style.filterTextwrapper}>
            <span className={style.filterText}>Filter </span>
            <img
              src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/a8e77c1a-7c54-4098-bf97-816226eea3f0.svg"
              width="20px"
              alt="filter"
            />
            <div className={style.filterDots}>
              <div className={style.greyDots}>
                <span></span>
                <span></span>
              </div>
              <div className={style.blackDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </button>
        <Drawer anchor={drawerPosition} onClose={closeDrawer} open={open}>
          <div className={style.filtersContainer}>
            <h2 className={style.filterBy}>Filter By</h2>
            <BlackCloseBtn
              handleClose={closeDrawer}
              drawerPosition={drawerPosition}
            />
            {/* <Search handleChange={handleSearchChange} value={searchValue} /> */}
            <div className={style.filtersGrid}>
              {data.map(($item, i) => (
                <div key={i}>{$item.map((item) => menu(item, 0))}</div>
              ))}
            </div>
          </div>
        </Drawer>
      </>
    );
  };

  return <div>{renderFilters()}</div>;
}

export default Filters;
