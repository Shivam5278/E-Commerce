import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
const Protected = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userId = localStorage.getItem("User");
  console.log(userId);
  const checkUserToken = () => {
    console.log(userId);
    if (!userId || userId === "undefined") {
      setIsLoggedIn(false);
      return navigate("/logina");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default Protected;
