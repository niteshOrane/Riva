import React, { useState, useEffect } from "react";
import Footer from "../components/layout/Footer/Footer";
import MainHeader from "../components/layout/Header/MainHeader/MainHeader";
import ProductsHeader from "../components/layout/Header/ProductsHeader/ProductsHeader";
import Cart from "../components/common/Cart";
import ChatButton from "../components/common/Buttons/Chat/Chat";
import SignUpCard from "../components/common/Cards/SignUpCard/SignUpCard";
import Wishlist from "../components/common/Wishlist/Wishlist";
import QuickView from "../components/common/QuickView/QuickView";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const selectedProductId = children.props.match.params.categoryId;
  const [mainHeader, setMainHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const store = useSelector((state) => state.common.store);
  const openSignUpCard = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const paths = ["/delivery-address", "cart-payment"];
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
    <div dir={store.language === "Arabic" ? "rtl" : "ltr"}>
      {/*{mainHeader ? (
        <MainHeader openSignUpCard={openSignUpCard} mainHeade={mainHeader} />
      ) : (
        <ProductsHeader />
      )} */}
      {mainHeader && (
        <MainHeader openSignUpCard={openSignUpCard} mainHeade={mainHeader} />
      )}{" "}
      <SignUpCard handleClose={handleClose} open={open} />
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
