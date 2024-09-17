import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import { getShift } from "../../Atoms/getShift";
import { useFetch } from "../../network/useFetch";
// toString
const TimingShiftDetails = ({ attendanceData }) => {
  const THE_TODAY = new Date().toString().split(" ")[0];
  const usecon = useContext(CreateContext);
  const [t] = useTranslation();
  const user_details = useFetch("/dashboard/userDetails")
  
  const CalcProgreesBarPercentage = () => {
    let val = 50;
      let getEle =  attendanceData?.data?.attendance[0]?.workHour?.split(":")?.[0];
      console.log(getEle);
      switch (getEle) {
        case "08":
          val = 100;
          break;

        case "07":
          val = 90;
          break;

        case "06":
          val = 70;
          break;

        case "04":
          val = 40;
          break;

        case "03":
          val = 30;
          break;

        case "02":
          val = 20;
          break;

        case "01":
          val = 10;
          break;

        case "00":
          val = 0;
          break;
        default:
          val = 50;
      };
    return <progress className="w-full" value={val} max={100} />;
  };
  return (
    <div
      className={`col-span-2 w-full ${
        usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
      }  shadow py-4 px-8 rounded-xl ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      }`}
    >
      <div className=" py-6">
        <div
          className={`border-b flex items-center w-full justify-between ${
            usecon.darkMode && "borderDarkLine"
          }`}
        >
          <h5 className={`${usecon.darkMode && "text-white"} tracking-wider`}>
            {t("timingshiftdetails")}
          </h5>
          <div className="flex items-center gap-2">
            <ActiveDay THE_TODAY={THE_TODAY} day={"Sun"} abb={"S"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Mon"} abb={"M"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Tue"} abb={"T"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Wed"} abb={"W"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Thu"} abb={"T"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Fri"} abb={"F"} />
            <ActiveDay THE_TODAY={THE_TODAY} day={"Sat"} abb={"S"} />
          </div>
        </div>
      </div>
      <div>
        {user_details?.data?.user?.shift_start && user_details?.data?.user?.shift_end && (
          <p className={`${usecon.darkMode && "text-gray-300"}`}>
            {t("from") + " "}
            {getShift(user_details?.data?.user?.shift_start) + " "}
            {t("am")} {t("to") + " "}
            {getShift(user_details?.data?.user?.shift_end) + " "}
            {t("pm")}
          </p>
        )}
        <div className="">{CalcProgreesBarPercentage()}</div>
        <div className="flex items-center justify-between  mt-1">
          <div
            className={`${
              usecon.darkMode ? "lightgrayColor" : "darkgrayColor"
            }`}
          >
            {t("duration")}:{" "}
            {user_details?.data?.user?.shift_end?.toString().split(":")[0].slice(-2) -
              user_details?.data?.user?.shift_start?.toString().split(":")[0].slice(-2)}{" "}
            {t("hrs")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingShiftDetails;

export const ActiveDay = ({ THE_TODAY, day, abb }) => {
  return (
    <span
      className={` ${
        THE_TODAY == day && "OriginalColor"
      } font-semibold text-gray-500`}
    >
      {abb}
    </span>
  );
};
