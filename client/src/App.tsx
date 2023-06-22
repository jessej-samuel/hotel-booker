import { Outlet } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
const haha = {
  path: "/",
  element: <App />,
  errorElement: <div>Not found haha</div>,
};
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
