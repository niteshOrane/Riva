import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const ShoppingCart = React.lazy(() =>
  import("../pages/ShoppingCart/ShoppingCart")
);
const MainLayout = ({ children }) => {
  const history = useHistory();
  const [mainHeader, setMainHeader] = useState(true);
  const [childRender, setChildRender] = useState(true);
  const store = useSelector((state) => state.common.store);
  const dispatch = useDispatch();
  const paths = ['/delivery-address', '/cart-payment'];
  const openSignUpCard = (redirectTo) => {
    dispatch(toggleSignUpCard({ redirectTo }));
  };
  useEffect(() => {
    if (paths.includes(children?.props.location.pathname)) {
      if (!children.props.auth.isAuthenticated) {
        openSignUpCard('/delivery-address')
        dispatch(toggleCart(false));
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
      {childRender ? <>{paths.includes(children?.props.location.pathname) && !children.props.auth.isAuthenticated? <ShoppingCart /> : children}</> : <Landing />}
      <Cart />
      <Footer />
      <ChatButton />
      <Wishlist />
      <QuickView />
    </div>
  );
};

export default MainLayout;
