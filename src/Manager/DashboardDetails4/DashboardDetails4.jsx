import React from "react";
import { useContext } from "react";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import YearHolidays from "./YearHolidays";
import Announcement from "./Announcement";

const DashboardDetails4 = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  const [t, i18n] = useTranslation();
  return (
    <div className="grid grid-cols-2 WidthDashBoardDetails w-11/12 mx-auto gap-2 mt-16">
      <YearHolidays />
      <Announcement />
    </div>
  );
};

export default DashboardDetails4;
