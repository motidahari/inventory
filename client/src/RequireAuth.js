import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/auth";
import NotFound from "./Pages/NotFound";

const RequireAuth = ({ permission }) => {
  const { user } = useContext(AuthContext);

  return user ? (
    permission.find(() => permission?.includes(user?.permission)) ? (
      <Outlet />
    ) : (
      <NotFound />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default RequireAuth;
