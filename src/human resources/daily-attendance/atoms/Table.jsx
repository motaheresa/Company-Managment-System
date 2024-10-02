/* eslint-disable no-fallthrough */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPenToSquare } from "react-icons/fa6";
import apiAuth from "../../../Atoms/apiAuth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Download_Excel_Pdf_Btn from "../../atoms/Download_Excel_Pdf_Btn";
import getName from "../../../Atoms/getName";
import naeemImg from "../../../images/naeem_logo_1024white.png";
import CheckStatus from "../../../Atoms/CheckStatus";
import MultipleSelectCheckmarks from "../../../Atoms/filterations/MultipleSelectCheckmarks";

const headers = [
  "Id",
  "Name",
  "Shift Start",
  "Shift End",
  "Date",
  "Day",
  "Check In",
  "Check Out",
  "Device Name",
  "Late In",
  "Early Out",
  "Work Hours",
  "Short Hours",
  "Day Type",
  "Status",
];

const Table = ({
  cloneData,
  pages,
  setCloneData,
  data,
  start,
  end,
  setStart,
  setEnd,
  currentPage,
  setCurrentPage,
  handleSubmit,
  setStatus,
  setLoading,
  params,
  isTableAppeared,
}) => {
  const token = localStorage.getItem("token");
  const [checkInSelected, setCheckInSelected] = useState({});
  const [checkInCloneSelected, setCheckInCloneSelected] = useState({});
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  console.log(selectedColumns);

  const tableRef = useRef(null);
  const pdfRef = useRef(null);
  useEffect(() => {
    if (isTableAppeared) {
      tableRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTableAppeared]);
  const getValueCheckIn = (oneData) => {
    const match = oneData?.checkIn?.match(/T(\d{2}:\d{2}:\d{2})/);
    if (match) {
      return oneData.checkIn.match(/T(\d{2}:\d{2}:\d{2})/)[1];
    } else {
      return oneData.checkIn;
    }
  };
  const getValueCheckOut = (oneData) => {
    const match = oneData?.checkOut?.match(/T(\d{2}:\d{2}:\d{2})/);
    if (match) {
      return oneData.checkOut.match(/T(\d{2}:\d{2}:\d{2})/)[1];
    } else {
      return oneData.checkOut;
    }
  };
  const handleEditClick = (oneData) => {
    setCheckInSelected(oneData);
    setCheckInCloneSelected(oneData);
  };
  const compare_selected_clone = (oneData) => {
    if (oneData.id == checkInSelected.id) {
      if (
        Object.keys(checkInSelected).length > 0 &&
        Object.keys(checkInCloneSelected).length > 0
      ) {
        if (checkInSelected.checkIn != checkInCloneSelected.checkIn) {
          return true;
        }
        return false;
      }
      return false;
    }
  };
  const compare_selected_clone_Out = (oneData) => {
    if (oneData.id == checkInSelected.id) {
      if (
        Object.keys(checkInSelected).length > 0 &&
        Object.keys(checkInCloneSelected).length > 0
      ) {
        if (checkInSelected.checkOut != checkInCloneSelected.checkOut) {
          return true;
        }
        return false;
      }
      return false;
    }
  };
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCloneData(
      cloneData.map((data) => {
        if (data.id == checkInSelected.id) {
          const selectedObject = { ...data, [name]: value };
          setCheckInSelected(selectedObject);
          return selectedObject;
        } else {
          return data;
        }
      })
    );
  };
  const handleNext = () => {
    if (currentPage < pages) {
      setStart((prev) => prev + 30);
      setEnd((prev) => prev + 30);
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
      setStart(0);
      setEnd(30);
    }
  };
  const handleBefore = () => {
    if (currentPage > 1) {
      setStart((prev) => prev - 30);
      setEnd((prev) => prev - 30);
      setCurrentPage((prev) => prev - 1);
    } else {
      for (let i = 30; i < data.length; i += 30) {
        if (currentPage != pages) {
          setCurrentPage((prev) => prev + 1);
          setStart((prev) => prev + 30);
          setEnd((prev) => prev + 30);
        }
      }
    }
  };
  const handleSaveCheckIn = (event) => {
    setCheckInCloneSelected((prev) => ({ ...prev, ...checkInSelected }));
    const condition1 =
      !checkInSelected.checkIn?.includes("T") && checkInSelected.checkIn;
    const condition2 =
      !checkInSelected.checkOut?.includes("T") && checkInSelected.checkOut;
    const updatingValues = {
      ...(condition1 && {
        checkIn: `${checkInSelected.day.split("T")[0]} ${
          checkInSelected.checkIn
        }`,
      }),
      ...(condition2 && {
        checkOut: `${checkInSelected.day.split("T")[0]} ${
          checkInSelected.checkOut
        }`,
      }),
    };
    setLoading(true);
    axios
      .patch(
        `http://localhost:1813/hr/attendance/${checkInSelected.id}`,
        updatingValues,
        apiAuth(token)
      )
      .then((res) => {
        setStatus("Success");
        console.log(res.data.data);
        handleSubmit(event);
      })
      .catch((err) => {
        console.log(err);
        setStatus("Failed");
      })
      .finally(() => setLoading(false));
  };
  const handleDownload = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
    });
    const mappedData = cloneData.map((row) => {
      if (selectedColumns.length > 0) {
        return selectedColumns.map((ele) => {
          let value;
          switch (ele) {
            case "name":
              value = getName(row.name, 2) || "";
              break;
            case "day":
              value = new Date(row.day).toLocaleDateString();
              break;
            case "checkOut":
              value = row.checkOut ? getValueCheckOut(row) : "";
              break;
            case "status":
              value = row.status
                ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                : "";
              break;
            case "checkIn":
              value = row.checkIn ? getValueCheckIn(row) : "";
              break;
            default:
              value = row[ele];
          }
          return value;
        });
      } else {
        return [
          row.userid || "",
          getName(row.name, 3) || "",
          row.startShift || "",
          row.endShift || "",
          new Date(row.day)?.toLocaleDateString(), // Format date as needed
          row.week_day,
          row.checkIn ? getValueCheckIn(row) : "", // Format time as needed
          row.checkOut ? getValueCheckOut(row) : "",
          row.deviceName || "", // Handle null values
          row.late || "",
          row.early || "",
          row.workHour || "",
          row.shortHour || "",
          row.day_type || "",
          row.status
            ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
            : "",
        ];
      }
    });
    console.log(mappedData);

    const selectedData = mappedData.filter((ele) => ele !== false);
    console.log(selectedData);

    pdf.setFontSize(10);
    let x = 235;
    let y = 10;
    let startY = 50;
    const img = new Image();
    img.src = naeemImg;
    img.crossOrigin = "anonymous"; // This is important for avoiding CORS issues with external images

    img.onload = () => {
      // Convert the image to a canvas and get Base64 data
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imgData = canvas.toDataURL("image/jpeg");

      // Add the image to the PDF
      pdf.addImage(imgData, "JPEG", 10, 10, 20, 20);
      const time = new Date().toLocaleString();
      pdf.text(time, 10, 5);
      params.split("&").forEach((ele, index) => {
        if (params[index]) {
          pdf.text(`${ele}`, x, y);
          y += 6;
        }
      });
      while (y >= startY) {
        startY += 6;
      }
      pdf.autoTable({
        head: [selectedColumns.length > 0 ? selectedColumns : headers],
        body: selectedData,
        startY: startY,
        theme: "grid", // 'striped', 'grid', or 'plain'
        margin: { top: 20 }, // Margin from top
        styles: { fontSize: 10 }, // Font size
        headStyles: { fillColor: [239, 111, 36] }, // Header color
      });

      pdf.save("daily-attendance.pdf");
    };
  };
  const handleExportExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Map the data into a 2D array format required by XLSX
    const worksheetData = [
      selectedColumns.length > 0 ? selectedColumns : headers, // Add headers as the first row
      ...data.map((row) => {
        if (selectedColumns.length > 0) {
          return selectedColumns.map((ele) => {
            let value;
            switch (ele) {
              case "name":
                value = getName(row.name, 2) || "";
                break;
              case "day":
                value = new Date(row.day).toLocaleDateString();
                break;
              case "checkOut":
                value = row.checkOut ? getValueCheckOut(row) : "";
                break;
              case "status":
                value = row.status
                  ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                  : "";
                break;
              case "checkIn":
                value = row.checkIn ? getValueCheckIn(row) : "";
                break;
              default:
                value = row[ele];
            }
            return value;
          });
        }
        return [
          row.userid || "",
          getName(row.name, 3) || "",
          row.startShift || "",
          row.endShift || "",
          new Date(row.day).toLocaleDateString(), // Format date as needed
          row.week_day,
          row.checkIn ? getValueCheckIn(row) : "", // Format time as needed
          row.checkOut ? getValueCheckOut(row) : "",
          row.deviceName || "", // Handle null values
          row.late || "",
          row.early || "",
          row.workHour || "",
          row.shortHour || "",
          row.day_type || "",
          row.status
            ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
            : "",
        ];
      }),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 23 },
      { wch: 40 },
      { wch: 23 },
      { wch: 23 },
      { wch: 23 },
      { wch: 23 },
      { wch: 23 },
      { wch: 40 },
      { wch: 23 },
    ];
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "daily-attendance.xlsx");
  };
  return (
    <div
      className={`${
        isTableAppeared
          ? "scale-100 visible opacity-100 "
          : "invisible scale-0 opacity-0 h-0 w-0"
      } duration-500  overflow-auto`}
    >
      <div className="flex items-center pt-4 pb-2 justify-between px-3 py-1">
        <div>
          <button
            className="borderBackgroundHover px-2.5 py-2 text-xl text-white rounded-tl-lg rounded-bl-lg"
            onClick={handleBefore}
          >
            <FaArrowLeft />
          </button>
          <button
            className="borderBackgroundHover px-2.5 py-2 text-xl text-white rounded-tr-lg rounded-br-lg"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="OriginalColor text-xl font-medium tracking-wider">
            Attendance Details
          </span>
          <div>
            <span className="OriginalColor italic font-medium text-lg">
              {currentPage}
            </span>
            <span className="text-lg italic"> / {pages}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <div>
            <label>Select Columns:</label>
            <select className="mb-2.5 p-2.5 w-full" multiple name="" id="">
              <option style={{background:"#000"}} value="id">Id</option>
              <option value="name">Name</option>
              <option value="shift start">Shift Start</option>
              <option value="shift end">Shift End</option>
              <option value="date">Date</option>
              <option value="day">Day</option>
              <option value="check in">Check In</option>
              <option value="check out">Check Out</option>
              <option value="device name">Device Name</option>
              <option value="late in">Late In</option>
              <option value="early out">Early Out</option>
              <option value="work hours">Work Hours</option>
              <option value="short hours">Short Hours</option>
              <option value="day type">Day Type</option>
              <option value="status">Status</option>
            </select>
          </div> */}
          <MultipleSelectCheckmarks
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <Download_Excel_Pdf_Btn
            handleExcel={handleExportExcel}
            handlePdf={handleDownload}
          />
        </div>
      </div>
      <div ref={pdfRef}>
        <table
          id="table-attendance-hr"
          ref={tableRef}
          className="min-w-full bg-white my-2 mx-0 px-4 border"
        >
          <thead className="border-b border-gray-200 text-gray-600">
            {headers.map((header, index) => (
              // <div className="">
              <th
                key={index}
                className={` text-center relative bg-opacity-10 py-2 border-r bg-gray-400 text-gray-500`}
              >
                {header}
              </th>
              // </div>
            ))}
          </thead>
          <tbody className="text-gray-500">
            {cloneData.slice(start, end).map((oneData) => (
              <tr className="border-b" key={oneData.id}>
                <td className=" py-2 border-r text-center ">
                  {oneData.userid}
                </td>
                <td className=" py-2 border-r text-center ">
                  {getName(oneData.name, 3)}
                </td>

                <td className=" py-2 border-r text-center ">
                  {oneData.startShift}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.endShift}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.day.split("T")[0]}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.week_day}
                </td>
                <td className="relative py-2 border-r text-center ">
                  <input
                    type="text"
                    name="checkIn"
                    value={oneData && getValueCheckIn(oneData)}
                    onClick={() => handleEditClick(oneData)}
                    onChange={handleEditChange}
                    className={`outline-none w-16 ${
                      (oneData.updated == "CHECK_IN" ||
                        oneData.updated == "BOTH") &&
                      "text-red-500"
                    } h-full `}
                  />
                  {compare_selected_clone(oneData) && (
                    <div
                      onClick={handleSaveCheckIn}
                      className="absolute -right-5 -top-5 cursor-pointer OriginalColor"
                    >
                      <FaPenToSquare className="text-xl" />
                    </div>
                  )}
                </td>
                <td className="relative py-2 border-r text-center ">
                  <input
                    type="text"
                    name="checkOut"
                    value={oneData && getValueCheckOut(oneData)}
                    onClick={() => handleEditClick(oneData)}
                    onChange={handleEditChange}
                    className={`outline-none w-16  ${
                      (oneData.updated == "CHECK_OUT" ||
                        oneData.updated == "BOTH") &&
                      "text-red-500"
                    } h-full `}
                  />
                  {compare_selected_clone_Out(oneData) && (
                    <div
                      onClick={handleSaveCheckIn}
                      className="absolute -right-5 -top-5 cursor-pointer OriginalColor"
                    >
                      <FaPenToSquare className="text-xl" />
                    </div>
                  )}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.deviceName}
                </td>
                <td className=" py-2 border-r text-center ">{oneData.late}</td>
                <td className=" py-2 border-r text-center ">{oneData.early}</td>
                <td className=" py-2 border-r text-center ">
                  {oneData.workHour}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.shortHour}
                </td>
                <td className=" py-2 border-r text-center ">
                  {oneData.day_type}
                </td>
                <td
                  style={{ width: "8rem" }}
                  className={`py-2 border-r text-center `}
                >
                  <div
                    style={{ fontSize: "15px" }}
                    className={`${CheckStatus(
                      oneData.status
                    )} mx-auto w-fit px-1.5 text-white rounded-lg border-1 mx-1 font-semibold`}
                  >
                    {oneData.status.charAt(0).toUpperCase() +
                      oneData.status.slice(1)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
