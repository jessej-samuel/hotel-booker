import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  const renderNavLinks = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (localStorage.getItem("userData"))
      return (
        <div
          onMouseLeave={() => {
            if (showLogout) setShowLogout(false);
          }}
        >
          <div
            className="flex items-center gap-x-3 cursor-pointer "
            onClick={() => setShowLogout((s) => !s)}
          >
            <p onSelect={(e) => e.preventDefault()}>{userData.name}</p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7UbmM2x9QWw6Sga9Cc4x2INxD5MwiyhvxjWNKjuyxz3gAwcjM1kLab-vRfsmypHx1JE&usqp=CAU"
              className="aspect-square w-10 rounded-full"
            />
          </div>
          <div
            className="absolute bg-white right-0 px-4 py-2 rounded-md border text-red-500 hover:bg-red-500 hover:text-white hover cursor-pointer z-10 transition-all"
            hidden={!showLogout}
            onClick={logout}
          >
            Logout
          </div>
        </div>
      );
    return (
      <div className="pr-8 md:block">
        <a
          href="/hotel/login"
          className="p-4 hover:text-blue-500 transition duration-300 ease-in"
        >
          Hotel Login
        </a>
        <a
          href="/user/login"
          className="p-4 hover:text-blue-500 transition duration-300 ease-in"
        >
          User Login
        </a>
      </div>
    );
  };
  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black relative border-b shadow-sm font-mono">
      <a href="/" className="pl-8">
        Hotel Booking
      </a>
      <div className="px-4 cursor-pointer hidden">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      {renderNavLinks()}
    </nav>
  );
};

export default Navbar;
