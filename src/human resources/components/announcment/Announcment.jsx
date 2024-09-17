import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import apiAuth from "../../../Atoms/apiAuth";
import CreateAnnouncementHr from "./CreateAnnouncementHr";
import "./Announcment.css";
import ShowOneAnnouncementHr from "./ShowOneAnnouncementHr";

const Announcment = () => {
  const token = localStorage.getItem("token");
  const [createAnn, setCreateAnn] = useState(false);
  const [isOneAnnouncementAppeared, setIsOneAnnouncementAppeared] =
    useState(false);
  const [search, setSearch] = useState({
    status: false,
    startDate: "",
    endDate: "",
  });
  const [data, setData] = useState([]);
  const handleSearch = () => {
    return search.startDate || search.endDate
      ? `${search.startDate ? "startDate=" + search.startDate : ""}&${
          search.endDate ? "endDate=" + search.endDate : ""
        }&`
      : "";
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:3005/announcement?${handleSearch()}`,
        apiAuth(token)
      )
      .then((response) => {
        setData(response.data.data);
      });
  }, [search.startDate, search.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };
  return (
    <div>
      <CreateAnnouncementHr
        handleAppearance={setCreateAnn}
        isAppeared={createAnn}
        setData={setData}
      />
      {
        <ShowOneAnnouncementHr
          setIsOneAnnouncementAppeared={setIsOneAnnouncementAppeared}
          id={isOneAnnouncementAppeared}
        />
      }
      <div className="border-2 border-zinc-300 h-fit bg-white rounded-lg py-4 px-6">
        <div className="flex items-center justify-between">
          <h4 className="text-gray-600">Announcement</h4>
          <div className="flex items-center gap-3">
            <span
              onClick={() => setSearch({ ...search, status: !search.status })}
              className="text-2xl text-gray-600 cursor-pointer hover:text-orange-600"
            >
              <FiSearch />
            </span>
            <span
              onClick={() => setCreateAnn(true)}
              className="text-2xl cursor-pointer OriginalColor hover:!text-gray-600"
            >
              <FaPlus />
            </span>
          </div>
        </div>

        <div className={` flex items-center justify-between gap-4`}>
          <div
            className={`${
              search.status && "appeared"
            } is_search_appearance_left flex flex-col gap-2 w-full`}
          >
            <label htmlFor="str">Start Date</label>
            <input
              type="date"
              className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
              name="startDate"
              id="str"
              value={search.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className={`${
              search.status && "appeared"
            } is_search_appearance_right flex flex-col gap-2 w-full`}
          >
            <label htmlFor="end">End Date</label>
            <input
              type="date"
              className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
              name="endDate"
              id="end"
              value={search.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {data.map((ann, index) => (
          <OneAnnouncement
            key={`${ann.id}${data.title}${index}`}
            data={ann}
            setOneAnnouncement={setIsOneAnnouncementAppeared}
            status={search.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Announcment;

export const OneAnnouncement = ({ data, status, setOneAnnouncement }) => {
  return (
    <div
      onClick={() => setOneAnnouncement(data.id)}
      className={`${
        status && "translate-y-4"
      } duration-1000 flex flex-col my-3 hover:bg-gray-200 border bg-gray-100 bg-opacity-50 hover:bg-opacity-100 rounded-lg cursor-pointer w-11/12 mx-auto`}
    >
      <div className="flex items-center gap-4 py-3  px-3">
        <div className="flex flex-col items-center">
          <span className="text-3xl OriginalColor font-semibold italic">
            {new Date(data.createdAt).getDate()}
          </span>
          <span className="text-lg font-semibold italic text-gray-500">
            {months[new Date(data.createdAt).getMonth()]}
          </span>
        </div>
        <div className="flex flex-col w-full max-w-screen-lg flex-wrap">
          <span className="OriginalColor text-2xl font-semibold italic tracking-wider">
            {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
          </span>
          <span className="text-gray-500 tracking-wider italic break-words w-10/12">
            {data.description}
          </span>
        </div>
      </div>
    </div>
  );
};
export const Input = ({ name, value, handleChange, label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label}>{label}</label>
      <input
        className="focus:border-orange-500  focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
