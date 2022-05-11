import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import NavLinks from "./NavLinks";
import Search from "../../pages/products/Search";
import styles from "./navbar.module.scss";
import { searchQuery } from "../../../services/layout/Layout.service";

const NavbarMain = () => {
  const [items, setItems] = useState();
  const [searchStr, setSearchStr] = useState("");

  const history = useHistory();

  const handleOnSearch = async (string) => {
    if (string) {
      const res = await searchQuery(string);
      setSearchStr(string);
      let list = [{ title: string }];
      if (res?.status === 200 && res?.data?.length !== 0) {
        list = [{ title: string }, ...res?.data];

        setItems(list);
      }
      setItems(list);
    }
  };

  const handlePush = () => {
    const category = JSON.parse(localStorage.getItem("selectedCategory"));
    if (category) {
      history.push(`/type/${category}`);
    } else {
      history.push(`/`);
    }
  };
  const handleSelect = (item) => {
    if (item?.title && item.title.trim().length > 0) {
      sessionStorage.removeItem("selectedCategory");
      ReactPixel.init(process.env.REACT_APP_FACEBOOK);
      const wishData = {
        search_string: item?.title,
      };
      ReactPixel.track("Search", wishData);
      history.push(`/products/all-product/0?serachTerm=${item?.title}`);
    }
  };
  return (
    <nav
      className={`${styles.container}  d-flex align-items-center justify-content-between container-with-circles`}
    >
      <Search
        onSearch={handleOnSearch}
        items={items}
        handleSelect={handleSelect}
      />
      <strong className={`logo-strong d-block ${styles.logoImg}`}>
        <img
          className="logo-image"
          src="/assets/images/logo.png"
          width="100%"
          alt="RIVA"
          onClick={handlePush}
        />
      </strong>

      <NavLinks />
    </nav>
  );
};

export default NavbarMain;
