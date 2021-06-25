import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '../../LazyImage/Image';
import { toggleWishlist } from '../../../../store/actions/wishlist';
import { toggleQuickView } from '../../../../store/actions/common';
import { addToCart } from '../../../../store/actions/cart';
import { URL } from '../../../../util';
import styles from './product.module.scss';

const ProductCard = ({ product }) => {
  const { id, image, name, price, sku = '' } = product;

  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const handleWishList = () => {
    dispatch(toggleWishlist(product));
  };

  const handleQuickView = () => {
    dispatch(toggleQuickView(product));
  };

  const addToCardHandler = () =>
    dispatch(
      addToCart({
        ...product,
        id: `${product.id}`,
        name: product.name,
        src: product.image,
        color: 'White',
        quantity: 1,
        size: 'XL',
        price: product.price,
      })
    );

  const srcImage =
    image.indexOf('http') > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  return (
    <div key={id} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Link to={`/product/${sku}`}>
          <Image
            src={srcImage}
            defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
          />
        </Link>
      </div>
      {product.sale && <div className={styles.sale}>Sale</div>}
      <div className={styles.actionContainer}>
        <div>
          <button
            type="button"
            className="no-border bg-transparent"
            onClick={handleWishList}
          >
            <span className="material-icons-outlined font-light-black">
              favorite_border
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="no-border bg-transparent"
            onClick={handleQuickView}
          >
            <span className="material-icons-outlined font-light-black">
              search
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="no-border bg-transparent"
            onClick={addToCardHandler}
          >
            <span className="material-icons-outlined font-light-black">
              shopping_cart
            </span>
          </button>
        </div>
      </div>
      <Link to={`/product/${sku}`}>
        <div className={`${styles.productName} two-lines-text`} title={name}>
          {name}
        </div>
        <div className={styles.productPrice}>
          <div className={styles.was}>Was {price + 50}$</div>
          <div className={styles.now}>Now {price}$</div>
        </div>
        <div className={styles.productColors}>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_red}`} />
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_oranage}`} />
          </div>
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${styles.color_blue}`} />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
