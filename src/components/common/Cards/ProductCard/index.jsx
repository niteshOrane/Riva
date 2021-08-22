import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Image from "../../LazyImage/Image";
import { toggleWishlist } from "../../../../store/actions/wishlist";
import { toggleQuickView } from "../../../../store/actions/common";
import { extractColorSize, URL } from "../../../../util";


import { getProduct, getProductColor } from "../../../../services/product/product.service";
import styles from "./product.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TempLink = ({ children, product }) => {
  if (product?.sku)
    return <Link to={`/product/${product?.sku}`}>{children} </Link>;

  return <a href={product?.uri}>{children}</a>;
};

const ProductCard = ({
  product,
  index,
  isProduct = false,
  extraOridnary,
  isListing,
}) => {
  const { custom_attributes, id, image, name } = product;

  let {
    origprice = 0,
    origpriceWithoutCurrency,
    priceWithoutCurrency,
    price = 0,
  } = product;
  if (custom_attributes) {
    origpriceWithoutCurrency = custom_attributes?.find(
      (e) => e?.attribute_code === "special_price"
    )?.value;
    origprice = `$${parseFloat(origpriceWithoutCurrency)?.toFixed(2)}`;
    priceWithoutCurrency = price;
    price = `$${parseFloat(price).toFixed(2)}`;
  }
  const wishList = useSelector((state) => state.wishlist.data);

  const [attributes, setattributes] = useState({ colors: [], size: [] });
  const [productItem, setProductItem] = useState({});
  const [colorImg, setColorImg] = useState(null);


  useEffect(() => {
    if (product?.extension_attributes?.configurable_product_options) {
      const { colors, size } = extractColorSize(
        product?.extension_attributes?.configurable_product_options || []
      );

      setattributes({ colors, size });
 
      product["selected"] = { color: colors[0], size: size[0] }

    }

    setProductItem(product)
  }, [product]);

  const dispatch = useDispatch();

  const handleWishList = async () => {
    const res = await getProduct(productItem.sku);

    const { colors, size } = extractColorSize(
      res.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...productItem,
      ...res.data,
      image: res.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "image"
      )?.value,
      name: res.data.name,
      price: res.data.price,
      sale:
        res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "show_sale_badge"
        )?.value === "1",
      description: res.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "description"
      )?.value,
      colors,
      size,
      selected: {
        color: colors?.[0] || {},
        size: size?.[0] || {},
      },
    };
    dispatch(toggleWishlist(p));
  };

  const loadColorImages = async (pro, colorSelected) => {
    setColorImg('');

    if (!pro.productColorImage) {
      const pResponse = await getProductColor(pro?.id);
      const productColorImage = pResponse?.data?.databind || [];
      pro.productColorImage = productColorImage;
      pro.media_gallery_entries = productColorImage;
      setProductItem({ ...pro, productColorImage });
    }
    product["selected"] = { color: colorSelected }
    setColorImg(pro?.productColorImage.find(e => e.option_id === colorSelected.value)?.file);
  };


  const handleQuickView = async () => {
    const res = await getProduct(productItem.sku);

    const { colors, size } = extractColorSize(
      res.data?.extension_attributes?.configurable_product_options || []
    );

    const p = {
      ...productItem,
      ...res.data,
      image: res.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "image"
      )?.value,
      name: res.data.name,
      price: res.data.price,
      sale:
        res.data?.custom_attributes.find(
          (attr) => attr.attribute_code === "show_sale_badge"
        )?.value === "1",
      description: res.data?.custom_attributes.find(
        (attr) => attr.attribute_code === "description"
      )?.value,
      colors,
      size,
      selected: {
        color: colors?.[0] || {},
        size: size?.[0] || {},
      },
    };
    dispatch(toggleQuickView(p));
  };
  const handleChange = async (event, newValue) => {
    if (!product.productColorImage) {
      const pResponse = await getProductColor(product?.id);
      const productColorImage = pResponse?.data?.databind || [];
      product.productColorImage = productColorImage;
      product.media_gallery_entries = productColorImage;
      setProductItem({ ...product, productColorImage })
    }
    setColorImg('');
  };
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          right: 0,
          width: "37px",
          hight: "35px",
          opacity: "0.7"
        }}
        onClick={handleChange}
      >
        <span ><img src="/assets/images/recomended2.svg" alt="Next" /></span>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          left: 0,
          zIndex: 1,
          width: "37px",
          hight: "35px",
          opacity: "0.7"
        }}
        onClick={handleChange}
      >
        <span><img src="/assets/images/recomended.svg" alt="Previos" /></span>
      </div>
    );
  }

  const isAddedToWishlist = !!wishList.find((w) => w.id === product.id);
  const settings = {
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: 'notes-slider',
    nextArrow: <SampleNextArrow onClick={handleChange} />,
    prevArrow: <SamplePrevArrow onClick={handleChange} />,
  };
  const srcImage =
    image?.indexOf("http") > -1 ? image : `${URL.baseUrlProduct}/${image}`;
  return (
    <>
      <div key={id} className={styles.productCard}>
        {index === 4 && <div className={styles.outOfStock}>OUT OF STOCK</div>}
        {isListing && (
          <div className={styles.listingSlider}>

            <div className={styles.imgContainer_P}>
              <Slider {...settings}>
                {(productItem?.media_gallery_entries)?.map((item, indexitem) => (
                  <TempLink product={productItem}>
                    <Image
                      src={colorImg || `${!productItem?.productColorImage ? URL.baseUrlProduct : ''}/${item?.file}`}
                      defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
                      width="100%"
                    />
                  </TempLink>
                ))}
              </Slider>
            </div>
          </div>
        )}
        {!isListing && (
          <div className={styles.imageContainer}>
            <TempLink product={productItem}>
              <div className={styles.imgContainer_P}>
                <div className={styles.imgContainer}>
                  {!isListing && (
                    <Image
                      src={srcImage}
                      defaultImage="https://via.placeholder.com/560x793?text=Image+Not+Available"
                      width="100%"
                    />
                  )}
                </div>
              </div>
            </TempLink>
          </div>
        )}
        {productItem?.sale && <div className={styles.sale}>Sale</div>}
        <div style={{ marginLeft: '50px' }}>
          <div className={styles.actionContainer}>
            <div>
              <button
                type="button"
                className='no-border bg-transparent c-pointer'
                onClick={handleWishList}
              >
                <span
                  className="material-icons-outlined"
                  style={{ color: isAddedToWishlist ? "red" : "black" }}
                >
                  {isAddedToWishlist ? "favorite" : "favorite_border"}
                </span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`${styles.productBtn} no-border bg-transparent c-pointer`}
                onClick={handleQuickView}
              >
                <span className="material-icons-outlined font-light-black">
                  search
                </span>
              </button>
            </div>
            <div>
              <TempLink product={productItem}>
                <button
                  type="button"
                  className={`${styles.productBtn} no-border bg-transparent c-pointer`}
                >
                  <span className='material-icons-outlined font-light-black'>
                    shopping_cart
                  </span>
                </button>
              </TempLink>
            </div>
          </div>
          <div
            className={`${!extraOridnary ? styles.productName : styles.extraOridnary
              } two-lines-text ${!isProduct ? "text-center " : "d-flex"}`}
            title={name}
          >
            {name || ""}
          </div>
          <div
            className={`${styles.productPrice} ${!isProduct ? "text-center" : ""
              }`}
          >
            {origpriceWithoutCurrency > priceWithoutCurrency ? (
              <div className={styles.was}>Was {origprice || ""}</div>
            ) : null}
            <div className={styles.now}>
              {origpriceWithoutCurrency > priceWithoutCurrency ? "Now" : ""}{" "}
              {price}
            </div>
          </div>
          <div
            className={`${styles.productColors} ${!isProduct ? "text-center justify-content-center" : ""
              }`}
          >
            <div className={`${styles.color} d-flex`}>
              {attributes?.colors?.length > 0 &&
                attributes?.colors?.map(item => (
                  <div
                    key={`color${index}`}
                    title={item?.label}
                    className={`${styles.option}  c-pointer `}
                    onClick={() => { loadColorImages(product, item) }}
                  >
                    {typeof item?.label === "string"
                      ? <img src={`${URL.baseUrlColorSwitcher}/${item?.label.replace('/', "-").toLowerCase().replace(' ', '-').trim()}.png`}
                        className={`${styles.colorItem} ${product?.selected?.color?.value === item.value
                          ? styles.active
                          : ""}`} alt={item?.label} />
                      : <div src={item?.file}
                        className={`${styles.colorItem} 
                        ${product.selected.color.value === item.value
                            ? styles.active
                            : ""}`} title={item?.label} />
                    }
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
