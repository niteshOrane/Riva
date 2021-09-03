import React from 'react';
import { connect } from 'react-redux';
import { fetchCommonData } from './store/actions/common/common';
import { getWishlist } from './store/actions/wishlist';
import Loader from './components/common/Loader';
import { getCart } from './store/actions/cart';
import SnackBar from './components/common/Snakbar';
import AlertComponent from './components/common/Alert';

import { ToastContainer, toast } from 'react-toastify';
import AppRoutes from './routes';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';


import { deepEqual, hardReload, getCustInfo } from './util';



class AppRoot extends React.Component {
  componentDidMount() {
    const {
      fetchCommonData: fetch,
      getWishlist: wishlistInit,
      getCart: cartInit,
    } = this.props;
    fetch();
    wishlistInit();
    cartInit();
    toast.configure();
    toast(`Welcome ${getCustInfo().isAuthenticated ? getCustInfo().customer.firstname : ' Guest'}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    const { store } = this.props;
    window.addEventListener("scroll", () => {
      const mybutton = document.getElementById("myBtn");

      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

        mybutton.style.display = "block";
        mybutton.style.bottom = `100px`;
      } else {
        mybutton.style.display = "none";
        mybutton.style.bottom = "10px";
      }
    });
    if (deepEqual(store, prevProps.store)) return;
    hardReload();
  }

  handleError(err) {
    const properties = {
      title: err?.statusText,
      message: err?.message ?? '',
      secondaryActionText: 'OK',
      visible: true,
    };
    return <AlertComponent {...properties} />;
  }

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loader />;
    return (
      <>
        <AppRoutes {...this.props} />


        {error && this.handleError(error)}
        <SnackBar />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.common.loading,
  error: state.common.error,
  store: state.common.store,
});

export default connect(mapStateToProps, {
  fetchCommonData,
  getWishlist,
  getCart,
})(AppRoot);
