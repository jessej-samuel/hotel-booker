import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import './App.css';

function App() {
  return (
    <div>
      <Toaster />
      <Navbar/>
      <Outlet />

    </div>
    
  );
}

export default App;
