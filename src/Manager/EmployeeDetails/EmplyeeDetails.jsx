import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineDownload } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import "./EmployeeDetails.css";
import SideBar from "../sidebar/SideBar";
import Divs5 from "../Divs5/Divs5";
import { CreateContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import apiAuth from "../../Atoms/apiAuth";
import getName from "../../Atoms/getName";
import { getShift } from "../../Atoms/getShift";

const NameData = [
  "Userid",
  "Name",
  "Email",
  "Branch",
  "JobPosition",
  "Shift Start",
  "Shift End",
];
const EmplyeeDetails = () => {
  const usecon = useContext(CreateContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  useEffect(() => {
    usecon.setEmployeeDetailsManager([])
    const url="http://localhost:1813/manager/employees"
    axios
      .get(url, apiAuth(token))
      .then((res) => {
        res.data.data.employees.map((emp) => {
          res.data.data.shifts.map((shift) => {
            if (emp.userid.trim() == shift.userid.trim()) {
              res.data.data.emails.map((email) => {
                if (emp.userid.trim() == email.userid.trim()) {
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

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className=" w-full">
        <div>
          <Divs5 />
        </div>
        <div className="w-full  px-3 ">
          <div
            className={`${
              usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
            }  ${
              usecon.darkMode ? "darkContainer" : "LightThemeContainer"
            } shadow px-4 py-6 rounded-xl attendencewidthholidays mx-auto`}
          >
            <div className="flex items-center px-1 justify-between w-full">
              <h5
                className={`tracking-wider px-1 OriginalColor pt-3 pb-4 ${
                  usecon.darkMode && "text-white"
                }`}
              >
                {t("Employee Details")}
              </h5>
              <button
                onClick={() => navigate("/employee/downloadManager")}
                className={`border px-2 py-1 rounded-md my-2 flex items-center gap-2`}
              >
                <span className={`${usecon.darkMode && "text-white"}`}>
                  {t("download")}
                </span>
                <span className={`OriginalColor text-xl`}>
                  <HiOutlineDownload />
                </span>
              </button>
            </div>
            <table className={`w-full px-2`}>
              <thead>
                <tr>
                  {NameData.map((data,index) => (
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
                        {t(data)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usecon.EmployeeDetailsManager.length > 0 &&
                  usecon.EmployeeDetailsManager.map((onedata) => (
                    <tr>
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
                        {getName(onedata.username,2)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.Email}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.branch}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {onedata.job}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {getShift(onedata.shift_start)}
                      </td>
                      <td
                        className={`border-1 ${
                          usecon.darkMode && "border-zinc-600 text-white"
                        } px-2 py-2`}
                      >
                        {getShift(onedata.shift_end)}
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

export default EmplyeeDetails;
