import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ServerAPI from "../api/ServerAPI";

const sampleData = {
  double_cost: "100",
  double_count: "0",
  doubleac_cost: "100",
  doubleac_count: "0",
  email: "1234jessej@gmail.com",
  king_cost: "100",
  king_count: "0",
  kingac_cost: "100",
  kingac_count: "0",
  location: "Chennai",
  name: "Jessej Nathanael Samuel",
  password: "",
  single_cost: "100",
  single_count: "0",
  singleac_cost: "100",
  singleac_count: "0",
};

const formatData = (data: typeof sampleData) => {
  const { name, location, email, password } = data;
  const K = {
    count: data.king_count,
    cost: data.king_cost,
  };
  const KAC = {
    count: data.kingac_count,
    cost: data.kingac_cost,
  };
  const D = {
    count: data.double_count,
    cost: data.double_cost,
  };
  const DAC = {
    count: data.doubleac_count,
    cost: data.doubleac_cost,
  };
  const S = {
    count: data.single_count,
    cost: data.single_cost,
  };
  const SAC = {
    count: data.singleac_count,
    cost: data.singleac_cost,
  };
  return {
    name,
    location,
    email,
    password,
    K,
    KAC,
    D,
    DAC,
    S,
    SAC,
  };
};

const HotelRegister = () => {
  const formRef = useRef(null);
  useEffect(() => {
    document.title = "Hotel Register";
  }, []);
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <form
        className="min-w-fit w-64 mx-auto"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          formRef.current
            ? ServerAPI.post(
                "/auth/hotel/register",
                formatData(
                  Object.fromEntries(
                    new FormData(formRef.current)
                  ) as typeof sampleData
                )
              ) // post this data to the server
            : null;
        }}
      >
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-sm" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-sm" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-sm" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-sm" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        {/* Get cost and count for [king, kingac, double, doubleac, single, singlec ] */}
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">King</p>
          <label className="font-semibold text-sm" htmlFor="king_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="king_count"
            id="king_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="king_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="king_cost"
            id="king_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">King AC</p>
          <label className="font-semibold text-sm" htmlFor="kingac_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="kingac_count"
            id="kingac_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="kingac_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="kingac_cost"
            id="kingac_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">Double</p>
          <label className="font-semibold text-sm" htmlFor="double_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="double_count"
            id="double_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="double_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="double_cost"
            id="double_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">
            Double AC
          </p>
          <label className="font-semibold text-sm" htmlFor="doubleac_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="doubleac_count"
            id="doubleac_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="doubleac_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="doubleac_cost"
            id="doubleac_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">Single</p>
          <label className="font-semibold text-sm" htmlFor="single_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="single_count"
            id="single_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="single_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="single_cost"
            id="single_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <div className="flex flex-row gap-2 mb-3 items-center">
          <p className="text-base pr-2 border-r-2 border-black w-24">
            Single AC
          </p>
          <label className="font-semibold text-sm" htmlFor="singleac_count">
            Count
          </label>
          <input
            type="number"
            defaultValue={0}
            name="singleac_count"
            id="singleac_count"
            className="p-2 rounded-sm font-normal text-sm border"
          />
          <label className="font-semibold text-sm" htmlFor="singleac_cost">
            Cost
          </label>
          <input
            type="number"
            defaultValue={100}
            name="singleac_cost"
            id="singleac_cost"
            className="p-2 rounded-sm font-normal text-sm border"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="p-2 w-full rounded-sm font-semibold text-sm bg-blue-500 text-white"
        />
      </form>
      <p className="w-fit mx-auto text-sm">
        Already have an account?{" "}
        <Link to={"/hotel/login"} className="hover:underline text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default HotelRegister;
