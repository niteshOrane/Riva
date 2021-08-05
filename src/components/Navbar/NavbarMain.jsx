import React from "react";
import Circle from "./Circle";
import NavLinks from "./NavLinks";

const NavbarMain = () => {
  return (
    <nav className="nav d-flex align-items-center justify-content-between">
      <strong className="logo-strong d-block">
        <a className="d-block" href="#">
          <img
            className="logo-image"
            src="./assets/images/logo.png"
            width="100%"
            alt="RAVI"
          />
        </a>
      </strong>
      <div className="gap-12 d-flex align-items-center">
        <Circle bg="primary">Woman</Circle>
        <Circle bg="lightBlack">Teens</Circle>
        <Circle bg="lightBlack">Kids</Circle>
      </div>
      <NavLinks />
    </nav>
  );
};

export default NavbarMain;
