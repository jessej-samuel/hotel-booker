import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData.type)
      navigate("/dashboard", {
        replace: true,
      });
  }, []);

  return (
    <div className="max-w-md mx-auto h-96 flex flex-col gap-8 justify-center items-center transition-all ">
      <Link
        className="w-full bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded text-center"
        to={"/hotel/login"}
      >
        Hotel Login{" "}
      </Link>
      <Link
        className="w-full bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded text-center"
        to={"/user/login"}
      >
        User Login
      </Link>
    </div>
  );
};

export default HomePage;
