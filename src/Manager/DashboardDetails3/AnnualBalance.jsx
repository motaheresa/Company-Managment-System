import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";

const AnnualBalance = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [t, i18n] = useTranslation();
  const keys = [
    "Userid",
    "Name",
    "leavebalance",
    "remainingbalance",
    "usedbalance",
  ];
  useEffect(() => {
    const url="http://localhost:1813/manager/annual-balance"
    axios
      .get(url, apiAuth(token))
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={` ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } col-span-1 ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      } shadow py-4 px-2 rounded-xl h-fit`}
    >
      <div
        className={`flex items-center ${
          usecon.darkMode && "darkMainColor borderDarkLine"
        } tracking-wider border-b justify-between pt-4 pb-1`}
      >
        <h5 className={`tracking-wider`}>{t("Annual Balance")}</h5>
      </div>
      <div
        className={`w-full ${
          usecon.darkMode ? "darkContainer" : "LightThemeContainer"
        }`}
      >
        <table className={`mt-6 w-full`}>
          <tr className="">
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
                } px-1 py-1.5`}
              >
                <div className="">{getName(user.Username,2)}</div>
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-1 py-1.5`}
              >
                {user.emp_leav_bal}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-1 py-1.5`}
              >
                {user.emp_leav_bal-user.used_leave_bal}
              </td>
              <td
                className={`border-1 ${
                  usecon.darkMode && " border-zinc-600 text-white"
                } px-1 py-1.5`}
              >
                {user.used_leave_bal}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AnnualBalance;
