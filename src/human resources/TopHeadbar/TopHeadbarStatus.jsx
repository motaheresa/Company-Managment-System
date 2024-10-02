import React, { useContext, useEffect } from "react";
import "./TopHeadbar.css";
import axios from "axios";
import { CreateContext } from "../../Context/Context";

const TopHeadbarStatus = () => {
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:1813/dashboard/userDetails", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => usecon.setUser(res.data.user))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (window.location.pathname == "/hr/employee-details") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Employee Details</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/daily-attendance") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Daily Attendance</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/leaves-report") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Leaves Report</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/annual-balance-report") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Annual Balance Report</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/employee-leave-request") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Employee Leave Requests</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/attendance-report") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Attendance Report</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/calendar") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">My Calendar</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/profile") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">My Profile</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/payslip") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">My Payslip</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/newly-hired") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Newly Hired</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/terminated") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Terminated</h5>
      </div>
    );
  }else if (window.location.pathname == "/hr/over-time") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">Overtime Report</h5>
      </div>
    );
  } else {
    return (
      <div>
        <h3 className={`text-2xl m-0 p-0 ${usecon.darkMode && "darkModeWel"}`}>
          Welcome, <span className="OriginalColor">{usecon.user.empName}</span>
        </h3>
        <p className="text-center OriginalColor text-xl">
          {usecon.user.jobPost}
        </p>
      </div>
    );
  }
};

export default TopHeadbarStatus;
