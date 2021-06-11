import React from 'react';
import { useSelector } from 'react-redux';
import MegaLinks from '../Mega-links/MegaLinks';
import NavbarMain from '../Navbar/NavbarMain';
import TopBar from '../TopBar/TopBar';
import {header} from '../../../mockdata.json';
import styles from './header.module.scss';

function Header() {
  // const links = useSelector((state) => state.common.header);
  const selectedCategoryItem = useSelector((state) => state.common.selectedCategoryItem);
  return (
    <header className={styles.sticky}>
      <TopBar />
      <NavbarMain />
      <MegaLinks links={selectedCategoryItem?.data} />
    </header>
  );
}

export default Header;
