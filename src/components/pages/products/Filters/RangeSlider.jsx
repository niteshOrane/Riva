import React from "react";
import Slider from "@material-ui/core/Slider";
import style from "./filters.module.scss";

const RangeSlider = () => {
  //   (HANDLECHANGE, VALUE, PRICE) will pass from parent (later)
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div className={style.sliderParent}>
      <Slider
        value={value}
        color="red"
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <div
        id={style.rangBtns}
        className="d-flex align-items-cetner justify-content-between"
      >
        <button className={style.rangePriceBtn}>
          ${value[0]}-${value[1]}
        </button>
        <button className={style.rangeFilterBtn}>Filter</button>
      </div>
    </div>
  );
};

export default RangeSlider;
