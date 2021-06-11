import React, {useState} from "react";
import NavLinks from "./NavLinks";
import Search from "../../pages/products/Search";
import styles from "./navbar.module.scss"

const NavbarMain = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className={`${styles.container} d-flex align-items-center justify-content-between`}>
      <Search handleChange={handleSearchChange} value={searchValue} />
      <strong className="logo-strong d-block">
        <a className="d-block" href="/">
          <img
            className="logo-image"
            src="/assets/images/logo.png"
            width="100%"
            alt="RAVI"
          />
        </a>
      </strong>
      <NavLinks />
    </nav>
  );
};

export default NavbarMain;
