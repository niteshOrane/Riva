import React from 'react';
import ProductsHeaderTopBar from '../components/TopBar/ProductsHeaderTopBar/ProductsHeaderTopBar';
import ProductsHeaderIcons from '../components/ProductsHeaderIcons/ProductsHeaderIcons';
import ProductsHeaderMegaLinks from '../../Mega-links/ProductsHeaderMegaLinks/ProductsHeaderMegaLinks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductsHeader() {
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  return (
    <div>
      <ProductsHeaderTopBar />
      <div className="text-right">
        <ProductsHeaderIcons />
        <div className="d-flex justify-content-between mx-88px mr-50px position-relative">
          <strong class="d-block">
            <Link class="d-block" to="/">
              <img
                class="logo-image"
                src="/assets/images/logo.png"
                width="100%"
                alt="RAVI"
              />
            </Link>
          </strong>
          <ProductsHeaderMegaLinks links={selectedCategoryItem?.data} />
        </div>
      </div>
    </div>
  );
}

export default ProductsHeader;
