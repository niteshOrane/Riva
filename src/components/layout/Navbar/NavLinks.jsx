
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MenuListComposition from './MenuItem';
import { toggleCart } from '../../../store/actions/cart';
import { toggleSignUpCard } from '../../../store/actions/common';
import useArabic from '../../common/arabicDict/useArabic';

const NavLinks = React.memo(() => {
  const history = useHistory();
  const { translate } = useArabic();
  const { data = [] } = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist.data);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const openSignUpCard = (redirectTo) => {
    dispatch(toggleSignUpCard({ redirectTo }));
  };

  const isAuth = auth.isAuthenticated;

  return (
    <ul className="nav-list d-flex align-items-center gap-12">
      <li className="nav-li">
        <span
          className="d-flex align-items-center gap-12"
          onClick={() => {
            isAuth ? history.push('/wishlist') : openSignUpCard('/wishlist');
          }}
        >
          <span className=" personIcon material-icons-outlined font-light-black">
            favorite_border
          </span>
          <span className="align-self-end font-light-black">
           {translate?.nav?.WISH}({isAuth ? wishlist.length ?? 0 : 0})
            &nbsp; &nbsp;
          </span>{'   '}
        </span>
      </li>

      <li className="nav-li">
        <span
          className="d-flex align-items-center gap-12"
        >
           <MenuListComposition auth={auth} history={history} openSignUpCard={openSignUpCard} translate={translate} />
         {' '}
        </span>
      </li>
      <li className="nav-li">
        <a
          className="d-flex align-items-center gap-12px c-pointer"
          onClick={() => dispatch(toggleCart())}
        >
          <span className="material-icons-outlined font-light-black">
            shopping_cart
          </span>
          <span className="align-self-end font-light-black">
          {translate?.nav?.CART} ({data?.length || 0})
          </span>{' '}
        </a>
      </li>
    </ul>
  );
});

export default NavLinks;
