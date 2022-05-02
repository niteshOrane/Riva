import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../enviroments";
import { getStoreData, getStoreId } from "../../util";
import { useSelector } from "react-redux";

const useProducts = ({
  categoryId,
  currentPage = 1,
  pageSize = 20, 
  onScreen,
  serachTerm = "",
  filterAttr,
}) => {
  const [products, setProducts] = useState([]);
  const [filters, setfilters] = useState({});

  const [loading, setloading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { sortField, sortDirection } = useSelector(
    (state) => state?.common?.sortAttr
  );
  useEffect(() => {
    setloading(true);
    let currentPageGet = currentPage;
    let filterStr = "";
    const filterValue = [];
    let newCatIDParam = "";
    setfilters({});
    if (!onScreen) {
      setProducts([]);
      currentPageGet = 1;
    }
    if (filterAttr.status && filterAttr.newPayloadArr.length > 0) {
      const keyValue = Object.keys(filterAttr.newPayloadArr[0]);
      for (let i = 0; i < keyValue.length; i++) {
        if (filterAttr.newPayloadArr[0][keyValue[i]].length > 0) {
          let str = `&filterInfo[filter][${keyValue[i]}]=`;
          for (
            let j = 0;
            j < filterAttr.newPayloadArr[0][keyValue[i]].length;
            j++
          ) {
            if (j == 0) {
              str += filterAttr.newPayloadArr[0][keyValue[i]][j].value;
            } else {
              str += `_${filterAttr.newPayloadArr[0][keyValue[i]][j].value}`;
            }
          }
          filterValue.push(str);
          filterStr += str;
        }
      }
    }

    if (serachTerm) {
      newCatIDParam = `&filterInfo[q]=${serachTerm}`;
    } else {
      newCatIDParam = `&filterInfo[category_id]=${categoryId}`;
    }
    const config = {
      method: "get",
      url: `${API_URL}/rest/${
        getStoreData()?.store_code
      }/V1/webapi/getfilterproducts?${newCatIDParam}&filterInfo[pageSize]=${pageSize}&filterInfo[page]=${currentPageGet}&filterInfo[sortOrderField]=${sortField}&filterInfo[sortOrder]=${sortDirection}&filterInfo[store_id]=${getStoreId()}${filterStr}`,
      silent: true,
    };
    axios(config)
      .then((response) => {
        const dataItem =
          response?.data && response?.data?.items ? response?.data?.items : [];

        const productsList = dataItem?.map((product) => {
          return {
            ...product,
            id: product.entity_id,
            image: product?.image,
            name: product?.name,
            price: product?.final_price,
            sale: product?.show_sale_badge ? null : product?.sale_img,
          };
        });

        setTotalCount(response?.data?.total_count);
        if (onScreen) {
          setProducts([...products, ...productsList]);
        } else {
          setProducts(productsList);
        }
        setfilters(response?.data?.search_criteria);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
      });
  }, [
    serachTerm,
    // categoryId,
    currentPage,
    // pageSize,
    sortField,
    sortDirection,
 
    filterAttr,
  ]);
 
  return {
    products,
    filters,
    loading,
    totalCount,
  };
};

export default useProducts;
