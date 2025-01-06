import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/userSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting...");
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;
