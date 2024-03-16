import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AuthCheck = () => {
  const isLoggedIn = useSelector((state) => state.user.logInUser);
  const token = useSelector((state) => state.user.token);

  return (isLoggedIn && token) ? <Outlet /> : <LoginPage />;
};

export default AuthCheck;
