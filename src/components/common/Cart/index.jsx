import React from 'react';
import { Drawer } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BlackCloseBtn from '../Buttons/BlackCloseBtn/BlackCloseBtn';
import { toggleCart } from '../../../store/actions/cart';
import style from './style.module.scss';

const Cart = ({ closeAddToCartSidebar }) => {
  const { data: items = [], isOpen = false } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  return (
    <div key="cartlist">
      <Drawer anchor="right" onClose={closeAddToCartSidebar} open={isOpen}>
        <div className={style.sidebarContainer}>
          <div className="d-flex align-items-end justify-content-between p-12">
            <h3 className={style.addedMsg}>Added To Cart (2)</h3>
            <BlackCloseBtn
              handleClose={() => dispatch(toggleCart())}
              drawerPosition="right"
            />
          </div>
          <div className={style.sideMsg}>
            <div className="d-flex align-items-center bg-grey p-12">
              <span className="color-black material-icons-outlined">done</span>
              <span className="font-weight-600">
                THIS ITEM HAS BEEN ADDED TO YOUR CART
              </span>
            </div>
          </div>
          <div className={style.sideBody}>
            <div className={style.items}>
              {items.map((item, index) => (
                <div className={style.sideItem} key={`cart_inner_${index}`}>
                  <div id={style.bdrBtm} className="d-flex align-items-center">
                    <div className={style.itemImg}>
                      <img src={item.src} width="100%" alt="" />
                    </div>
                    <div className={style.itemDetails}>
                      <h3
                        title="Name"
                        className={`${style.name} two-line-text`}
                      >
                        {item.name}
                      </h3>
                      <div className={style.colorPriceETC}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <span className="font-weight-600">Color: </span>
                            <span className="color-grey">{item.color}</span>
                          </div>
                          <div>
                            <span className="font-weight-600 color-primary">
                              ${item.price}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <span className="font-weight-600">Size: </span>
                            <span className="color-grey">{item.size}</span>
                          </div>
                          <div>
                            <span>
                              <span className="material-icons-outlined">edit</span>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <span className="font-weight-600">Qty: </span>
                            <span className="color-grey">{item.quantity}</span>
                          </div>
                          <div>
                            <span>
                              <span className="material-icons-outlined">close</span>
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
              <div className="d-flex justify-content-between align-items-center gap-12">
                <div>
                  <span className="material-icons-outlined">local_shipping</span>
                </div>
                <p>
                  <span className="color-primary">Spend %18.20</span> to quality
                  for free standard delivery
                </p>
                <div
                  className={`${style.exclamation} bg-grey border-radius-50 d-flex-all-center`}
                >
                  i
                </div>
              </div>
            </div>
            <div className="text-right p-12">
              <h4>
                <strong>Total</strong>{' '}
                <strong className="color-primary">$43.43</strong>
              </h4>
            </div>
            <div className="text-left p-12">
              <h4 className="color-grey">*Before taxes</h4>
            </div>
            <div className={style.processBtns}>
              <button type="button" className="bg-black color-white p-12 w-100 d-block">
                GO TO CHECKOUT
              </button>
              <Link to="/shopping-cart" href="/shopping-cart">
                <button type="button" className="bg-primary color-white p-12 w-100 d-block">
                  SEE SHOPPING CART
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
