import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/layout/Footer/Footer';
import MainHeader from '../components/layout/Header/MainHeader/MainHeader';
import Cart from '../components/common/Cart';
import { toggleCart } from '../store/actions/cart';
import ChatButton from '../components/common/Buttons/Chat/Chat';
import SignUpCard from '../components/common/Cards/SignUpCard/SignUpCard';
import Wishlist from '../components/common/Wishlist/Wishlist';
import QuickView from '../components/common/QuickView/QuickView';
import Landing from '../pages/Landing/Landing';

import { toggleSignUpCard } from '../store/actions/common';

const MainLayout = ({ children }) => {
  const [mainHeader, setMainHeader] = useState(true);
  const [childRender, setChildRender] = useState(true);
  const store = useSelector((state) => state.common.store);
  const dispatch = useDispatch();
  const paths = ['/delivery-address', '/cart-payment'];

  useEffect(() => {
    const ssss = window?.location.pathname;
    if (paths.includes(window?.location.pathname)) {
      if (!children.props.auth.isAuthenticated) {
        setChildRender(false);
        dispatch(toggleSignUpCard({}));
        dispatch(toggleCart(false));
      }
      else {
        setMainHeader(false);
      }
    } else {
      setMainHeader(true);
      setChildRender(true)
    }
  });

  return (
    <div dir={store.language === 'Arabic' ? 'rtl' : 'ltr'}>
      {mainHeader && <MainHeader mainHeade={mainHeader} />}
      <SignUpCard />
      {childRender ? <>{children}</> : <Landing />}
      <Cart />
      <Footer />
      <ChatButton />
      <Wishlist />
      <QuickView />
    </div>
  );
};

export default MainLayout;
