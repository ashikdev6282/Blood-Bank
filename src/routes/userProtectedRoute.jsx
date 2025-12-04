// src/routes/UserProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BloodContext } from "../context/BloodContext";

const UserProtectedRoute = ({ children }) => {
  const { user, loadingUser } = useContext(BloodContext);

  if (loadingUser) {
    return <div className="text-center mt-5">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
