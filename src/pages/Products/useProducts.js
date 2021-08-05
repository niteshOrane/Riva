import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../enviroments';
import { getStoreId } from '../../util';

const useProducts = ({ categoryId, 
  currentPage=1,
  pageSize=10, 
  sortField = 'price', 
  sortDirection = 'asc', onScreen}) => {
  const [products, setProducts] = useState([]);
  const [filters, setfilters] = useState({});

  const [loading, setloading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setloading(true);
    let currentPageGet =currentPage;
    setfilters({});
    if(!onScreen){
      setProducts([]);
      currentPageGet=1;
    }
    const config = {
      method: 'get',
      url:`${API_URL}/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=${sortField}&searchCriteria[sortOrders][0][direction]=${sortDirection}&searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPageGet}&store_id=${getStoreId()}&status=1`,
      silent: true,
    };
    axios(config)
      .then((response) => {
        const productsList = response?.data?.items?.map((product) => {
          return {
            ...product,
            id: product.id,
            image:   product?.media_gallery_entries.find(
              (attr) => attr.position === 0
            )?.file|| product?.custom_attributes.find(
              (attr) => attr.attribute_code === 'image'
            )?.value,
            name: product.name,
            price: product.price,
            sale:
              product?.custom_attributes.find(
                (attr) => attr.attribute_code === 'show_sale_badge'
              )?.value === '1',
          };
        });
        
        setTotalCount(response?.data?.total_count);
        if(onScreen){
        setProducts([...products, ...productsList]);
        }
        else{
          setProducts(productsList);
        }
        setfilters(response?.data?.search_criteria);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
      });
  }, [categoryId, currentPage, pageSize, sortField, sortDirection]);

  return {
    products,
    filters,
    loading,
    totalCount
  };
};

export default useProducts;
