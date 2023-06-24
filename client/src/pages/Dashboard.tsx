import { useEffect, useState } from "react";
import HotelList from "../components/HotelList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setUserData(
      JSON.parse(localStorage.getItem("userData") || navigate("/") || "{}")
    );
  }, []);
  return (
    <div className="mt-8 px-6">
      <h1 className="text-4xl font-bold mb-4">Hello {userData.name}!</h1>
      <HotelList />
    </div>
  );
};

export default Dashboard;
