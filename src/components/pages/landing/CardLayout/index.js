import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPromoCategories } from "../../../../services/layout/Layout.service";
import Card from "../../../common/Cards/CardWithBoxContent";
import style from "./styles.module.scss";


function Index() {
  const [data, setdata] = useState([]);
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  const init = async () => {
    const res = await getPromoCategories(selectedCategoryItem?.id);
    if (res.status===200 && res.data) {
      setdata(res?.data?.map((d) => ({ ...d, title: d.name })) || []);
    }
  };

  useEffect(() => {
    init();
  }, [selectedCategoryItem?.id]);

  return (
    <div className={`container-with-circles ${style.container}`}>
      {data?.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
}

export default Index;
