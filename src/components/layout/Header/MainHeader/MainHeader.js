import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MegaLinks from '../../Mega-links/MegaLinks';
import NavbarMain from '../../Navbar/NavbarMain';
import MainHeaderTopBar from '../components/TopBar/MainHeaderTopBar/MainHeaderTopBar';
import { header } from '../../../../mockdata.json';
import styles from './MainHeader.module.scss';

function MainHeader({ mainHeader, disableMegicLink }) {
  // const links = useSelector((state) => state.common.header);
  const { language } = useSelector(state => state?.common?.store);
  const selectedCategoryItem = useSelector(
    (state) => state.common.selectedCategoryItem
  );
  return (
    <header className={styles.sticky} id="header">
      <MainHeaderTopBar mainHeader={mainHeader} />
      <NavbarMain disableMegicLink={disableMegicLink} />

      {!disableMegicLink ? <MegaLinks language={language} links={selectedCategoryItem?.data} /> : <div className="container-with-circles">
        <div className={styles.titleDoubleLine} />
        <div className={styles.titleDoubleLine_Second} />
      </div>}
    </header>
  );
}

export default MainHeader;
