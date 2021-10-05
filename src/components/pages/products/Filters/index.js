/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import BlackCloseBtn from "../../../common/Buttons/BlackCloseBtn/BlackCloseBtn";
import Dropdown from "../../../common/Dropdowns/Dropdown/Dropdown";
import CheckBoxComponent from "./CheckBoxComponent";
import { data } from "./RandomData";
import RangeSlider from "./RangeSlider";
import style from "./filters.module.scss";
import { getFiltersList } from "../../../../services/product/product.service";
import { useDispatch, useSelector } from "react-redux";
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
  const [filtersAttr, setFiltersAttr] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const filterAttr = useSelector((state) => state?.common?.filtersParams);
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
    const list = await getFiltersList({ catId, serachTerm });
    setFiltersAttr(list?.data[0]?.filters);
  };
  useEffect(() => {
    if (categoryId && categoryId > 0) {
      filterList(categoryId);
    }
  }, [categoryId]);
  const categoryList = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "cat")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "cat")?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "cat")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
          };
        }),
    },
  ];
  let priceList = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "price")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "price")?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "price")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
            value: c.value,
            label: filtersAttr?.find((v) => v.attr_code === "price")
              ?.attr_label,
          };
        }),
    },
  ];
  let colorList = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "color")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "color")?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "color")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
            value: c.value,
            label: filtersAttr?.find((v) => v.attr_code === "color")
              ?.attr_label,
          };
        }),
    },
  ];
  let sizeList = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "size")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "size")?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "size")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
            value: c.value,
            label: filtersAttr?.find((v) => v.attr_code === "size")?.attr_label,
          };
        }),
    },
  ];
  let discountPercentage = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "discount_percentage")
        ?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "discount_percentage")
        ?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "discount_percentage")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
          };
        }),
    },
  ];

  const manufacturer = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "manufacturer")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "manufacturer")
        ?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "manufacturer")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
          };
        }),
    },
  ];
  const colorSwatch = [
    {
      id: filtersAttr?.find((v) => v.attr_code === "color_swatch")?.attr_code,
      title: filtersAttr?.find((v) => v.attr_code === "color_swatch")
        ?.attr_label,
      children: filtersAttr
        ?.find((v) => v.attr_code === "color_swatch")
        ?.values.map((c, idx) => {
          return {
            id: idx + 1,
            title: c.display,
            isItem: false,
            type: "checkbox",
          };
        }),
    },
  ];
  const newList = [
    categoryList,
    priceList,
    colorList,
    sizeList,
    discountPercentage,
    manufacturer,
    // colorSwatch,
    // selectedTags
  ];
  const closeDrawer = () => {
    setOpen(false);
  };
  const openDrawer = () => {
    setOpen(true);
  };

  const seeResultsAction = () => {
    window.location.reload();
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
    window.location.reload()
  };
  const renderFilters = () => {
    const renderComponent = (item) => {
      const handleCheckboxChange = async (val, e) => {
        handleCheck(val)
          ? ""
          : setSelectedTags([...selectedTags, { checked: true, val }]);
        if (e.target.checked) {
          if (val?.label && val?.title) {
            dispatch(
              addFilterParams(
                val?.label,
                val?.label === "Color"
                  ? val?.title.replace(/[0-9]/g, "")?.toUpperCase()?.trim()
                  : val?.title
              )
            );
          } else {
            dispatch(addFilterParams("Options", val?.title));
          }
        } else {
          null;
        }
        let color =
          selectedTags.filter((li) => li?.val.label === "Color").length > 0 &&
          true;
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
                      height: "25rem",
                      overflowY: "scroll",
                      paddingRight: "1rem",
                    }
                  : null
              }
            >
              {items?.children?.map((item) =>
                item?.children ? menu(item, depth + 1) : renderComponent(item)
              )}
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
                />
              </div>
            </span>

            <div className={style.filterDots}>
              <div
                onClick={handleTwoColumns}
                className={`${pageColumns === 2 ? style.blackDots : ""} ${
                  style.greyDots
                }`}
              >
                <span />
                <span />
              </div>
              <div
                onClick={handleThreeColumns}
                className={`${pageColumns === 3 ? style.blackDots : ""} ${
                  style.greyDots
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
            {/* <Search handleChange={handleSearchChange} value={searchValue} /> */}
            <div className={style.tagsFlex}>
              {[...new Set(filterAttr?.Color)]?.map((li) => (
                <div className="d-flex flex-wrap">
                  <div
                    onClick={() => removeSingleAttr("Color", li)}
                    className={style.tag}
                  >
                    <span>{li}</span>
                    <span className="material-icons-outlined">close</span>
                  </div>
                </div>
              ))}
              {[...new Set(filterAttr?.Size)]?.map((li) => (
                <div className="d-flex flex-wrap">
                  <div
                    onClick={() => removeSingleAttr("Size", li)}
                    className={style.tag}
                  >
                    <span>{li}</span>
                    <span className="material-icons-outlined">close</span>
                  </div>
                </div>
              ))}
                {[...new Set(filterAttr?.Price)]?.map((li) => (
                <div className="d-flex flex-wrap">
                  <div
                    onClick={() => removeSingleAttr("Price", li)}
                    className={style.tag}
                  >
                    <span>{li}</span>
                    <span className="material-icons-outlined">close</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.filtersGrid}>
              {newList?.map(($item, i) => {
                console.log($item)
                return $item?.[0]?.children?.length !==0 && <div key={i}>{$item?.map((item) => menu(item, 0))}</div>;
              })}
            </div>
          </div>
          <div>
            <section className={`${style.seeResult}`}>
              <button className = "c-pointer" onClick={seeResultsAction}>SEE RESULTS</button>
            </section>
            <section className={`${style.seeResult}`}>
              <button className = "c-pointer" onClick={resetFilters}>RESET ALL</button>
            </section>
          </div>
        </Drawer>
      </>
    );
  };

  return <div>{renderFilters()}</div>;
}

export default Filters;
