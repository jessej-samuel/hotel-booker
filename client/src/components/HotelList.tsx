import { useEffect, useState } from "react";
import ServerAPI from "../api/ServerAPI";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks";

interface HotelType {
  name: string;
  location: string;
  imageLink: string;
  id: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const user = useAuth();
  useEffect(() => {
    ServerAPI.get("/hotel").then((res) => setHotels(res.data));
  }, []);
  if (user.type === "user")
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 xl:grid-cols-4 w-full place-items-center grid-flow-row mt-8">
        {hotels.map((hotel: HotelType) => (
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
    );
};
return <AdminDashboard />;

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
