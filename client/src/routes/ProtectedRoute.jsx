import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  console.log("isuserAuth=====", isUserAuth);

  const navigate = useNavigate();

  // useEffect(() => {
  if (!isUserAuth) {
    navigate("/login");
    return;
  }
  // }, []);

  return <Outlet />;
};
