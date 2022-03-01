import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import { toggleCart } from "../../store/actions/cart";

import Products from "../../components/pages/ShoppingCart/Products/Products";
import Summary from "../../components/pages/ShoppingCart/Summary/Summary";
import style from "./ShoppingCart.module.scss";

const ShoppingCart = () => {
  const { data: items = [] } = useSelector((state) => state.cart);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(toggleCart(false));
    TagManager.dataLayer({
      dataLayer: {
        pageType: "shopping_cart",
        customer: { isLoggedIn: isAuthenticated },
        category: {
          id: JSON.parse(localStorage.getItem("preferredCategory")),
        },
        cart: { hasItems: items.length > 0},
        ecommerce: {
          currencyCode: currency_symbol,
          products: items,
        },
      },
    });
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
    window.insider_object = {
      basket: {
        currency: currency_symbol,
        total:
          parseFloat(
            items.reduce((total, item) => total + item.price * item.qty, 0)
          ).toFixed(2) || 0,

        line_items: items,
      },
      page: {
        type: "Product_details",
        url: location.pathname,
      },
    };
  }, []);
  const handleContinueShopping = () => {
    window.location.href = "/";
  };
  return (
    <div
      className="container-90 max-width-1600 mx-auto"
      style={{ height: "auto" }}
    >
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Shopping Cart</h1>
      </div>
      {items.length > 0 ? (
        <div className="d-flex">
          <Products currency_symbol={currency_symbol} products={items} />
          <Summary currency_symbol={currency_symbol} />
        </div>
      ) : (
        <div className={style.emptyCart}>
          <Link to="/">
            <div className={style.emptyWrap}>
              <span className={`material-icons ${style.emptyCartIcon}`}>
                add_shopping_cart
              </span>
            </div>
          </Link>
          SHOPPING CART IS EMPTY You have no items in your shopping cart. Click{" "}
          <a
            onClick={() => {
              handleContinueShopping();
            }}
            href="#"
            className="color-red c-pointer"
          >
            here
          </a>{" "}
          to continue shopping.
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
