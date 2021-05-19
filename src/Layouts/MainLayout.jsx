import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
