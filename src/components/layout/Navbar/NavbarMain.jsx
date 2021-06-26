import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import Search from '../../pages/products/Search';
import styles from './navbar.module.scss';

const NavbarMain = ({ openSignUpCard }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav
      className={`${styles.container} d-flex align-items-center justify-content-between`}
    >
      <Search handleChange={handleSearchChange} value={searchValue} />
      <strong className="logo-strong d-block">
        <Link className="d-block" to="/">
          <img
            className="logo-image"
            src="/assets/images/logo.png"
            width="100%"
            alt="RAVI"
          />
        </Link>
      </strong>
      <NavLinks openSignUpCard={openSignUpCard} />
    </nav>
  );
};

export default NavbarMain;
