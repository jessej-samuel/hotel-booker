import { useEffect, useState } from "react";
import useAuth from "../utils/hooks";
import ServerAPI from "../api/ServerAPI";
import { OrderType } from "../utils/types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const OrderHistoryPage = () => {
  const userData = useAuth();
  const [orders, setOrders] = useState([] as OrderType[]);

  useEffect(() => {
    ServerAPI.get(`user/${userData._id}/orders`).then((res) => {
      setOrders(res.data);
    });
  }, [userData._id]);

  const roomsRegisteredString = (order: OrderType) => {
    let rooms = "";
    let orderTotal = 0;
    if (order.D.count > 0) {
      orderTotal += order.D.count * order.hotelId.D.cost;
      rooms === ""
        ? (rooms += `${order.D.count}D`)
        : (rooms += `+ ${order.D.count}D`);
    }
    if (order.K.count > 0) {
      orderTotal += order.K.count * order.hotelId.K.cost;
      rooms === ""
        ? (rooms += `${order.K.count}K`)
        : (rooms += `+ ${order.K.count}K`);
    }
    if (order.S.count > 0) {
      orderTotal += order.S.count * order.hotelId.S.cost;
      rooms === ""
        ? (rooms += `${order.S.count}Q`)
        : (rooms += `+ ${order.S.count}Q`);
    }
    if (order.DAC.count > 0) {
      orderTotal += order.DAC.count * order.hotelId.DAC.cost;
      rooms === ""
        ? (rooms += `${order.DAC.count}S`)
        : (rooms += `+ ${order.DAC.count}S`);
    }
    if (order.KAC.count > 0) {
      orderTotal += order.KAC.count * order.hotelId.KAC.cost;
      rooms === ""
        ? (rooms += `${order.KAC.count}S`)
        : (rooms += `+ ${order.KAC.count}S`);
    }
    if (order.SAC.count > 0) {
      orderTotal += order.SAC.count * order.hotelId.SAC.cost;
      rooms === ""
        ? (rooms += `${order.SAC.count}S`)
        : (rooms += `+ ${order.SAC.count}S`);
    }
    return { roomString: rooms, total: orderTotal };
  };

  return (
    <div className="max-w-2xl  mx-auto flex items-center flex-col min-h-[90vh]">
      <h1 className="my-4 font-semibold text-lg uppercase">Order History</h1>
      <div className="p-1 border w-fit rounded">
        <table className="table-auto border-collapse">
          <thead className="px-3 py-3 border-b">
            <tr className="px-3 py-3">
              <th className="px-3 py-3 font-medium"> </th>
              <th className="px-3 py-3 font-medium">Hotel</th>
              <th className="px-3 py-3 font-medium">Check In</th>
              <th className="px-3 py-3 font-medium">Check Out</th>
              <th className="px-3 py-3 font-medium">Room Types</th>
              <th className="px-3 py-3 font-medium text-right">Total</th>
              <th className="px-3 py-3 font-medium"> </th>
            </tr>
          </thead>
          <tbody className="px-3 py-3">
            {orders.map((order, index) => (
              <tr key={order._id} className="px-3 py-3">
                <td className="px-3 py-3">{index + 1}</td>
                <td className="px-3 py-3">
                  <Link
                    className="hover:text-blue-500 hover:underline"
                    to={"/hotel/" + order.hotelId._id}
                  >
                    {order.hotelId.name}
                  </Link>
                </td>
                <td className="px-3 py-3">{order.fromDate.slice(0, 10)}</td>
                <td className="px-3 py-3">{order.toDate.slice(0, 10)}</td>
                <td className="px-3 py-3 text-right">
                  {roomsRegisteredString(order).roomString}
                </td>
                <td className="px-3 py-3 text-right">
                  ${roomsRegisteredString(order).total}
                </td>
                <td>
                  <button className="px-3 py-3 text-red-600 bg-transparent text-sm hover:text-white rounded hover:bg-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
