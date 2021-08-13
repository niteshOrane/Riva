import React from "react";
import style from "./navbar.module.scss";

const NavLinks = () => {
  return (
    <ul className="nav-list d-flex align-items-center gap-12px">
      <li className="gap-12px nav-li">
        <span className="material-icons-outlined font-light-black">search</span>
        <span className="align-self-end font-light-black">Search </span>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center">
          <span style={{marginRight:"9px"}} className="material-icons-outlined font-light-black ml-9px">
            favorite_border
          </span>
          <span
            className={`${style.navLinksWeight} align-self-end font-light-black`}
          >
            Wishlist
          </span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12px">
          <span style={{marginRight:"9px"}}  className="material-icons-outlined font-light-black">
            person
          </span>
          <span className="align-self-end font-light-black">Account</span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12px">
          <span className="material-icons-outlined font-light-black">
            shopping_cart
          </span>
          <span className="align-self-end font-light-black">Cart(5)</span>{" "}
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
