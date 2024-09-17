import React from "react";
import Divs5 from "../Divs5/Divs5";
import DashboardDetails from "../DashboardDetails/DashboardDetails";
import DashboardDetails2 from "../DashboardDetails2/DashboardDetails2";
import Dasboardgraph from "../DasboardGraphs/Dasboardgraph";
import DashboardDetails3 from "../DashboardDetails3/DashboardDetails3";
import { Emp_Leaves } from "../Context/emp/Emp_Leaves";
import { Emp_Attendance } from "../Context/emp/Emp_Attendance";

const DashboardContent = () => {
  return (
    <div className="w-full items-start">
      <Divs5 />
      <Emp_Leaves>
        <DashboardDetails />
      </Emp_Leaves>
        <Emp_Attendance>
        <DashboardDetails2 />
        </Emp_Attendance>
      <Dasboardgraph />
      <DashboardDetails3 />
    </div>
  );
};

export default DashboardContent;
