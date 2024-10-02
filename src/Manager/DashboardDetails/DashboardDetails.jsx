import React, { useContext, useEffect, useState } from "react";
import "./DashboardDetails.css";
import { FaUserClock, FaUsers, FaUsersSlash } from "react-icons/fa6";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import axios from "axios";

const DashboardDetails = () => {
  const [t, i18n] = useTranslation();
  const token = localStorage.getItem("token");
  const usecon = useContext(CreateContext);
  // const [pending, setPending] = useState();
  // const [TodayAbsent,setTodayAbsent]=useState("")
  const [counter,setCounter]=useState({
    pending:"",
    TodayAbsent:"",
    TotalEmployees:""
  })

  useEffect(() => {
    axios
      .get("http://localhost:1813/manager/leaves", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setCounter((prev)=>({...prev,pending:res.data.data.pending})));
        axios
          .get("http://localhost:1813/manager/today-absent", {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => setCounter((prev)=>({...prev,TodayAbsent:res.data.data.counter})));
          axios
          .get("http://localhost:1813/manager/employees", {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => setCounter((prev)=>({...prev,TotalEmployees:res.data.data.emp_counter})));
  }, []);

  return (
    <div
      className={`${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } w-fit mx-auto flex items-center justify-center shadow rounded-xl ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      }`}
    >
      <div className="flex items-center text-center justify-center gap-2 py-8">
        <div className="flex flex-col items-center OriginalColor text-3xl">
          <div>
            <FaUsers />
          </div>
          <div
            className={`border-r px-4 flex items-center gap-2 justify-center ${
              usecon.darkMode && "borderDarkLine"
            } `}
          >
            <div
              className={`${
                usecon.darkMode
                  ? "text-white text-xl font-normal"
                  : "text-zinc-600 text-xl"
              } text-xl tracking-wider`}
            >
              {t("Total Employees")}
            </div>
            <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
              <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
                {counter.TotalEmployees}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center OriginalColor text-3xl">
          <div>
            <FaUserClock />
          </div>
          <div
            className={`border-r px-4 flex items-center gap-2 justify-center ${
              usecon.darkMode && "borderDarkLine"
            } `}
          >
            <div
              className={`${
                usecon.darkMode
                  ? "text-white text-xl font-normal"
                  : "text-zinc-600 text-xl"
              } text-xl tracking-wider`}
            >
              {t("Pending Requests")}
            </div>
            <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
              <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
                {counter.pending}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center OriginalColor text-3xl">
          <div>
            <FaUsersSlash />
          </div>
          <div
            className={`border-r px-4 flex items-center gap-2 justify-center ${
              usecon.darkMode && "borderDarkLine"
            } `}
          >
            <div
              className={`${
                usecon.darkMode
                  ? "text-white text-xl font-normal"
                  : "text-zinc-600 text-xl"
              } text-xl tracking-wider`}
            >
              {t("Todays Absent")}
            </div>
            <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
              <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
                {counter.TodayAbsent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;
