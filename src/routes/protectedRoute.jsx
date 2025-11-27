import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, initialLoading } = useAuth();

  if (initialLoading) {
    return <div>Loading...</div>; // you can replace with spinner
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
