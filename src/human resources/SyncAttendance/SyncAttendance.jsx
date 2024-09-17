import axios from "axios";
import React, { useState } from "react";
import apiAuth from "../../Atoms/apiAuth";
import Loading from "../../Atoms/alerts/Loading";
import Success from "../../Atoms/alerts/Success";
import Filled from "../../Atoms/alerts/Filled";
import { useNavigate } from "react-router";
const SyncAttendance = () => {
  const [reqStatus, setReqStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });
  const [params, setParams] = useState({
    userId: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeParams = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .put(
        `http://localhost:3005/user/${params.userId}`,
        {
          ...formData,
          from: new Date(formData.from).toISOString(),
          to: new Date(formData.to).toISOString(),
        },
        apiAuth(token)
      )
      .then((res) => {
        console.log(res.data);
        setReqStatus(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setReqStatus(err.response.data.sta.split("at")[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loading />}
      {!reqStatus.startsWith("Error") && reqStatus && (
        <Success message={reqStatus} setMessage={setReqStatus} />
      )}
      {reqStatus.startsWith("Error") && (
        <Filled message={reqStatus} setMessage={setReqStatus} />
      )}
      <div className="w-screen h-screen bg-gray-300 bg-opacity-50 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-1/3 px-8 h-2/3 rounded-lg shadow flex items-center justify-center gap-6 flex-col"
        >
          <h1 className="OriginalColor">Sync Attendance</h1>
          <TextEdit
            label={"UserId"}
            value={params.userId}
            name={"userId"}
            handleChange={handleChangeParams}
          />
          <div className="w-full">
            <label className="w-full" htmlFor={"From"}>
              From
            </label>
            <input
              required
              type="date"
              className="focus:border-orange-500 w-full focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
              id={"From"}
              placeholder={`Enter Start Date Here`}
              value={formData.from}
              name={"from"}
              onChange={handleChangeFormData}
            />
          </div>
          <div className="w-full">
            <label className="w-full" htmlFor={"To"}>
              To
            </label>
            <input
              required
              type="date"
              className="focus:border-orange-500 w-full focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
              id={"To"}
              placeholder={`Enter Start Date Here`}
              value={formData.to}
              name={"to"}
              onChange={handleChangeFormData}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="borderBackgroundHover py-2 w-28 px-4 rounded-lg text-white "
              type="submit"
            >
              Sync
            </button>
            <button
              onClick={() => navigate(-1)}
              className="borderBackground py-2 w-28 px-4 rounded-lg "
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SyncAttendance;

export const TextEdit = ({ label, value, name, handleChange }) => {
  return (
    <div className="space-y-2 w-full">
      <label className="w-full" htmlFor={label}>
        {label}
      </label>
      <input
        className="focus:border-orange-500 w-full col-span-3 focus:border-b-2 border-b outline-none border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
        name={name}
        required
        id={label}
        placeholder={`Enter ${label} Here`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
