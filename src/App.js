import React from 'react';
import { connect } from 'react-redux';
import { fetchCommonData } from './store/actions/common/common';
import Loader from './components/common/Loader';
import AlertComponent from './components/common/Alert';
import AppRoutes from './routes';
import './App.scss';
import { deepEqual, hardReload } from './util';

class AppRoot extends React.Component {
  componentDidMount() {
    const { fetchCommonData: fetch } = this.props;
    fetch();
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.common.loading,
  error: state.common.error,
  store: state.common.store,
});

export default connect(mapStateToProps, { fetchCommonData })(AppRoot);
