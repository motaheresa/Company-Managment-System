import React, { memo, useEffect, useState } from "react";
import Table from "./Table";
import apiAuth from "../../../Atoms/apiAuth";
import axios from "axios";
import { HrCodedData } from "../../../Atoms/HrCodedData";
import LeaveType from "../../../Atoms/filterations/LeaveType";
import StartDate from "../../../Atoms/filterations/StartDate";
import EndDate from "../../../Atoms/filterations/EndDate";
import Status from "../../../Atoms/filterations/Status";
import SelectBoxGlobally from "../../../Atoms/filterations/SelectBoxGlobally";
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
  const [params, setParams] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const [options, setOptions] = useState({
    company: [],
    branche: [],
    site: [],
    jobPost: [],
    sector: [],
    department: [],
  });
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    sector: "",
    site: "",
    company:"",
    from: "",
    to: "",
    branch: "",
  });
  useEffect(() => {
    const getData = async () => {
      const data = await HrCodedData();
      setOptions(data);
    };
    getData();
  }, []);
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
  const handleSubmit = (event) => {
    setLoading(true);
    setParams(handleParams());
    event.preventDefault();
    axios
      .get(`http://localhost:1813/hr/work-details?${handleParams()}`, apiAuth(token))
      .then((res) => {
        if (res.data.data.length > 30) {
          setPages(Math.ceil(res.data.data.length / 30));
        } else {
          setPages(1);
        }
        setIsTableAppeared(true);
        setData(res.data.data);
        console.log(res.data.data);
        
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
      <div className="bg-white rounded  w-full px-4 py-10">
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
          <SelectBoxGlobally
            label={"Company"}
            value={formData.company}
            data={options.company || []}
            name={"company"}
            keeey={"com"}
            handleChange={handleChange}
          />
          <SelectBoxGlobally
            label={"Branch"}
            value={formData.branch}
            data={options.branche || []}
            name={"branch"}
            keeey={"bra"}
            handleChange={handleChange}
          />
          <SelectBoxGlobally
            label={"Sector"}
            data={options.sector || []}
            value={formData.sector}
            name={"sector"}
            keeey={"sector"}
            handleChange={handleChange}
          />
          <SelectBoxGlobally
            label={"Site"}
            value={formData.site}
            data={options.site || []}
            name={"site"}
            keeey={"site"}
            handleChange={handleChange}
          />
          {/* <SelectBoxGlobally
            label={"Job Post"}
            value={formData.jobPost}
            data={options.jobPost || []}
            name={"jobPost"}
            keeey={"job"}
            handleChange={handleChange}
          />
          
          <SelectBoxGlobally
            label={"Department"}
            value={formData.department}
            data={options.department || []}
            name={"department"}
            keeey={"dept"}
            handleChange={handleChange}
          /> */}
          {/* <Status value={formData.status} handleChange={handleChange} /> */}
          {/* <LeaveType handleChange={handleChange} value={formData.leaveType} /> */}
          <StartDate
            handleChange={handleChange}
            value={formData.from}
            name="from"
          />
          <EndDate
            handleChange={handleChange}
            value={formData.to}
            name="to"
          />
          <SubmitBtn />
        </form>
      </div>

      <Table
        pages={pages}
        data={data}
        status={status}
        setStatus={setStatus}
        params={params}
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

export default memo(Form);

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
