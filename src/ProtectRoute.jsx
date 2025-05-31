import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

const ProtectRoute = ({ children }) => {
  const { getAuth } = useAuth();
  const navigate = useNavigate();
  const data = getAuth();

  useEffect(() => {
    if (!data) {
      navigate("/auth");
    }
  }, [data, navigate]);

  // Only render children if authenticated
  return data ? children : null;
};

export default ProtectRoute;
