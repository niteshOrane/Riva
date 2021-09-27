import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

import NavLinks from './NavLinks';
import Search from '../../pages/products/Search';
import styles from './navbar.module.scss';

const NavbarMain = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleOnSearch = (e) => {
    if (searchValue && searchValue.trim().length > 0) {
      history.push(`/products/all-product/0?serachTerm=${searchValue}`)
    }
  };

  return (
    <nav
      className={`${styles.container} d-flex align-items-center justify-content-between container-with-circles`}
    >
      <Search handleChange={handleSearchChange} value={searchValue} onSearch={handleOnSearch} />
      <strong className={`logo-strong d-block ${styles.logoImg}`}>
        <Link className="d-block" to="/">
          <img
            className="logo-image"
            src="/assets/images/logo.png"
            width="100%"
            alt="RIVA"
          />
        </Link>
      </strong>

      <NavLinks />
    </nav>
  );
};

export default NavbarMain;
