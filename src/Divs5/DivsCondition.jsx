import React, { useContext, useEffect } from "react";
import { CreateContext } from "../Context/Context";
import "./Divs5.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const DivsCondition = () => {
  const usecon = useContext(CreateContext);
  const [t] = useTranslation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get("http://localhost:3005/dashboard/userDetails", {
        headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token
        }
    })
        .then((res) => usecon.setUser(res.data.user))
        .catch((err) => {
            console.log(err)
        })
}, [])
  if (window.location.pathname == "/profile") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("profileTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (
    window.location.pathname == "/payroll" ||
    window.location.pathname == "/payroll/payslip" ||
    window.location.pathname == "/payroll/employeeSalary"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("payslipTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }else if (
    window.location.pathname == "/leavesmanager" 
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("leaveTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (
    window.location.pathname == "/calender"
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("calendarTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  }else if (window.location.pathname == "/attendence") {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("attendanceTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (
    window.location.pathname == "/dashboard/applyLeave" 
  ) {
    return (
      <div>
        <h5 className="text-3xl OriginalColor">{t("leaveTitle")}</h5>
        {/* <ButtonsTranlator /> */}
      </div>
    );
  } else if (
    window.location.pathname == "/mainPage" ||
    window.location.pathname == "/dashboard/userDetails" 
  ) {
    return (
      <div>
        <h3 className={`text-2xl m-0 p-0 ${usecon.darkMode && "darkModeWel"}`}>
        {t("Welcome")}, <span className="OriginalColor">{usecon.user.empName}</span>
        </h3>
        <p className="text-center OriginalColor text-xl">
          {usecon.user.jobPost ? usecon.user.jobPost : ""}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h3 className={`text-2xl m-0 p-0 ${usecon.darkMode && "darkModeWel"}`}>
          {t("Welcome")}, <span className="OriginalColor">{usecon.user.empName}</span>
        </h3>
        <p className="text-center OriginalColor text-xl">
          {usecon.user.jobPost}
        </p>
      </div>
    );
  }
};

export default DivsCondition;
