import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/layout/Footer/Footer';
import MainHeader from '../components/layout/Header/MainHeader/MainHeader';
import Cart from '../components/common/Cart';
import ChatButton from '../components/common/Buttons/Chat/Chat';
import SignUpCard from '../components/common/Cards/SignUpCard/SignUpCard';
import Wishlist from '../components/common/Wishlist/Wishlist';
import QuickView from '../components/common/QuickView/QuickView';

const MainLayout = ({ children }) => {
  const [mainHeader, setMainHeader] = useState(true);
  const store = useSelector((state) => state.common.store);

  const paths = ['/delivery-address', 'cart-payment'];

  useEffect(() => {
    paths.forEach((path) => {
      if (window?.location.pathname.includes(path)) {
        setMainHeader(false);
      } else {
        setMainHeader(true);
      }
    });
  });

  return (
    <div dir={store.language === 'Arabic' ? 'rtl' : 'ltr'}>
      {mainHeader && <MainHeader mainHeade={mainHeader} />}
      <SignUpCard />
      <div>{children}</div>
      <Cart />
      <Footer />
      <ChatButton />
      <Wishlist />
      <QuickView />
    </div>
  );
};

export default MainLayout;
