import React, { useEffect, useState } from "react";
import Table from "./Table";
import apiAuth from "../../../Atoms/apiAuth";
import axios from "axios";
import { HrCodedData } from "../../../Atoms/HrCodedData";
import { FaPlus } from "react-icons/fa6";
import CreateOvertime from "./CreateOvertime";
import StartDate from "../../../Atoms/filterations/StartDate";
import EndDate from "../../../Atoms/filterations/EndDate";
import SubmitBtn from "../../../Atoms/filterations/SubmitBtn";

const Form = ({
  data,
  setData,
  setLoading,
  status,
  setStatus,
  isTableAppeared,
  setIsTableAppeared,
}) => {
  const token = localStorage.getItem("token");
  const [pages, setPages] = useState(1);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(30);
  const [isCreated,setIsCreated]=useState(false)
  const [params, setParams] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    from: "",
    to: "",
  });
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleParams = () => {
    let params = "";
    Object.keys(formData).map((key) => {
      if (
        formData[key] == "none" ||
        formData[key] == "None" ||
        formData[key] == "Choose"
      ) {
        formData[key] = "";
      }
      // if(key=="userId"){
      //   formData[key]=+formData[key];
      // }
      params += formData[key] ? `${key}=${formData[key]}&` : "";
    });
    return params;
  };
  useEffect(()=>{
    handleSubmit()
  },[])
  const handleSubmit = (event) => {
    setLoading(true);
    setParams(handleParams());
    event?.preventDefault();
    axios
      .get(`http://localhost:3005/over-time?${handleParams()}`, apiAuth(token))
      .then((res) => {
        if (res.data.data.length > 30) {
          setPages(Math.ceil(res.data.data.length / 30));
        } else {
          setPages(1);
        }
        setIsTableAppeared(true);
        setData(res.data.data);
        setStatus("Success");
        setStart(0);
        setEnd(30);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log(err);
        setIsTableAppeared(false);
        setStatus("Failed");
        setData([]);
        setPages(1);
        setStart(0);
        setEnd(30);
        setCurrentPage(1);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="bg-white relative rounded w-full px-4 py-10">
        <div onClick={()=>setIsCreated(true)} className="absolute p-2 borderBackgroundHover cursor-pointer text-white rounded-full right-0 top-0 m-2">
          <FaPlus />
        </div>
        <CreateOvertime setData={setData} data={data} isAppeared={isCreated} handleAppearance={setIsCreated} />
        <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
          <TextEdit
            label={"UserId"}
            value={formData.userId}
            name={"userId"}
            handleChange={handleChange}
          />
          <TextEdit
            label={"Name"}
            value={formData.name}
            name={"name"}
            handleChange={handleChange}
          />
          <StartDate handleChange={handleChange} value={formData.from} name="from" />
          <EndDate handleChange={handleChange} value={formData.to} name="to" />
          <SubmitBtn />
        </form>
      </div>

      <Table
        pages={pages}
        data={data}
        setData={setData}
        params={params}
        status={status}
        setStatus={setStatus}
        setLoading={setLoading}
        isTableAppeared={isTableAppeared}
        setIsTableAppeared={setIsTableAppeared}
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Form;

export const TextEdit = ({ label, value, name, handleChange }) => {
  return (
    <div className="space-y-2 ">
      <label className="w-full" htmlFor={label}>
        {label}
      </label>
      <input
        className="focus:border-orange-500 w-full col-span-3 focus:border-b-2 border-b outline-none border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
        name={name}
        id={label}
        placeholder={`Enter ${label} Here`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
