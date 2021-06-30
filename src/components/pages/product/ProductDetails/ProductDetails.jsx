import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Star from '@material-ui/icons/StarBorderOutlined';
import Image from '../../../common/LazyImage/Image';
import styles from './productDetails.module.scss';
import { addToCart } from '../../../../store/actions/cart';
import SizeCard from './components/SizeCard/SizeCard';
import ImageDropdown from './components/ImageDropdown/ImageDropdown';
import SizeGuide from './components/SizeGuide/SizeGuide';

const ProductDetails = ({ product }) => {
  const [sizeCardOpen, setSizeCardOpen] = useState(false);
  const [guideCardOpen, setGuideCardOpen] = useState(false);
  let {
    origprice = 0,
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
  } = product;
  const { price, visibility = 0, custom_attributes } = product;
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === 'special_price'
    )?.value;
    origprice = origpriceWithoutCurrency;
    priceWithoutCurrency = price;
  }
  const dispatch = useDispatch();

  const addToCardHandler = () =>
    dispatch(
      addToCart({
        ...product,
        id: `${product.id}`,
        name: product.name,
        src: product.image,
        color: custom_attributes.find((attr) => attr.attribute_code === 'color')
          ?.value,
        quantity: 1,
        size: custom_attributes.find((attr) => attr.attribute_code === 'size')
          ?.value,
        price: product.price,
      })
    );

  return (
    <>
      <SizeCard
        open={sizeCardOpen}
        handleClose={() => setSizeCardOpen(false)}
      />
      <SizeGuide
        open={guideCardOpen}
        handleClose={() => setGuideCardOpen(false)}
      />
      <div className={`${styles.product} gap-12 my-10px`}>
        <div className={styles.mainImage}>
          <div
            className={`${styles.slide} h-100 text-center d-flex-all-center flex-column`}
          >
            <Image
              src={product?.image}
              classname="object-fit-fill h-100"
              width="100%"
              alt=""
            />
            <ImageDropdown />
            <div className={styles.actionContainerTopRight}>
              <div>
                <span className="material-icons-outlined font-light-black">
                  favorite_border
                </span>
              </div>
            </div>
            <div className={styles.actionContainerTopLeft}>
              <div>ON SALE</div>
            </div>
            {/* <div className={styles.actionContainerBottomRight}>
              <div>
                <span className="material-icons-outlined font-light-black">
                  open_with
                </span>
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.details}>
          <form>
            <div className={styles.bestSeller}>BEST SELLER</div>
            <div className={styles.name}>{product?.name}</div>
            <div className="d-flex">
              <div className={`${styles.stars} d-flex-all-center`}>
                <Star style={{ fill: '#FFD700', fontSize: 16 }} />
                <Star style={{ fill: '#FFD700', fontSize: 16 }} />
                <Star style={{ fontSize: 16 }} />
                <Star style={{ fontSize: 16 }} />
                <Star style={{ fontSize: 16 }} />
              </div>
              <div className={`${styles.rating} d-flex-all-center`}>
                {visibility} rating
              </div>
              <div className={`${styles.sku} d-flex`}>
                <div className={styles.title}>SKU:&nbsp;</div>
                <div className={styles.text}>{product?.sku}</div>
              </div>
            </div>
            <div className={`${styles.price} d-flex`}>
              {origpriceWithoutCurrency > priceWithoutCurrency ? (
                <div className={styles.was}>Was ${origprice || ''}</div>
              ) : null}
              <div className={styles.now}>Now ${price}</div>
              <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
            </div>
            <div className={`${styles.color} d-flex`}>
              <div className={styles.title}>Color:&nbsp;</div>
              {product?.colors?.map((c) => (
                <div className={styles.text}>{c.label} </div>
              ))}

              {/* <div className={`${styles.options} d-flex-all-center`}>
                <div className={`${styles.option} ${styles.option_red}`} />
                <div className={`${styles.option} ${styles.option_oranage}`} />
                <div className={`${styles.option} ${styles.option_blue}`} />
              </div> */}
            </div>
            <div className={`${styles.size} gap-12 d-flex align-items-center`}>
              <div className={styles.title}>Size:</div>
              <div
                className={`${styles.options} gap-12 d-flex align-items-center`}
              >
                {product?.size?.length
                  ? product?.size?.map((size) => {
                      return (
                        <div className={`${styles.option} d-flex-all-center`}>
                          {size.label}
                        </div>
                      );
                    })
                  : custom_attributes?.find((e) => e?.attribute_code === 'size')
                      ?.value}
              </div>
            </div>
            <div
              className={`${styles.outOfStock} d-flex align-items-center gap-12`}
            >
              <div className={`${styles.icon} d-flex-all-center`}>
                <span className="material-icons">mail</span>
              </div>
              <div className={styles.text}>
                We will let you know when its in stock
              </div>
            </div>
            <div className={`${styles.sizeHelp} d-flex align-items-center`}>
              <ul className="nav-list gap-12 d-flex align-items-center">
                <li className="nav-li">
                  <a href="/" className="d-flex align-items-center">
                    <span className="material-icons-outlined font-light-black">
                      straighten
                    </span>
                    &nbsp; &nbsp;
                    <button
                      type="button"
                      className="bg-transparent no-border c-pointer"
                      onClick={() => setGuideCardOpen(true)}
                    >
                      <span className="align-self-end font-light-black">
                        Size Guide
                      </span>
                    </button>
                  </a>
                </li>
                <li className="nav-li">
                  <a href="/" className="d-flex align-items-center">
                    <span className="material-icons-outlined font-light-black">
                      search
                    </span>
                    &nbsp;
                    <button
                      type="button"
                      className="bg-transparent no-border c-pointer"
                      onClick={() => setSizeCardOpen(true)}
                    >
                      <span className="align-self-end font-light-black">
                        Find your size
                      </span>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.w80}>
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
                      {product?.stats?.popular} are looking at this right now
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.demand} d-flex gap-12 align-items-center`}
                >
                  <div className={styles.icon}>
                    <span className="material-icons-outlined font-light-black">
                      shopping_bag
                    </span>
                  </div>
                  <div>
                    <div className={styles.title}>IN DEMAND</div>
                    <div className={styles.text}>
                      Bought {product?.stats?.inDemand}+ times in last few days
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <div className="d-flex align-items-center justify-content-between my-20px">
                  <div
                    className={`${styles.quantity} d-flex align-items-center justify-content-between`}
                  >
                    <div className={styles.title}>Quantity:</div>
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
                  <div
                    className={`${styles.demand} d-flex gap-12 align-items-center`}
                  >
                    <div className="d-flex align-items-center">
                      <div className={styles.title}>Availability: </div>
                      &nbsp;<div className={styles.text}>In stock</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center my-50px">
                  <div className={styles.addToCart}>
                    <button
                      type="button"
                      onClick={() => addToCardHandler()}
                      className="d-flex-all-center"
                    >
                      <span className="material-icons-outlined">
                        shopping_cart
                      </span>
                      &nbsp;ADD TO CART
                    </button>
                  </div>
                  <div className={`${styles.wishlist} d-flex-all-center`}>
                    <span className="material-icons-outlined font-light-black">
                      favorite_border
                    </span>
                  </div>
                </div>

                <div className={styles.other}>
                  {[
                    {
                      name: 'Delivery & returns',
                      icon: '/assets/images/delivery.png',
                    },
                    {
                      name: 'Search in store',
                      icon: '/assets/images/shop.png',
                    },
                    {
                      name: 'Product details',
                      icon: '/assets/images/tshirt.png',
                    },
                    { name: 'Review', icon: '/assets/images/review.png' },
                    { name: 'Share', icon: '/assets/images/share.png' },
                  ].map((item) => {
                    return (
                      <div className="d-flex align-items-center gap-12 my-10px">
                        <div className={styles.icon}>
                          <img src={item.icon} alt={item.name} />
                        </div>
                        <div>{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
