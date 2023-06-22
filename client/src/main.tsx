import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import HomePage from "./pages/Home.tsx";
import UserLogin from "./components/UserLogin.tsx";
import UserRegister from "./components/UserRegister.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found haha</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/user/login",
        element: <UserLogin />,
      },
      {
        path: "/user/register",
        element: <UserRegister />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
