import React, { useContext, useEffect } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SideBar from "../sidebar/SideBar";
import Divs5 from "../Divs5/Divs5";
import { useNavigate } from "react-router";
import { HiOutlineDownload } from "react-icons/hi";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";

const AnnualBalanceReport = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t] = useTranslation();
  const navigate = useNavigate();
  const keys = [
    "Userid",
    "Name",
    "leavebalance",
    "remainingbalance",
    "usedbalance",
    "Carry Over Balance",
  ];
  useEffect(() => {
    const url="http://localhost:1813/manager/annual-balance"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
        console.log(res.data.data);
        
        usecon.setAnnualBalanceReport(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-fit">
        <SideBar />
      </div>
      <div className="w-full">
        <div className="w-full">
          <Divs5 />
        </div>
        <div className="mx-6">
          <div
            className={` ${
              usecon.darkMode ? "darkContainer" : "LightThemeContainer"
            } col-span-1 ${
              usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
            } shadow py-4 px-2 rounded-xl h-fit`}
          >
            <div className="flex items-center mx-3 justify-between gap-2">
              <h5
                className={`tracking-wider pt-2 pb-2 OriginalColor ${
                  usecon.darkMode && "text-white"
                }`}
              >
                {t("Annual Balance Report")}
              </h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/download/annualBalance")}
                  className={`border px-3 py-1 rounded-md my-2 flex items-center gap-2`}
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
            <div
              className={`w-full px-3 ${
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
                      } px-3 py-1.5`}
                    >
                      {t(key)}
                    </td>
                  ))}
                </tr>
                {usecon.AnnualBalanceReport.map((user) => (
                  <tr key={user.userid}>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      {user.userid}
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      <div className="">{getName(user.Username,2)}</div>
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      {user.emp_leav_bal}
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      {user.emp_leav_bal - user.used_leave_bal}
                    </td>
                   
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      {user.used_leave_bal}
                    </td>
                    <td
                      className={`border-1 ${
                        usecon.darkMode && " border-zinc-600 text-white"
                      } px-3 py-1.5`}
                    >
                      {user.carry_over_bal}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualBalanceReport;
