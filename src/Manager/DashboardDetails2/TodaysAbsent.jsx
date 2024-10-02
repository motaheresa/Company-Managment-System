import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";
import CheckStatus from "../../Atoms/CheckStatus";
const TodaysAbsent = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  const [users, setUsers] = useState([]);
  const keys = ["Userid", "Name", "daytypeData", "statusData"];

  useEffect(() => {
    const url="http://localhost:1813/manager/today-absent"
    axios
      .get(url, apiAuth(token))
      .then((res) => setUsers(res.data.data.employees));
  }, []);
  return (
    <div
      className={` ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } col-span-1 ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 px-8 rounded-xl w-3/4 text-center mx-auto col-span-2 h-fit`}
    >
      <div
        className={`flex items-center ${
          usecon.darkMode && "darkMainColor borderDarkLine"
        } tracking-wider border-b justify-between pt-4 pb-1`}
      >
        <h5 className={`tracking-wider`}>{t("Todays Absent")}</h5>
      </div>
      <div
        className={`w-full ${
          usecon.darkMode ? "darkContainer" : "LightThemeContainer"
        }`}
      >
        <table className={`mt-6 w-full`}>
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
          {users.map(user => (
            <tr className="" key={user.userid}>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {user.userid}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {getName(user.name,2)}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5`}
              >
                {user.dayType}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-2 py-1.5 `}
              >
                <div
                    className={`px-2 ${CheckStatus(user.status)} max-w-fit mx-auto font-semibold rounded-md py-1 text-sm`}
                  >
                {user.status}
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodaysAbsent;
