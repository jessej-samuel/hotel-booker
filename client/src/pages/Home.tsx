import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../assets/roomreserve-low-resolution-logo-color-on-transparent-background.png'

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData.type) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, []);

  const trendingDestinations = [
    {
      id: 1,
      name: "Chennai",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Chennai_-_bird%27s-eye_view.jpg", 
    },
    {
      id: 2,
      name: "Mumbai",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fHww&w=1000&q=80", 
    },
    {
      id: 3,
      name: "Ooty",
      image: "https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp", 
    },
    {
      id: 4,
      name: "Kodaikanal",
      image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kodaikanal-1655279477_0cdce0d4e58596e4fb33.webp", 
    },
    {
      id: 5,
      name: "Pondichery",
      image: "https://thumbs.dreamstime.com/b/pondicherry-has-beautiful-coast-india-famous-unexplored-beaches-beautiful-coastline-india-123124828.jpg", 
    },
    {
      id: 6,
      name: "Mamallapuram",
      image: "https://www.tripsavvy.com/thmb/yZuvI0lUakLLJ4QxgbAwtglMEyg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-579760012-b78004a355354623924eda63842ac3a9.jpg", 
    },
    // Add more destinations as needed
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={logo} alt="Logo" className="w-49 h-auto max-w-full" />
        <br />
        <p className="text-xl text-gray-600 text-center">Your Perfect Stay, Just a Click Away</p>
      </motion.div>
      <br />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4">
          <Link
            className="w-full max-w-xs bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
            to={"/user/login"}
          >
            Get Started
          </Link>
        </div>
      </motion.div>
      <br />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trending Destinations</h2>
        <div className="grid grid-cols-3 gap-4">
          {trendingDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to={`/user/login`}>
                <div className="bg-white rounded shadow-md p-4">
                  <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover mb-2" />
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <footer className="mt-auto py-4">
        <div className="text-center">
          <Link className="text-blue-500 hover:text-blue-700 mr-4 border border-primary" to={"/hotel/login"}>
            List your property
          </Link>
          <br />
          <span>&copy; {new Date().getFullYear()} RoomReserve. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
