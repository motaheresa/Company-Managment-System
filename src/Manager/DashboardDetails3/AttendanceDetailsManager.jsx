import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";
import getCheck from "../../Atoms/getCheck";
import CheckStatus from "../../Atoms/CheckStatus";

const AttendanceDetailsManager = () => {
  const [users, setUsers] = useState([]);
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const url="http://localhost:3005/manager/attendance"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
        res.data.data.attendance.map((att)=>{
          const attDay=new Date(att.day).getDate()
          if(attDay==new Date().getDate()){
            setUsers((prev)=>[...prev,att])
          }
        })
      });
  }, []);
  const keys = [
    "Userid",
    "Name",
    "checkinData",
    "checkoutData",
    "daytypeData",
    "statusData",
  ];
  return (
    <div
      className={` ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } col-span-1 ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 px-1 rounded-xl`}
    >
      <div className="py-6">
        <div
          className={`border-b flex items-center w-full justify-between ${
            usecon.darkMode && "borderDarkLine"
          }`}
        >
          <h5
            className={` tracking-wider ${usecon.darkMode && "darkMainColor"}`}
          >
            {t("attendancedetails")}
          </h5>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <table className="w-full">
          <tr>
            {keys.map((key,index) => (
              <td
              key={index}
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-1 py-1.5`}
              >
                {t(key)}
              </td>
            ))}
          </tr>
          <tbody>
            {users.map((user) => (
              <tr>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  } px-1 py-1.5`}
                >
                  {user.userid}
                </td>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  }  py-1.5`}
                >
                  {getName(user.name,2)}
                </td>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  } px-1 py-1.5`}
                >
                  {getCheck(user.checkIn)}
                </td>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  } px-1 py-1.5`}
                >
                  {getCheck(user.checkOut)}
                </td>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600 text-white"
                  } px-1 py-1.5`}
                >
                  {user.day_type}
                </td>
                <td
                  className={`border-1 ${
                    usecon.darkMode && " border-zinc-600  text-white"
                  } px-1 py-1.5   `}
                >
                  <div
                    className={`${CheckStatus(user.status)} max-w-fit font-semibold rounded-md py-1 text-sm px-2 mx-auto text-center`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDetailsManager;
