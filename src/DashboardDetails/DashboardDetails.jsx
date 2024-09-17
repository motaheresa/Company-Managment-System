import React, { useContext } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import "./DashboardDetails.css";
import { FaUserClock } from "react-icons/fa6";
import { FaUserTag } from "react-icons/fa6";
import { CreateContext } from "../Context/Context";
import { FaUserSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { HiUser } from "react-icons/hi2";
import { useFetch } from "../network/useFetch";

const DashboardDetails = () => {
  const [t] = useTranslation();
  const usecon = useContext(CreateContext);
  const leave_counter=useFetch("/me/leave-counters")
  
  return (
    <div
      className={`${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } WidthDashBoardDetails mx-auto shadow rounded-xl ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      }`}
    >
      <div className="flex items-center text-center justify-center gap-2 py-8">
        <div
          className={`border-r px-4 ${usecon.darkMode && "borderDarkLine"} `}
        >
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } tracking-wider`}
          >
            {t("AppliedLeave")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <AiOutlineUserSwitch />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.applied_leaves||0}
            </div>
          </div>
        </div>
        <div
          className={`border-r px-4 ${usecon.darkMode && "borderDarkLine"} `}
        >
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } text-xl tracking-wider`}
          >
            {t("earlyout")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <FaUserClock />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.early_permissions||0}
            </div>
          </div>
        </div>
        <div
          className={`border-r px-4 ${usecon.darkMode && "borderDarkLine"} `}
        >
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } text-xl tracking-wider`}
          >
            {t("latein")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <AiOutlineUserSwitch />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.late_permissions||0}
            </div>
          </div>
        </div>
        <div
          className={`border-r px-4 ${usecon.darkMode && "borderDarkLine"} `}
        >
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } text-xl tracking-wider`}
          >
            {t("totalmonthypermission")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <FaUserTag />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.availablePermissions}
            </div>
          </div>
        </div>
        <div
          className={`border-r px-4 ${usecon.darkMode && "borderDarkLine "} `}
        >
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } text-xl tracking-wider`}
          >
            {t("totalmonthlyleave")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <FaUserSlash />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.total_leaves||0}
            </div>
          </div>
        </div>
        <div className=" px-4 text-center">
          <h2
            className={`${
              usecon.darkMode
                ? "text-white text-xl font-normal"
                : "text-zinc-600 text-xl"
            } text-xl tracking-wider`}
          >
            {t("totalannual")}
          </h2>
          <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
            <div
              className={`${
                usecon.darkMode ? "text-4xl font-normal" : "text-4xl"
              }`}
            >
              <HiUser />
            </div>
            <div className={`${usecon.darkMode ? "text-xl" : "text-2xl"}`}>
              {leave_counter?.data?.data?.used_balance||0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;
