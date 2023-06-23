interface HotelType {
  name: string;
  location: string;
  imageLink: string;
  _id?: string;
}

type HotelListProps = {
  hotels: HotelType[];
};
const HotelList: React.FC<HotelListProps> = ({ hotels = [] }) => {
  return hotels.map((hotel: HotelType) => (
    <HotelCard
      name={hotel.name}
      location={hotel.location}
      imageLink={hotel.imageLink}
      key={hotel._id}
    />
  ));
};

const HotelCard = ({ name, location, imageLink }: HotelType) => {
  return (
    <div className="max-w-xs p-1 hover:bg-gray-100 transition-all cursor-default">
      <img src={imageLink} alt="Hotel Image" className="rounded" />
      <div className="flex justify-between items-center">
        <div>
          <p className="mt-2 uppercase">{name}</p>
          <p className="text-gray-500 text-sm font-medium">{location}</p>
        </div>
        <button className="bg-blue-600 px-2 py-2 text-white hover:bg-blue-500 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelList;
