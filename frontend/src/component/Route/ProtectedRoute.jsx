import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, redirect } from "react-router-dom";
import Profile from "../User/Profile";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      <Routes>
        {!loading && (
          <Route
            {...rest}
            element={(...props) => {
              if (!isAuthenticated) {
                return redirect("/login");
              }
              return { Element };
            }}
          />
        )}
      </Routes>
    </Fragment>
  );
};

export default ProtectedRoute;
