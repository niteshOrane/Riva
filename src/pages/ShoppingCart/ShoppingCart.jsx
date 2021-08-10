import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../store/actions/cart';
import Products from '../../components/pages/ShoppingCart/Products/Products';
import Summary from '../../components/pages/ShoppingCart/Summary/Summary';
import style from './ShoppingCart.module.scss';

const ShoppingCart = () => {
  const { data: items = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleCart(false));
  }, []);
  const handleContinueShopping = () => {
    window.location.href = "/";
  };
  return (
    <div className="container-90 max-width-1600 mx-auto" style={{ height: "auto" }}>
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Shopping Cart</h1>
      </div>
      {items.length > 0 ? <div className="d-flex">
        <Products products={items} />
        <Summary />
      </div> :  <div className="text-center"> SHOPPING CART IS EMPTY
                You have no items in your shopping cart.
                Click <a onClick={() => { handleContinueShopping() }}  href="#"
                className="color-red c-pointer">here</a> to continue shopping.</div>}
    </div>
  );
};

export default ShoppingCart;
