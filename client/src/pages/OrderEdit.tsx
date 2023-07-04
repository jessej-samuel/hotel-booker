import { useEffect, useState } from "react";
import { OrderType } from "../utils/types";
import ServerAPI from "../api/ServerAPI";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../utils/hooks";
import toast from "react-hot-toast";

const OrderEdit = () => {
  const userData = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    fromDate: "",
    toDate: "",
    D: { count: 0 },
    K: { count: 0 },
    S: { count: 0 },
    DAC: { count: 0 },
    KAC: { count: 0 },
    SAC: { count: 0 },
  } as OrderType);
  const [changedStuff, setChangedStuff] = useState({} as OrderType);
  const orderId = useParams<{ orderId: string }>().orderId;

  // fetch order details for initial render
  useEffect(() => {
    // fetch order by id
    ServerAPI.get(`/order/${orderId}`).then((res) => {
      setOrder(res.data);
    });
  }, [orderId]);

  // update order details on save
  const saveOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    ServerAPI.put(`/order/${orderId}/edit`, changedStuff)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Order updated successfully");
          navigate(`/dashboard`);
        } else {
          toast.error("Could not update order");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
        Change your order
      </h1>
      <form className="space-y-4 mb-4 max-w-fit">
        <div className="flex gap-x-8">
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm uppercase font-medium text-gray-600"
              htmlFor="fromDate"
            >
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              onChange={(e) => {
                setChangedStuff({
                  ...changedStuff,
                  fromDate: e.target.value,
                });
                setOrder({
                  ...order,
                  fromDate: e.target.value,
                });
              }}
              value={order.fromDate.split("T")[0]}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm uppercase font-medium text-gray-600"
              htmlFor="toDate"
            >
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              id="toDate"
              onChange={(e) => {
                setChangedStuff({
                  ...changedStuff,
                  toDate: e.target.value,
                });
                setOrder({
                  ...order,
                  toDate: e.target.value,
                });
              }}
              value={order.toDate.split("T")[0]}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="D"
          >
            Double Non-AC (2 bed)
          </label>
          <input
            type="number"
            name="D"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                D: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                D: { count: parseInt(e.target.value) },
              });
            }}
            id="D"
            value={order.D.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="K"
          >
            King Non-AC (4 bed)
          </label>
          <input
            type="number"
            name="K"
            id="K"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                K: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                K: { count: parseInt(e.target.value) },
              });
            }}
            value={order.K.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="S"
          >
            Single Non-AC (1 bed)
          </label>
          <input
            type="number"
            name="S"
            id="S"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                S: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                S: { count: parseInt(e.target.value) },
              });
            }}
            value={order.S.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="DAC"
          >
            Double AC (2 bed)
          </label>
          <input
            type="number"
            name="DAC"
            id="DAC"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                DAC: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                DAC: { count: parseInt(e.target.value) },
              });
            }}
            value={order.DAC.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="KAC"
          >
            King AC (4 bed)
          </label>
          <input
            type="number"
            name="KAC"
            id="KAC"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                KAC: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                KAC: { count: parseInt(e.target.value) },
              });
            }}
            value={order.KAC.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm uppercase font-medium text-gray-600"
            htmlFor="SAC"
          >
            Single AC (1 bed)
          </label>
          <input
            type="number"
            name="SAC"
            onChange={(e) => {
              setChangedStuff({
                ...changedStuff,
                SAC: { count: parseInt(e.target.value) },
              });
              setOrder({
                ...order,
                SAC: { count: parseInt(e.target.value) },
              });
            }}
            id="SAC"
            value={order.SAC.count}
            className="border border-gray-300 rounded px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex flex-row space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={(e) => saveOrder(e)}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (userData.type === "hotel") navigate("/dashboard");
              else if (userData.type === "user") navigate("/orders");
              else navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderEdit;
