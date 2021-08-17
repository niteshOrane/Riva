import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Star from "@material-ui/icons/StarBorderOutlined";
import Image from "../../../common/LazyImage/Image";
import styles from "./productDetails.module.scss";
import { addToCart } from "../../../../store/actions/cart";
import SizeCard from "./components/SizeCard/SizeCard";
import ImageDropdown from "./components/ImageDropdown/ImageDropdown";
import SizeGuide from "./components/SizeGuide/SizeGuide";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import OutOfStock from "./outOfStock/OutOfStock";
import { outOfStockCheck } from "../../../../services/product/product.service";
import SearchInStorePopup from "./SearchInStorePopup";
import SubscribeModel from "./SubscribeModel";
import { URL } from '../../../../util';

const ProductDetails = (props) => {
  const { product, setColorSize, mediaImage, colorImage } = props;
  const [sizeCardOpen, setSizeCardOpen] = useState(false);
  const [guideCardOpen, setGuideCardOpen] = useState(false);
  const [productColorList, setProductColorList] = useState([]);
  const [colorImg, setColorImg] = useState(null);
  useEffect(() => {
    if (colorImage.databind !== undefined) {
      const temp = colorImage?.databind;
      setProductColorList(temp);
      setColorImg(colorImage?.databind[0]?.file || "");
      setColorSize({
        ...product?.selected,
        color: { label: temp[0]?.color, value: temp[0]?.option_id },
      });
    }
  }, []);
  const colorImageAction = (data) => {
    setColorImg(data?.file);
    setColorSize({
      ...product?.selected,
      color: { label: data?.color, value: data?.option_id },
    });
  };
  const [outOfStock, setOutOfStock] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  const getOutOfStock = async () => {
    let id = product?.id;
    let color = product?.selected?.color?.label;
    let size = product?.selected?.size?.label;
    const res = await outOfStockCheck(id, color, size);
    if (res && res.status === 200) {
      if (res?.data?.data?.Stock) {
        return setOutOfStock(false);
      }
      if (res?.data?.data?.Stock === 0) {
        return setOutOfStock(true);
      }
    }
  };
  useEffect(() => {
    getOutOfStock();
  }, []);
  useEffect(() => {
    getOutOfStock();
  }, [product, colorImg]);

  let {
    origprice = 0,
    origpriceWithoutCurrency = 0,
    priceWithoutCurrency = 0,
  } = product;
  const { price, visibility = 0, custom_attributes } = product;
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === "special_price"
    )?.value;
    origprice = origpriceWithoutCurrency;
    priceWithoutCurrency = price;
  }
  const dispatch = useDispatch();
  const { data: wishlist = [] } = useSelector((state) => state.wishlist);

  const handleIncrementProduct = () => {
    setProductQuantity((prevState) => prevState + 1);
  };
  const handleDecrementProduct = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prevState) => prevState - 1);
  };
  const calculateOnSale = () => {
    const newProductMessage = custom_attributes?.find(
      (e) => e?.attribute_code === "news_to_date"
    )?.value;

    const saleEndDate = custom_attributes?.find(
      (e) => e?.attribute_code === "salebadge_enddate"
    )?.value;
    if (
      saleEndDate &&
      moment(saleEndDate).isAfter(moment().format("YYYY-MM-DDTHH:mm:ssZ"))
    ) {
      return <div>On Sale</div>;
    }
    if (
      newProductMessage &&
      moment(newProductMessage).isAfter(moment().format("YYYY-MM-DDTHH:mm:ssZ"))
    ) {
      return <div>New</div>;
    }
    return null;
  };
  const addToCardHandler = () =>
    dispatch(
      addToCart({
        ...product,
        id: `${product.id}`,
        name: product.name,
        src: product.image,
        qty: productQuantity,
        price: product.price,
        ...product.selected,
      })
    );

  const handleWishList = () => {
    dispatch(toggleWishlist(product));
  };

  const isAddedToWishlist = !!wishlist.find((w) => w.id == product.id);

  return (
    <div style={{ marginTop: "25px" }}>
      <SizeCard
        imageSelected={colorImg || product?.image}
        open={sizeCardOpen}
        handleClose={() => setSizeCardOpen(false)}
      />
      <SizeGuide
        imageSelected={colorImg || product?.image}
        open={guideCardOpen}
        handleClose={() => setGuideCardOpen(false)}
      />
      <div
        className={`${styles.product} gap-12px my-10px max-width-1750 mx-auto`}
      >
        <div className={styles.mainImage}>
          <div
            className={`${styles.slide} h-100 text-center d-flex-all-center flex-column`}
          >
            <Image
              src={colorImg || product?.image}
              className="object-fit-fill h-100"
              width="100%"
              alt={product?.name}
              type="product-details"
            />
            <ImageDropdown />
            <div className={styles.actionContainerTopRight}>
              <div onClick={handleWishList}>
                <span
                  className="material-icons-outlined font-light-black"
                  style={{ color: isAddedToWishlist ? "red" : "black" }}
                >
                  {isAddedToWishlist ? "favorite" : "favorite_border"}
                </span>
              </div>
            </div>
            <div className={styles.actionContainerTopLeft}>
              {calculateOnSale()}
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
                <Star style={{ fill: "#FFD700", fontSize: 16 }} />
                <Star style={{ fill: "#FFD700", fontSize: 16 }} />
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
                <div className={styles.was}>
                  Was ${parseFloat(origprice)?.toFixed(2) || ""}
                </div>
              ) : null}
              <div className={styles.now}>Now {price}</div>
              <div className={styles.loyalty}>Earn Loyalty Points: 1*?</div>
            </div>
            <div className={`${styles.color} d-flex`}>
              <div className={styles.title}>Color: {typeof productColorList?.find((item) =>
                product.selected.color.value === item.option_id
              )?.color === "string" ? productColorList?.find((item) =>
                product.selected.color.value === item.option_id
              )?.color : 'White'}{'  '}</div>
              {productColorList.length > 0 &&
                productColorList?.map((item, index) => (
                  <div
                    key={`color${index}`}
                    className={`${styles.option}  c-pointer `}
                    onClick={() => colorImageAction(item)}
                    style={{
                      transform:
                        product.selected.color.value === item.option_id
                          ? "scale(1)"
                          : "scale(.9)",
                    }}
                  >
                    {typeof item?.color === "string"
                      ? <img src={`${URL.baseUrlColorSwitcher}/${item?.color.replace('/', "-").toLowerCase().replace(' ', '-')}.png`} className={`${styles.colorItem} ${product.selected.color.value === item.option_id
                        ? styles.active
                        : ""}`} alt={item?.color} />
                      : <img src={item?.file} className={`${styles.colorItem} ${product.selected.color.value === item.option_id
                        ? styles.active
                        : ""}`} alt={item?.color} />
                    }
                  </div>
                ))}

              {/* <div className={`${styles.options} d-flex-all-center`}>
                <div className={`${styles.option} ${styles.option_red}`} />
                <div className={`${styles.option} ${styles.option_oranage}`} />
                <div className={`${styles.option} ${styles.option_blue}`} />
              </div> */}
            </div>
            <div
              className={`${styles.size} gap-12px d-flex align-items-center`}
            >
              <div className={styles.title}>Size:</div>
              <div
                className={`${styles.options} gap-12px d-flex align-items-center`}
              >
                {product?.size?.map((size) => {
                  return (
                    <div
                      onClick={() => {
                        setColorSize({ ...product?.selected, size });
                      }}
                      className={`${styles.option} d-flex-all-center`}
                      style={{
                        transform:
                          product.selected.size.value === size.value
                            ? "scale(1.2)"
                            : "scale(1)",
                      }}
                    >
                      {size.label}
                    </div>
                  );
                })}
              </div>
            </div>
            {outOfStock ? (
              <div
                className={`${styles.outOfStock} d-flex align-items-center gap-12px`}
              >
                <div className={`${styles.icon} d-flex-all-center`}>
                  <span className="material-icons">mail</span>
                </div>
                <div className={styles.text}>
                  We will let you know when its in stock
                </div>
              </div>
            ) : null}
            <div className={`${styles.sizeHelp} d-flex align-items-center`}>
              <ul className="nav-list gap-12px d-flex align-items-center">
                <li className="nav-li m-0">
                  <span className="d-flex align-items-center">
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
                  </span>
                </li>
                <li className="nav-li">
                  <span className="d-flex align-items-center">
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
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.w80}>
              <div className={`${styles.stats} d-flex justify-content-between`}>
                <div
                  className={`${styles.visibility} d-flex gap-12px align-items-center`}
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
                  className={`${styles.demand} d-flex gap-12px align-items-center`}
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
                    className={`${styles.qty} d-flex align-items-center justify-content-between`}
                  >
                    <div className={styles.title}>Quantity:</div>
                    <div
                      className={`${styles.counter} d-flex align-items-center justify-content-between`}
                    >
                      <div>
                        <span
                          onClick={handleDecrementProduct}
                          className="material-icons-outlined font-light-black"
                          style={{ cursor: "pointer" }}
                        >
                          remove
                        </span>
                      </div>
                      <div>{productQuantity}</div>
                      <div>
                        <span
                          onClick={handleIncrementProduct}
                          className="material-icons-outlined font-light-black"
                          style={{ cursor: "pointer" }}
                        >
                          add
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.demand} d-flex gap-12px align-items-center`}
                  >
                    <div className="d-flex align-items-center">
                      <div className={styles.title}>Availability: </div>
                      &nbsp;
                      <div className={styles.text}>
                        {outOfStock ? "Out Of Stock" : "In Stock"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center my-50px">
                  {outOfStock ? (
                    <OutOfStock productId={product.id} />
                  ) : (
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
                  )}

                  <div
                    className={`${styles.wishlist} d-flex-all-center`}
                    onClick={handleWishList}
                  >
                    <span
                      className="material-icons-outlined"
                      style={{ color: isAddedToWishlist ? "red" : "black" }}
                    >
                      {isAddedToWishlist ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                </div>

                <div className={styles.other}>
                  {[
                    {
                      name: "Delivery & returns",
                      icon: "/assets/images/delivery.png",
                    },
                    {
                      name: (
                        <SearchInStorePopup
                          image={colorImg || product?.image}
                          sizes={product?.size}
                        />
                        // <SubscribeModel />
                      ),
                      icon: "/assets/images/shop.png",
                    },
                    {
                      name: "Product details",
                      icon: "/assets/images/tshirt.png",
                    },

                    { name: "Review", icon: "/assets/images/review.png" },
                    { name: (<SubscribeModel />), icon: "/assets/images/share.png" },
                  ].map((item) => {
                    return (
                      <div className={`${styles.labelContainer}`}>
                        <div className={styles.icon}>
                          <img src={item.icon} alt={item.name} />
                        </div>
                        <div className={`${styles.labelName} c-pointer`}>{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
