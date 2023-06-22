import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [who, setWho] = useState("user");
  useEffect(() => {
    window.location.pathname.split("/")[1] === "user"
      ? setWho("user")
      : setWho("hotel");
  }, []);

  return (
    <div className="min-h-screen flex justify-center flex-col">
      <form className="min-w-fit w-64 mx-auto">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="text-center w-full p-2 mb-8 bg-blue-600 hover:bg-blue-500 rounded-sm"
        />
      </form>
      <p className="w-fit mx-auto">
        New {who}?{" "}
        <Link
          to={"/" + who + "/register"}
          className="hover:underline text-blue-500"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
