import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from './useProducts';

import Filters from '../../components/pages/products/Filters';
import ProductCard from '../../components/common/Cards/ProductCard';
import styles from './products.module.scss';

function Products(props) {
  const {products} = useProducts({
    categoryId: props.match.params.categoryId
  });

  return (
    <div>
      <Filters />
      <div className={`${styles.productsPage} gap-12`}>
        {products.map((product) => {
          return (
            <div className={styles.productCard}>
              <Link to={`/product/${product.id}`}>
                <ProductCard key={product.id} product={product} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
