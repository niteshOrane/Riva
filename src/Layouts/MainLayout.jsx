import React from 'react';
import Footer from '../components/layout/Footer/Footer';
import Header from '../components/layout/Header/Header';
import Cart from '../components/common/Cart';
import ChatButton from '../components/common/Buttons/Chat/Chat'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Cart />
      <Footer />
      <ChatButton/>
    </div>
  );
};

export default MainLayout;
