import React, { useEffect, useState } from "react";
import { HrCodedData } from "../../../Atoms/HrCodedData";
import axios from "axios";
import apiAuth from "../../../Atoms/apiAuth";
import Table from "./Table";
import SelectBoxGlobally from "../../../Atoms/filterations/SelectBoxGlobally";
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
  url,
  headTable,
}) => {
  const token = localStorage.getItem("token");
  const [options, setOptions] = useState([]);
  const [pages, setPages] = useState(1);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(30);
  const [params, setParams] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    company: "",
    sector: "",
    branch: "",
    site: "",
    limit: "",
    page: "",
    from:"",
    to:"",
  });
  useEffect(() => {
    const getData = async () => {
      const data = await HrCodedData();
      setOptions(data);
    };
    getData();
  }, []);
  
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    setLoading(true);
    setParams(handleParams());
    event.preventDefault();
    axios
      .get(
        `http://localhost:1813/page-report/${url}?${handleParams()}`,
        apiAuth(token)
      )
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
      <div className="bg-white rounded w-full px-4 py-10">
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
          <StartDate handleChange={handleChange} value={formData.from} name="from" />
          <EndDate handleChange={handleChange} value={formData.to} name="to" />
          <SubmitBtn />
        </form>
      </div>

      <Table
        pages={pages}
        data={data}
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
        headTable={headTable}
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
