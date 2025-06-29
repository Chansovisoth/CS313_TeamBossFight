import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.user.user.role)) {
    return (
      <div className="text-center text-red-500 font-bold">403 - Forbidden</div>
    );
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
