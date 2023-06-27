import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    _id: "juj",
    name: "",
  });

  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem("userData") || "{}") || undefined;
    const path = window.location.pathname;

    console.log({ userData, path });

    if (path === "/hotel/login" && userData.type === "hotel")
      navigate("/dashboard");
    else if (path === "/user/login" && userData.type === "user")
      navigate("/dashboard");
    if (!userData) navigate("/");
    else if (path === "/") navigate("/dashboard");
    else setUserData(userData);
  }, [navigate]);

  return userData;
};

export default useAuth;
