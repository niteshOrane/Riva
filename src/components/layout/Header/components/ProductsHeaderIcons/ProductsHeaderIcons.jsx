import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../../../../store/actions/cart";

const cartLength = {
  position: "absolute",
  right: "-18px",
  top: "-6px",
  background: "black",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  color: "#fff",
  padding: "3px",
};
const ProductsHeaderIcons = () => {
  const { data = [] } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  return (
    <div>
      <ul className="nav-list d-flex align-items-center mx-75px justify-content-end my-10px gap-12">
        <li className="nav-li">
          <a href="#" className="d-flex align-items-center gap-12">
            <span className="material-icons-outlined font-light-black">
              search
            </span>
          </a>
        </li>
        <li className="nav-li">
          <a href="#" className="d-flex align-items-center gap-12">
            <span className="material-icons-outlined font-light-black">
              favorite_border
            </span>
          </a>
        </li>
        <li className="nav-li">
          <a href="#" className="d-flex align-items-center gap-12">
            <span className="material-icons-outlined font-light-black">
              person
            </span>
          </a>
        </li>
        <li className="nav-li">
          <a
            className="d-flex align-items-center gap-12 position-relative c-pointer"
            onClick={() => dispatch(toggleCart())}
          >
            <span className="material-icons-outlined font-light-black">
              shopping_cart
            </span>
            <span
              style={cartLength}
              className="d-flex-all-center align-self-end font-light-black"
            >
              {data?.length || 0}
            </span>{" "}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProductsHeaderIcons;
