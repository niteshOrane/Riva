import React from 'react';
import { useSelector } from "react-redux";
import MegaLinks from "../Mega-links/MegaLinks";
import NavbarMain from "../Navbar/NavbarMain";
import TopBar from "../TopBar/TopBar";
import styles from "./header.module.scss";

function Header() {
  const links = useSelector((state) => state.common.header);
  return (
    <header>
      <TopBar />
      <NavbarMain />
      <MegaLinks links={links} />
    </header>
  );
}

export default Header;
