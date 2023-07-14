import { useEffect, useState } from "react";
import ServerAPI from "../api/ServerAPI";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks";
import AdminDashboard from "../pages/AdminDashboard";
import { FaSearch } from "react-icons/fa";

interface HotelType {
  name: string;
  location: string;
  imageLink: string;
  id: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    ServerAPI.get("/hotel").then((res) => setHotels(res.data));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (user.type === "user") {
    return (
      <div className="flex flex-col items-center mt-8">
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full max-w-md bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Hotels"
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 xl:grid-cols-4 w-full place-items-center grid-flow-row">
          {filteredHotels.map((hotel: HotelType) => (
            <HotelCard
              name={hotel.name}
              location={hotel.location}
              imageLink={
                hotel.imageLink ||
                "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI="
              }
              key={hotel.id}
              id={hotel.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

const HotelCard = ({ name, location, imageLink, id }: HotelType) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/hotel/" + id);
  };

  return (
    <div className="w-72 p-1 transition-all cursor-default">
      <img
        src={imageLink}
        alt="Hotel Image"
        className="rounded saturate-0 hover:saturate-100 transition-all duration-500 group-hover:scale-105 hover:shadow"
      />
      <div className="flex justify-between items-baseline">
        <div>
          <p className="mt-2 text-lg ">{name}</p>
          <p className="text-gray-500 text-xs font-medium uppercase">
            {location}
          </p>
        </div>
        <button
          className="bg-blue-600 h-fit min-w-[90px] px-2 py-2 text-white hover:bg-blue-500 rounded hover:shadow uppercase text-sm font-semibold"
          onClick={handleBookClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelList;
