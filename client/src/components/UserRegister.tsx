import { Link } from "react-router-dom";

const UserRegister = () => {
  return (
    <>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password">Confirm Password</label>
        <input type="password" name="password" id="password" />
      </form>
      <p>
        Already a user? <Link className="hover:underline text-blue-500" to={"/user/login"}>Login</Link>
      </p>
    </>
  );
};

export default UserRegister;
