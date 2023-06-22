import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </form>
      <p>
        New user?{" "}
        <Link to={"/user/register"} className="hover:underline text-blue-500">
          Register
        </Link>
      </p>
    </>
  );
};

export default UserLogin;
