import React, { useContext, useEffect, useRef } from "react";
import { CreateContext } from "../../Context/Context";
import { useReactToPrint } from "react-to-print";
import image1 from "../../images/naeem_logo_1024white.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { HiOutlineDownload } from "react-icons/hi";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const DownloadEmployeeAttendance = () => {
  const usecon = useContext(CreateContext);
  const [t] = useTranslation();
  const pdfRef = useRef();
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    pageStyle: `@media print {
            @page {
              size: 350mm 350mm;
              margin: 0;
            }
          }`,
  });
  useEffect(()=>{
    usecon.EmployeeAttendance.length===0&&navigate(-1)
  },[])
  const getTo_AND_FROM=(date)=>{
    const newDate=date.split("-")
    const day=newDate[2].slice(0,2);
    const month=newDate[1]
    const year=newDate[0]
    return `${day}-${month}-${year}`
  }
  const NameData = [
    "Userid",
    "Name",
    "Day",
    t("dateData"),
    t("devicenameData"),
    "Check In",
    "Check Out",
    t("lateinData"),
    t("earlyoutData"),
    t("workhourData"),
    t("shorthourData"),
    "DT",
    t("statusData"),
  ];
  const getCheck = (date) => {
    let hour = new Date(date).getUTCHours();
    let minutes = new Date(date).getUTCMinutes();
    let seconds = new Date(date).getUTCSeconds();
    if (hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }
    return `${hour}:${minutes}:${seconds}`;
  };
  const getName = (name) => {
    const getname = name.toString().split(" ");
    if (name != "") {
      return getname[0] + " " + getname[1];
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">
      <div className="w-full z-20 relative  left-2/4 gap-2 -translate-x-2/4  flex justify-center items-center">
        <button
          className="absloute w-28 h-8 border-2 flex items-center justify-between borderBackgroundHover text-white border-white hover:bg-transparent OriginalColor rounded-lg px-2 my-2 top-10 left-2/4 -translate-x-2/4 "
          onClick={() => handlePrint()}
        >
          <span>Download</span>
          <span className="text-lg">
            <HiOutlineDownload />
          </span>
        </button>
        <button
          className="absloute w-28 h-8 border-2 flex items-center justify-between borderBackgroundHover text-white hover:bg-transparent OriginalColor rounded-lg px-2 my-2 top-10 left-2/4 -translate-x-2/4 "
          onClick={() => navigate(-1)}
        >
          <span>Back</span>
          <span className="text-sm">
            <ExitToAppIcon />
          </span>
        </button>
      </div>
      <div ref={pdfRef} className="bg-white rounded w-11/12 min-h-full h-fit px-4 py-4">
        <div className="flex items-center justify-center w-full mb-6">
          {usecon.FilterEmployeeAtt.From != "" ? (
            <div className="flex items-center gap-6 font-semibold">
              <span>From: {usecon.FilterEmployeeAtt.From + " "}</span>{" "}
              <span>To: {usecon.FilterEmployeeAtt.To}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className=" w-full flex items-center relative justify-between mx-auto py-6 px-4 ">
          <h4 className="tracking-wider OriginalColor">Employee Attendance</h4>

          <div className="">
            <img className="w-20" src={image1} alt="" />
          </div>
        </div>
        <div className="w-full  py-3 px-4 mx-auto">
          <table className={`w-full `}>
            <thead>
              <tr>
                {NameData.map((data) => (
                  <th
                    className={`border-1  px-2 py-2`}
                  >
                    <div
                      className={` font-normal`}
                    >
                      {data}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usecon.EmployeeAttendance.length > 0 &&
                usecon.EmployeeAttendance.map((onedata) => (
                  <tr>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.userid}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {getName(onedata.name)}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.week_day}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {getTo_AND_FROM(onedata.day)}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.deviceName}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {getCheck(onedata.checkIn)}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {getCheck(onedata.checkOut)}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.late}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.early}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.workHour}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.shortHour}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      {onedata.day_type}
                    </td>
                    <td
                      className={`border-1  px-2 py-2`}
                    >
                      <div
                        className={`px-2  max-w-fit font-semibold rounded-md py-1 text-xs`}
                      >
                        {onedata.status.charAt(0).toUpperCase() +
                          onedata.status.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownloadEmployeeAttendance;
