import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from "react";

import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={
            <Protected>
              <Shipping />/
            </Protected>
          }
        />
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
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignup />} />
      </Routes>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              exact
              path="/process/payment"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <Payment />
                </Protected>
              }
            />
          </Routes>
        </Elements>
      )}
      <Footer />
    </Router>
  );
}

export default App;
