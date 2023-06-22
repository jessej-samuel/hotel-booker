import { Link } from "react-router-dom";

const UserRegister = () => {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <form className="min-w-fit w-64 mx-auto">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
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
