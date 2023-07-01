import { OrderAdminType } from "../utils/types";
import ServerAPI from "../api/ServerAPI";
import { useEffect, useState } from "react";
import useAuth from "../utils/hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import ReactModal from "react-modal";

const AdminDashboard = () => {
  const userData = useAuth();
  const [orders, setOrders] = useState([] as OrderAdminType[]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("" as string);

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
        ? (rooms += `${order.S.count}S`)
        : (rooms += `+ ${order.S.count}S`);
    }
    if (order.DAC.count > 0) {
      orderTotal += order.DAC.count * order.hotelId.DAC.cost;
      rooms === ""
        ? (rooms += `${order.DAC.count}DAC`)
        : (rooms += `+ ${order.DAC.count}DAC`);
    }
    if (order.KAC.count > 0) {
      orderTotal += order.KAC.count * order.hotelId.KAC.cost;
      rooms === ""
        ? (rooms += `${order.KAC.count}KAC`)
        : (rooms += `+ ${order.KAC.count}KAC`);
    }
    if (order.SAC.count > 0) {
      orderTotal += order.SAC.count * order.hotelId.SAC.cost;
      rooms === ""
        ? (rooms += `${order.SAC.count}SAC`)
        : (rooms += `+ ${order.SAC.count}SAC`);
    }
    const diff = Math.abs(
      new Date(order.toDate).getTime() - new Date(order.fromDate).getTime()
    );
    orderTotal = Math.ceil(diff / (1000 * 60 * 60 * 24)) * orderTotal;
    return { roomString: rooms, total: orderTotal };
  };

  const handleDeleteOrder = (orderId: string) => {
    setShowModal(true);
    setSelectedOrder(orderId);
  };

  const handleConfirmDelete = () => {
    ServerAPI.delete(`order/${selectedOrder}/delete`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Order deleted successfully");
          setOrders(orders.filter((order) => order._id !== selectedOrder));
        }
      })
      .catch((err) => {
        toast.error("Error deleting order");
      });
    setShowModal(false);
  };

  return (
    <div className="max-w-2xl  mx-auto flex items-center flex-col min-h-[90vh]">
      <h1 className="my-4 font-semibold text-lg uppercase">
        Orders in your hotel
      </h1>
      <div className="p-1 border w-fit rounded">
        <table className="table-auto border-collapse">
          <thead className="px-3 py-3 border-b">
            <tr className="px-3 py-3">
              <th className="px-3 py-3 font-medium"> </th>
              <th className="px-3 py-3 font-medium">User</th>
              <th className="px-3 py-3 font-medium">Check In</th>
              <th className="px-3 py-3 font-medium">Check Out</th>
              <th className="px-3 py-3 font-medium">Room Types</th>
              <th className="px-3 py-3 font-medium text-right">Total</th>
              <th className="px-3 py-3 font-medium"> </th>
              <th className="px-3 py-3 font-medium"> </th>
            </tr>
          </thead>
          <tbody className="px-3 py-3">
            {orders.length === 0 ? (
              <tr className="px-3 py-3">
                <td className="px-3 py-3 text-center">No orders yet</td>
              </tr>
            ) : null}
            {orders.map((order, index) => (
              <tr key={order._id} className="px-3 py-3">
                <td className="px-3 py-3">{index + 1}</td>
                <td className="px-3 py-3">{order.userName}</td>
                <td className="px-3 py-3">{order.fromDate.slice(0, 10)}</td>
                <td className="px-3 py-3">{order.toDate.slice(0, 10)}</td>
                <td className="px-3 py-3 text-right">
                  {roomsRegisteredString(order).roomString}
                </td>
                <td className="px-3 py-3 text-right">
                  ${roomsRegisteredString(order).total}
                </td>
                <td>
                  <button
                    className="px-3 py-3 text-red-600 bg-transparent text-sm hover:text-white rounded hover:bg-red-500"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>
                  <button
                    className="px-3 py-3 text-blue-600 bg-transparent text-lg hover:text-white rounded hover:bg-blue-500"
                    // onClick={() => handleDeleteOrder(order._id)}
                  >
                    <FaEdit />
                    <ReactModal
                      isOpen={showModal}
                      onRequestClose={() => setShowModal(false)}
                      className="top-1/2 fixed left-1/2 z-[51] p-10 min-w-fit min-h-fit flex flex-col justify-center items-center bg-red-600 text-white  rounded-lg shadow-lg outline-none -translate-x-1/2 -translate-y-1/2 gap-y-6"
                    >
                      <p className="font-semibold">
                        You really want to delete? 👀
                      </p>
                      <button
                        className="bg-white text-red-600 w-full rounded py-2 font-normal hover:shadow hover:bg-neutral-150"
                        onClick={handleConfirmDelete}
                      >
                        Confirm
                      </button>
                    </ReactModal>
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
