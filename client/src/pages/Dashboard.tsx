import { useEffect, useState } from "react";
import HotelList from "../components/HotelList";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
    username: "",
  });
  useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setUserData(
      JSON.parse(localStorage.getItem("userData") || navigate("/") || "{}")
    );
  }, []);
  return (
    <div className="mt-8 px-6 min-h-[90vh]">
      <h1 className="text-4xl font-bold mb-4">
        Hello {userData.name || userData.username.split(" ")[0]}!
      </h1>
      <HotelList />
    </div>
  );
};

export default Dashboard;
