import React from "react";
import Navbar from "../components/navbar/Navbar";
import TopHeadbar from "../TopHeadbar/TopHeadbar";
import Counters from "../components/counters/Counters";
import Announcment from "../components/announcment/Announcment";
import Holidays from "../components/Holidays/Holidays";

const HrDashboard = () => {
  return (
    <div className="w-full pb-4 px-4">
        <TopHeadbar />
      <div className=" space-y-8">
        <Navbar />
        <Counters />
        <div className="grid grid-cols-2 gap-8">
          <Announcment />
          <Holidays />
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
