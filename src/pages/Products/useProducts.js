import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../enviroments";
import { getStoreId } from "../../util";

const useProducts = ({
  categoryId,
  currentPage = 1,
  pageSize = 20,
  sortField,
  sortDirection,
  onScreen,
  serachTerm = "",
  filterAttr,
}) => {
  const [products, setProducts] = useState([]);
  const [filters, setfilters] = useState({});

  const [loading, setloading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    setloading(true);
    let currentPageGet = currentPage;
    let filterStr = '';
    setfilters({});
    if (!onScreen) {
      setProducts([]);
      currentPageGet = 1;
    }
    console.log("filterValue1: ",filterAttr,categoryId,currentPage,pageSize,sortField,sortDirection,onScreen,serachTerm);
    if (filterAttr.status && (filterAttr.newPayloadArr.length > 0)) {
        // filterList(categoryId);
        const keyValue = Object.keys(filterAttr.newPayloadArr[0]);
        const filterValue = [];
        for (let i = 0; i < keyValue.length; i++) {
          console.log("keyValue: ", keyValue[i]);
          if (filterAttr.newPayloadArr[0][keyValue[i]].length > 0) {
            let str = `&filterInfo[filter][${keyValue[i]}]=`;
              for (let j = 0; j < filterAttr.newPayloadArr[0][keyValue[i]].length; j++) {
                if (j==0) {
                  str += filterAttr.newPayloadArr[0][keyValue[i]][j].value;
                } else {
                  str += `_${filterAttr.newPayloadArr[0][keyValue[i]][j].value}`;
                }                
              } 
            filterValue.push(str);
            filterStr += str;
          }
        }
        // console.log("filterValue: ",filterAttr, filterStr, keyValue, filterValue);
    }
    let config = {
      method: "get",
      // url: `${API_URL}/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][1][filters][0][field]=visibility&searchCriteria[filterGroups][1][filters][0][value]=2&searchCriteria[filterGroups][1][filters][1][field]=visibility&searchCriteria[filterGroups][1][filters][1][value]=4&searchCriteria[filterGroups][2][filters][0][field]=status&searchCriteria[filterGroups][2][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=${sortField}&searchCriteria[sortOrders][0][direction]=${sortDirection}&searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPageGet}&searchCriteria[filterGroups][3][filters][0][field]=store_id&searchCriteria[filterGroups][3][filters][0][value]=${getStoreId()}${filterStr}`,

      url: `${API_URL}/webapi/getfilterproducts?filterInfo[category_id]=${categoryId}&filterInfo[pageSize]=${pageSize}&filterInfo[page]=${currentPageGet}&filterInfo[sortOrderField]=position&filterInfo[sortOrder]=ASC&filterInfo[store_id]=${getStoreId()}${filterStr}`,

      // url: `${API_URL}/webapi/getfilterproducts?filterInfo[category_id]=1525&filterInfo[pageSize]=20&filterInfo[page]=1&filterInfo[sortOrderField]=position&filterInfo[sortOrder]=ASC&filterInfo[store_id]=1&filterInfo[filter][size]=117_231&filterInfo[filter][color_swatch]=1727_1722&filterInfo[filter][price]=0-50_50-100`,
      
      silent: true,
    };
    if (serachTerm) {
      config = {
        method: "post",
        url: `${API_URL}/searchresult`,
        silent: true,
        data: {
          searchterms: serachTerm,
          conditionType: "like",
          sortOrders: sortField,
          direction: sortDirection,
          currentPage: currentPageGet,
          pageSize,
          store_id: getStoreId(),
        },
      };
    }
    // if (filterAttr) {
    //   config = {
    //     method: "get",
    //     url: `${API_URL}/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][1][filters][0][field]=visibility&searchCriteria[filterGroups][1][filters][0][value]=2&searchCriteria[filterGroups][1][filters][1][field]=visibility&searchCriteria[filterGroups][1][filters][1][value]=4&searchCriteria[filterGroups][2][filters][0][field]=status&searchCriteria[filterGroups][2][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=${sortField}&searchCriteria[sortOrders][0][direction]=${sortDirection}&searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPageGet}&searchCriteria[filterGroups][3][filters][0][field]=store_id&searchCriteria[filterGroups][3][filters][0][value]=${getStoreId()}`,
    //     silent: true,
    //     data: {
    //       filter_groups: filterAttr,
    //     },
    //   };
    // }
    axios(config)
      .then((response) => {
        const dataItem =
          response?.data && response?.data?.items ? response?.data?.items : [];
        const productsList = dataItem?.map((product) => {
          return {
            ...product,
            id: product.id,
            image:
              product?.media_gallery_entries.find((attr) => attr.position === 0)
                ?.file ||
              product?.custom_attributes.find(
                (attr) => attr.attribute_code === "image"
              )?.value,
            name: product.name,
            price: product.price,
            sale:
              product?.custom_attributes.find(
                (attr) => attr.attribute_code === "show_sale_badge"
              )?.value === "1",
          };
        });
        console.log({dataItem})

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
  }, [serachTerm, categoryId, currentPage, pageSize, sortField, sortDirection, filterAttr]);
  return {
    products,
    filters,
    loading,
    totalCount,
  };
};

export default useProducts;
