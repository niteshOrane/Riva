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
    setfilters({});
    if (!onScreen) {
      setProducts([]);
      currentPageGet = 1;
    }
    let config = {
      method: "get",
      url: `${API_URL}/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][1][filters][0][field]=visibility&searchCriteria[filterGroups][1][filters][0][value]=2&searchCriteria[filterGroups][1][filters][1][field]=visibility&searchCriteria[filterGroups][1][filters][1][value]=4&searchCriteria[filterGroups][2][filters][0][field]=status&searchCriteria[filterGroups][2][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=${sortField}&searchCriteria[sortOrders][0][direction]=${sortDirection}&searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPageGet}&searchCriteria[filterGroups][3][filters][0][field]=store_id&searchCriteria[filterGroups][3][filters][0][value]=${getStoreId()}`,
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
    console.log({filterAttr})
    if (filterAttr) {
      config = {
        method: "get",
        url: `${API_URL}/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][1][filters][0][field]=visibility&searchCriteria[filterGroups][1][filters][0][value]=2&searchCriteria[filterGroups][1][filters][1][field]=visibility&searchCriteria[filterGroups][1][filters][1][value]=4&searchCriteria[filterGroups][2][filters][0][field]=status&searchCriteria[filterGroups][2][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=${sortField}&searchCriteria[sortOrders][0][direction]=${sortDirection}&searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPageGet}&searchCriteria[filterGroups][3][filters][0][field]=store_id&searchCriteria[filterGroups][3][filters][0][value]=${getStoreId()}`,
        silent: true,
        data: {
          filter_groups: filterAttr,
        },
      };
    }
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
  }, [serachTerm, categoryId, currentPage, pageSize, sortField, sortDirection]);
  return {
    products,
    filters,
    loading,
    totalCount,
  };
};

export default useProducts;
