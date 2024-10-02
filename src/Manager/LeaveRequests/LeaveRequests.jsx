import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../sidebar/SideBar";
import Form from "react-bootstrap/Form";
import Divs5 from "../Divs5/Divs5";
import { CreateContext } from "../../Context/Context";
import axios from "axios";
import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";
import GetoneLeave from "../../MyLeaves/GetoneLeave";
import { FaUserClock } from "react-icons/fa6";
import { LuBadgeHelp } from "react-icons/lu";
import getName from "../../Atoms/getName";
import getFromToDate from "../../Atoms/getFromToDate";
import apiAuth from "../../Atoms/apiAuth";

const LeaveRequests = () => {
  const [showOneLeave, setShowoneLeave] = useState(false);
  const usecon = useContext(CreateContext);
  const [checkMarriageLeave, setCheckMarriageLeave] = useState(false);
  const [checkMaternityLeave, setCheckMaternityLeave] = useState(false);
  const [checkNumDays, setCheckNumDays] = useState("");
  const [error, setError] = useState("");
  const [CLICKED_ON_SEARCH, SET_CLICKED_ON_SEARCH] = useState(false);
  const [Accept, setAccept] = useState(false);
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  const [pending, setPending] = useState();
  const [showBtn, setShowBtn] = useState(0);
  const [controlReject, setControlReject] = useState(false);
  const [controlApprove, setControlApprove] = useState(false);
  const [controlDot, setControlDot] = useState(false);
  const [ids, setids] = useState([]);
  const [names, setnames] = useState([]);

  const navigate = useNavigate();
  const searchLeaves = (e) => {
    const from = new Date(usecon.FromLeaveRequest).getTime();
    const to = new Date(usecon.ToLeaveRequest).getTime();
    e.preventDefault();
    SET_CLICKED_ON_SEARCH(true);
    if (usecon.FilterLeaveByStatus == "None") {
      usecon.setFilterLeaveByStatus("");
      usecon.FilterLeaveByStatus = "";
    }
    if (usecon.DayTypeLeaveRequest == "None") {
      usecon.setDayTypeLeaveRequest("");
      usecon.DayTypeLeaveRequest = "";
    }
    if (usecon.UserIdLeaveRequest == "None") {
      usecon.setUserIdLeaveRequest("");
      usecon.UserIdLeaveRequest = "";
    }
    if (usecon.UserNameLeaveRequest == "None") {
      usecon.setUserNameLeaveRequest("");
      usecon.UserNameLeaveRequest = "";
    }
    if (to < from) {
      setAccept(false);
      setError("Incorrect Data");
    } else if ((usecon.FromLeaveRequest == "" && usecon.ToLeaveRequest != "") || (usecon.FromLeaveRequest != "" && usecon.ToLeaveRequest == "")) {
      setAccept(false);
      setError("Incorrect Data");
    } else {
      setAccept(true);
      axios
        .get(
          `http://localhost:1813/manager/leaves?${checkFrom()}${checkTo()}${checkName()}${checkDayType()}${checkStatus()}${checkUserId()}`,
          {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          usecon.setAllLeavesRequests(res.data.data.leaves);
          setPending(res.data.data.pending);
          filterFunc(res.data.data.leaves);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const checkFrom = () => {
    if (usecon.FromLeaveRequest != "") {
      return `startDate=${usecon.FromLeaveRequest}&`;
    } else {
      return "";
    }
  };
  const checkTo = () => {
    if (usecon.ToLeaveRequest != "") {
      return `endDate=${usecon.ToLeaveRequest}&`;
    } else {
      return "";
    }
  };
  const checkUserId = () => {
    if (usecon.UserIdLeaveRequest != "") {
      return `userId=${usecon.UserIdLeaveRequest}&`;
    } else {
      return "";
    }
  };
  const checkName = () => {
    if (usecon.UserNameLeaveRequest != "") {
      return `name=${usecon.UserNameLeaveRequest}&`;
    } else {
      return "";
    }
  }
  const checkDayType = () => {
    if (usecon.DayTypeLeaveRequest != "") {
      return `leaveType=${usecon.DayTypeLeaveRequest}&`;
    } else {
      return "";
    }
  };
  const checkStatus = () => {
    if (usecon.StatusLeaveRequest != "") {
      return `status=${usecon.StatusLeaveRequest}&`;
    } else {
      return "";
    }
  };
  useEffect(() => {
    
    axios
      .get("http://localhost:1813/manager/leaves", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        usecon.setAllLeavesRequests(res.data.data.leaves);
        setPending(res.data.data.pending);
        filterFunc(res.data.data.leaves);
      });
  }, []);
  useEffect(() => {
    usecon.setEmployeeDetailsManager([])
    const url="http://localhost:1813/manager/employees"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
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

  if (checkMaternityLeave != "") {
    setTimeout(() => {
      setCheckMaternityLeave("");
    }, 7000);
  }
  const Headersdata = [
    t("Userid"),
    t("User Name"),
    t("leavetype"),
    t("appliedonData"),
    t("startdateData"),
    t("enddateData"),
    t("totaldaysData"),
    t("leavereasonData"),
    t("status"),
    t("actionData"),
  ];
  const ShowoneLeaveFunc = (data, id) => {
    usecon.setEyeOneLeaveTable(true);
    if (data.id == id) {
      setShowoneLeave(data);
    }
  };

  const CloseError = () => {
    setCheckMarriageLeave("");
    setCheckMaternityLeave("");
    setCheckNumDays("");
    setErr("");
  };
  const pdfRef = useRef();
  if (error != "") {
    setTimeout(() => {
      setError("");
    }, 3000);
  }
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
  const test = () => {
    axios
      .get("http://localhost:1813/manager/leaves", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        usecon.setAllLeavesRequests(res.data.data.leaves);
        setPending(res.data.data.pending);
      });
  };
  const handleReject = async (id) => {
    fetch(`http://localhost:1813/manager/leaves/${id}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setControlApprove(true);
        setControlDot(true);
        setShowBtn((prev) => prev + 1);
        test();
        console.log("PATCH response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleApprove = async (id) => {
    fetch(`http://localhost:1813/manager/leaves/${id}/approve`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setControlReject(true);
        setControlDot(true);
        test();
        setShowBtn((prev) => prev + 1);
        console.log("PATCH response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const btnControl = (idBtn) => {
    if (localStorage.getItem(`showBtnManager${idBtn}`)) {
      localStorage.removeItem(`showBtnManager${idBtn}`);
      setShowBtn((prev) => prev + 1);
    } else {
      localStorage.setItem(`showBtnManager${idBtn}`, true);
      setShowBtn((prev) => prev + 1);
    }
  };
  return (
    <div className="flex">
      {showOneLeave != "" && usecon.eyeoneLeave ? (
        <div>
          <GetoneLeave oneData={showOneLeave} />
        </div>
      ) : (
        ""
      )}
      <div>
        <SideBar />
      </div>
      <div className="w-full">
        <div>
          <Divs5 />
        </div>
        {err != "" && (
          <div
            className={` text-white z_inde fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/4 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
          >
            <div className="flex items-center gap-1">
              <div className="text-2xl cursor-pointer">
                <CiWarning />
              </div>
              <div>{err}</div>
            </div>
            <div onClick={CloseError} className="text-2xl cursor-pointer">
              <IoIosCloseCircleOutline />
            </div>
          </div>
        )}
        <div className="grid py-6 px-2"></div>
        {/* ref={pdfRef}  */}
        <div
          className={`${usecon.darkMode ? "darkContainer" : "LightThemeContainer"
            } w-1/3 py-8 mx-auto flex items-center justify-center shadow rounded-xl ${usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
            }`}
        >
          <div className="flex flex-col items-center OriginalColor text-3xl">
            <div>
              <FaUserClock />
            </div>
            <div className={` px-4 flex items-center gap-2 justify-center `}>
              <div
                className={`${usecon.darkMode
                  ? "text-white text-xl font-normal"
                  : "text-zinc-600 text-xl"
                  } text-xl tracking-wider`}
              >
                {t("Pending Requests")}
              </div>
              <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
                <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
                  {pending}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={` my-4 ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"
            } relative shadow px-4 py-6 rounded-xl attendencewidthholidays mx-auto`}
        >
          <div ref={pdfRef} className="px-2 w-full">
            <div className="flex items-center justify-between gap-2">
              <h5
                className={`tracking-wider pt-2 pb-4 OriginalColor ${usecon.darkMode && "text-white"
                  }`}
              >
                {t("Employee Leave Requests")}
              </h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/download/leaveRequests")}
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
                  onClick={() => usecon.setcontrolShowing(true)}
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

            <div className="flex items-center">
              <Form className="flex w-full items-center">
                <div
                  className=" mx-2 mb-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label
                    htmlFor=""
                    className={`${usecon.darkMode ? "text-white" : "text-black"
                      } font-semibold mb-2`}
                  >
                    {t("Userid")}:
                  </label>
                  <select
                    className={` ${usecon.darkMode && "inputDark"
                      } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.UserIdLeaveRequest}
                    onChange={(e) =>
                      usecon.setUserIdLeaveRequest(e.target.value)
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
                  {/* asd */}
                </div>
                <div
                  className=" mx-2 mb-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label
                    htmlFor=""
                    className={`${usecon.darkMode ? "text-white" : "text-black"
                      } font-semibold mb-2`}
                  >
                    {t("User Name")}:
                  </label>
                  <select
                    className={` ${usecon.darkMode && "inputDark"
                      } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.UserNameLeaveRequest}
                    onChange={(e) =>
                      usecon.setUserNameLeaveRequest(e.target.value)
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavetype")}
                    </option>
                    {usecon.EmployeeDetailsManager.map((onedata) => (
                      <option value={onedata.username}>{onedata.username}</option>
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
                    className={`${usecon.darkMode ? "text-white" : "text-black"
                      } font-semibold mb-2`}
                  >
                    {t("leavetype")}:
                  </label>
                  <select
                    className={` ${usecon.darkMode && "inputDark"
                      } border py-1.5 px-2  rounded w-full`}
                    name=""
                    value={usecon.DayTypeLeaveRequest}
                    onChange={(e) =>
                      usecon.setDayTypeLeaveRequest(e.target.value)
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
                <div
                  className=" mx-2 mb-3 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label
                    htmlFor=""
                    className={`mb-2 font-semibold ${usecon.darkMode && "text-white"
                      }`}
                  >
                    {t("status")}:
                  </label>
                  <select
                    className={` ${usecon.darkMode && "inputDark"
                      } border py-1.5 px-2 rounded w-full`}
                    name=""
                    value={usecon.StatusLeaveRequest}
                    onChange={(e) =>
                      usecon.setStatusLeaveRequest(e.target.value)
                    }
                    id=""
                  >
                    <option selected className="hidden">
                      {t("chooseleavestatus")}
                    </option>
                    <option value="Approved">{t("approved")}</option>
                    <option value="Pending">{t("pending")}</option>
                    <option value="Rejected">{t("rejected")}</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <Form.Group
                  className="mb-3 mx-2 w-full"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label
                    className={`${usecon.darkMode ? "text-white" : "text-black"
                      } font-semibold`}
                  >
                    {t("from")}:{" "}
                  </Form.Label>
                  <Form.Control
                    value={usecon.FromLeaveRequest}
                    onChange={(e) => usecon.setFromLeaveRequest(e.target.value)}
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
                    className={`${usecon.darkMode ? "text-white" : "text-black"
                      } font-semibold`}
                  >
                    {t("tofilter")}:{" "}
                  </Form.Label>
                  <Form.Control
                    value={usecon.ToLeaveRequest}
                    onChange={(e) => usecon.setToLeaveRequest(e.target.value)}
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
              
              className={`${usecon.darkMode && "table_emp_dark"}  w-full`}
              border={1}
              responsive
            >
              <thead>
                <tr>
                  {Headersdata.map((one) => (
                    <td
                      className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
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
                {usecon.AllLeavesRequests &&
                  usecon.AllLeavesRequests.map((data, index) => (
                    <tr>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {data.user_id}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {getName(data.name)}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {data.status_leave_type}
                        </div>
                      </td>

                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {data.applied_on &&
                            new Date(data.applied_on).getDate() +
                            "-" +
                            (new Date(data.applied_on).getMonth() + 1) +
                            "-" +
                            new Date(data.applied_on).getFullYear() +
                            "  "}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                          {getFromToDate(data.from)}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className={`${usecon.darkMode && "text-white"}`}>
                         {getFromToDate(data.to)}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div
                          className={`${usecon.darkMode && "text-white"
                            }  w-full`}
                        >
                          {data["num_days"]}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div
                          className={`${usecon.darkMode && "text-white"
                            }  w-full`}
                        >
                          {data["leave_reason"]}
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className="flex items-center">
                          <div
                            className={` ${localStorage.getItem(`showBtnManager${data.id}`)
                              ? "hidden"
                              : "flex"
                              } flex items-center mx-auto justify-center w-fit gap-x-1.5`}
                          >
                            <div
                              onClick={() => handleApprove(data.id)}
                              className={`text-white ${data.status == "Rejected" ? "hidden" : "flex"
                                } text-center mx-auto flex items-center cursor-pointer py-1 text-sm font-medium   px-1  justify-center font-medium w-20 bg-green-500 rounded-lg`}
                            >
                              <span>Approve</span>
                            </div>
                            <div
                              onClick={() => handleReject(data.id)}
                              className={`text-white ${data.status == "Approved" ? "hidden" : "flex"
                                } text-center mx-auto flex items-center cursor-pointer  py-1 text-sm font-medium   px-1 justify-center font-medium w-20 bg-red-500 rounded-lg`}
                            >
                              <span>Reject</span>
                            </div>
                          </div>
                          <div
                            onClick={() => btnControl(data.id)}
                            className={`text-white ${data.status == "Approved" ||
                              data.status == "Rejected"
                              ? "hidden"
                              : "flex"
                              }  items-center w-full justify-center text-center py-1`}
                          >
                            <span className="w-3.5 h-3.5 cursor-pointer bg-orange-500 rounded-lg"></span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`border-1 ${usecon.darkMode && " border-zinc-600 text-white"
                          } px-2 py-1.5`}
                      >
                        <div className="flex items-center gap-2 justify-start">
                          <div
                            onClick={() => ShowoneLeaveFunc(data, data.id)}
                            className={` bg-green-500 cursor-pointer w-fit px-1 py-1 text-lg rounded-lg text-white`}
                          >
                            <MdKeyboardArrowRight />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
                          {(usecon.AllLeavesRequests.length==0&&CLICKED_ON_SEARCH)&&
              <div className="text-xl  text-center my-4">No Data Found</div>
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
