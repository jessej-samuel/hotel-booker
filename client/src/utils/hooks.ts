import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    type: "",
  });

  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem("userData") || "{}") || undefined;
    const path = window.location.pathname;

    if (path === "/hotel/login" && userData.type === "hotel")
      navigate("/dashboard");
    else if (path === "/user/login" && userData.type === "user")
      navigate("/dashboard");
    if (!userData || userData === undefined) navigate("/");
    else if (path === "/" && userData.type != "") navigate("/dashboard");
    else setUserData(userData);
  }, [navigate]);

  return userData;
};

export default useAuth;
