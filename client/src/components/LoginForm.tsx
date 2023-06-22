import { useState } from "react";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: any) => {
    setData({ ...data, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setData({ ...data, password: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">HotelBooker</h1>
      <form className="h-64 flex flex-col max-w-md" onSubmit={handleFormSubmit}>
        <label className="flex flex-col items-start justify-between  font-medium mb-4">
          Email
          <input
            className="font-normal w-64 text-sm p-2 border border-gray-500 rounded "
            type="text"
            name="email"
            onChange={handleEmailChange}
            value={data.email}
          />
        </label>
        <label className="flex flex-col items-start  justify-between font-medium   mb-4">
          Password
          <input
            className="font-normal text-sm w-64 p-2 border border-gray-500 rounded "
            type="text"
            name="password"
            onChange={handlePasswordChange}
            value={data.password}
          />
        </label>
        <input
          className="p-2 border border-gray-300 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded cursor-pointer"
          type="submit"
          value="Login/Register"
        />
      </form>
    </div>
  );
};

export default LoginForm;
