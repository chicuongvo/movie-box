import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext.tsx";
import { useEffect } from "react";

function ProtectedRoute() {
  const { username } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") return;
    if (!username) navigate("/login");
  }, [username, navigate, pathname]);

  return null;
}

export default ProtectedRoute;
