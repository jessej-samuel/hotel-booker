import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-white">
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
