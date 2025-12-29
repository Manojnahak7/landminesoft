import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth(); // AuthContext se user check
  const location = useLocation(); // Current location save karne ke liye

  if (!user) {
    // Login pe redirect + intended page save kar
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />; // Protected content render kar
};

export default ProtectedRoute;
