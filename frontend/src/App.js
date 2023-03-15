import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from "react";

import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import About from "./component/layout/About/About.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";
import NotFound from "./component/layout/NotFound/NotFound.jsx";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignup from "./component/User/LoginSignup";
import Profile from "./component/User/Profile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Protected from "./component/Route/Protected";
import ForgotPassword from "./component/User/ForgotPassword";
import Cart from "./component/Cart/Cart.js";
import Payment from "./component/Cart/Payment.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Admin Imports
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import UpdateUser from "./component/Admin/UpdateUser.jsx";
import ProductReviews from "./component/Admin/ProductReviews.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    //getStripeApiKey();
  }, []);

  //window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route
          exact
          path="/account"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <Profile />
            </Protected>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </Protected>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </Protected>
          }
        />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/shipping"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </Protected>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <MyOrders />
            </Protected>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <OrderDetails />
            </Protected>
          }
        />
        <Route
          exact
          path="/success"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <OrderSuccess />
            </Protected>
          }
        />

        {/* Admin Routes */}
        <Route
          exact
          path="/admin/dashboard"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <ProductList />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <NewProduct />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <UpdateProduct />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <OrderList />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <ProcessOrder />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <UsersList />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <UpdateUser />
            </Protected>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <Protected isAuthenticated={isAuthenticated}>
              <ProductReviews />
            </Protected>
          }
        />
        <Route element={<NotFound />} />
      </Routes>

      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              exact
              path="/process/payment"
              element={
                <Protected isAdmin={true} isAuthenticated={isAuthenticated}>
                  <Payment />
                </Protected>
              }
            />
          </Routes>
        </Elements>
      )} */}
      <Footer />
    </Router>
  );
}

export default App;
