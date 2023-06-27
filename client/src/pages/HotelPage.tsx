import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAuth from "../utils/hooks";
import { HotelMetaData, RoomAvailabilityType } from "../utils/types";

const HotelPage = () => {
  const userData = useAuth();
  const { id } = useParams();

  const [total, setTotal] = useState(0);
  const [roomAvailability, setRoomAvailability] = useState({
    K: 0,
    KAC: 0,
    D: 0,
    DAC: 0,
    S: 0,
    SAC: 0,
  } as RoomAvailabilityType);
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [hotelMetaData, setHotelMetaData] = useState({
    _id: "",
    name: "",
    location: "",
    email: "",
    password: "",
    K: {
      count: 0,
      cost: 0,
      _id: "",
    },
    KAC: {
      count: 0,
      cost: 0,
      _id: "",
    },
    D: {
      count: 0,
      cost: 0,
      _id: "",
    },
    DAC: {
      count: 0,
      cost: 0,
      _id: "",
    },
    S: {
      count: 0,
      cost: 0,
      _id: "",
    },
    SAC: {
      count: 0,
      cost: 0,
      _id: "",
    },
    createdAt: "2023-06-22T10:11:59.417Z",
    updatedAt: "2023-06-22T10:11:59.417Z",
    __v: 0,
  } as HotelMetaData);

  const [ableToBook, setAbleToBook] = useState(true);

  const [orderDetails, setOrderDetails] = useState({
    userId: "",
    username: "",
    hotelId: "",
    from: new Date().toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    K: {
      count: 0,
    },
    KAC: {
      count: 0,
    },
    D: {
      count: 0,
    },
    DAC: {
      count: 0,
    },
    S: {
      count: 0,
    },
    SAC: {
      count: 0,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    ServerAPI.get(`/hotel/${id}`).then((response) => {
      setHotelMetaData(response.data);
      console.log("Hotel Metadata", response.data);
      setOrderDetails((prev) => ({
        ...prev,
        hotelId: response.data._id,
      }));
    });
  }, [id]);

  useEffect(() => {
    ServerAPI.get(`/hotel/${id}/availability`, {
      params: {
        from,
        to,
      },
    }).then((response) => {
      console.log("Room Availabilty", response.data);
      setRoomAvailability(response.data);
    });
  }, [id, from, to]);

  // Update total cost on room count change
  useEffect(() => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    console.log("From", fromDate);
    console.log("To", toDate);
    const diff = toDate.getTime() - fromDate.getTime();
    console.log("Diff", diff);
    const days = diff / (1000 * 3600 * 24);
    let total = 0;
    total += orderDetails.K.count * hotelMetaData.K.cost * days;
    total += orderDetails.KAC.count * hotelMetaData.KAC.cost * days;
    total += orderDetails.D.count * hotelMetaData.D.cost * days;
    total += orderDetails.DAC.count * hotelMetaData.DAC.cost * days;
    total += orderDetails.S.count * hotelMetaData.S.cost * days;
    total += orderDetails.SAC.count * hotelMetaData.SAC.cost * days;
    console.log("Total", total);
    console.log("Days", days);
    console.log("Order Details", orderDetails);

    setTotal(total);
  }, [orderDetails, hotelMetaData, from, to]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value <= from) {
      alert("Please select a date after the start date");
      setTo(
        // set to date to next day of from
        new Date(new Date(from).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    } else setTo(e.target.value);
  };

  const handleBookNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAbleToBook(false);
    const orderData = {
      ...orderDetails,
      userId: userData._id,
      userName: userData.name,
      hotelId: id,
      fromDate: from,
      toDate: to,
    };

    ServerAPI.post(`/order/${hotelMetaData._id}`, orderData)
      .then((response) => {
        console.log(response.data);
        setAbleToBook(true);
        alert("Order Placed Successfully");
      })
      .catch((err) => {
        console.log(err);
        setAbleToBook(true);
        alert("Order Placed Failed");
      });
  };

  const handleOrderCountChange = (
    e: { target: { value: string } },
    key: string
  ) => {
    console.log(e.target.value);
    const newValue = parseInt(e.target.value);
    const maxValue = roomAvailability[key] || 0;
    if (newValue >= 0 && newValue <= maxValue) {
      setOrderDetails({
        ...orderDetails,
        [key]: { count: parseInt(e.target.value) },
      });
    } else if (
      newValue === undefined ||
      newValue === null ||
      e.target.value === ""
    ) {
      setOrderDetails({
        ...orderDetails,
        [key]: { count: 0 },
      });
    }
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
      <p className="mt-2"></p>
      <h1 className="text-2xl font-bold my-4">Book a Room</h1>
      <div className="flex justify-between items-end">
        <form className="w-96" ref={formRef}>
          <div className="flex flex-col mt-4">
            <label className="text-sm mb-2 text-gray-600 uppercase font-medium">
              Check In
            </label>
            <input
              type="date"
              value={from}
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
              value={to}
              defaultValue={to}
              onChange={handleToChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col mt-4">
            <table>
              <thead>
                <tr>
                  <th className="pb-3 text-left text-sm uppercase font-medium">
                    Room Type
                  </th>
                  <th className="pb-3 font-medium text-sm uppercase text-right">
                    Cost
                  </th>
                  <th className="pb-3 text-right text-sm uppercase font-medium">
                    Available
                  </th>
                  <th className="pb-3 text-right text-sm uppercase font-medium">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Single (1 bed)</td>
                  <td className="text-right">{hotelMetaData.S.cost}</td>
                  <td className="text-right">{roomAvailability.S}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="S"
                      max={roomAvailability.S}
                      value={orderDetails.S.count}
                      onChange={(e) => handleOrderCountChange(e, "S")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Single AC (1 bed)</td>
                  <td className="text-right">{hotelMetaData.SAC.cost}</td>
                  <td className="text-right">{roomAvailability.SAC}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="SAC"
                      max={roomAvailability.SAC}
                      value={orderDetails.SAC.count}
                      onChange={(e) => handleOrderCountChange(e, "SAC")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Double (2 beds)</td>
                  <td className="text-right">{hotelMetaData.D.cost}</td>
                  <td className="text-right">{roomAvailability.D}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="D"
                      max={roomAvailability.D}
                      value={orderDetails.D.count}
                      onChange={(e) => handleOrderCountChange(e, "D")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Double AC (2 beds)</td>
                  <td className="text-right">{hotelMetaData.DAC.cost}</td>
                  <td className="text-right">{roomAvailability.DAC}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="DAC"
                      max={roomAvailability.DAC}
                      value={orderDetails.DAC.count}
                      onChange={(e) => handleOrderCountChange(e, "DAC")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">King (4 beds)</td>
                  <td className="text-right">{hotelMetaData.K.cost}</td>
                  <td className="text-right">{roomAvailability.K}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="K"
                      max={roomAvailability.K}
                      value={orderDetails.K.count}
                      onChange={(e) => handleOrderCountChange(e, "K")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-left">King AC (4 beds)</td>
                  <td className="text-right">{hotelMetaData.KAC.cost}</td>
                  <td className="text-right">{roomAvailability.KAC}</td>
                  <td className="text-right">
                    <input
                      type="number"
                      min="0"
                      name="KAC"
                      max={roomAvailability.KAC}
                      value={orderDetails.KAC.count}
                      onChange={(e) => handleOrderCountChange(e, "KAC")}
                      className="w-24 border p-2 rounded-md out-of-range:border-red-500 out-of-range:border-2 out-of-range:focus:outline-red-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <div className="flex items-baseline gap-x-4">
          <p className="font-semibold text-2xl text-right">${total}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={handleBookNowClick}
            disabled={total === 0 || !ableToBook}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
