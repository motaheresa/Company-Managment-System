import React from "react";
import Divs5 from "../Divs5/Divs5";
import DashboardDetails from "../DashboardDetails/DashboardDetails";
import DashboardDetails2 from "../DashboardDetails2/DashboardDetails2";
import DashboardDetails3 from "../DashboardDetails3/DashboardDetails3";
import SideBar from "../sidebar/SideBar";
import DashboardDetails4 from "../DashboardDetails4/DashboardDetails4";

const ManagerDashboard = () => {
  return (
    <div className="w-full flex items-start">
      <div className="sticky bottom-0 top-0">
        <SideBar />
      </div>
      <div className="w-full">
        <div>
          <Divs5 />
        </div>
        <div>
          <DashboardDetails />
        </div>
        <div>
          <DashboardDetails2 />
        </div>
        <div>
          <DashboardDetails3 />
        </div>
        <div>
          <DashboardDetails4 />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
