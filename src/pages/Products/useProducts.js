import { useEffect, useState } from 'react';
import axios from 'axios';

const useProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [filters, setfilters] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    setProducts([]);
    setfilters({});
    const config = {
      method: 'get',
      url: `http://65.0.141.49/shop/index.php/rest/V1/products?searchCriteria[page_size]=20&searchCriteria[current_page]=1&searchCriteria[sort_orders]=DESC&searchCriteria[page_size]=10&category_id=${categoryId}&store_id=1`,
      silent: true,
    };

    axios(config)
      .then((response) => {
        const products = response?.data?.items?.map((product) => {
          return {
            id: product.id,
            image: product?.custom_attributes.find(
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
        setProducts(products);
        setfilters(response?.data?.search_criteria);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, [categoryId]);

  return {
    products,
    filters,
    loading,
  };
};

export default useProducts;
