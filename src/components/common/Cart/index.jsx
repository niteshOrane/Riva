import React from "react";
import { Drawer } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import BlackCloseBtn from "../Buttons/BlackCloseBtn/BlackCloseBtn";
import {
  toggleCart,
  removeFromCart,
  editItemQntCart,
} from "../../../store/actions/cart";
import style from "./style.module.scss";
import { extractColorSize, getSKuId } from "../../../util";
import Image from "../LazyImage/Image";
import { toggleSignUpCard } from "../../../store/actions/common";

const Cart = () => {
  const {
    data: items = [],
    isOpen = false,
    freeShipping,
  } = useSelector((state) => state.cart);

  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { currency_symbol, language } = useSelector(
    (state) => state?.common?.store
  );
  const [editableIndex, setEditableIndex] = React.useState(null);
  const dispatch = useDispatch();
  const openSignUpCard = (redirectTo) => {
    dispatch(toggleSignUpCard({ redirectTo }));
  };
  const handleIncrementProduct = (product) => {
    product.qty = product.qty + 1;
    dispatch(editItemQntCart(product));
  };
  const handleDecrementProduct = (product) => {
    if (product.qty === 1) return;
    product.qty = product.qty - 1;
    dispatch(editItemQntCart(product));
  };
  const handleClose = () => {
    dispatch(toggleCart());
  };
  const handleContinueShopping = () => {
    dispatch(toggleCart());
    window.location.href = "/";
  };

  const isAuth = auth.isAuthenticated;
  const getColorSize = (options) => {
    const { colors, size } = extractColorSize(
      options.map((o) => ({
        label: o.option_id === "92" ? "Color" : "Size",
        values: [{ value_index: o.option_value }],
        attribute_id: o.option_id,
      }))
    );

    return { colors, size };
  };
  return (
    <div key="cartlist" dir={language === "Arabic" ? "rtl" : "ltr"}>
      <Drawer
        anchor={language === "Arabic" ? "left" : "right"}
        onClose={handleClose}
        open={isOpen}
      >
        <div className={style.sidebarContainer}>
          <div className="d-flex align-items-end justify-content-between p-12px">
            <h3 className={style.addedMsg}>Added To Cart ({items.length})</h3>
            <BlackCloseBtn
              handleClose={handleClose}
              drawerPosition={language === "Arabic" ? "left" : "right"}
              filter
            />
          </div>
          <div className={style.sideMsg}>
            {/* <div className="d-flex align-items-center bg-grey p-12px">
              <span className="color-black material-icons-outlined">done</span>
              <span className="font-weight-600">
                THIS ITEM HAS BEEN ADDED TO YOUR CART
              </span>
            </div> */}
          </div>
          <div className={style.sideBody}>
            {/* {isSingle && (

            )} */}
            {items && items.length > 0 ? (
              <>
                <div className={style.items}>
                  {items?.map((item, index) => (
                    <div className={style.sideItem} key={`cart_inner_${index}`}>
                      <div
                        id={style.bdrBtm}
                        className="d-flex align-items-center"
                      >
                        <Link
                          to={`product/${getSKuId(item?.sku)}`}
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          <div className={style.itemImg}>
                            <Image
                              src={item.src}
                              width="100%"
                              alt={item.name}
                              type="product-details"
                            />
                          </div>
                        </Link>
                        <div className={style.itemDetails}>
                          <p
                            title="Name"
                            className={`${style.name} two-line-text`}
                          >
                            {item.name}
                          </p>
                          <div className={style.colorPriceETC}>
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <span>Color: </span>
                                <span className="color-grey">
                                  {item?.color?.label ||
                                    getColorSize(
                                      item?.product_option?.extension_attributes
                                        ?.configurable_item_options || []
                                    ).colors?.[0]?.label}
                                </span>
                              </div>
                              <div>
                                <span className="font-weight-600 color-primary">
                                  {currency_symbol}{" "}
                                  {parseFloat(item.price)?.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <span>Size: </span>
                                <span className="color-grey">
                                  {item?.size?.label ||
                                    getColorSize(
                                      item?.product_option?.extension_attributes
                                        ?.configurable_item_options || []
                                    ).size?.[0]?.label}
                                </span>
                              </div>
                              <div>
                                {editableIndex == index ? (
                                  <span
                                    onClick={() => {
                                      setEditableIndex(null);
                                    }}
                                    className="material-icons-outlined c-pointer"
                                  >
                                    close
                                  </span>
                                ) : null}
                                <span
                                  onClick={() => {
                                    setEditableIndex(index);
                                  }}
                                  className="material-icons-outlined c-pointer"
                                >
                                  edit
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex">
                                <span>Qty: </span>
                                <span className="color-grey">
                                  {editableIndex == index ? (
                                    <div className={style.counter}>
                                      <span
                                        className="c-pointer material-icons-outlined"
                                        onClick={() => {
                                          handleDecrementProduct(item);
                                        }}
                                      >
                                        remove
                                      </span>
                                      <span>{item.qty}</span>
                                      <span
                                        className="c-pointer material-icons-outlined"
                                        onClick={() => {
                                          handleIncrementProduct(item);
                                        }}
                                      >
                                        add
                                      </span>
                                    </div>
                                  ) : (
                                    item.qty
                                  )}
                                </span>
                              </div>
                              <div>
                                <span
                                  onClick={() => dispatch(removeFromCart(item))}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="material-icons-outlined">
                                    close
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={style.freeDeliverOffer}>
                  <div className="d-flex justify-content-between align-items-center gap-12px">
                    <div>
                      <span className="material-icons-outlined">
                        local_shipping
                      </span>
                    </div>
                    <p className={style.spend}>
                      {!freeShipping?.[0]?.remaining_amount == 0 ? (
                        <div>
                          <span>
                            Spend {currency_symbol}
                            {freeShipping?.[0]?.remaining_amount}
                          </span>{" "}
                          to qualify for free standard delivery{" "}
                        </div>
                      ) : (
                        <div>You are eligible for free shipping</div>
                      )}
                    </p>
                    <div
                      className={`${style.exclamation} bg-grey border-radius-50 d-flex-all-center`}
                    >
                      i
                    </div>
                  </div>
                </div>
                <div className="text-right p-12px">
                  <h4>
                    <strong>Total</strong>{" "}
                    <strong className="color-primary">
                      {currency_symbol}{" "}
                      {parseFloat(
                        items.reduce(
                          (total, item) => total + item.price * item.qty,
                          0
                        ) || 0
                      )?.toFixed(2)}
                    </strong>
                  </h4>
                </div>
                <div className="text-left p-12px">
                  <span className="color-grey">*Before taxes</span>
                </div>
                <div className={style.processBtns}>
                  <button
                    onClick={() => {
                      isAuth
                        ? history.push("/delivery-address")
                        : openSignUpCard("/delivery-address");
                    }}
                    type="button"
                    className="bg-black color-white p-12px w-100 d-block c-pointer"
                  >
                    GO TO CHECKOUT
                  </button>
                  <Link to="/shopping-cart" href="/shopping-cart">
                    <button
                      type="button"
                      className={`p-12px w-100 d-block c-pointer ${style.cartBtn}`}
                    >
                      SEE SHOPPING CART
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <section className={style.emptySec}>
                <div className = {`d-flex justify-content-center align-items-center ${style.emptyWrap}`}>
                  <span className={`material-icons ${style.emptyCart}`}>add_shopping_cart</span>
                </div>
                <div className="text-center">
                  {" "}
                  SHOPPING CART IS EMPTY You have no items in your shopping
                  cart. Click{" "}
                  <a
                    onClick={() => {
                      handleContinueShopping();
                    }}
                    className="color-red c-pointer"
                  >
                    here
                  </a>{" "}
                  to continue shopping.
                </div>
              </section>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
