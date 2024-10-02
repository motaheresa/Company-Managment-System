import React, { useContext, useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import "./Attendence.css";
import { Form } from "react-bootstrap";
import { CreateContext } from "../../Context/Context";
import Divs5 from "../Divs5/Divs5";
import axios from "axios";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router";
import { CiWarning } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { ContactsOutlined } from "@mui/icons-material";
import AddLeave from "../LeavesManager/AddLeaveManager";
import { TbUserDown } from "react-icons/tb";
import CheckStatus from "../../Atoms/CheckStatus";
import apiAuth from "../../Atoms/apiAuth";
import getFromToDate from "../../Atoms/getFromToDate";
import getCheck from "../../Atoms/getCheck";
import AttendanceStatus from "../../Atoms/filterations/AttendanceStatus";
import AddLeaveAttendance from "../../Attendence/AddLeaveAttendance";

const AttendenceManager = () => {
  const [ApplyLeave, setApplyLeave] = useState(false);
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [errorSearch, seterrorSearch] = useState("");
  const [Accept, setAccept] = useState(false);
  const [CLICKED_ON_SEARCH, SET_CLICKED_ON_SEARCH] = useState(false);
  const [error, setError] = useState("");
  const [lea, setLea] = useState([]);
  const [REMAINING_PERMISSION, SET_REMAINING_PERMISSION] = useState(4);
  let [HOLIDAY_DAYS, SET_HOLIDAY_DAYS] = useState(0);
  const [isLoading, setLoad] = useState(true);
  const [t, i18n] = useTranslation();

  // counters
  const [absentCounters, setAbsentCounters] = useState(0);
  const [earlyCounters, setEarlyCounters] = useState(0);
  const [lateCounters, setLateCounters] = useState(0);

  //Shifts
  const [startShift, setStartShift] = useState("");
  const [endShift, setEndShift] = useState("");

  //userId
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const searchAttendance = async (e) => {
    if (usecon.FilterByStatus == "None") {
      usecon.setFilterByStatus("");
      usecon.FilterByStatus = "";
    }
    if (usecon.FilterByType == "None") {
      usecon.setFilterByType("");
      usecon.FilterByType = "";
    }
    // const from = new Date(usecon.START_ATTENDANCE).getTime();
    // const to = new Date(usecon.END_ATTENDANCE).getTime();
    e.preventDefault();
    SET_CLICKED_ON_SEARCH(true);

    if (usecon.FilterByType == "R" && usecon.FilterByStatus == "Absent") {
      setAccept(false);
      seterrorSearch("'R' (Restday) is only valid for 'Present' or ‘Weekend’");
    } else if (
      usecon.FilterByType == "M" &&
      usecon.FilterByStatus == "Weekend"
    ) {
      setAccept(false);
      seterrorSearch(
        "Day type 'M' (Mission) is only valid for 'Present' or ‘Absent’"
      );
    } else if (
      usecon.FilterByType == "P" &&
      (usecon.FilterByStatus == "Weekend" || usecon.FilterByStatus == "Absent")
    ) {
      setAccept(false);
      seterrorSearch("Day type 'P' (Permission) is only valid for 'Present’");
    } else if (
      usecon.FilterByType == "W" &&
      (usecon.FilterByStatus == "Weekend" || usecon.FilterByStatus == "Absent")
    ) {
      setAccept(false);
      seterrorSearch(" Day type 'W' (Workday) is only valid for 'Present'");
    } else if (
      usecon.FilterByType == "H" &&
      (usecon.FilterByStatus == "Weekend" || usecon.FilterByStatus == "Present")
    ) {
      setAccept(false);
      seterrorSearch(" Day type 'W' (Workday) is only valid for 'Present'");
    } else if (
      usecon.FilterByType == "A" &&
      (usecon.FilterByStatus == "Weekend" || usecon.FilterByStatus == "Present")
    ) {
      setAccept(false);
      seterrorSearch("'A' (Absent) Daytype is only valid for  'Absent'");
    } else {
      setAccept(true);
      SET_CLICKED_ON_SEARCH(false);
      const statusSearch = () => {
        if (usecon.FilterByStatus != "") {
          return "&status=" + usecon.FilterByStatus;
        } else {
          return "";
        }
      };
      const FromSearch = () => {
        if (usecon.START_ATTENDANCE != "") {
          return "startDate=" + usecon.START_ATTENDANCE;
        } else {
          return "";
        }
      };
      const ToSearch = () => {
        if (usecon.END_ATTENDANCE != "") {
          return "&endDate=" + usecon.END_ATTENDANCE;
        } else {
          return "";
        }
      };
      const dayTypeSearch = () => {
        if (usecon.FilterByType != "") {
          return "&dayType=" + usecon.FilterByType;
        } else {
          return "";
        }
      };
      const url = "http://localhost:1813/me/my-attendance?";
      axios
        .get(
          `${url}${FromSearch()}${ToSearch()}${dayTypeSearch()}${statusSearch()} 
          `,
          apiAuth(token)
        )
        .then((res) => {
          usecon.setAttendanceManagerData(res.data.data.attendance);
          if (res.data.data.attendance.length != 0) {
            res.data.data.counters.status.map((type) => {
              if (type.day_type == "A") {
                setAbsentCounters(type._count.day_type);
              }
            });
            setLateCounters(res.data.data.counters.late);
            setEarlyCounters(res.data.data.counters.early);
          } else {
            setAbsentCounters(0);
            setLateCounters(0);
            setEarlyCounters(0);
          }
        })
        .catch((err) => {
          usecon.setAttendanceManagerData([]);
        });
    }
  };

  async function aa() {
    const url = "http://localhost:1813/dashboard/userDetails";
    await fetch(url, apiAuth(token)).then((jso) =>
      jso.json().then((res) => {
        const seconds = new Date(res.user.shift_start).getTime();
        const hours = Math.floor(seconds / 3600 / 1000);
        setStartShift(res.user.shift_start);
        setEndShift(res.user.shift_end);
        setUserId(res.user.userId);
      })
    );
    const Current_Date = new Date().toLocaleString().split("/");
    const Current_Month = +Current_Date[0];
    const Current_Year = +Current_Date[2].split(",")[0];
    const handleAtt = async (data) => {
      await usecon.setAttendanceManagerData(data.data.attendance);
      data.data.counters.status.map((type) => {
        if (type.day_type == "A") {
          setAbsentCounters(type._count.day_type);
        }
      });
      await setLateCounters(data.data.counters.late);
      await setEarlyCounters(data.data.counters.early);
    };
    const url2 = `http://localhost:1813/me/my-attendance`;
    await fetch(url2, apiAuth(token))
      .then((res) => res.json().then((res) => handleAtt(res)))
      .catch((err) => {
        console.log(err);
      });
    const js = (data) => {
      setLea(data.data.leaves);
      data.data.leaves.map((l) => {
        if (
          l.status == "Approved" &&
          isLoading &&
          l.status_leave_type != "Late Permission" &&
          l.status_leave_type != "Early Leave"
        ) {
          SET_HOLIDAY_DAYS((prev) => prev + l.num_days);
        }
        if (
          l.status == "Approved" &&
          (l.status_leave_type == "Late Permission" ||
            l.status_leave_type == "Early Leave")
        ) {
          SET_REMAINING_PERMISSION((prev) => prev - l.num_days);
        }
      });
    };
    const url3 = `http://localhost:1813/me/my-leaves`;
    await fetch(url3, apiAuth(token))
      .then((res) =>
        res.json().then((data) => {
          js(data);
        })
      )
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    aa();
  }, []);
  const backCalender1 = {
    color: "#0dcd94",
    backgroundColor: "rgba(13, 205, 148, 0.1)",
  };
  const backCalender2 = {
    color: "#aa4cf2",
    backgroundColor: "rgba(170, 76, 242, 0.1)",
  };
  const backCalender3 = {
    color: "#f34932",
    backgroundColor: "rgba(243, 73, 50, 0.1)",
  };
  const backCalender5 = {
    color: "#ef4eb8",
    backgroundColor: "rgba(239, 78, 184, 0.1)",
  };
  const NameData = [
    t("dateData"),
    t("dayData"),
    t("devicenameData"),
    t("checkinData"),
    t("checkoutData"),
    t("lateinData"),
    t("earlyoutData"),
    t("workhourData"),
    t("shorthourData"),
    t("daytypeData"),
    t("statusData"),
  ];
  const closeFunc = () => {
    setApplyLeave(false);
  };
  if (errorSearch != "") {
    setTimeout(() => {
      seterrorSearch("");
    }, 5000);
  }
  return (
    <div className="AttendencePage">
      {errorSearch != "" && (
        <div
          className={` text-white fixed gap-2 duration-200 -translate-x-1/2 bg-red-400 px-20 z-50 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
        >
          <div className="text-2xl">
            <CiWarning />
          </div>
          {errorSearch}
        </div>
      )}
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="w-full">
          <div>
            <Divs5 />
          </div>
          <div className="grid grid-cols-5 py-6 ">
            <div className="col-span-5 attendencewidthholidays mx-auto">
              <div
                className={`px-1 py-8  ${
                  usecon.darkMode ? "darkContainer" : "LightThemeContainer"
                } ${
                  usecon.darkMode
                    ? "borderDarkContainer"
                    : "borderLightContainer"
                } w-full  rounded-xl shadow`}
              >
                <h5
                  className={`${
                    usecon.darkMode && "text-white"
                  } mb-4 my-2 mx-4 OriginalColor tracking-wider`}
                >
                  {t("daysoverview")}
                </h5>
                <div className="grid grid-cols-5 text-center items-start justify-start w-full">
                  <div className="flex items-center justify-center flex-col gap-2">
                    <div
                      style={backCalender1}
                      className={`${usecon.darkMode && "bg-zinc-400"} ${
                        usecon.darkMode && "backHolidayElementsContainer"
                      } px-2.5 flex flex-col items-center justify-center rounded-xl py-2 ${
                        usecon.darkMode && "text-white"
                      }`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } text-xl font-semibold`}
                      >
                        {earlyCounters}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("earlydaysAtt")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <div
                      style={backCalender3}
                      className={`${usecon.darkMode && "bg-zinc-400"} ${
                        usecon.darkMode && "backHolidayElementsContainer"
                      } px-2.5 flex flex-col items-center justify-center rounded-xl py-2`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } text-xl font-semibold`}
                      >
                        {HOLIDAY_DAYS}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("holidaysAtt")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <div
                      style={backCalender2}
                      className={`${usecon.darkMode && "bg-zinc-400"} ${
                        usecon.darkMode && "backHolidayElementsContainer"
                      } px-2.5 flex flex-col items-center justify-center rounded-xl py-2`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } text-xl font-semibold`}
                      >
                        {lateCounters}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("latedaysAtt")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <div
                      style={backCalender3}
                      className={`${usecon.darkMode && "bg-zinc-400"} ${
                        usecon.darkMode && "backHolidayElementsContainer"
                      } px-2.5 flex flex-col items-center justify-center rounded-xl py-2`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } text-xl font-semibold`}
                      >
                        {absentCounters}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("absentdaysAtt")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <div
                      style={backCalender5}
                      className={`${usecon.darkMode && "bg-zinc-400"} ${
                        usecon.darkMode && "backHolidayElementsContainer"
                      } px-2.5 flex flex-col items-center justify-center rounded-xl py-2`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } text-xl font-semibold`}
                      >
                        {REMAINING_PERMISSION}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("remainingpermissionAtt")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
            }  ${
              usecon.darkMode ? "darkContainer" : "LightThemeContainer"
            } shadow px-1 py-6 rounded-xl attendencewidthholidays mx-auto`}
          >
            <div className="flex items-center px-4 justify-between w-full">
              <h5
                className={`tracking-wider px-1 OriginalColor pt-3 pb-4 ${
                  usecon.darkMode && "text-white"
                }`}
              >
                {t("attendancedetails")}
              </h5>
              <div className=" flex w-fit items-start gap-1">
              <AddLeaveAttendance />
                <button
                  onClick={() => navigate("/attendance/downloadmanager")}
                  className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
                >
                  <span className={`${usecon.darkMode && "text-white"}`}>
                    {t("download")}
                  </span>
                  <span className={`OriginalColor text-xl`}>
                  </span>
                </button>
              </div>
            </div>
            
            <div className="">
              <Form className="flex items-center">
                <div
                  className=" mx-2 mb-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label
                    htmlFor=""
                    className={`${
                      usecon.darkMode ? "text-white" : "text-black"
                    } font-semibold mb-2`}
                  >
                    {t("daytype")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.FilterByType}
                    onChange={(e) => usecon.setFilterByType(e.target.value)}
                    id=""
                  >
                    <option value="" selected className="hidden">
                      {t("choosedaytype")}
                    </option>
                    <option value="W">
                      W
                    </option>
                    <option value="H">
                      H
                    </option>
                    <option value="M">M</option>
                    <option value="P">
                      P
                    </option>
                    <option value="A">
                      A
                    </option>
                    <option value="R">
                      R
                    </option>
                    <option value="PH">
                      PH
                    </option>
                    <option value="WH">
                      WH
                    </option>
                    <option value="None">
                      None
                    </option>
                  </select>
                </div>
                <div
                  className=" mx-2 mb-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label
                    htmlFor=""
                    className={`mb-2 font-semibold  ${
                      usecon.darkMode && "text-white"
                    }`}
                  >
                    {t("status")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2 rounded w-full`}
                    name=""
                    value={usecon.FilterByStatus}
                    onChange={(e) => usecon.setFilterByStatus(e.target.value)}
                    id=""
                  >
                    <AttendanceStatus />
                  </select>
                </div>
                <Form.Group
                  className="mb-3 mx-2 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label
                    className={`${
                      usecon.darkMode ? "text-white" : "text-black"
                    } font-semibold`}
                  >
                    {t("from")}:{" "}
                  </Form.Label>
                  <Form.Control
                    value={usecon.START_ATTENDANCE}
                    onChange={(e) =>
                      usecon.SET_START_ATTENDANCE(e.target.value)
                    }
                    as="input"
                    placeholder=""
                    className={`${usecon.darkMode && "inputDark"}`}
                    type="date"
                    style={{ textTransform: "uppercase" }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 mr-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label
                    className={`${
                      usecon.darkMode ? "text-white" : "text-black"
                    } font-semibold`}
                  >
                    {t("tofilter")}:{" "}
                  </Form.Label>
                  <Form.Control
                    value={usecon.END_ATTENDANCE}
                    onChange={(e) => usecon.SET_END_ATTENDANCE(e.target.value)}
                    as="input"
                    type="date"
                    className={`${usecon.darkMode && "inputDark"}`}
                    style={{ textTransform: "uppercase" }}
                  />
                </Form.Group>
                <Form.Group>
                  <button
                    onClick={(e) => searchAttendance(e)}
                    className="px-5 mt-3 hover:opacity-50 py-2 OriginalBackground btn btn-primary NoOutlines"
                  >
                    {t("search")}
                  </button>
                </Form.Group>
              </Form>
            </div>
            <table className={`w-full `}>
              <thead>
                <tr>
                  {NameData.map((data, index) => (
                    <th
                      key={index}
                      className={`border-1 ${
                        usecon.darkMode && "border-zinc-600"
                      } px-2 py-2`}
                    >
                      <div
                        className={`${
                          usecon.darkMode && "text-white"
                        } font-normal`}
                      >
                        {data}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usecon.AttendanceManagerData.length > 0 &&
                  usecon.AttendanceManagerData.map((onedata, index) => (
                    <tr>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {getFromToDate(onedata.day)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.week_day}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.deviceName}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2 ${
                          (onedata.updated == "CHECK_IN" ||
                            onedata.updated == "BOTH") &&
                          "text-red-500"
                        }`}
                      >
                        {getCheck(onedata.checkIn)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2 ${
                          (onedata.updated == "CHECK_OUT" ||
                            onedata.updated == "BOTH") &&
                          "text-red-500"
                        }`}
                      >
                        {getCheck(onedata.checkOut)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.late}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.early}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.workHour}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.shortHour}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.day_type}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        <div
                          className={`px-2 ${CheckStatus(
                            onedata.status
                          )} !w-32 max-w-fit font-semibold rounded-md py-1 text-xs`}
                        >
                          {onedata.status.charAt(0).toUpperCase() +
                            onedata.status.slice(1)}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendenceManager;

