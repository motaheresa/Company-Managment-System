import React, { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../Context/Context";
import "./DashboardDetails3.css";
import { useTranslation } from "react-i18next";
import AnnualBalance from "./AnnualBalance";
import AttendanceDetailsManager from "./AttendanceDetailsManager";

const DashboardDetails3 = () => {
  const usecon = useContext(CreateContext);
  const [t, i18n] = useTranslation();
  return (
    <div className=" grid grid-cols-2 WidthDashBoardDetails w-11/12 mx-auto gap-2 mt-16">
    <AnnualBalance/>
    <AttendanceDetailsManager/>
  </div>
  );
};

export default DashboardDetails3;
