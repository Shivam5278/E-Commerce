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
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Protected from "./component/Route/Protected";

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

        <Route exact path="/login" element={<LoginSignup />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
