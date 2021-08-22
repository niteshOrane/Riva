import MenuListComposition from './MenuItem';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../../../services/auth/auth.service';
import { logout } from '../../../store/actions/auth';
import { toggleCart } from '../../../store/actions/cart';
import { toggleSignUpCard } from '../../../store/actions/common';
import { hardReload } from '../../../util';

const NavLinks = () => {
  const history = useHistory();
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
          <span style={{ marginRight: "12px" }} className="material-icons-outlined font-light-black">
            favorite_border
          </span>
          <span className="align-self-end font-light-black">
            Wishlist ({isAuth ? wishlist.length ?? 0 : 0})
          </span>{' '}
        </span>
      </li>

      <li className="nav-li">
        <span
          className="d-flex align-items-center gap-12"
        >
           <MenuListComposition auth={auth} history={history} openSignUpCard={openSignUpCard} />
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
            Cart ({data?.length || 0})
          </span>{' '}
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
