import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
      sessionStorage.removeItem("selectedCategory");
      history.push(`/products/all-product/0?serachTerm=${searchValue}`)
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchValue && searchValue.trim().length > 0) {
        sessionStorage.removeItem("selectedCategory");
        history.push(`/products/all-product/0?serachTerm=${searchValue}`)
      }
    }
  }
  return (
    <nav
      className={`${styles.container}  d-flex align-items-center justify-content-between container-with-circles`}
    >
      <Search handleChange={handleSearchChange} handleKeyDown={handleKeyDown} value={searchValue} onSearch={handleOnSearch} />
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
