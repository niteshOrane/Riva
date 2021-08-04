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

  const [defaultCategory, setCategory] = useState(isHomePage ? 0 : selectedCategoryItem?.id); //woman

  const dispatch = useDispatch();
  const history = useHistory();

  const onCategorySelect = (id) => {
    setCategory(id);
    const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, id));
      history.push(`/type/${id}`);
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
    <div style={{margin:'0 auto'}}>
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
