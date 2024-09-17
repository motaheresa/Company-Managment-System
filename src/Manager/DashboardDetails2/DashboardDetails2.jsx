import React, { useContext, useEffect, useState } from "react";
import "./DashboardDetails2.css";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import UpcomingRequests from "./UpcomingRequests";
import TodaysAbsent from "./TodaysAbsent";

const DashboardDetails2 = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();

  return (
    <div className="flex flex-col  WidthDashBoardDetails w-11/12 mx-auto gap-2 mt-12 space-y-4">
      <TodaysAbsent/>
      <UpcomingRequests />
    </div>
  );
};

export default DashboardDetails2;
