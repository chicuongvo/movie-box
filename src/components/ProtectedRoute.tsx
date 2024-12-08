import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext.tsx";
import { useEffect } from "react";
function ProtectedRoute() {
  const { username } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/reset-password")
    )
      return;
    if (pathname === "/admin" && username !== "admin") navigate("/");
    if (!username) navigate("/login");
  }, [username, navigate, pathname]);

  return null;
}

export default ProtectedRoute;
