import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TagManager from "react-gtm-module";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import Card from "../../components/pages/Wishlist/Card/Card";
import styles from "./Wishlist.module.scss";
import { getWishlist, removeWishlist } from "../../store/actions/wishlist";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";

function WishList() {
  const wishlist = useSelector((state) => state.wishlist.data);
  useAnalytics();
  const { loading } = useSelector((state) => state.wishlist);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { data: items } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const location = useLocation();

  const removeFromWishlist = (data) => {
    dispatch(removeWishlist(data));
  };
  useEffect(() => {
    dispatch(getWishlist());
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
          productsInWishlist: wishlist,
        },
      },
    });
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        url: location.pathname,
      },
    });
  }, []);

  return (
    <div className="d-flex my-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.cardsContainer}>
            <span className={styles.title}>My Wishlist</span>

            {!wishlist?.length && (
              <div className={styles.noWishlist}>
                <span>No Products in your wishlist</span>
              </div>
            )}

            <div
              className="d-flex gap-12px f1"
              style={{ flexWrap: "wrap", marginTop: "18px" }}
            >
              {wishlist?.map((product) => (
                <Card
                  name={product?.name}
                  src={product?.image}
                  priceWas={product?.price}
                  priceIs={product?.special}
                  sku={product?.sku}
                  currency_symbol={currency_symbol}
                  remove={() => removeFromWishlist(product)}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
