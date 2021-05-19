import React from "react";
import Landing from "./pages/Landing/Landing";
import { connect } from "react-redux";
import { fetchHeader } from "./store/actions/common/common";
import MainLayout from "./Layouts/MainLayout";
import "./App.scss";

class AppRoot extends React.Component {
  componentDidMount() {
    const { fetchHeader } = this.props;
    fetchHeader();
  }

  render() {
    const { loading } = this.props;
  
    if (loading) return "Loading";
    return (
      <MainLayout>
        <Landing />
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.common.loading,
  error: state.common.error,
});

export default connect(mapStateToProps, { fetchHeader })(AppRoot);
