import React, { useContext, useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import { CreateContext } from "../../Context/Context";
import Divs5 from "../Divs5/Divs5";
import axios from "axios";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router";
import { CiWarning } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { LuBadgeHelp } from "react-icons/lu";
import CheckStatus from "../../Atoms/CheckStatus";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";
import getFromToDate from "../../Atoms/getFromToDate";
import getCheck from "../../Atoms/getCheck";
import AttendanceStatus from "../../Atoms/filterations/AttendanceStatus";

const EmployeeAttendanceManager = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [errorSearch, seterrorSearch] = useState("");
  const [Accept, setAccept] = useState(false);
  const [CLICKED_ON_SEARCH, SET_CLICKED_ON_SEARCH] = useState(false);
  const [t, i18n] = useTranslation();
  const [ids, setids] = useState([]);
  const [names, setnames] = useState([]);
  const [lea, setLea] = useState([]);
  const [REMAINING_PERMISSION, SET_REMAINING_PERMISSION] = useState(4);
  let [HOLIDAY_DAYS, SET_HOLIDAY_DAYS] = useState(0);
  const [isLoading, setLoad] = useState(true);

  const [counter, setCounter] = useState({
    Early: 0,
    Late: 0,
    Absent: 0,
  });

  const navigate = useNavigate();
  const searchAttendance = async (e) => {
    if (usecon.FilterEmployeeAtt.Status == "None") {
      usecon.setFilterEmployeeAtt((prev) => ({ ...prev, Status: "" }));
      usecon.FilterEmployeeAtt.Status = "";
    }
    if (usecon.FilterEmployeeAtt.DayType == "None") {
      usecon.setFilterEmployeeAtt((prev) => ({ ...prev, DayType: "" }));
      usecon.FilterEmployeeAtt.DayType = "";
    }
    if (usecon.FilterEmployeeAtt.user_id == "None") {
      usecon.setFilterEmployeeAtt((prev) => ({ ...prev, user_id: "" }));
      usecon.FilterEmployeeAtt.user_id = "";
    }
    if (usecon.FilterEmployeeAtt.Name == "None") {
      usecon.setFilterEmployeeAtt((prev) => ({ ...prev, Name: "" }));
      usecon.FilterEmployeeAtt.Name = "";
    }
    if (usecon.FilterEmployeeAtt.TypePermission == "None") {
      usecon.setFilterEmployeeAtt((prev) => ({ ...prev, TypePermission: "" }));
      usecon.FilterEmployeeAtt.TypePermission = "";
    }
    e.preventDefault();
    SET_CLICKED_ON_SEARCH(true);

    if (
      (usecon.FilterEmployeeAtt.From == "" &&
        usecon.FilterEmployeeAtt.To != "") ||
      (usecon.FilterEmployeeAtt.From != "" && usecon.FilterEmployeeAtt.To == "")
    ) {
      setAccept(false);
      seterrorSearch("Incorrect Data");
    } else if (
      usecon.FilterEmployeeAtt.DayType == "R" &&
      usecon.FilterEmployeeAtt.Status == "Absent"
    ) {
      setAccept(false);
      seterrorSearch("'R' (Restday) is only valid for 'Present' or ‘Weekend’");
    } else if (
      usecon.FilterEmployeeAtt.DayType == "M" &&
      usecon.FilterEmployeeAtt.Status == "Weekend"
    ) {
      setAccept(false);
      seterrorSearch(
        "Day type 'M' (Mission) is only valid for 'Present' or ‘Absent’"
      );
    } else if (
      usecon.FilterEmployeeAtt.DayType == "P" &&
      (usecon.FilterEmployeeAtt.Status == "Weekend" ||
        usecon.FilterEmployeeAtt.Status == "Absent")
    ) {
      setAccept(false);
      seterrorSearch("Day type 'P' (Permission) is only valid for 'Present’");
    } else if (
      usecon.FilterEmployeeAtt.DayType == "W" &&
      (usecon.FilterEmployeeAtt.Status == "Weekend" ||
        usecon.FilterEmployeeAtt.Status == "Absent")
    ) {
      setAccept(false);
      seterrorSearch(" Day type 'W' (Workday) is only valid for 'Present'");
    } else if (
      usecon.FilterEmployeeAtt.DayType == "H" &&
      (usecon.FilterEmployeeAtt.Status == "Weekend" ||
        usecon.FilterEmployeeAtt.Status == "Present")
    ) {
      setAccept(false);
      seterrorSearch(" Day type 'W' (Workday) is only valid for 'Present'");
    } else if (
      usecon.FilterEmployeeAtt.DayType == "A" &&
      (usecon.FilterEmployeeAtt.Status == "Weekend" ||
        usecon.FilterEmployeeAtt.Status == "Present")
    ) {
      setAccept(false);
      seterrorSearch("'A' (Absent) Daytype is only valid for  'Absent'");
    } else {
      const params = new URLSearchParams();
      if (usecon.FilterEmployeeAtt.user_id != "") {
        params.append("userId", usecon.FilterEmployeeAtt.user_id);
      }
      if (usecon.FilterEmployeeAtt.Name != "") {
        params.append("name", usecon.FilterEmployeeAtt.Name);
      }

      if (usecon.FilterEmployeeAtt.TypePermission == "Late") {
        params.append("late", true);
      }
      if (usecon.FilterEmployeeAtt.TypePermission == "Early") {
        params.append("early", true);
      }
      if (usecon.FilterEmployeeAtt.DayType != "") {
        params.append("dayType", usecon.FilterEmployeeAtt.DayType);
      }
      if (usecon.FilterEmployeeAtt.Status != "") {
        params.append("status", usecon.FilterEmployeeAtt.Status);
      }
      if (usecon.FilterEmployeeAtt.From != "") {
        params.append("startDate", usecon.FilterEmployeeAtt.From);
      }
      if (usecon.FilterEmployeeAtt.To != "") {
        params.append("endDate", usecon.FilterEmployeeAtt.To);
      }
      setAccept(true);
      const url = "http://localhost:3005/manager/attendance?";
      axios
        .get(url, {
          // `${url}${checkUserId()}${checkName()}${checkPermission()}${checkStatus()}${checkDayType()}${checkFrom()}${checkTo()}`,
          params: params,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data.data.counter.status);
          setids([]);
          setnames([]);
          usecon.setEmployeeAttendance(res.data.data.attendance);
          let result = 0;
          res.data.data.counter.status.length > 0 &&
            res.data.data.counter.status.map((type) => {
              if (type.day_type == "A") {
                result = type._count.day_type;
              }
            });
          setCounter({
            Early: res.data.data.counter.early,
            Late: res.data.data.counter.late,
            Absent: result,
          });
          const seenId = {};
          const seenName = {};
          res.data.data.attendance.map((att) => {
            if (!seenId[att.userid]) {
              seenId[att.userid] = true;
              setids((prev) => [...prev, att.userid]);
            }

            if (!seenName[att.name]) {
              seenName[att.name] = true;
              setnames((prev) => [...prev, att.name]);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    usecon.setEmployeeDetailsManager([]);
    const url = "http://localhost:3005/manager/employees";
    axios.get(url, apiAuth(token)).then((res) => {
      res.data.data.employees.map((emp) => {
        res.data.data.shifts.map((shift) => {
          if (emp.userid == shift.userid) {
            res.data.data.emails.map((email) => {
              if (emp.userid == email.userid) {
                const mergedObject = { ...emp, ...shift, ...email };
                usecon.setEmployeeDetailsManager((prev) => [
                  ...prev,
                  mergedObject,
                ]);
              }
            });
          }
        });
      });
    });
  }, []);
  useEffect(() => {
    setids([]);
    setnames([]);
    const url = "http://localhost:3005/manager/attendance";
    axios.get(url, apiAuth(token)).then((res) => {
      console.log(res.data);
      let result = 0;
      res.data.data.counter.status.length > 0 &&
        res.data.data.counter.status.map((type) => {
          if (type.day_type == "A") {
            result = type._count.day_type;
          }
        });
      const seenId = {};
      const seenName = {};
      usecon.setEmployeeAttendance(res.data.data.attendance);
      setCounter({
        Early: res.data.data.counter.early,
        Late: res.data.data.counter.late,
        Absent: result,
      });
      res.data.data.attendance.map((att) => {
        if (!seenId[att.userid]) {
          seenId[att.userid] = true;
          setids((prev) => [...prev, att.userid]);
        }

        if (!seenName[att.name]) {
          seenName[att.name] = true;
          setnames((prev) => [...prev, att.name]);
        }
      });
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
    const url2 = `http://localhost:3005/me/my-leaves`;
    fetch(url2, apiAuth(token))
      .then((res) =>
        res.json().then((data) => {
          js(data);
        })
      )
      .catch((err) => console.log(err));
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
    t("Userid"),
    t("Name"),
    t("Day"),
    t("dateData"),
    t("devicenameData"),
    t("checkinData"),
    t("checkoutData"),
    t("lateinData"),
    t("earlyoutData"),
    t("workhourData"),
    t("shorthourData"),
    "DT",
    t("statusData"),
  ];
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
                  {t("Employee Attendance")}
                </h5>
                <div className="grid grid-cols-4 text-center items-start justify-start w-full">
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
                        {counter.Early}
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
                        {counter.Late}
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
                        {counter.Absent}
                      </div>
                    </div>
                    <div
                      className={`w-full ${usecon.darkMode && "text-white "}`}
                    >
                      {t("absentdaysAtt")}
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
                {t("Employee Attendance")}
              </h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    navigate("/download/employeeAttendanceManager")
                  }
                  className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
                >
                  <span className={`${usecon.darkMode && "text-white"}`}>
                    {t("download")}
                  </span>
                  <span className={`OriginalColor text-xl`}>
                    <HiOutlineDownload />
                  </span>
                </button>
                <button
                  onClick={() => usecon.setcontrolShowingAtt(true)}
                  className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
                >
                  {/* <span className={`${usecon.darkMode && "text-white"}`}>
                    Help
                  </span> */}
                  <span className={`OriginalColor text-2xl`}>
                    <LuBadgeHelp />
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
                    {t("Userid")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.FilterEmployeeAtt.user_id}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        user_id: e.target.value,
                      }))
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavetype")}
                    </option>
                    {usecon.EmployeeDetailsManager.map((onedata) => (
                      <option value={onedata.userid}>{onedata.userid}</option>
                    ))}
                    <option value="None">None</option>
                  </select>
                </div>
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
                    {t("Name")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.FilterEmployeeAtt.Name}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        Name: e.target.value,
                      }))
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavetype")}
                    </option>
                    {usecon.EmployeeDetailsManager.map((onedata) => (
                      <option value={onedata.username}>
                        {onedata.username}
                      </option>
                    ))}
                    <option value="None">None</option>
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
                    {t("Permission")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2 rounded w-full`}
                    name=""
                    value={usecon.FilterEmployeeAtt.TypePermission}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        TypePermission: e.target.value,
                      }))
                    }
                    id=""
                  >
                    <option value="" selected className="hidden">
                      {t("choosestatus")}
                    </option>
                    <option value="Early">Early</option>
                    <option value="Late">Late</option>
                    <option value="None">None</option>
                  </select>
                </div>
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
                    value={usecon.FilterEmployeeAtt.DayType}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        DayType: e.target.value,
                      }))
                    }
                    id=""
                  >
                    <option value="" selected className="hidden">
                      {t("choosedaytype")}
                    </option>
                    <option value="W">W</option>
                    <option value="H">H</option>
                    <option value="M">M</option>
                    <option value="P">P</option>
                    <option value="A">A</option>
                    <option value="R">R</option>
                    <option value="PH">PH</option>
                    <option value="WH">WH</option>
                    <option value="None">None</option>
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
                    value={usecon.FilterEmployeeAtt.Status}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        Status: e.target.value,
                      }))
                    }
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
                    value={usecon.FilterEmployeeAtt.From}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        From: e.target.value,
                      }))
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
                    value={usecon.FilterEmployeeAtt.To}
                    onChange={(e) =>
                      usecon.setFilterEmployeeAtt((prev) => ({
                        ...prev,
                        To: e.target.value,
                      }))
                    }
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
                {usecon.EmployeeAttendance.length > 0 &&
                  usecon.EmployeeAttendance.map((onedata, index) => (
                    <tr key={onedata.userid + index}>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.userid}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {getName(onedata.name, 2)}
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
                        {getFromToDate(onedata.day)}
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
                        } ${
                          (onedata.updated == "CHECK_IN" ||
                            onedata.updated == "BOTH") &&
                          "text-red-500"
                        } px-2 py-2`}
                      >
                        {getCheck(onedata.checkIn)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } ${
                          (onedata.updated == "CHECK_OUT" ||
                            onedata.updated == "BOTH") &&
                          "text-red-500"
                        } px-2 py-2`}
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
                          // style={f}

                          className={`px-2 ${CheckStatus(
                            onedata.status
                          )} max-w-fit font-semibold rounded-md py-1  `}
                        >
                          {onedata.status.charAt(0).toUpperCase() +
                            onedata.status.slice(1)}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {usecon.EmployeeAttendance.length == 0 && CLICKED_ON_SEARCH && (
              <div className="text-xl  text-center my-4">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceManager;

// كل اخر الشهر اروح احط البيانات في الداتا بيز وعن طريقها هتعمل السيرش
// طريقة السيرش هتحط اراي النيو تابل فاضيه وتعمل ريكوست جديد تحط فيه قيم ال تشيك
