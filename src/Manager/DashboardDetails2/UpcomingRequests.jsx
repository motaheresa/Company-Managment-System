import React, { useContext, useEffect, useState } from "react";
import "./DashboardDetails2.css";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";
import getFromToDate from "../../Atoms/getFromToDate";
const UpcomingRequests = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [showBtn, setShowBtn] = useState(0);
  const [t, i18n] = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url="http://localhost:3005/manager/leaves"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
        res.data.data.leaves.map((leave) => {
          if (leave.status == "Pending") {
            setUsers((prev) => [...prev, leave]);
          }
        });
      });
  }, []);
  const keys = [
    "Userid",
    "Name",
    "leavetype",
    "appliedonData",
    "from",
    "to",
    "actionData",
  ];
  const test = () => {
    setUsers([]);
    const url="http://localhost:3005/manager/leaves"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
        res.data.data.leaves.map((leave) => {
          if (leave.status == "Pending") {
            setUsers((prev) => [...prev, leave]);
          }
        });
      });
  };
  const handleReject = async (id) => {
    fetch(`http://localhost:3005/manager/leaves/${id}/reject`, {
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
        setShowBtn((prev) => prev + 1);
        test();
        console.log("PATCH response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleApprove = async (id) => {
    fetch(`http://localhost:3005/manager/leaves/${id}/approve`, {
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
      setShowBtn((prev)=>prev+1)
    } else {
      localStorage.setItem(`showBtnManager${idBtn}`, true);
      setShowBtn((prev)=>prev+1)
    }
  };
  return (
    <div
      className={` ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 px-8 rounded-xl w-full overflow-x-auto col-span-4`}
    >
      <div className="py-6">
        <div
          className={`border-b flex items-center w-full justify-between ${
            usecon.darkMode && "borderDarkLine"
          }`}
        >
          <h5
            className={` tracking-wider ${
              usecon.darkMode && "darkMainColor"
            } px-2`}
          >
            {t("upcomingvacationManager")}
          </h5>
        </div>
      </div>
      {/* <div className="w-full table-container"> */}
      <table className="w-full table-container px-2 overflow-x-auto">
        <tbody>
          <tr>
            {keys.map((key,index) => (
              <td
              key={index}
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {t(key)}
              </td>
            ))}
          </tr>
          {users.map((user, id) => (
            <tr>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {user.user_id}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 w-40 text-white"
                } px-2 py-1.5`}
              >
                {getName(user.name,2)}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5 w40`}
              >
                {user.status_leave_type}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5 w64`}
              >
                {user.applied_on}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5 w28`}
              >
                {getFromToDate(user.from)}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5 w28`}
              >
                {getFromToDate(user.to)}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                <div className="flex items-center">
                  <div
                    className={` ${
                      localStorage.getItem(`showBtnManager${user.id}`)
                        ? "hidden"
                        : "flex"
                    } flex items-center w-fit gap-x-1.5`}
                  >
                    <div
                      onClick={() => handleApprove(user.id)}
                      className="text-white text-center cursor-pointer py-1 text-sm font-medium   px-1 w-20 font-medium  bg-green-500 rounded-lg"
                    >
                      Approve
                    </div>
                    <div
                      onClick={() => handleReject(user.id)}
                      className="text-white text-center cursor-pointer py-1 text-sm font-medium   px-1 w-20 font-medium bg-red-500 rounded-lg"
                    >
                      Reject
                    </div>
                  </div>
                  <div
                    onClick={() => btnControl(user.id)}
                    className="text-white flex items-center w-full justify-center text-center py-1"
                  >
                    <span className="w-3.5 h-3.5 cursor-pointer bg-orange-500 rounded-lg"></span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default UpcomingRequests;
