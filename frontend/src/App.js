import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
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
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignup />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
