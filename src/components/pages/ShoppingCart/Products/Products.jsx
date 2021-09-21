import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { extractColorSize, getSKuId } from '../../../../util';
import { toggleWishlist } from '../../../../store/actions/wishlist';
import style from './Products.module.scss';
import Image from "../../../common/LazyImage/Image";
import { editItemQntCart } from '../../../../store/actions/cart';


const Products = ({ products,currency_symbol }) => {

  const dispatch = useDispatch();

  const { data: wishlist = [] } = useSelector((state) => state.wishlist);
  const handleIncrementProduct = (product) => {
    product.qty = product.qty + 1;
    dispatch(editItemQntCart(product));
  };
  const handleDecrementProduct = (product) => {
    if (product.qty === 1) return;
    product.qty = product.qty - 1;
    dispatch(editItemQntCart(product));
  };
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options.map((o) => ({
        label: o.option_id === '92' ? 'Color' : 'Size',
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id
      }))
    );
    return { colors, size };
  };

  const handleWishList = (product) => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className={style.products}>
      <div className={style.header}>
        <div className={style.headerTitle}>
          <h2>PRODUCTS</h2>
        </div>
        <div className={style.headerDetails}>
          <span className="font-light-black">PRICE</span>
          <span className="font-light-black">QTY:</span>
          <span className="font-light-black">SUBTOTAL</span>
        </div>
      </div>

      <div className={style.productList}>
        {products.map((product) => (
          <Link to={`product/${getSKuId(product?.sku)}`} >
            <div key={product.id} className={style.product}>
              <div className="d-flex justify-content-between p-12px">
                <div className={style.productDetails}>
                  <div className={style.productImg}>
                    <Image src={product.src} width="200px" alt={product.name} type="product-details" />
                  </div>
                  <div className="w-100">
                    <div className="d-flex w-100">
                      <div className={style.nameClrSize}>
                        <h2 className={style.name}>{product.name}</h2>
                        <div className={style.clrSize}>
                          <div className="d-flex align-items-center my-10px">
                            <span>Color:</span>
                            <span className="font-light-black">
                              {product?.color?.label ||
                                getColorSize(
                                  product?.product_option?.extension_attributes
                                    ?.configurable_item_options || []
                                ).colors?.[0]?.label}
                            </span>
                          </div>
                          <div className="d-flex align-items-center my-10px">
                            <span>Size:</span>
                            <span className="font-light-black">
                              {product?.size?.label ||
                                getColorSize(
                                  product?.product_option?.extension_attributes
                                    ?.configurable_item_options || []
                                ).size?.[0]?.label}
                            </span>
                          </div>
                          <div className="d-flex align-items-center my-10px">
                            <span>SKU:</span>
                            <span className="font-light-black">
                              {product.sku}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={style.productPricing}>
                        <div className="d-flex align-items-center justify-content-between">
                          <strong className="f1 text-center">
                            {currency_symbol}{product.price}
                          </strong>
                          <div className={style.counter}>
                            <span className="c-pointer material-icons-outlined" onClick={() => { handleDecrementProduct(product) }}>
                              remove
                            </span>
                            <span>{product.qty}</span>
                            <span className="c-pointer material-icons-outlined" onClick={() => { handleIncrementProduct(product) }}>
                              add
                            </span>
                          </div>
                          <strong className="f1 text-center">
                            {currency_symbol}{product.price * product.qty}
                          </strong>
                        </div>
                        <div className={`text-right ${style.loyaltyPoints}`}>
                          <span>Earn Loyalty Points: {currency_symbol}2 ?</span>
                        </div>
                      </div>
                    </div>
                    <div className={style.footer}>
                      <div className={style.footerContent}>
                        <div
                          className="font-light-black c-pointer d-flex"
                          onClick={() => handleWishList(product)}
                          style={{
                            color: wishlist.find((w) => w.id == product.id)
                              ? 'red'
                              : 'black',
                          }}
                        >
                          <span className="material-icons-outlined">
                            {wishlist.find((w) => w.id == product.id)
                              ? 'favorite'
                              : 'favorite_border'}
                          </span>
                          <span className="underline">Move to Wishlist</span>
                        </div>
                        <Link
                          to={`/product/${product.sku}`}
                          className="font-light-black c-pointer d-flex"
                        >
                          <span className="material-icons-outlined">edit</span>
                          <span className="underline">Edit</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-right c-pointer">
        <div className="text-right">
          <a href="/" className={style.continueBtn}>
            Continue Shopping
          </a>
        </div>
      </div>
    </div >
  );
};

export default Products;
