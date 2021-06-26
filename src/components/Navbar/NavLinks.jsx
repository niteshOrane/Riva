import React from "react";

const NavLinks = () => {
  return (
    <ul className="nav-list d-flex align-items-center gap-12">
      <li className="gap-12 nav-li">
        <span className="material-icons-outlined font-light-black">search</span>
        <span className="align-self-end font-light-black">Search </span>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12">
          <span className="material-icons-outlined font-light-black">
            favorite_border
          </span>
          <span className="align-self-end font-light-black">Wishlist</span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12">
          <span className="material-icons-outlined font-light-black">person</span>
          <span className="align-self-end font-light-black">Account</span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12">
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
