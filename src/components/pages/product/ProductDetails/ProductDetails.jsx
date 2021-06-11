import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Star from '@material-ui/icons/StarBorderOutlined';
import styles from './productDetails.module.scss';
import { addToCart } from '../../../../store/actions/cart';

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();

  const addToCardHandler = () => dispatch(addToCart({
    id: `${product.id}`,
    name: product.name,
    src: product.images[0],
    color: "White",
    quantity: 1,
    size: "XL",
    price: product.nowPrice,
  }));

  return (
    <div className={styles.details}>
      <form>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.ratings}>
          <Star style={{ fill: '#FFD700' }} />
          <Star style={{ fill: '#FFD700' }} />
          <Star />
          <Star />
          <Star />
        </div>
        <div className={styles.description}>
          Dress made of cotton and linen. Dress made of cotton and linen.
        </div>
        <hr style={{ width: '100%', borderTop: '1px dashed grey' }}></hr>
        <div className={styles.price}>
          <div className={styles.was}>Was {product.wasPrice}</div>
          <div className={styles.now}>Now {product.nowPrice}</div>
          <div className={styles.tax}>inc all taxes</div>
        </div>
        <div className={`${styles.availability} d-flex`}>
          <div className={styles.title}>Availability:&nbsp;</div>
          <div className={styles.text}>{product.availability}</div>
        </div>
        <div className={styles.color}>
          <div className="d-flex">
            <div className={styles.title}>Color:&nbsp;</div>
            <div className={styles.text}>Black</div>
          </div>
          <div className={styles.options}>
            <div className={`${styles.option} ${styles.option_red}`}></div>
            <div className={`${styles.option} ${styles.option_oranage}`}></div>
            <div className={`${styles.option} ${styles.option_blue}`}></div>
          </div>
        </div>
        <div className={styles.size}>
          <div className="gap-12 d-flex align-items-center">
            <div className={styles.title}>Size:</div>
            <div>
              <select className={styles.select}>
                <option value="0">US</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
              </select>
            </div>
          </div>
          <div className={`${styles.options} gap-12 d-flex align-items-center`}>
            {product.size.map((size) => {
              return <div className={styles.option}>{size}</div>;
            })}
          </div>
        </div>
        <div className={`${styles.outOfStock} d-flex align-items-center`}>
          <div className={styles.icon}>
            <span className="material-icons">mail</span>
          </div>
          <div className={styles.text}>
            &nbsp;We will let you know when its in stock
          </div>
        </div>
        <div className={`${styles.sizeHelp} d-flex align-items-center`}>
          <ul className="nav-list gap-12 d-flex align-items-center">
            <li className="nav-li">
              <a href="#" className="d-flex align-items-center">
                <span className="material-icons-outlined font-light-black">
                  straighten
                </span>
                &nbsp;
                <span className="align-self-end font-light-black">
                  Size Guide
                </span>
              </a>
            </li>
            <li className="nav-li">
              <a href="#" className="d-flex align-items-center">
                <span className="material-icons-outlined font-light-black">
                  search
                </span>
                &nbsp;
                <span className="align-self-end font-light-black">
                  Find your size
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.sku}>
          <div className="d-flex">
            <div className={styles.title}>SKU:&nbsp;</div>
            <div className={styles.text}>{product.sku}</div>
          </div>
        </div>
        <div className={styles.tags}>
          <div className="d-flex">
            <div className={styles.title}>Tags:&nbsp;</div>
            <div className={styles.text}>{product.tags.join(', ')}</div>
          </div>
        </div>
        <div className={`${styles.stats} d-flex justify-content-between`}>
          <div
            className={`${styles.visibility} d-flex gap-12 align-items-center`}
          >
            <div className={styles.icon}>
              <span className="material-icons-outlined font-light-black">
                visibility
              </span>
            </div>
            <div>
              <div className={styles.title}>POPULAR</div>
              <div className={styles.text}>
                <span className="color-primary">{product.stats.popular}</span>{' '}
                are looking at this right now
              </div>
            </div>
          </div>
          <div className={`${styles.demand} d-flex gap-12 align-items-center`}>
            <div className={styles.icon}>
              <span className="material-icons-outlined font-light-black">
                shopping_bag
              </span>
            </div>
            <div>
              <div className={styles.title}>IN DEMAND</div>
              <div className={styles.text}>
                Bought{' '}
                <span className="color-primary">{product.stats.inDemand}+</span>{' '}
                times in last few days
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <div className="d-flex align-items-center justify-content-between my-20px">
            <div
              className={`${styles.quantity} d-flex align-items-center justify-content-between`}
            >
              <div>Quantity:</div>
              <div
                className={`${styles.counter} d-flex align-items-center justify-content-between`}
              >
                <div>
                  <span className="material-icons-outlined font-light-black">
                    remove
                  </span>
                </div>
                <div>1</div>
                <div>
                  <span className="material-icons-outlined font-light-black">
                    add
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button className={styles.searchInStoreBtn}>
                <span className="material-icons-outlined color-primary">
                  place
                </span>
                SEARCH IN STORE
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-20px">
            <div>
              <button onClick={addToCardHandler} className={styles.addToCartBtn}>
                <span className="material-icons-outlined">shopping_cart</span>
                ADD TO CART
              </button>
            </div>
            <div>
              <button className={styles.wishlistBtn}>
                <span className="material-icons-outlined">favorite_border</span>
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
