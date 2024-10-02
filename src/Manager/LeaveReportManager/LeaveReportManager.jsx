import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../sidebar/SideBar";
import Form from "react-bootstrap/Form";
import Divs5 from "../Divs5/Divs5";
import { CreateContext } from "../../Context/Context";
import axios from "axios";
import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";
import GetoneLeave from "../../MyLeaves/GetoneLeave";
import { FaUserClock } from "react-icons/fa6";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";

const LeaveReportManager = () => {
  const usecon = useContext(CreateContext);
  const [error, setError] = useState("");
  const [CLICKED_ON_SEARCH, SET_CLICKED_ON_SEARCH] = useState(false);
  const [Accept, setAccept] = useState(false);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  const [ids, setids] = useState([]);
  const [names, setnames] = useState([]);

  const navigate = useNavigate();
  const searchLeaves = (e) => {
    const from = new Date(usecon.FromLeaveReportFilter).getTime();
    const to = new Date(usecon.ToLeaveReportFilter).getTime();
    e.preventDefault();
    SET_CLICKED_ON_SEARCH(true);
    if (usecon.FilterLeaveReportByStatus == "None") {
      usecon.setFilterLeaveReportByStatus("");
      usecon.FilterLeaveReportByStatus = "";
    }
    if (usecon.FilterLeaveReportByType == "None") {
      usecon.setFilterLeaveReportByType("");
      usecon.FilterLeaveReportByType = "";
    }
    if (usecon.FilterLeaveReportByUserid == "None") {
      usecon.setFilterLeaveReportByUserid("");
      usecon.FilterLeaveReportByUserid = "";
    }
    if (usecon.FilterLeaveReportByUsername == "None") {
      usecon.setFilterLeaveReportByUsername("");
      usecon.FilterLeaveReportByUsername = "";
    }
    if (to < from) {
      setAccept(false);
      setError("Incorrect Data");
    } else {
      setAccept(true);
      const url = "http://localhost:1813/manager/all-leave-types?";
      axios
        .get(
          `${url}${
            usecon.FromLeaveReportFilter != "" &&
            "startDate=" + usecon.FromLeaveReportFilter
          }${
            usecon.ToLeaveReportFilter != "" &&
            "&endDate=" + usecon.ToLeaveReportFilter
          }${
            usecon.FilterLeaveReportByType &&
            "&leaveType=" + usecon.FilterLeaveReportByType
          }${
            usecon.FilterLeaveReportByUserid &&
            "&userId=" + usecon.FilterLeaveReportByUserid
          }${
            usecon.FilterLeaveReportByUsername &&
            "&name=" + usecon.FilterLeaveReportByUsername
          }`,
          apiAuth(token)
        )
        .then((res) => {
          usecon.setAllLeaveReportFilter(res.data.data);
          filterFunc(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    usecon.setEmployeeDetailsManager([]);
    const url = "http://localhost:1813/manager/employees";
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
    const url = "http://localhost:1813/manager/all-leave-types";
    axios.get(url, apiAuth(token)).then((res) => {
      usecon.setAllLeaveReportFilter(res.data.data);
      filterFunc(res.data.data);
    });
  }, []);

  const filterFunc = (data) => {
    setids([]);
    setnames([]);
    const seenId = {};
    const seenName = {};
    data.filter((leave) => {
      if (!seenId[leave.user_id]) {
        seenId[leave.user_id] = true;
        setids((prev) => [...prev, leave.user_id]);
      }
      if (!seenName[leave.name]) {
        seenName[leave.name] = true;
        setnames((prev) => [...prev, leave.name]);
      }
    });
  };

  const Headersdata = [
    t("Userid"),
    t("User Name"),
    t("totaldaysData"),
    t("leavetype"),
  ];
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <div>
          <Divs5 />
        </div>
        <div className="grid py-6 px-2"></div>
        <div
          className={` my-4 ${
            usecon.darkMode ? "darkContainer" : "LightThemeContainer"
          } relative shadow px-4 py-6 rounded-xl attendencewidthholidays mx-auto`}
        >
          <div className="px-2 w-full">
            <div className="flex items-center justify-between gap-2">
              <h5
                className={`tracking-wider pt-2 pb-4 OriginalColor ${
                  usecon.darkMode && "text-white"
                }`}
              >
                {t("Leave Type Report")}
              </h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/download/leaveReportManager")}
                  className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
                >
                  <span className={`${usecon.darkMode && "text-white"}`}>
                    {t("download")}
                  </span>
                  <span className={`OriginalColor text-xl`}>
                    <HiOutlineDownload />
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <Form className="flex w-full items-center">
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
                    value={usecon.FilterLeaveReportByUserid}
                    onChange={(e) =>
                      usecon.setFilterLeaveReportByUserid(e.target.value)
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavetype")}
                    </option>
                    {usecon.EmployeeDetailsManager.map((onedata) => (
                      <option value={onedata.userid}>{onedata.userid}</option>
                    ))}
                    <option className="py-10" value="None">
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
                    className={`${
                      usecon.darkMode ? "text-white" : "text-black"
                    } font-semibold mb-2`}
                  >
                    {t("User Name")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.FilterLeaveReportByUsername}
                    onChange={(e) =>
                      usecon.setFilterLeaveReportByUsername(e.target.value)
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
                    <option className="py-10" value="None">
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
                    className={`${
                      usecon.darkMode ? "text-white" : "text-black"
                    } font-semibold mb-2`}
                  >
                    {t("leavetype")}:
                  </label>
                  <select
                    className={` ${
                      usecon.darkMode && "inputDark"
                    } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.FilterLeaveReportByType}
                    onChange={(e) =>
                      usecon.setFilterLeaveReportByType(e.target.value)
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavetype")}
                    </option>
                    <option value="Annual Leave" className="py-10">
                      {t("annualleaveApp")}
                    </option>
                    <option value="Casual Leave">{t("casualleaveApp")}</option>
                    <option value="Mission Leave" className="py-10">
                      {t("missionleaveApp")}
                    </option>
                    <option value="work from home" className="py-10">
                      {t("Work From Home")}
                    </option>
                    <option value="Late Permission" className="py-10">
                      {t("lateinApp")}
                    </option>
                    <option value="Early Leave" className="py-10">
                      {t("earlyoutApp")}
                    </option>
                    <option value="Sick Leave" className="py-10">
                      {t("sickApp")}
                    </option>
                    <option value="Unpaid Leave" className="py-10">
                      {t("unpaidApp")}
                    </option>
                    <option value="Marriage Leave" className="py-10">
                      {t("marriageApp")}
                    </option>
                    <option value="Maternity Leave" className="py-10">
                      {t("maternityApp")}
                    </option>
                    <option value="Study Leave" className="py-10">
                      {t("Study Leave")}
                    </option>
                    <option className="py-10" value="None">
                      None
                    </option>
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
                    value={usecon.FromLeaveReportFilter}
                    onChange={(e) =>
                      usecon.setFromLeaveReportFilter(e.target.value)
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
                    value={usecon.ToLeaveReportFilter}
                    onChange={(e) =>
                      usecon.setToLeaveReportFilter(e.target.value)
                    }
                    as="input"
                    type="date"
                    className={`${usecon.darkMode && "inputDark"}`}
                    style={{ textTransform: "uppercase" }}
                  />
                </Form.Group>
                <Form.Group>
                  <button
                    onClick={(e) => searchLeaves(e)}
                    className="px-5 mt-3 hover:opacity-50 py-2 OriginalBackground btn btn-primary NoOutlines"
                  >
                    {t("search")}
                  </button>
                </Form.Group>
              </Form>
            </div>
            {error != "" && (
              <div
                className={` text-white fixed gap-2
                 duration-200 -translate-x-1/2 bg-red-400 px-20 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
              >
                <div className="text-2xl">
                  <CiWarning />
                </div>
                {error}
              </div>
            )}
            <table
              className={`${
                usecon.darkMode && "table_emp_dark"
              } table_emp w-full`}
              border={1}
              responsive
            >
              <thead>
                <tr>
                  {Headersdata.map((one, index) => (
                    <td
                      key={index}
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-2 py-1.5`}
                    >
                      <div className={`${usecon.darkMode && "text-white"}`}>
                        {one}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usecon.AllLeaveReportFilter &&
                  usecon.AllLeaveReportFilter.map((data, index) => (
                    <tr>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && " border-zinc-600 text-white"
                        } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {data.user_id}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && " border-zinc-600 text-white"
                        } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {getName(data.name, 2)}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && " border-zinc-600 text-white"
                        } px-2 py-1.5`}
                      >
                        <div
                          className={`${
                            usecon.darkMode && "text-white"
                          }  w-full`}
                        >
                          {data["days_counter"]}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && " border-zinc-600 text-white"
                        } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {data.status_leave_type}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {usecon.AllLeaveReportFilter.length == 0 && CLICKED_ON_SEARCH && (
              <div className="text-xl  text-center my-4">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReportManager;
