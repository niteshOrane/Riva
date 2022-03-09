import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../components/common/Loader";
import MainLayout from "../Layouts/MainLayout";
import HomeLayout from "../Layouts/HomeLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Page404 from "../pages/404/NotFound";

const LandingHome = React.lazy(() => import("../pages/Landing/HomeLanding"));
const Landing = React.lazy(() => import("../pages/Landing/Landing"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const Products = React.lazy(() => import("../pages/Products/Products"));
const WishList = React.lazy(() => import("../pages/WishList/WishList"));

const CreatePassword = React.lazy(() =>
  import("../components/common/Cards/SignUpCard/CreatePassword/CreatePassword")
);

const DeliveryAddress = React.lazy(() =>
  import("../pages/Delivery-address/DeliveryAddress")
);
const SavedCards = React.lazy(() => import("../pages/SavedCards/SavedCards"));
const CancelledOrders = React.lazy(() =>
  import("../pages/CancelledOrders/CancelledOrders")
);
const TrackYourOrder = React.lazy(() =>
  import("../pages/TrackYourOrder/TrackYourOrder")
);

const ChangePassword = React.lazy(() =>
  import("../pages/ChangePassword/ChangePassword")
);
const Coupons = React.lazy(() => import("../pages/Coupons/Coupons"));
const OrderConfirmed = React.lazy(() =>
  import("../pages/OrderConfirmed/OrderConfirmed")
);
const ResultPage = React.lazy(() =>
  import("../pages/OrderConfirmed/ResultPage")
);
const MySubscription = React.lazy(() =>
  import("../pages/MySubscription/MySubscription")
);
const ReferAndEarn = React.lazy(() =>
  import("../pages/ReferAndEarn/ReferAndEarn")
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
const NotifyMe = React.lazy(() => import("../pages/NotifyMe/NotifyMe"));
const CMSContent = React.lazy(() => import("../pages/CMSContent/CMSContent"));

const ProfileInformation = React.lazy(() =>
  import("../pages/profile-information/ProfileInformation")
);
const ManageAddress = React.lazy(() =>
  import("../pages/Manage-address/ManageAddress")
);
const ContactUs = React.lazy(() => import("../pages/ContactUs/ContactUs"));
const Reviews = React.lazy(() => import("../pages/MyReviews/Reviews"));
const Returned = React.lazy(() => import("../pages/Returned/Returned"));

// order info

const OrderInformation = React.lazy(() =>
  import("../components/pages/OrderInformation/InformationGrid")
);

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openRoutes = [
      {
        path: "/",
        component: LandingHome,
        exact: true,
        name: "Landing page",
        layout: HomeLayout,
        index: 0,
      },
      {
        path: "/404",
        component: Page404,
        exact: true,
        name: "Landing page",
        layout: HomeLayout,
        index: 404,
      },
      {
        path: "/createpassword",
        component: CreatePassword,
        exact: true,
        name: "Landing page",
        layout: HomeLayout,
        index: 13,
      },
      {
        path: "/type/:mainCategoryId",
        component: Landing,
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
        index: 1,
      },
      {
        path: "/products/:category/:categoryId",
        component: Products,
        exact: true,
        name: "Products Listing page",
        layout: MainLayout,
        index: 2,
      },
      {
        path: "/products/:category/:categoryId/:subcateId",
        component: Products,
        exact: true,
        name: "Products Listing page",
        layout: MainLayout,
        index: 2,
      },
      {
        path: "/shopping-cart",
        component: ShoppingCart,
        exact: true,
        name: "Shopping Cart",
        layout: MainLayout,
        index: 3,
      },
      {
        path: "/contact-us",
        component: ContactUs,
        exact: true,
        name: "Shopping Cart",
        layout: MainLayout,
        index: 3,
      },
      {
        path: "/:identifier",
        component: CMSContent,
        exact: true,
        name: "CMS Content",
        layout: MainLayout,
        index: 4,
      },
    ];

    this.secureRoutes = [
      {
        path: "/wishlist",
        component: WishList,
        exact: true,
        name: "Wishlist",
        layout: MainLayout,
        index: 5,
      },
      {
        path: "/retur-order",
        component: Returned,
        exact: true,
        name: "Wishlist",
        layout: MainLayout,
        index: 5,
      },
      {
        path: "/notify-me",
        component: NotifyMe,
        exact: true,
        name: "NotifyMe",
        layout: MainLayout,
        index: 5,
      },
      {
        path: "/saved-cards",
        component: SavedCards,
        exact: true,
        name: "SavedCards",
        layout: MainLayout,
        index: 5,
      },
      {
        path: "/order-confirmed/:orderId/:displayOrderNumber",
        component: OrderConfirmed,
        exact: true,
        name: "OrderConfirmed",
        layout: MainLayout,
        index: 6,
      },
      {
        path: "/result/:type",
        component: ResultPage,
        exact: true,
        name: "ResultPage",
        layout: MainLayout,
        index: 6,
      },

      {
        path: "/track-your-order",
        component: TrackYourOrder,
        exact: true,
        name: "TrackYourOrder",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/my-subscription",
        component: MySubscription,
        exact: true,
        name: "MySubscription",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/cart-payment",
        component: CartPayment,
        exact: true,
        name: "CartPayment",
        layout: MainLayout,
        index: 7,
      },
      {
        path: "/track-orders",
        component: TrackOrders,
        exact: true,
        name: "TrackOrders",
        layout: MainLayout,
        index: 8,
      },
      {
        path: "/refer-&-earn",
        component: ReferAndEarn,
        exact: true,
        name: "ReferAndEarn",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/delivery-address",
        component: DeliveryAddress,
        exact: true,
        name: "Delivery Address",
        layout: MainLayout,
        index: 9,
      },
      {
        path: "/myOrder/:orderType",
        component: Delivered,
        exact: true,
        name: "Delivered",
        layout: MainLayout,
        index: 10,
      },
      {
        path: "/cancelled-orders",
        component: CancelledOrders,
        exact: true,
        name: "CancelledOrders",
        layout: MainLayout,
        index: 11,
      },
      {
        path: "/my-reviews",
        component: Reviews,
        exact: true,
        name: "MyReviews",
        layout: MainLayout,
        index: 11,
      },
      {
        path: "/coupons",
        component: Coupons,
        exact: true,
        name: "Coupons",
        layout: MainLayout,
        index: 0,
      },
      {
        path: "/dashboard",
        component: Dashboard,
        exact: true,
        name: "Dashboard",
        layout: MainLayout,
        index: 12,
      },
      {
        path: "/change-password",
        component: ChangePassword,
        exact: true,
        name: "ChangePassword",
        layout: MainLayout,
        index: 13,
      },
      {
        path: "/profile-information",
        component: ProfileInformation,
        exact: true,
        name: "Landing page",
        layout: MainLayout,
        index: 14,
      },
      {
        path: "/manage-addresses",
        component: ManageAddress,
        exact: true,
        name: "Manage Address",
        layout: MainLayout,
        index: 15,
      },
      {
        path: "/order-details/:number",
        component: OrderInformation,
        exact: true,
        name: "Order Information",
        layout: MainLayout,
        index: 15,
      },
    ];
  }

  renderRoutes() {
    const { auth } = this.props;
    let routes = [...this.openRoutes];

    if (auth.isAuthenticated) routes = [...this.secureRoutes, ...routes];

    return routes.map((route) => {
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
        <Switch>
          {this.renderRoutes()}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppRoutes);
