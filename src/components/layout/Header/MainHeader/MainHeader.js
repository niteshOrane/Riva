import React, { useState } from "react";
import { useSelector } from "react-redux";
import MegaLinks from "../../Mega-links/MegaLinks";
import NavbarMain from "../../Navbar/NavbarMain";
import MainHeaderTopBar from "../components/TopBar/MainHeaderTopBar/MainHeaderTopBar";
import { header } from "../../../../mockdata.json";
import styles from "./MainHeader.module.scss";

function MainHeader({ openSignUpCard, mainHeader }) {
  // const links = useSelector((state) => state.common.header);
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  return (
    <header className={styles.sticky} id="header">
      <MainHeaderTopBar mainHeader={mainHeader}/>
      <NavbarMain openSignUpCard={openSignUpCard} />
      <MegaLinks links={selectedCategoryItem?.data} />
    </header>
  );
}

export default MainHeader;
