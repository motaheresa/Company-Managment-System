import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Success from "../../../Atoms/alerts/Success";
import axios from "axios";
import apiAuth from "../../../Atoms/apiAuth";
import Filled from "../../../Atoms/alerts/Filled";

const CreateOvertime = ({ isAppeared, handleAppearance,data,setData }) => {
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");
  let [formData, setFormData] = useState({
    userId: "",
    name: "",
    gross_salary: "",
    from: "",
    to: "",
  });
  // console.log(new Date(formData.from).toISOString());
  const handleCreate = (e) => {
    e.preventDefault();
    let start = formData.from;
    let end = formData.to;
    formData.from = new Date(formData.from).toISOString();
    formData.to = new Date(formData.to).toISOString();
    axios
      .post("http://localhost:3005/over-time", formData, apiAuth(token))
      .then((response) => {
        if(data){
            const addedData=response.data.data
            setData((prev)=>([...prev,addedData]))
        }
        setStatus("Success");
        handleReset();
        handleAppearance(false);
      })
      .catch((error) => {
        formData.from = start;
        formData.to = end;
        console.log(error);
        setStatus("Failed");
      })
  };
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
          message={`Overtime is created`}
        />
      )}
      {status === "Failed" && (
        <Filled setMessage={setStatus} message={`Error, Something went wrong`} />
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
            <span className="OriginalColor text-lg">Create New Overtime</span>
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
              placeholder="Enter userid here"
            />
            <Input
              handleChange={handleChange}
              value={formData.name}
              label={"Name"}
              name={"name"}
              placeholder="Enter name here"
            />
            <Input
              handleChange={handleChange}
              value={formData.gross_salary}
              label={"Gross Salary"}
              name={"gross_salary"}
              placeholder="Enter Gross Salary here"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="str">Start Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="from"
                id="str"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="to"
                id="end"
                value={formData.to}
                onChange={handleChange}
                required
              />
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

export default CreateOvertime;

export const Input = ({ name, value, handleChange, label, placeholder }) => {
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
        required
      />
    </div>
  );
};
