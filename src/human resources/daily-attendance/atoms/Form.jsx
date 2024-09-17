import { useEffect, useState } from "react";
import Table from "./Table";
import { HrCodedData } from "../../../Atoms/HrCodedData";
import SelectBoxGlobally from "../../../Atoms/filterations/SelectBoxGlobally";
import Status from "../../../Atoms/filterations/Status";
import StartDate from "../../../Atoms/filterations/StartDate";
import EndDate from "../../../Atoms/filterations/EndDate";
import DayType from "../../../Atoms/filterations/DayType";
import Permissoin from "../../../Atoms/filterations/Permissoin";
import AllCheckInOut from "../../../Atoms/filterations/AllCheckInOut";
import SubmitBtn from "../../../Atoms/filterations/SubmitBtn";
import axios from "axios";
import apiAuth from "../../../Atoms/apiAuth";
import AttendanceStatus from "../../../Atoms/filterations/AttendanceStatus";

export const Form = ({
  data,
  setData,
  setCloneData,
  cloneData,
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
  const [params, setParams] = useState();
  let [currentPage, setCurrentPage] = useState(1);
  const [options, setOptions] = useState({
    branche: [],
    site: [],
    jobPost: [],
    sector: [],
  });
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    sector: "",
    site: "",
    dayType: "",
    status: "",
    permission: "",
    dayOrder: "",
    startDate: "",
    endDate: "",
    dept: "",
    att_status: "",
    bra: "",
    com: "",
    job: "",
    checkType: "",
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
      let updatingKey = "";
      let updatingvalue = "";
      let updatingKey2 = "";
      let updatingvalue2 = "";
      if (
        formData[key] == "none" ||
        formData[key] == "None" ||
        formData[key] == "Choose"
      ) {
        formData[key] = "";
      }
      if (key == "job") {
        updatingKey = "jobPost";
      } else if (key == "dept") {
        updatingKey = "department";
      } else if (key == "bra") {
        updatingKey = "branch";
      } else if (key == "permission") {
        if (formData[key] == "early") {
          updatingKey = "early";
          updatingvalue = "true";
        } else if (formData[key] == "late") {
          updatingKey = "late";
          updatingvalue = "true";
        }
      } else if (key == "checkType") {
        if (formData[key] == "All") {
          updatingvalue = "";
        } else if (formData[key] == "CheckIn & CheckOut") {
          updatingKey = "checkIn";
          updatingvalue = "true";
          updatingKey2 = "checkOut";
          updatingvalue2 = "true";
        } else if (formData[key] == "No CheckIn/Out") {
          updatingKey = "checkIn";
          updatingvalue = "false";
          updatingKey2 = "checkOut";
          updatingvalue2 = "false";
        } else if (formData[key] == "No CheckOut") {
          updatingKey = "checkOut";
          updatingvalue = "false";
        } else if (formData[key] == "No CheckIn") {
          updatingKey = "checkIn";
          updatingvalue = "false";
        }
      } else {
        updatingvalue = "";
        updatingKey = key;
      }
      params += formData[key]
        ? `${updatingKey}=${updatingvalue ? updatingvalue : formData[key]}&${updatingKey2 ? updatingKey2 + "=" : ""
        }${updatingvalue2 ? updatingvalue2 + "&" : ""}`
        : "";
    });
    return params;
  };
  const handleSubmit = (event) => {
    setLoading(true);
    setParams(handleParams());
    event.preventDefault();
    axios
      .get(
        `http://localhost:3005/hr/attendance?${handleParams()}`,
        apiAuth(token)
      )
      .then((res) => {
        if (res.data.data.attendance.length > 30) {
          setPages(Math.ceil(res.data.data.attendance.length / 30));
        } else {
          setPages(1);
        }
        setIsTableAppeared(true);
        setData(res.data.data.attendance);
        setCloneData(res.data.data.attendance);
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
        setCloneData([]);
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
    <div className="px-">
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
            label={"Sector"}
            data={options?.sector || []}
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
          <SelectBoxGlobally
            label={"Job Post"}
            value={formData.job}
            data={options.jobPost || []}
            name={"job"}
            keeey={"job"}
            handleChange={handleChange}
          />
          <SelectBoxGlobally
            label={"Branch"}
            value={formData.bra}
            data={options.branche || []}
            name={"bra"}
            keeey={"bra"}
            handleChange={handleChange}
          />
          <Permissoin value={formData.permission} handleChange={handleChange} />
          <div className="space-y-2 ">
          <label className="w-full">
            Status
          </label>
          <select
            className="focus:border-orange-500 w-full col-span-1 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
            id={"status"}
            placeholder={`Enter Status Here`}
            value={formData.status}
            name="status"
            onChange={handleChange}
          >
            <AttendanceStatus value={formData.status} handleChange={handleChange} />
          </select>
          </div>

          <DayType value={formData.dayType} handleChange={handleChange} />
          <StartDate value={formData.startDate} handleChange={handleChange} name="startDate" />
          <EndDate value={formData.endDate} handleChange={handleChange} name="endDate" />
          <AllCheckInOut value={formData.checkType} handleChange={handleChange} />
          <SubmitBtn />
        </form>
      </div>
      <Table
        pages={pages}
        cloneData={cloneData}
        setCloneData={setCloneData}
        data={data}
        handleSubmit={handleSubmit}
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
