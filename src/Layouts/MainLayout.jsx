import React, { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer/Footer';
import MainHeader from '../components/layout/Header/MainHeader/MainHeader';
import ProductsHeader from '../components/layout/Header/ProductsHeader/ProductsHeader';
import Cart from '../components/common/Cart';
import ChatButton from '../components/common/Buttons/Chat/Chat';

const MainLayout = ({ children }) => {
  const selectedProductId = children.props.match.params.categoryId;
  const [mainHeader, setMainHeader] = useState(true);
  const path1 = '/products/';
  useEffect(() => {
    if (window?.location.pathname.includes(path1) || selectedProductId) {
      setMainHeader(false);
    } else {
      setMainHeader(true);
    }
  });
  return (
    <div>
      {mainHeader ? <MainHeader /> : <ProductsHeader />}

      <div>{children}</div>
      <Cart />
      <Footer />
      <ChatButton />
    </div>
  );
};

export default MainLayout;
