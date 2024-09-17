import React from "react";
import {  FaHouseUser } from "react-icons/fa6";
import "./Navbar.css";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoSyncOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="grid grid-cols-6 text-center w-full mx-auto gap-x-4 gap-y-4 ">
      <NavBtn
        label="Employee Details"
        className={"itemHeaderHr"}
        icon={<FaHouseUser />}
        link={"/hr/employee-details"}
      />
      <NavBtn
        label="Daily Attendance"
        className={"itemHeaderHr"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.111 11.111">
              <g fill="#ec783d" data-name="26. Clipboard">
                <path
                  d="M8.681 11.111h-6.25a1.04 1.04 0 0 1-1.042-1.042V2.431a1.04 1.04 0 0 1 1.042-1.042h.347a.347.347 0 0 1 0 .694h-.347a.347.347 0 0 0-.347.347v7.639a.347.347 0 0 0 .347.347h6.25a.347.347 0 0 0 .347-.347V5.556a.347.347 0 0 1 .694 0v4.514a1.04 1.04 0 0 1-1.042 1.042m.694-6.597a.347.347 0 0 1-.347-.347V2.431a.347.347 0 0 0-.347-.347H6.944a.347.347 0 0 1 0-.694H8.68a1.04 1.04 0 0 1 1.042 1.042v1.736a.347.347 0 0 1-.347.347"
                  className="colorff8000 svgShape"
                />
                <path
                  d="M6.597 2.778H4.514a.694.694 0 0 1-.694-.694v-.695a.694.694 0 0 1 .694-.694h2.083a.694.694 0 0 1 .694.694v.694a.694.694 0 0 1-.694.694M4.514 1.388v.694h2.083v-.693Z"
                  className="colorff8000 svgShape"
                />
                <path
                  d="M5.556 1.389a.347.347 0 0 1-.347-.347V.347a.347.347 0 0 1 .694 0v.694a.347.347 0 0 1-.347.347M4.514 5.902H3.125a.347.347 0 0 1-.347-.347V4.166a.347.347 0 0 1 .347-.347h1.389a.347.347 0 0 1 .347.347v1.389a.347.347 0 0 1-.347.347m-1.042-.694h.694v-.694h-.694Zm1.042 3.819H3.125a.347.347 0 0 1-.347-.347V7.291a.347.347 0 0 1 .347-.347h1.389a.347.347 0 0 1 .347.347V8.68a.347.347 0 0 1-.347.347m-1.042-.694h.694v-.694h-.694Z"
                  className="colorff8000 svgShape"
                />
                <path
                  d="M7.986 5.208H5.903a.347.347 0 0 1 0-.694h2.083a.347.347 0 0 1 0 .694m0 3.125H5.903a.347.347 0 0 1 0-.694h2.083a.347.347 0 0 1 0 .694"
                  className="colorff8040 svgShape"
                />
              </g>
            </svg>
          </svg>
        }
        link={"/hr/daily-attendance"}
      />
            <NavBtn
        label="Employee Leaves Request"
        className={"itemHeaderHr"}
        icon={
          <svg
            fill="#EC783D"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
          >
            <path d="M68.75 68.75v18.75H18.75V12.5h31.25V6.25H18.75a6.25 6.25 0 0 0 -6.25 6.25v75a6.25 6.25 0 0 0 6.25 6.25h50a6.25 6.25 0 0 0 6.25 -6.25v-18.75Z" />
            <path d="m92.188 18.125 -10.313 -10.313a5 5 0 0 0 -6.875 0l-43.75 43.75V68.75h17.188l43.75 -43.75a5 5 0 0 0 0 -6.875M45.938 62.5H37.5v-8.438l29.375 -29.375 8.438 8.438ZM80 28.75l-8.438 -8.75L78.125 13.125l8.438 8.438Z" />
            <path
              data-name="&amp;lt;Transparent Rectangle&amp;gt;"
              fill="none"
              d="M0 0h100v100H0z"
            />
          </svg>
        }
        link={"/hr/employee-leave-request"}
      />
      <NavBtn
        label="Attendance Report"
        className={"itemHeaderHr"}
        icon={
          <svg
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8.334 8.334"
              width="100"
              height="100"
            >
              <g fill="#ec783d" className="colorff8000 svgShape">
                <path d="M6.597 5.903a.695.695 0 0 1-.695-.695v-.347q.07-.625.695-.695c.625-.07.695.313.695.695v.347a.695.695 0 0 1-.695.695m-.695 2.43h1.389q.347 0 .347-.347v-.695c0-.555-.452-1.042-1.042-1.042s-1.042.486-1.042 1.042v.695q0 .347.347.347" />
                <path d="M6.944.695v2.43q0 .347-.347.347c-.347 0-.347-.139-.347-.347V.868q0-.173-.173-.173H1.563q-.174 0-.174.173v6.597q0 .173.173.173h2.951q.347.035.347.347 0 .416-.347.347H1.388a.695.695 0 0 1-.695-.695V.695Q.764.07 1.389 0H6.25a.695.695 0 0 1 .695.695" />
                <path d="M3.716 1.493a.347.347 0 0 0-.486 0l-.452.452-.104-.104a.347.347 0 0 0-.486.486l.347.347a.347.347 0 0 0 .486 0l.695-.695q.208-.243 0-.486m0 2.083a.347.347 0 0 0-.486 0l-.452.452-.104-.104a.347.347 0 0 0-.486.486l.347.347a.347.347 0 0 0 .486 0l.695-.695q.208-.243 0-.486m0 2.083a.347.347 0 0 0-.486 0l-.452.451-.104-.104a.347.347 0 0 0-.486.486l.347.347a.347.347 0 0 0 .486 0l.695-.695q.208-.243 0-.486" />
              </g>
            </svg>
          </svg>
        }
        link={"/hr/attendance-report"}
      />
      <NavBtn
        label="Leaves Report"
        className={"itemHeaderHr"}
        icon={<TbReportAnalytics />}
        link={"/hr/leaves-report"}
      />
      <NavBtn
        label="Annual Balance Report"
        className={"itemHeaderHr"}
        icon={
          <svg
            className="prefix__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="50"
            height="50"
          >
            <g fill="#EC783D">
              <path d="M55.7 90H22.3V13.6h9.5a5 5 0 0 0 4.6 2.9h27.2a5 5 0 0 0 4.7 -3h9.4v44.8c0 1 0.9 2 2 2s1.9 -1 1.9 -2V12.7a3 3 0 0 0 -3.1 -3h-10a5 5 0 0 0 -4.9 -3.4H36.4a5 5 0 0 0 -4.9 3.4h-10a3 3 0 0 0 -3.2 3v78.1a3 3 0 0 0 3.2 3h34.2a2 2 0 0 0 0 -3.8" />
              <path d="M69 39.5a2 2 0 0 0 -2 -2H31.2a3 3 0 0 0 -2.1 -0.8 3 3 0 1 0 2.3 4.8H67a2 2 0 0 0 2 -2M69 53a2 2 0 0 0 -2 -2H31.5a3 3 0 0 0 -2.4 -1 3 3 0 1 0 0 5.8 3 3 0 0 0 2 -0.8h36a2 2 0 0 0 1.9 -2M31.3 64.5h-0.1a3 3 0 0 0 -5 2 3 3 0 0 0 2.9 3 3 3 0 0 0 2.3 -1h29c1 0 2 -1 2 -2s-1 -2 -2 -2zm61.5 -12.8a2 2 0 0 0 -2.6 0.8L71.2 89l-14 -7.7a2 2 0 0 0 -2.7 0.8 2 2 0 0 0 0.8 2.6l15.8 8.7A2 2 0 0 0 74 92l19.6 -37.8a2 2 0 0 0 -0.8 -2.6m-22.1 -19h-42a2.6 2.6 0 0 1 -2.5 -2.6v-8a2.6 2.6 0 0 1 2.6 -2.6h41.9a2.6 2.6 0 0 1 2.6 2.7v8a2.6 2.6 0 0 1 -2.6 2.5" />
            </g>
          </svg>
        }
        link={"/hr/annual-balance-report"}
      />

      <NavBtn
        label="Terminated Report"
        className={"itemHeaderHr"}
        icon={
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
          >
            <g fill="#EC783D">
              <path d="M50 8.333v25q0.833 7.5 8.333 8.333h25v41.667a8.333 8.333 0 0 1 -8.333 8.333h-28.333a27.083 27.083 0 0 0 -19.583 -45.833q-5.417 0 -10.417 2.083V16.667q0.833 -7.5 8.333 -8.333z" />
              <path d="M56.25 10.417V33.333q0 2.083 2.083 2.083h22.917zm-29.167 39.583a22.917 22.917 0 1 1 0 45.833 22.917 22.917 0 0 1 0 -45.833M37.5 65.417a2.083 2.083 0 1 0 -2.917 -2.917l-7.5 7.5L19.583 62.5a2.083 2.083 0 0 0 -2.917 2.917l7.5 7.5L16.667 80.417a2.083 2.083 0 1 0 2.917 2.917l7.5 -7.5L34.583 83.333a2.083 2.083 0 1 0 2.917 -2.917l-7.5 -7.5z" />
            </g>
          </svg>
        }
        link={"/hr/terminated"}
      />
      <NavBtn
      
        label="New Hired Report"
        className={"itemHeaderHr"}
        icon={
          <svg
            fill="#EC783D"
            viewBox="0 0 100 100"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
          >
            <path d="M83.125 6.25H28.75A20.625 20.625 0 0 0 25 47.188v37.813a9.375 9.375 0 0 0 8.75 8.75h50a9.375 9.375 0 0 0 8.438 -8.75V15A9.375 9.375 0 0 0 83.125 6.25M14.063 26.875a15 15 0 1 1 14.688 15 15.625 15.625 0 0 1 -14.688 -15m71.875 58.125a3.125 3.125 0 0 1 -2.813 3.125H33.438a3.125 3.125 0 0 1 -2.813 -3.125v-37.5a21.875 21.875 0 0 0 12.812 -6.25h29.063a2.813 2.813 0 1 0 0 -5.313h-25a21.875 21.875 0 0 0 -4.375 -24.063h40a3.125 3.125 0 0 1 3.125 3.125Z" />
            <path d="M38.125 20a3.125 3.125 0 0 0 -4.063 0L26.25 28.125l-2.813 -3.125a3.125 3.125 0 1 0 -4.063 4.063l5 4.688 1.875 0.938 2.188 -0.938 9.688 -9.375a3.125 3.125 0 0 0 0 -4.375m34.375 27.187h-28.125a2.813 2.813 0 0 0 0 5.625h28.125a2.813 2.813 0 1 0 0 -5.625m0 11.25h-28.125a2.813 2.813 0 1 0 0 5.625h28.125a2.813 2.813 0 0 0 0 -5.625" />
          </svg>
        }
        link={"/hr/newly-hired"}
      />
      <NavBtn
        label="Payslip"
        className={"itemHeaderHr"}
        icon={<MdOutlinePayments width={50} height={50} />
        }
        link={"/hr/payslip"}
      />
      <NavBtn
        label="Overtime Report"
        className={"itemHeaderHr"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="50"
            height="50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1"
              viewBox="0 0 16.7 16.7"
              width="100"
              height="100"
            >
              <path
                fill="#ffab66"
                d="M4.2 13.9v-7h11v7a1.4 1.4 0 0 1-1.3 1.4H5.6a1.4 1.4 0 0 1-1.4-1.4"
                className="prefix__colorCFD8DC prefix__svgShape"
              />
              <path
                fill="#ff8000"
                d="M15.3 5.6v2H4.2v-2a1.4 1.4 0 0 1 1.4-1.4h8.3a1.4 1.4 0 0 1 1.4 1.4"
                className="prefix__colorff8000 prefix__svgShape"
              />
              <path
                d="M13.9 5.6a1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 2 0m-6 0a1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 2 0"
                fill="#37474f"
                className="prefix__color37474F prefix__svgShape"
              />
              <path
                fill="#ff8000"
                d="M12.8 3.5a1 1 0 0 0-.6.7v1.4q0 .6.6.6.9 0 .7-.6V4.2a1 1 0 0 0-.7-.7M7 3.5a1 1 0 0 0-.7.7v1.4q.1.6.7.6.9 0 .7-.6V4.2a1 1 0 0 0-.7-.7m4.2 8.3h1.4v1.4h-1.4zm-2 0h1.3v1.4H9zm-2.2 0h1.4v1.4H7zm4.2-2h1.4V11h-1.4zm-2 0h1.3V11H9zM7 9.8h1.4V11H7z"
                className="prefix__colorff8000 prefix__svgShape"
              />
              <path
                fill="#ff8040"
                className="prefix__colorff8040 prefix__svgShape"
                d="M9.7 5.2a4 4 0 0 1-4.1 4.2 4 4 0 0 1-4.2-4.2 4.2 4.2 0 0 1 8.3 0"
              />
              <path
                fill="#eee"
                className="prefix__coloreee prefix__svgShape"
                d="M8.7 5.2a3 3 0 0 1-3.1 3.1 3 3 0 0 1-3.2-3 3.1 3.1 0 0 1 6.3 0"
              />
              <path d="M5.2 2.8H6v2.4h-.7z" />
              <path d="m7.1 6.3-.4.4-1.4-1.3.5-.4z" />
              <path d="m6 5.2-.4.5a.5.5 0 0 1-.6-.5.5.5 0 0 1 1 0" />
            </svg>
          </svg>
        }
        link={"/hr/over-time"}
      />
      <NavBtn
        label="Calendar"
        className={"itemHeaderHr"}
        icon={
          <svg
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8.333 8.333"
              width="100"
              height="100"
            >
              <g fill="#ec783d" className="colorff8000 svgShape">
                <path d="M2.431.694q.243 0 .243.243v.521h2.951v-.52Q5.66.73 5.903.695q.208 0 .243.243v.521q.729.069 1.076.382t.382 1.042l.035.243H.694v-.243q.035-.694.382-1.042t1.042-.347V.903q.035-.208.278-.243" />
                <path
                  d="M7.639 4.861V3.125H.694v1.736c0 1.319 0 1.979.417 2.361.382.417 1.042.417 2.361.417h1.389c1.319 0 1.979 0 2.361-.417.417-.382.417-1.042.417-2.361"
                  opacity=".5"
                />
                <path d="M6.25 5.903a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0m0-1.389a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0M4.514 5.903a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0m0-1.389a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0M2.778 5.903a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0m0-1.389a.347.347 0 1 1-.694 0 .347.347 0 0 1 .694 0" />
              </g>
            </svg>
          </svg>
        }
        link={"/hr/calendar"}
      />
      <NavBtn
        label="Sync Attendance"
        className={"itemHeaderHr"}
        icon={<IoSyncOutline />}
        link={"/hr/sync-attendance"}
      />
    </div>
  );
};

export default Navbar;

export const NavBtn = ({ label, className, icon, link }) => {
  return (
    <Link to={link} className="no-underline">
      <div
        className={`flex flex-col navbtn-hr cursor-pointer items-center rounded-lg text-white`}
      >
        <div
          className={`${className} rounded flex px-3 py-3 items-center OriginalColor  text-5xl justify-center `}
        >
          {icon}
        </div>
        <div className="text-center w-full my-2 OriginalColor tracking-wider text-lg font-semibold">
          {label}
        </div>
      </div>
    </Link>
  );
};
