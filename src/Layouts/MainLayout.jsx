import React, { useState, useEffect } from "react";
import Footer from "../components/layout/Footer/Footer";
import MainHeader from "../components/layout/Header/MainHeader/MainHeader";
import ProductsHeader from "../components/layout/Header/ProductsHeader/ProductsHeader";
import Cart from "../components/common/Cart";
import ChatButton from "../components/common/Buttons/Chat/Chat";
import SignUpCard from "../components/common/Cards/SignUpCard/SignUpCard";
const MainLayout = ({ children }) => {
  const selectedProductId = children.props.match.params.categoryId;
  const [mainHeader, setMainHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const openSignUpCard = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const path1 = "/products/";
  useEffect(() => {
    if (window?.location.pathname.includes(path1) || selectedProductId) {
      setMainHeader(false);
    } else {
      setMainHeader(true);
    }
  });
  return (
    <div>
      {mainHeader ? (
        <MainHeader openSignUpCard={openSignUpCard} />
      ) : (
        <ProductsHeader />
      )}
      <SignUpCard handleClose={handleClose} open={open} />
      <div>{children}</div>
      <Cart />
      <Footer />
      <ChatButton />
    </div>
  );
};

export default MainLayout;
