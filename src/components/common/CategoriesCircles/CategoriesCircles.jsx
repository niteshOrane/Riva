import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Circle from "../../layout/Navbar/Circle";
import { selectedCategory } from "../../../store/actions/common";

function CategoriesCircles({ isHomePage }) {
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const links = useSelector((state) => state.common.category)[0];

  const [defaultCategory, setCategory] = useState(0); //woman

  const dispatch = useDispatch();
  const history = useHistory();

  const onCategorySelect = (id) => {
    if (id) {
      setCategory(id);
      setTimeout(() => {
        const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
        if (items.length) {
          dispatch(selectedCategory(items[0]?.children_data, id));
          history.push(`/type/${id}`);
          window.location.reload();
        }
      }, 200)
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
    }
    else {
      dispatch(selectedCategory([], 0));
    }
  }, []);
  return (
    <div style={{ margin: `0 ${isHomePage ? '5px' : 'auto'}` }}>
      {links?.children_data?.map(
        (item) =>
          item.is_active == 1 && (
            <div onClick={() => {
              onCategorySelect(item?.id);
            }}>
              <Circle
                id={item?.id}
                onClick={onCategorySelect}
                bg={`${defaultCategory === item?.id ? "skin" : "black"}`}
              >
                <span style={{ fontWeight: "bold" }}>
                  {item?.name}
                </span>
              </Circle>
            </div>
          )
      )}
    </div>
  );
}

export default CategoriesCircles;
