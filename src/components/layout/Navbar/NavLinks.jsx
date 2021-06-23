import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../../store/actions/cart";

const NavLinks = ({ openSignUpCard }) => {
  const { data = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <ul className="nav-list d-flex align-items-center gap-12">
      <li className="nav-li">
        <a href="#" className="d-flex align-items-center gap-12">
          <span className="material-icons-outlined font-light-black">
            favorite_border
          </span>
          <span className="align-self-end font-light-black">Wishlist</span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a
          onClick={openSignUpCard}
          href="#"
          className="d-flex align-items-center gap-12"
        >
          <span className="material-icons-outlined font-light-black">
            person
          </span>
          <span className="align-self-end font-light-black">Account</span>{" "}
        </a>
      </li>
      <li className="nav-li">
        <a
          className="d-flex align-items-center gap-12 c-pointer"
          onClick={() => dispatch(toggleCart())}
        >
          <span className="material-icons-outlined font-light-black">
            shopping_cart
          </span>
          <span className="align-self-end font-light-black">
            Cart ({data?.length || 0})
          </span>{" "}
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
