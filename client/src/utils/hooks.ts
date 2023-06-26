import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) navigate("/");
  }, [navigate]);
};

export default useAuth;
