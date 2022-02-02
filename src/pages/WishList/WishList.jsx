import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import Card from "../../components/pages/Wishlist/Card/Card";
import styles from "./Wishlist.module.scss";
import { getWishlist, removeWishlist } from "../../store/actions/wishlist";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import TagManager from "react-gtm-module";

function WishList() {
  const wishlist = useSelector((state) => state.wishlist.data);
  const { loading } = useSelector((state) => state.wishlist);
  const { currency_symbol } = useSelector((state) => state?.common?.store);
  const dispatch = useDispatch();

  const removeFromWishlist = (data) => {
    dispatch(removeWishlist(data));
  };
  useEffect(() => {
    dispatch(getWishlist());
    const tagManagerArgs = {
      gtmId: process.env.REACT_APP_GTM,
    };
    TagManager.initialize(tagManagerArgs);
  },[])

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
              {wishlist?.map((product) => {
                return (
                  <Card
                    name={product?.name}
                    src={product?.image}
                    priceWas={product?.price}
                    priceIs={product?.special}
                    sku={product?.sku}
                    currency_symbol={currency_symbol}
                    remove={() => removeFromWishlist(product)}
                    loading = {loading}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
