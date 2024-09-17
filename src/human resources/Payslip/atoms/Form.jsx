import React, { memo, useContext, useEffect, useState } from "react";
import Table from "./Table";
import apiAuth from "../../../Atoms/apiAuth";
import axios from "axios";
import { HrCodedData } from "../../../Atoms/HrCodedData";
import { FaPlus } from "react-icons/fa6";
import CreatePaySlip from "./CreatePaySlip";
import { useNavigate } from "react-router";
import {
  PaylsipAuthManagement,
} from "../../../Context/hr/PayslipAuthCon";
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
}) => {
  const PaylsipAuth = useContext(PaylsipAuthManagement);
  const token = localStorage.getItem("token");
  const [pages, setPages] = useState(1);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(30);
  const [isCreated, setIsCreated] = useState(false);
  const [params, setParams] = useState({});
  let [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [options, setOptions] = useState({
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
    startDate: "",
    endDate: "",
    branch: "",
  });
  useEffect(() => {
    if (PaylsipAuth.password) {
      getData(PaylsipAuth.password);
    }
    const getDataOptions = async () => {
      const data = await HrCodedData();
      setOptions(data);
    };
    getDataOptions();
  }, [PaylsipAuth.password]);
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
      params += formData[key] ? `${key}=${formData[key]}&` : "";
    });
    return params;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (PaylsipAuth.password) {
      getData(PaylsipAuth.password);
    } else {
      navigate("/hr/auth-payslip");
    }
  };
  const getData = (password) => {
    setLoading(true);
    setParams(handleParams());
    axios
      .post(
        `http://localhost:3005/pay-slip/get-all?${handleParams()}`,
        { password },
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
        if (err?.response?.data?.sta?.includes("Error: Invalid password")) {
          window.alert("Invalid Password");
          navigate("/hr/auth-payslip");
        }
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
        // setPassword("");
      });
  };

  return (
    <>
      <div className="bg-white rounded relative w-full px-4 py-10">
        <div
          onClick={() => setIsCreated(true)}
          className="absolute p-2 borderBackgroundHover cursor-pointer text-white rounded-full right-0 top-0 m-2"
        >
          <FaPlus />
        </div>
        <CreatePaySlip
          setData={setData}
          data={data}
          isAppeared={isCreated}
          handleAppearance={setIsCreated}
        />
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
          <StartDate handleChange={handleChange} value={formData.startDate} name="startDate" />
          <EndDate handleChange={handleChange} value={formData.endDate} name="endDate" />
          <SubmitBtn />
        </form>
      </div>
      <Table
        pages={pages}
        data={data}
        setData={setData}
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
    </>
  );
};

export default memo(Form);

export const TextEdit = ({ label, value, name, handleChange }) => {
  return (
    <div className="space-y-2 ">
      <label className="w-full" htmlFor={name}>
        {label}
      </label>
      <input
        className="focus:border-orange-500 w-full col-span-3 focus:border-b-2 border-b outline-none border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
        name={name}
        id={name}
        placeholder={`Enter ${label} Here`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};


