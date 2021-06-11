import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../components/common/Loader';
import MainLayout from '../Layouts/MainLayout';

const Landing = React.lazy(() => import('../pages/Landing/Landing'));
const Product = React.lazy(() => import('../pages/Product/Product'));
const Products = React.lazy(() => import('../pages/Products/Products'));
const ShoppingCart = React.lazy(() => import('../pages/ShoppingCart/ShoppingCart'));
const CMSContent = React.lazy(() => import('../pages/CMSContent/CMSContent'));

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openRoutes = [
      {
        path: '/',
        component: Landing,
        exact: true,
        name: 'Landing page',
        layout: MainLayout,
        index: 0,
      },
      {
        path: '/product/:categoryId',
        component: Product,
        exact: true,
        name: 'Product page',
        layout: MainLayout,
        index: 0,
      },
      {
        path: '/products/:category/:categoryId',
        component: Products,
        exact: true,
        name: 'Products Listing page',
        layout: MainLayout,
        index: 0,
      },
      {
        path: '/shopping-cart',
        component: ShoppingCart,
        exact: true,
        name: 'Shopping Cart',
        layout: MainLayout,
        index: 0,
      },
      {
        path: '/:identifier',
        component: CMSContent,
        exact: true,
        name: 'CMS Content',
        layout: MainLayout,
        index: 0,
      },
    ];
    this.secureRoutes = [];
  }

  renderRoutes() {
    return this.openRoutes.map((route) => {
      const RouteComponent = route.component;
      const ParentLayout = route.layout;
      return (
        <Route
          key={route.index}
          path={route.path}
          render={(props) => (
            <ParentLayout>
              <RouteComponent {...this.props} {...props} />
            </ParentLayout>
          )}
          exact={route.exact}
        />
      );
    });
  }

  render() {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>{this.renderRoutes()}</Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
