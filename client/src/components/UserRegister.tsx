import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";
import toast from "react-hot-toast";

const UserRegister = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // post data to server
    ServerAPI.post("/auth/user/register", data)
      .then((res) => {
        if (res.data.success) {
          toast.success("User registered successfully!");
          navigate("/user/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <form
        ref={formRef}
        className="min-w-fit w-64 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            id="username"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
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
          value="Register"
          className="w-full text-white p-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 rounded-sm mb-8"
        />
      </form>
      <p className="w-fit mx-auto">
        Already have an account?{" "}
        <Link to={"/user/login"} className="hover:underline text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default UserRegister;
