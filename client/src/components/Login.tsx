import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";
import useAuth from "../utils/hooks";

const Login = () => {
  const [who, setWho] = useState("user");
  useAuth();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.location.pathname.split("/")[1] === "user"
      ? setWho("user")
      : setWho("hotel");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ServerAPI.post("/auth/" + who + "/login", userData)
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...res.data, type: who })
        );
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex justify-center flex-col">
      <form className="min-w-fit w-64 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="text-white text-center w-full p-2 mb-8 bg-blue-600 hover:bg-blue-500 rounded-sm"
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
