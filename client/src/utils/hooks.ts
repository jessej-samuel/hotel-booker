import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    _id: "juj",
    name: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) navigate("/");
    else setUserData(JSON.parse(userData));
  }, [navigate]);

  return userData;
};

export default useAuth;
