import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "../components/common/Loader";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";

const Landing = React.lazy(() => import("../pages/Landing/Landing"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const Products = React.lazy(() => import("../pages/Products/Products"));
const WishList = React.lazy(() => import("../pages/WishList/WishList"));

const DeliveryAddress = React.lazy(() =>
  import("../pages/Delivery-address/DeliveryAddress")
);
const CancelledOrders = React.lazy(() =>
  import("../pages/CancelledOrders/CancelledOrders")
);
const ChangePassword = React.lazy(() =>
  import("../pages/ChangePassword/ChangePassword")
);
const OrderConfirmed = React.lazy(() =>
  import("../pages/OrderConfirmed/OrderConfirmed")
);
const Delivered = React.lazy(() => import("../pages/Delivered/Delivered"));
const TrackOrders = React.lazy(() =>
  import("../pages/TrackOrders/TrackOrders")
);
const CartPayment = React.lazy(() =>
  import("../pages/Cart-Payment/CartPayment")
);
const ShoppingCart = React.lazy(() =>
  import("../pages/ShoppingCart/ShoppingCart")
);

const ProfileInformation = React.lazy(() => import("../pages/profile-information/ProfileInformation"))
const CMSContent = React.lazy(() => import("../pages/CMSContent/CMSContent"));

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openRoutes = [
      {
        path: "/",
        component: Landing,
        exact: true,
        name: "Landing page",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/profile-information",
        component: ProfileInformation,
        exact: true,
        name: "Landing page",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/product/:categoryId",
        component: Product,
        exact: true,
        name: "Product page",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/products/:category/:categoryId",
        component: Products,
        exact: true,
        name: "Products Listing page",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/shopping-cart",
        component: ShoppingCart,
        exact: true,
        name: "Shopping Cart",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/wishlist",
        component: WishList,
        exact: true,
        name: "Wishlist",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/order-confirmed",
        component: OrderConfirmed,
        exact: true,
        name: "OrderConfirmed",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/cart-payment",
        component: CartPayment,
        exact: true,
        name: "CartPayment",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/track-orders",
        component: TrackOrders,
        exact: true,
        name: "TrackOrders",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/delivery-address",
        component: DeliveryAddress,
        exact: true,
        name: "DeliveryAddress",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/delivered",
        component: Delivered,
        exact: true,
        name: "Delivered",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/cancelled-orders",
        component: CancelledOrders,
        exact: true,
        name: "CancelledOrders",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        name: "Dashboard",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/change-password",
        component: ChangePassword,
        exact: true,
        name: "ChangePassword",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/:identifier",
        component: CMSContent,
        exact: true,
        name: "CMS Content",
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
