import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HotelPage = () => {
  const { id } = useParams();
  const [hotelMetaData, setHotelMetaData] = useState({
    _id: "64941e6f5077923fadc8beb4",
    name: "Dani",
    location: "Atlantis",
    email: "dani@gmail.com",
    password: "dani",
    K: {
      count: 10,
      cost: 1000,
      _id: "64941e6f5077923fadc8beb5",
    },
    KAC: {
      count: 0,
      cost: 0,
      _id: "64941e6f5077923fadc8beaf",
    },
    D: {
      count: 0,
      cost: 0,
      _id: "64941e6f5077923fadc8beb0",
    },
    DAC: {
      count: 0,
      cost: 0,
      _id: "64941e6f5077923fadc8beb1",
    },
    S: {
      count: 0,
      cost: 0,
      _id: "64941e6f5077923fadc8beb2",
    },
    SAC: {
      count: 0,
      cost: 0,
      _id: "64941e6f5077923fadc8beb3",
    },
    createdAt: "2023-06-22T10:11:59.417Z",
    updatedAt: "2023-06-22T10:11:59.417Z",
    __v: 0,
  });

  useEffect(() => {
    ServerAPI.get(`/hotel/${id}`).then((response) => {
      setHotelMetaData(response.data);
    });
  }, [id]);

  return (
    <div className="mx-auto my-5 px-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{hotelMetaData.name}</h1>
      <p className="text-sm text-gray-600 uppercase font-medium">
        {hotelMetaData.location}
      </p>
      <Carousel
        className="max-w-md mx-auto my-8"
        infiniteLoop
        autoPlay
        autoFocus
        showArrows={false}
      >
        <div className="rounded">
          <img src="https://images.unsplash.com/photo-1679678690998-88c8711cbe5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" />
        </div>
        <div className="rounded">
          <img src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" />
        </div>
        <div className="rounded">
          <img src="https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" />
        </div>
        <div className="rounded">
          <img src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" />
        </div>
      </Carousel>
      <p className="description">
        Located in {hotelMetaData.location}, {hotelMetaData.name} is a perfect
        starting point from which to explore Atlantis. The property offers a
        high standard of service and amenities to suit the individual needs of
        all travelers. Service-minded staff will welcome and guide you at{" "}
        {hotelMetaData.name}. Guestrooms are fitted with all the amenities you
        need for a good night's sleep. In some of the rooms, guests can find
        flat screen television, clothes rack, linens, towels, closet. The
        property offers various recreational opportunities. {hotelMetaData.name}{" "}
        combines warm hospitality with a lovely ambiance to make your stay in
        Atlantis unforgettable.
      </p>
    </div>
  );
};

export default HotelPage;
