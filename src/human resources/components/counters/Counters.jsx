import axios from "axios";
import React, { useEffect, useState } from "react";
import apiAuth from "../../../Atoms/apiAuth";
import { FaUsers, FaUsersSlash } from "react-icons/fa6";
import "./Counters.css";
import { FaUsersCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { FaUsersLine } from "react-icons/fa6";


const Counters = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  useEffect(() => {
      axios
      .get("http://localhost:1813/user/counters", apiAuth(token))
      .then((response) => {
        setData(response.data.data);
      });
  }, []);
  return (
    <div className="grid grid-cols-5 gap-3 py-10  rounded-lg px-2 w-full place-items-center">
      <Counter icon={<FaUsers />} name={"Total Employees"} value={data.employees} />
      <Counter
        icon={<FaUsersGear />}
        name={"Active Employees"}
        value={data.activeEmployees}
      />
      <Counter
        icon={<FaUsersLine />}
        name={"Absent Employees"}
        value={data.absent}
      />
      <Counter icon={<FaUsersCog />} name={"Present Employees"} value={data.working} />
      <Counter
        icon={<FaUsersSlash />}
        name={"Terminated Employees"}
        value={data.terminatedEmployees}
      />
    </div>
  );
};

export default Counters;

export const Counter = ({ value, name, icon }) => {
  return (
    <div className="flex flex-col col-span-1 bg-white w-full shadow items-start gap-3 px-4 py-4 border-2 border-gray-300 rounded-md">
              <span className="text-zinc-600 text-xl font-semibold">
          {name}
        </span>
      <div className="text-center flex items-center gap-3">
        <div className="px-2.5 py-2.5 text-2xl rounded-lg OriginalBackground text-white">
        {icon}
      </div>
        <span className="font-semibold OriginalColor p-2 text-3xl">{value}</span>
      </div>
    </div>
  );
};
