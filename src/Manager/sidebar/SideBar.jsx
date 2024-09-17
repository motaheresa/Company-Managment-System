import React, { useContext, useState } from "react";
import "./SideBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BiSolidUserAccount, BiSolidUserCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiSolidUserX } from "react-icons/bi";
import { Link } from "react-router-dom";
import image from "../../images/naeem_logo_1024white.jpeg";
import image2 from "../../images/tra.png";
import { CreateContext } from "../../Context/Context";
import { BiSolidPencil } from "react-icons/bi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { TbLogout, TbMessageReport } from "react-icons/tb";
import { PiUserCircleBold } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import image3 from "../../images/_1024نعيم.png";
import {
  FaClipboardUser,
  FaHouseUser,
  FaUser,
  FaUserTag,
  FaUserTie,
  FaUsers,
} from "react-icons/fa6";

//w-11/12
const SideBar = () => {
  const [SettingSidebar, setprofileLiMenu] = useState(false);
  const [AttendanceMenu, setAttendanceLiMenu] = useState(false);
  const [LeavesMenu, setLeavesLiMenu] = useState(false);
  const [PayslipMenu, setPayslipLiMenu] = useState(false);
  // setAttendanceLiMenu
  const [t, i18n] = useTranslation();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.pathname = "/auth/login";
  };

  const usecon = useContext(CreateContext);
  // link
  return (
    <section
      className={` relative ${usecon.toggle && "active"}  ${
        usecon.darkMode ? "darkContainer" : "LightThemeContainer"
      } SideSec bottom-4  rounded `}
    >
      <div
        className={`py-3 h-full px-1 rounded-xl flex ${
          usecon.toggle == true && SettingSidebar == false ? "gap-4" : "gap-6"
        } ${
          usecon.toggle == true && SettingSidebar == true ? "gap-4" : "gap-4"
        }  flex-col `}
      >
        {/* <Link to="/mainPage"> */}
        {localStorage.getItem("i18nextLng") == "en-US" ||
        localStorage.getItem("i18nextLng") == "en" ? (
          usecon.darkMode ? (
            <div className="flex items-center justify-center  pt-3">
              <img src={image2} alt="" className="w-28 mt-4 p-2" />
            </div>
          ) : (
            <div className="flex items-center justify-center pt-3">
              <img src={image} alt="" className="w-28 mt-4" />
            </div>
          )
        ) : (
          <div className="flex items-center justify-center pt-3">
            <img src={image3} alt="" className="w-28 mt-4" />
          </div>
        )}
        {/* </Link> */}
        <Link to="/managerdashboard" className="text-decoration-none">
          <div className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                title="Dashboard"
                className={`${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
              >
                <AiOutlineHome />
              </span>
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "text-zinc-600"
                } text-lg tracking-wider`}
              >
                {t("dashboard")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to="/employeeDetails" className="text-decoration-none">
          <div className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                title="Attendance Details"
                className={`${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
              >
                <LiaUserCheckSolid />
              </span>
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "text-zinc-600"
                } flex items-center text-lg tracking-wider`}
              >
                {t("Employee Details")}
                {/* <span className={`${usecon.toggle && "hidden"}`}>{t("Employee")} </span>
                <span>{t("Details")}</span> */}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        {/* <Link to="/dashboard/applyLeave" className="text-decoration-none"> */}
        <div
          onClick={() => setAttendanceLiMenu(!AttendanceMenu)}
          className="relative hoverColor flex items-center justify-between px-2 duration-200 rounded py-1"
        >
          <div className="flex items-center gap-3">
            <span
              title="Attendance"
              className={`${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
            >
              <FaUserTag />
            </span>
            <div
              className={`${
                usecon.darkMode ? "text-white" : "text-zinc-600"
              }  text-lg  tracking-wider`}
            >
              {t("Attendance")}
            </div>
          </div>
          <div className={`OriginalColor arrow `}>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className={`${
            AttendanceMenu == true && usecon.toggle == false ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <div>
            <Link to="/attendnacemanager" className="text-decoration-none">
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "OriginalColor"
                } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
              >
                <span>{t("attendanceTitle")}</span>
                <span title="My Attendance">
                  <FaUserTie />
                </span>
              </div>
            </Link>
          </div>
          <Link
            to="/employeeAttendanceManager"
            className="text-decoration-none"
          >
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
            >
              <span>{t("Employee Attendance")}</span>
              <span title="Emplyee Attendance">
                <FaUser />
              </span>
            </div>
          </Link>
        </div>
        <div
          className={`${
            AttendanceMenu && usecon.toggle == true ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <Link to="/attendnacemanager">
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="My Attendance" className="text-lg">
                <FaUserTie />
              </span>
            </div>
          </Link>
          <div
            className={`OriginalColor  px-2 text-lg py-2 ${
              usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
            } rounded-lg `}
          >
            <span title="Employee Attendance" className="text-lg">
              <FaUser />
            </span>
          </div>
        </div>
        {/* </Link> */}
        {/* <Link to="/profile" className="text-decoration-none"> */}
        <div
          onClick={() => setLeavesLiMenu(!LeavesMenu)}
          className="relative hoverColor flex items-center justify-between px-2 duration-200 rounded py-1"
        >
          <div className="flex items-center gap-3">
            <span
              title="Leaves"
              className={`${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
            >
              <FaClipboardUser />
            </span>
            <div
              className={`${
                usecon.darkMode ? "text-white" : "text-zinc-600"
              }  text-lg  tracking-wider`}
            >
              {t("Leaves")}
            </div>
          </div>
          <div className={`OriginalColor arrow `}>
            <IoIosArrowForward />
          </div>
        </div>

        <div
          className={`${
            LeavesMenu == true && usecon.toggle == false ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <Link to="/leavesmanager" className="text-decoration-none">
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
            >
              <span>{t("leaveTitle")}</span>
              <span L className="text-lg">
                <PiUserCircleBold />
              </span>
            </div>
          </Link>
          <Link to="/leaveRequests" className="text-decoration-none">
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
            >
              <span title="Employee Leave Requests">
                {t("Employee Leave Requests")}
              </span>
              <span className="text-lg">
                <BiSolidUserAccount />
              </span>
            </div>
          </Link>
          <Link to="/annualBalanceReport" className="text-decoration-none">
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
            >
              <span>{t("Annual Balance Report")}</span>
              <span title="Annual Balance Report" className="text-lg">
                <TbMessageReport />
              </span>
            </div>
          </Link>
          <Link to="/leaveReportManager" className="text-decoration-none">
            <div
              className={`${
                usecon.darkMode ? "text-white" : "OriginalColor"
              } hover:opacity-70 duration-300 cursor-pointer flex justify-between items-center`}
            >
              <span>{t("Leave Type Report")}</span>
              <span title="Leave Type Report" className="text-lg">
                <FaHouseUser />
              </span>
            </div>
          </Link>
        </div>

        <div
          className={`${
            LeavesMenu && usecon.toggle == true ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <Link to="/leavesmanager">
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="My Leaves" className="text-lg">
                <PiUserCircleBold />
              </span>
            </div>
          </Link>
          <div
            className={`OriginalColor  px-2 text-lg py-2 ${
              usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
            } rounded-lg `}
          >
            <span title="Employee Leave Requests" className="text-lg">
              <BiSolidUserAccount />
            </span>
          </div>
          <div
            className={`OriginalColor  px-2 text-lg py-2 ${
              usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
            } rounded-lg `}
          >
            <span title="Annual Balance Report" className="text-lg">
              <TbMessageReport />
            </span>
          </div>
          <div
            className={`OriginalColor  px-2 text-lg py-2 ${
              usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
            } rounded-lg `}
          >
            <span title="Leave Type Report">
              <FaHouseUser />
            </span>
          </div>
        </div>

        {/* <Link to="/payroll" className="text-decoration-none"> */}


        <div
          className={`${
            PayslipMenu && usecon.toggle == true ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <div>
            {/* <Link to="/resetPassword" className="text-decoration-none"> */}
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="My Payslip" className="text-lg">
                <FaUserTie />
              </span>
            </div>
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/forgetPassword" className="text-decoration-none"> */}
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="Employee Payslip">
                <FaUsers />
              </span>
            </div>
            {/* </Link> */}
          </div>
        </div>

        {/* </Link> */}
        <Link to="/profilemanager" className="text-decoration-none">
          <div className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                title="Profile"
                className={`OriginalColor  px-2 text-xl py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg text-zinc-500`}
              >
                <FaUserCircle />
              </span>
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "text-zinc-600"
                } text-lg`}
              >
                {t("profileside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <Link to="/calendarmanager" className="text-decoration-none">
          <div className="hoverColor flex items-center justify-between px-2 duration-200 rounded py-1">
            <div className="flex items-center gap-3">
              <span
                title="Calendar"
                className={`OriginalColor  px-2 text-xl py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg text-zinc-500`}
              >
                <SlCalender />
              </span>
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "text-zinc-600"
                } text-lg`}
              >
                {t("calendarside")}
              </div>
            </div>
            <div className={`OriginalColor arrow `}>
              <IoIosArrowForward />
            </div>
          </div>
        </Link>
        <div
          onClick={() => setprofileLiMenu(!SettingSidebar)}
          className="relative hoverColor flex items-center justify-between px-2 duration-200 rounded py-1"
        >
          <div className="flex items-center gap-3">
            <span
              className={`${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } OriginalColor  px-2 text-xl py-2  rounded-lg text-zinc-500`}
            >
              <CiSettings />
            </span>
            <div
              className={`${
                usecon.darkMode ? "text-white" : "text-zinc-600"
              }  text-lg  tracking-wider`}
            >
              {t("settingside")}
            </div>
          </div>
          <div className={`OriginalColor arrow `}>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className={`${
            SettingSidebar == true && usecon.toggle == false ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-2`}
        >
          <div>
            <Link to="/resetPassword" className="text-decoration-none">
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>{t("Change Password")}</span>
                <span>
                  <BiSolidPencil />
                </span>
              </div>
            </Link>
          </div>
          {/* <div>
            <Link to="/forgetPassword" className="text-decoration-none">
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>Forgotten Password</span>
                <span>
                  <RiLockPasswordLine />
                </span>
              </div>
            </Link>
          </div> */}
          <div>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-decoration-none"
            >
              <div
                className={`${
                  usecon.darkMode ? "text-white" : "OriginalColor"
                } hover:opacity-70 duration-300 flex justify-between items-center`}
              >
                <span>{t("Logout")}</span>
                <span>
                  <TbLogout />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            SettingSidebar && usecon.toggle == true ? "flex" : "hidden"
          } px-2 pb-3 SettingsListSideBar flex-col gap-1`}
        >
          <div>
            {/* <Link to="/resetPassword" className="text-decoration-none"> */}
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="Change Password">
                <BiSolidPencil />
              </span>
            </div>
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/forgetPassword" className="text-decoration-none"> */}
            <div
              className={`OriginalColor  px-2 text-lg py-2 ${
                usecon.darkMode ? "bg-icon-sidebar text-white" : "bg-white icon"
              } rounded-lg `}
            >
              <span title="Forgotten Password">
                <RiLockPasswordLine />
              </span>
            </div>
            {/* </Link> */}
          </div>
          {/* <div>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-decoration-none"
            >
              <div
                className={`OriginalColor  px-2 text-lg py-2 ${
                  usecon.darkMode
                    ? "bg-icon-sidebar text-white"
                    : "bg-white icon"
                } rounded-lg `}
              >
                <span title="Logout">
                  <TbLogout />
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div
        onClick={() => usecon.setToggle(!usecon.toggle)}
        className="toggle"
      ></div>
    </section>
  );
};

export default SideBar;
