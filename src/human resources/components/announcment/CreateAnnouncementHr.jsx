import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import "./Announcment.css";
import axios from "axios";
import apiAuth from "../../../Atoms/apiAuth";
import Success from "../../../Atoms/alerts/Success";
import Filled from "../../../Atoms/alerts/Filled";
const token = localStorage.getItem("token");

const CreateAnnouncementHr = ({ isAppeared, handleAppearance,setData }) => {
  const [status, setStatus] = useState("");
  let [formData, setFormData] = useState({
    userId: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const handleCreate = (e) => {
    e.preventDefault();
    let start = formData.start_date;
    let end = formData.end_date;
    formData.start_date = new Date(formData.start_date).toISOString();
    formData.end_date = new Date(formData.end_date).toISOString();
    const updatedValues={}
    for (const key in formData) {
        if(formData[key]){
          updatedValues[key]=formData[key];
        }
    }
    console.log(updatedValues);
    axios
      .post("http://localhost:3005/announcement", updatedValues, apiAuth(token))
      .then((response) => {
        setData((prev)=>([...prev,response.data.data]))
        console.log(response.data.data);
        setStatus("Success");
        handleReset();
        handleAppearance(false)
      })
      .catch((error) => {
        formData.start_date = start;
        formData.end_date = end;
        console.log(error);
        setStatus("Failed");
      });
  };
  let user = "";
  user = formData.userId;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleReset = () => {
    for (const ele in formData) {
      setFormData((prev) => ({ ...prev, [ele]: "" }));
    }
  };
  return (
    <>
      {status === "Success" && (
        <Success
          setMessage={setStatus}
          message={`Announcement is created for ${user}`}
        />
      )}
      {status === "Failed" && (
        <Filled setMessage={setStatus} message={`Error: Something went wrong`} />
      )}
      <div
        className={`${
          isAppeared
            ? "scale-100 visible opacity-1"
            : "scale-0 opacity-0 invisible"
        }  fixed top-0  z-50 left-0 bg-zinc-200 bg-opacity-40 flex items-center justify-center w-screen h-screen duration-300`}
      >
        <div
          className={`rounded-lg  w-2/4 h-3/4 bg-white shadow-animation border`}
        >
          <div className="flex items-center border-b justify-between px-3 py-3">
            <span className="OriginalColor text-lg">
              Create New Announcement
            </span>
            <span
              className="text-2xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => handleAppearance(false)}
            >
              <MdOutlineCancel />
            </span>
          </div>
          <form
            onSubmit={handleCreate}
            className="w-full grid grid-cols-2 px-4 h-full content-center -translate-y-6 gap-4"
          >
            <Input
              handleChange={handleChange}
              value={formData.userId}
              label={"UserId"}
              name={"userId"}
              required={false}
              placeholder="Enter userid here"
            />
            <Input
              handleChange={handleChange}
              value={formData.title}
              label={"Announcement Title"}
              name={"title"}
              placeholder="Enter title here"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="str">Start Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="start_date"
                id="str"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="end">End Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="end_date"
                id="end"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex col-span-2 flex-col gap-2">
              <label htmlFor="desc">Description</label>
              <textarea
              
                className="  focus:border-orange-500 resize-none focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                rows="2"
                placeholder="Enter Description here"
                required
                name="description"
                id="desc"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-center gap-3 col-span-2 text-white">
              <button
                className="px-3 py-1.5 rounded-md borderBackgroundHover "
                type="submit"
              >
                Create
              </button>
              <button
                className="px-3 py-1.5 rounded-md borderBackground "
                type="reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAnnouncementHr;

export const Input = ({ name, value, handleChange, label,placeholder,required=true }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};
