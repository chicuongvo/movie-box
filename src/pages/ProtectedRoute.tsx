import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";

function ProtectedRoute() {
  const { username } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate("/login");
  }, [username, navigate]);

  return null;
}

export default ProtectedRoute;
