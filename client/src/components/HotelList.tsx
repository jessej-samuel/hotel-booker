import { useEffect, useState } from "react";
import ServerAPI from "../api/ServerAPI";
import { useNavigate } from "react-router-dom";

interface HotelType {
  name: string;
  location: string;
  imageLink: string;
  id: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  useEffect(() => {
    ServerAPI.get("/hotel").then((res) => setHotels(res.data));
  }, []);

  return (
    <div className="flex">
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

const HotelCard = ({ name, location, imageLink, id }: HotelType) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/hotels/" + id);
  };
  return (
    <div className="max-w-xs p-1 transition-all cursor-default">
      <img
        src={imageLink}
        alt="Hotel Image"
        className="rounded saturate-0 hover:saturate-100 transition-all duration-500 group-hover:scale-105 hover:shadow"
      />
      <div className="flex justify-between items-center">
        <div>
          <p className="mt-2 text-lg ">{name}</p>
          <p className="text-gray-500 text-xs font-medium uppercase">
            {location}
          </p>
        </div>
        <button
          className="bg-blue-600 px-2 py-2 text-white hover:bg-blue-500 rounded hover:shadow"
          onClick={handleBookClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelList;
