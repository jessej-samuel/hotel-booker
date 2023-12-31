import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/roomreserve-low-resolution-logo-color-on-transparent-background.png";
import "./navbar.css";
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("");
  };

  const renderNavLinks = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (localStorage.getItem("userData"))
      return (
        <div
          onMouseLeave={() => {
            if (showLogout) setShowLogout(false);
          }}
          onMouseEnter={() => {
            if (!showLogout) setShowLogout(true);
          }}
        >
          <div
            className="flex items-center gap-x-3 cursor-pointer "
            onClick={() => setShowLogout((s) => !s)}
          >
            {userData.type === "user" ? (
              <Link to={"/orders"}>Your orders</Link>
            ) : null}
            <p onSelect={(e) => e.preventDefault()}>
              {userData.username || userData.name}
            </p>
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
            <BiLogOut className="inline-block mr-2" />
            Logout
          </div>
        </div>
      );
    return (
      <div className="pr-8 md:block">
        <Link
          to="/hotel/login"
          className="p-4 hover:text-blue-500 transition duration-300 ease-in"
        >
          Hotel Login
        </Link>
        <Link
          to="/user/login"
          className="p-4 hover:text-blue-500 transition duration-300 ease-in"
        >
          User Login
        </Link>
      </div>
    );
  };
  return (
    <nav className="flex sticky top-0 justify-between items-center h-16 z-50 bg-blue-50 text-black border-b shadow-md font-mono ">
      <a href="/" className="pl-8">
        <img src={logo} alt="logo" className="w-15 h-14 object-contain" />
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
