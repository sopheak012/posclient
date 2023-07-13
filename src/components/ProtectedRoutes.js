import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
