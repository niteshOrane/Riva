/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch, useSelector } from "react-redux";
import BlackCloseBtn from "../../../common/Buttons/BlackCloseBtn/BlackCloseBtn";
import Dropdown from "../../../common/Dropdowns/Dropdown/Dropdown";
import CheckBoxComponent from "./CheckBoxComponent";
import RangeSlider from "./RangeSlider";
import style from "./filters.module.scss";
import "../../../common/LazyImage/lazyImage.css"
import { getFiltersList } from "../../../../services/product/product.service";

import {
  addFilterParams,
  clearSingleFilterValue,
  removeFilterParams,
} from "../../../../store/actions/common";

// SMALL COMPONENTS
const List = ({ item }) => (
  <div key={item} className={style.listContainer}>
    <span />
    <span>{item.title} hello</span>
  </div>
);

const Colors = ({ colors }) => (
  <div className="d-flex align-items-center flex-wrap gap-12px">
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

const Tags = (tag) => {
  return (
    <div className="d-flex flex-wrap">
      <div key={tag.tags.id} className={style.tag}>
        <span>{tag.tags.val.title}</span>
        <span className="material-icons-outlined">close</span>
      </div>
    </div>
  );
};

function Filters(props) {
  const {
    handleThreeColumns,
    handleTwoColumns,
    pageColumns,
    categoryId,
    serachTerm,
  } = props;

  const drawerPosition = "top";
  const [searchValue, setSearchValue] = useState("");
  const [filtersAttr, setFiltersAttr] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newfiltersAttr, setNewfiltersAttr] = useState({});
  // const [newList, setNewList] = useState([]);
  const filterStoreAttr = useSelector((state) => state?.common?.filtersParams);
  // console.log({filterAttr});
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleRemoveTags = async (tag) => {
    let temp = [...selectedTags];
    temp = temp.filter((li) => li?.val?.title !== tag?.val?.title);
    let list = await getFiltersList(categoryId, "", "", "");
    setFiltersAttr(list?.data[0]?.filters);
    setSelectedTags(temp);
  };
  const filterList = async (catId) => {
    let obj = {};
    // let newCatIDParam = `categoryData[categoryId]=${catId}`;
    const list = await getFiltersList({ catId, serachTerm, obj });
    console.log("filterList: ",list, catId);
    setFiltersAttr(list?.data[0]?.filters);
  };

  useEffect(() => {
    if (categoryId && categoryId > 0) {
      filterList(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    // if (serachTerm) { 
      filterList(categoryId);
    // }
  }, [serachTerm]);

  let newList = [];
  if (filtersAttr?.length) {
    filtersAttr?.forEach((el) => {
      const newArr = [];
      const obj = {};
      obj["id"] = el?.attr_code;
      obj["title"] = el?.attr_label;
      obj["children"] = el?.values.map((c, idx) => {
        return {
          id: idx + 1,
          title: c.display,
          isItem: false,
          isChecked: (c.checked) ? true : false,
          type: "checkbox",
          attr_code: el?.attr_code,
          value_code: c?.value
        };
      });
      newArr.push(obj);
      newList = [...newList, newArr];
      
    });
  }


  const closeDrawer = () => {
    setOpen(false);
  };
  const openDrawer = () => {
    console.log("openDrawer: ", filterStoreAttr, filtersAttr );
    if (filterStoreAttr.status == true) {
      for (let i = 0; i < filtersAttr.length; i++) {
        for (let j = 0; j < filtersAttr[i].values.length; j++) {
          filtersAttr[i].values[j].checked = false;
          for (let k = 0; k < filterStoreAttr.newPayloadArr[0][filtersAttr[i].attr_code].length; k++) {
            if (filterStoreAttr.newPayloadArr[0][filtersAttr[i].attr_code][k].value == filtersAttr[i].values[j].value ) {
              filtersAttr[i].values[j].checked = true;
            }
          }
        }
      }
    }
    
    // setFiltersAttr(filtersAttr);
    setOpen(true);
  };

  const seeResultsAction = () => {
    // if (categoryId && categoryId > 0) {
      // let obj = {name: "orane", value: "416"}
      let newPayloadArr = {};
      for (let i = 0; i < filtersAttr.length; i++) {
        newPayloadArr[filtersAttr[i].attr_code] = []
        for (let j = 0; j < filtersAttr[i].values.length; j++) {
          if (filtersAttr[i].values[j].checked == true) {
            filtersAttr[i].values[j].field = filtersAttr[i].attr_code;
            // newPayloadArr.push(filtersAttr[i].values[j]);
            newPayloadArr[filtersAttr[i].attr_code].push(filtersAttr[i].values[j]);
          }
        }
      }
      dispatch(addFilterParams("newPayloadArr", newPayloadArr));
      closeDrawer();
      console.log("filterValue: ",filtersAttr, newPayloadArr);
    // }
  };

  const removeSingleAttr = (label, value) => {
    dispatch(clearSingleFilterValue(label, value));
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleCheck = (entry) => {
    selectedTags.some(
      (li) =>
        li?.val?.id === entry?.val?.id && li?.val?.label === entry?.val?.label
    );
  };
  const resetFilters = () => {
    dispatch(removeFilterParams("all"));
    
    filterList(categoryId);
    closeDrawer();
    // window.location.reload();
  };
  const renderFilters = () => {
    const renderComponent = (item) => {
      const handleCheckboxChange = async (val, e) => {
        // let filtersAttr = [...filtersAttr];
        handleCheck(val)
          ? ""
          : setSelectedTags([...selectedTags, { checked: true, val }]);
        if (e.target.checked) {
          if (val?.attr_code && val?.title) {
            console.log("filtersAttr: ", filtersAttr, val);

            // dispatch(
            //   addFilterParams(
            //     val?.attr_code,
            //     val
            //   )
            // );
          }
        } else {
          null;
        }
        for (let i = 0; i < filtersAttr.length; i++) {
          if (filtersAttr[i].attr_code == val.attr_code) {
            for (let j = 0; j < filtersAttr[i].values.length; j++) {
              if (filtersAttr[i].values[j].value == val.value_code) {
                filtersAttr[i].values[j].checked = e.target.checked;
                filtersAttr[i].values[j].field = filtersAttr[i].attr_code;
                if (filtersAttr[i].attr_code == "price") {
                  let splitVal = filtersAttr[i].values[j].value.split('-');
                  filtersAttr[i].values[j].splitVal = splitVal;
                  // console.log("splitVal: ", splitVal)
                }
                setFiltersAttr(filtersAttr);
              }
            }
          }
        }

        let color =
          selectedTags.filter((li) => li?.val.label === "Color").length > 0 && true;
        // const list = await getFiltersList(categoryId, val,val,val);
        //  setFiltersAttr(list?.data[0]?.filters);
      };

      switch (item.type) {
        case "checkbox":
          return (
            <CheckBoxComponent
              item={item}
              handleCheckboxChange={handleCheckboxChange}
              selectedTags={selectedTags}
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
            <div
              style={
                items?.children?.length > 10
                  ? {
                    height: "12rem",
                    overflowY: "scroll",
                    // paddingRight: "1rem",
                  }
                  : null
              }
            >
              {items?.children?.map((item) => {
                return item?.children
                  ? menu(item, depth + 1)
                  : renderComponent(item);
              })}
            </div>
          </>
        </Dropdown>
      </>
    );

    return (
      <>
        <button className="no-border bg-transparent c-pointer" type="button">
          <div className={style.filterTextwrapper}>
            <span onClick={openDrawer}>
              <div className={style.filterTextwrapper}>
                <span className={style.filterText}>Filter </span>
                <img
                  src="https://cdn.zeplin.io/60a3c6b611da9729d2c0e7c2/assets/a8e77c1a-7c54-4098-bf97-816226eea3f0.svg"
                  width="20px"
                  alt="filter"
                  className="fltrImg"
                />
              </div>
            </span>

            <div className={style.filterDots}>
              <div
                onClick={handleTwoColumns}
                className={`${pageColumns === 2 ? style.blackDots : ""} ${style.greyDots
                  }`}
              >
                <span />
                <span />
              </div>
              <div
                onClick={handleThreeColumns}
                className={`${pageColumns === 3 ? style.blackDots : ""} ${style.greyDots
                  }`}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </button>
        <Drawer
          style={{ overflow: "hidden" }}
          anchor={drawerPosition}
          onClose={closeDrawer}
          open={open}
        >
          <div className={style.filtersContainer}>
            <h2 className={style.filterBy}>Filter By</h2>
            <BlackCloseBtn
              handleClose={closeDrawer}
              drawerPosition={drawerPosition}
              filter
            />
            <div className={style.filtersGrid}>
              {newList?.map(($item, i) => {//console.log("$item: ", $item)
                return (
                  $item?.[0]?.children?.length !== 0 && (
                    <div key={i}>{$item?.map((item) => menu(item, 1))}</div>
                  )
                );
              })}
            </div>
          </div>
          <div>
            <section className={`${style.seeResult}`}>
              <button type="button" className="c-pointer" onClick={seeResultsAction}>
                SEE RESULTS
              </button>
            </section>
            <section className={`${style.seeResult}`}>
              <button type="button" className="c-pointer" onClick={resetFilters}>
                RESET ALL
              </button>
            </section>
          </div>
        </Drawer>
      </>
    );
  };

  return <div>{renderFilters()}</div>;
}

export default Filters;
