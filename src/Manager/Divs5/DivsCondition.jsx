import React, { useContext, useEffect, useState } from "react";
import "./Divs5.css";
import { useTranslation } from "react-i18next";
import { CreateContext } from "../../Context/Context";

const DivsCondition = () => {
  const usecon = useContext(CreateContext);
  const [t, i18n] = useTranslation();
  const [name, setName] = useState("");
  const [jobPost,setJobPost]=useState("")
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:1813/dashboard/userDetails", {
      headers: {
        Accept: "Application/json",
        Authorization: "Bearer " + token,
      },
    }).then((jso) =>
      jso.json().then((res) => {
        setName(res.user.empName)
        setJobPost(res.user.jobPost)
      })
    );
  }, []);
  const getName = () => {
    if (name != "") {
      return (
        name.toString().split(" ")[0] +
        " " +
        name.toString().split(" ")[1]+
        " " +
        name.toString().split(" ")[2]+
        " " +
        name.toString().split(" ")[3]
      );
    }
  };
  if (window.location.pathname == "/profile"||window.location.pathname == "/profilemanager") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("profileTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (
    window.location.pathname == "/payroll" ||
    window.location.pathname == "/payroll/payslip"||
    window.location.pathname == "/payroll/employeeSalary"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("payslipTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }else if (
    window.location.pathname == "/employeeDetails"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("Employee Details")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (window.location.pathname == "/calender"||window.location.pathname == "/calendarmanager") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("calendarTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }else if (window.location.pathname == "/leaveRequests") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("Employee Leave Requests")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }  else if (window.location.pathname == "/attendence"||window.location.pathname == "/attendnacemanager") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("attendanceTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (window.location.pathname == "/dashboard/applyLeave"||window.location.pathname == "/leavesmanager") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("leaveTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }
   else if (
    window.location.pathname == "/mainPage" ||
    window.location.pathname == "/dashboard/userDetails"
  ) {
    return (
      <div>
        <h3 className={`text-2xl m-0 p-0 ${usecon.darkMode && "darkModeWel"}`}>
          {t("Welcome")}, <span className="OriginalColor">{getName(name)}</span>
        </h3>
        <p className="text-center OriginalColor text-xl">
          {jobPost}
        </p>
      </div>
    );
    // 
  }else if (
    window.location.pathname == "/annualBalanceReport"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("Annual Balance Report")}</h5>
      </div>
    );
    // Annual Balance Report
  }else if (
    window.location.pathname == "/leaveReportManager"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("Leave Type Report")}</h5>
      </div>
    );
  }else if (
    window.location.pathname == "/employeeAttendanceManager"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("Employee Attendance")}</h5>
      </div>
    );
    // employeeAttendanceManager
  } else {
    return (
      <div>
        <h3 className={`text-2xl m-0 p-0 ${usecon.darkMode && "darkModeWel"}`}>
          {t("Welcome")}, <span className="OriginalColor">{getName(name)}</span>
        </h3>
        <p className="text-center OriginalColor text-xl">
          {jobPost}
        </p>
      </div>
    );
  }
};

export default DivsCondition;
