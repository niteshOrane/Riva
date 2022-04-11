import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Circle from "../../layout/Navbar/Circle";
import { selectedCategory } from "../../../store/actions/common";
import styles from "./categoryCircle.module.scss";

function CategoriesCircles({ isHomePage }) {
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const links = useSelector((state) => state.common.category)[0];

  const [defaultCategory, setCategory] = useState(0); //woman
  const [selectedTab, setSelectedTab] = useState(null); //woman

  const dispatch = useDispatch();
  const history = useHistory();

  const onCategorySelect = (id) => {
    if (id) {
      setCategory(id);
      localStorage.setItem("selectedCategory", JSON.stringify(id));
      setTimeout(() => {
        const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
        if (items.length) {
          dispatch(selectedCategory(items[0]?.children_data, id));
          history.push(`/type/${id}`);
          window.location.reload();
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (!isHomePage) {
      setCategory(isHomePage ? 0 : selectedCategoryItem?.id);
      const items =
        links?.children_data?.filter((e) => e?.id == defaultCategory) ?? [];
      if (items.length && selectedCategoryItem?.id != defaultCategory) {
        dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
      }
    } else {
      dispatch(selectedCategory([], 0));
    }
  }, []);
  return (
    <div className={styles.categoryTab}>
      {links?.children_data?.map(
        (item) =>
          item.is_active == 1 && (
            <div
              style={{
                background:
                  JSON.parse(localStorage.getItem("selectedCategory")) !==
                  item.id
                    ? "black"
                    : null,
                    color: JSON.parse(localStorage.getItem("selectedCategory")) !==
                    item.id
                      ? "white"
                      : "black"
              }}
              onClick={() => {
                onCategorySelect(item?.id);
                setSelectedTab(item.id);
              }}
            >
              <span style={{ fontWeight: "bold" }}>{item?.name}</span>
            </div>
          )
      )}
    </div>
  );
}

export default CategoriesCircles;
