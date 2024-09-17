import React, { useContext } from "react";
import "./DashboardDetails2.css";
import AttendanceDetails from "./atoms/AttendanceDetails";
import { attendance_context } from "../Context/emp/Emp_Attendance";
import TimingShiftDetails from "./atoms/TimingShiftDetails";

const DashboardDetails2 = () => {
  const { data, error, loading } = useContext(attendance_context);
if (loading) return <div>Loading... </div>
if(error)throw new Error("Error in line 31 Page Dashoard Details")
  return (
    <div className=" grid grid-cols-5 justify-center WidthDashBoardDetails mx-auto gap-2 my-16">
        <TimingShiftDetails attendanceData={data} />
        <AttendanceDetails attendanceData={data}/>
    </div>
  );
};

export default DashboardDetails2;
