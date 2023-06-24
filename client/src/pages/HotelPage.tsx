import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type HotelMetaData = {
  _id: string;
  name: string;
  location: string;
  email: string;
  password: string;
  K: {
    count: number;
    cost: number;
    _id: string;
  };
  KAC: {
    count: number;
    cost: number;
    _id: string;
  };
  D: {
    count: number;
    cost: number;
    _id: string;
  };
  DAC: {
    count: number;
    cost: number;
    _id: string;
  };
  S: {
    count: number;
    cost: number;
    _id: string;
  };
  SAC: {
    count: number;
    cost: number;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const HotelPage = () => {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [roomType, setRoomType] = useState(
    "K" as "K" | "KAC" | "D" | "DAC" | "S" | "SAC"
  );
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
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
  } as HotelMetaData);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    ServerAPI.get(`/hotel/${id}`).then((response) => {
      setHotelMetaData(response.data);
    });
  }, [id]);

  useEffect(() => {
    if (from && to) {
      const fromTime = new Date(from).getTime();
      const toTime = new Date(to).getTime();
      const diff = toTime - fromTime;
      const days = diff / (1000 * 60 * 60 * 24);
      setTotal(days * hotelMetaData[roomType].cost);
      console.log(total);
    }
  }, [from, to, roomType, total]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value < from) {
      alert("Please select a date after the start date");
      return;
    }
    setTo(e.target.value);
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomType(e.target.value as any);
  };

  const handleBookNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({
      hotelId: id,
      roomType,
      from,
      to,
    });
  };

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
      <h1 className="text-2xl font-bold my-4">Book a Room</h1>
      <div className="flex justify-between items-end">
        <form className="w-96" ref={formRef}>
          <div className="flex flex-col mt-4">
            <label className="text-sm mb-2 text-gray-600 uppercase font-medium">
              Check In
            </label>
            <input
              type="date"
              defaultValue={from}
              onChange={handleFromChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm mb-2 text-gray-600 uppercase font-medium">
              Check Out
            </label>
            <input
              type="date"
              defaultValue={to}
              onChange={handleToChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm mb-2 text-gray-600 uppercase font-medium">
              Room Type
            </label>
            <select
              className="border border-gray-300 rounded-md p-2"
              onChange={handleRoomTypeChange}
            >
              <option value="K">King (${hotelMetaData.K.cost})</option>
              <option value="KAC">
                {" "}
                King with AC (${hotelMetaData.KAC.cost})
              </option>
              <option value="D">Double (${hotelMetaData.D.cost})</option>
              <option value="DAC">
                Double with AC (${hotelMetaData.DAC.cost})
              </option>
              <option value="S">Suite (${hotelMetaData.S.cost})</option>
              <option value="SAC">
                Suite with AC (${hotelMetaData.SAC.cost})
              </option>
            </select>
          </div>
        </form>
        <div className="flex items-baseline gap-x-4">
          <p className="font-semibold text-2xl text-right">${total}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
