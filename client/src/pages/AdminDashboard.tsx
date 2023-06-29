import { Link } from "react-router-dom";
import { OrderAdminType } from "../utils/types";
import ServerAPI from "../api/ServerAPI";
import { useEffect, useState } from "react";
import useAuth from "../utils/hooks";
import { FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const userData = useAuth();
  const [orders, setOrders] = useState([] as OrderAdminType[]);

  useEffect(() => {
    ServerAPI.get(`hotel/${userData._id}/orders`).then((res) => {
      setOrders(res.data);
    });
  }, [userData._id]);
  const roomsRegisteredString = (order: OrderAdminType) => {
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
    const diff = Math.abs(
      new Date(order.toDate).getTime() - new Date(order.fromDate).getTime()
    );
    orderTotal = Math.round((orderTotal + Number.EPSILON) * 100) / 100;
    return { roomString: rooms, total: orderTotal };
  };
  return (
    <div className="max-w-2xl  mx-auto flex items-center flex-col min-h-[90vh]">
      <h1 className="my-4 font-semibold text-lg uppercase">
        Orders in your hotel
      </h1>
      <div className="p-1 border w-fit rounded">
        <table className="table-auto border-collapse">
          <thead className="px-3 py-1.5 border-b">
            <tr className="px-3 py-1.5">
              <th className="px-3 py-1.5 font-medium"> </th>
              <th className="px-3 py-1.5 font-medium">User</th>
              <th className="px-3 py-1.5 font-medium">Check In</th>
              <th className="px-3 py-1.5 font-medium">Check Out</th>
              <th className="px-3 py-1.5 font-medium">Room Types</th>
              <th className="px-3 py-1.5 font-medium text-right">Total</th>
              <th className="px-3 py-1.5 font-medium"> </th>
            </tr>
          </thead>
          <tbody className="px-3 py-1.5">
            {orders.map((order, index) => (
              <tr key={order._id} className="px-3 py-1.5">
                <td className="px-3 py-1.5">{index + 1}</td>
                <td className="px-3 py-1.5">{order.userName}</td>
                <td className="px-3 py-1.5">{order.fromDate.slice(0, 10)}</td>
                <td className="px-3 py-1.5">{order.toDate.slice(0, 10)}</td>
                <td className="px-3 py-1.5 text-right">
                  {roomsRegisteredString(order).roomString}
                </td>
                <td className="px-3 py-1.5 text-right">
                  ${roomsRegisteredString(order).total}
                </td>
                <td>
                  <button className="px-3 py-1.5 text-red-600 bg-transparent text-sm hover:text-white rounded hover:bg-red-500">
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

export default AdminDashboard;
