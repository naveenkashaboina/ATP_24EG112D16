// AdminProtectedRoute.jsx

import { useAuth } from "../store/authStore";
import { Navigate } from "react-router";

function AdminProtectedRoute({ children }) {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default AdminProtectedRoute;