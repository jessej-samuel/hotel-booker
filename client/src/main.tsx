import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home.tsx";
import Login from "./components/Login.tsx";
import UserRegister from "./components/UserRegister.tsx";
import HotelRegister from "./components/HotelRegister.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import HotelPage from "./pages/HotelPage.tsx";
import OrderHistoryPage from "./pages/OrderHistory.tsx";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/hotel/login",
        element: <Login />,
      },
      {
        path: "/user/register",
        element: <UserRegister />,
      },
      {
        path: "/hotel/register",
        element: <HotelRegister />,
      },
      {
        path: "/hotel/:id",
        element: <HotelPage />,
      },
      {
        path: "/orders",
        element: <OrderHistoryPage />,
      },
      {
        path: "/order/:orderId/edit",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
