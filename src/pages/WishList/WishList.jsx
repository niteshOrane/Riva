import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Circle from '../../components/layout/Navbar/Circle';
import { selectedCategory } from '../../store/actions/common';
import Sidebar from '../../components/pages/Wishlist/Sidebar/Sidebar';
import Card from '../../components/pages/Wishlist/Card/Card';
import styles from './Wishlist.module.scss';
import { removeWishlist } from '../../store/actions/wishlist';

function WishList() {
  const links = useSelector((state) => state.common.category)[0];
  const wishlist = useSelector((state) => state.wishlist.data);
  const [defaultCategory, setCategory] = useState('1241'); //woman

  const dispatch = useDispatch();

  const onCategorySelect = (id) => {
    setCategory(id);
    const items = links?.children_data?.filter((e) => e?.id === id) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, id));
    }
  };

  const removeFromWishlist = (data) => {
    dispatch(removeWishlist(data));
  };

  useEffect(() => {
    const items =
      links?.children_data?.filter((e) => e?.id === defaultCategory) ?? [];
    if (items.length) {
      dispatch(selectedCategory(items[0]?.children_data, defaultCategory));
    }
  }, [links, defaultCategory]);

  return (
    <div className="d-flex my-20px">
      <div className={styles.circlesContainer}>
        {links?.children_data?.map(
          (item) =>
            item.is_active == 1 && (
              <Circle
                id={item?.id}
                onClick={() => {
                  onCategorySelect(item?.id);
                }}
                bg={`${defaultCategory === item?.id ? 'skin' : 'black'}`}
              >
                {item?.name}
              </Circle>
            )
        )}
      </div>
      <div className="container-90 max-width-1600 mx-auto">
        <div className="d-flex h-100">
          <Sidebar />
          <div className={styles.cardsContainer}>
            <h2 className={styles.title}>My Wishlist</h2>

            <div className="d-flex gap-12 f1" style={{ flexWrap: 'wrap' }}>
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
