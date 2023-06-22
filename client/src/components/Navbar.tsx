import { useState } from "react";

const Navbar = () => {
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
      <div className="pr-8 md:block">
        <a
          href="/user/register"
          className="p-4 hover:text-gray-500 transition duration-300 ease-in"
        >
          Register
        </a>
        <a
          href="/user/login"
          className="p-4 hover:text-gray-500 transition duration-300 ease-in"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
