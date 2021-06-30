import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Circle from "../../layout/Navbar/Circle";
import { selectedCategory } from "../../../store/actions/common";

function CategoriesCircles() {
  const links = useSelector((state) => state.common.category)[0];
  const [defaultCategory, setCategory] = useState("1241"); //woman

  const dispatch = useDispatch();

  const onCategorySelect = (id) => {
    setCategory(id);
    const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, id));
    }
  };

  useEffect(() => {
    const items =
      links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
    }
  }, [links, defaultCategory]);

  return (
    <div>
      {links?.children_data?.map(
        (item) =>
          item.is_active == 1 && (
            <Circle
              id={item?.id}
              onClick={() => {
                onCategorySelect(item?.id);
              }}
              bg={`${defaultCategory === item?.id ? "skin" : "black"}`}
            >
              {item?.name}
            </Circle>
          )
      )}
    </div>
  );
}

export default CategoriesCircles;