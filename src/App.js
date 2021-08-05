import React from 'react';
import { connect } from 'react-redux';
import { fetchCommonData } from './store/actions/common/common';
import { getWishlist } from './store/actions/wishlist';
import Loader from './components/common/Loader';
import { getCart } from './store/actions/cart';
import SnackBar from './components/common/Snakbar';
import AlertComponent from './components/common/Alert';
import AppRoutes from './routes';
import './App.scss';
import { deepEqual, hardReload } from './util';

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
  }

  componentDidUpdate(prevProps) {
    const { store } = this.props;

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
