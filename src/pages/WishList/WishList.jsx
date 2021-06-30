import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import Card from "../../components/pages/Wishlist/Card/Card";
import styles from "./Wishlist.module.scss";
import { removeWishlist } from "../../store/actions/wishlist";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";

function WishList() {
  const wishlist = useSelector((state) => state.wishlist.data);

  const dispatch = useDispatch();

  const removeFromWishlist = (data) => {
    dispatch(removeWishlist(data));
  };

  return (
    <div className="d-flex my-20px">
      <div className={styles.circlesContainer}>
        <CategoriesCircles />
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.cardsContainer}>
            <h2 className={styles.title}>My Wishlist</h2>

            <div className="d-flex gap-12 f1" style={{ flexWrap: "wrap" }}>
              {wishlist?.map((product) => (
                <Card
                  name={product?.name}
                  src={product?.image}
                  priceWas={product?.price}
                  priceIs={product?.price}
                  remove={() => removeFromWishlist(product)}
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