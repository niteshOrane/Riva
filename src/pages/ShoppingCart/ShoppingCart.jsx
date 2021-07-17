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

  return (
    <div className="container-90 max-width-1600 mx-auto">
      <div className={style.pageHeader}>
        <h1 className={style.pageTitle}>Shopping Cart</h1>
      </div>
      <div className="d-flex">
        <Products products={items} />
        <Summary />
      </div>
    </div>
  );
};

export default ShoppingCart;
