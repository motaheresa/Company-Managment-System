import React, { memo, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import getName from "../../../Atoms/getName";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import "jspdf/dist/polyfills.es.js";
import { Arabicfont } from "../../../Atoms/ArabicFont";
import * as XLSX from "xlsx";
import Download_Excel_Pdf_Btn from "../../atoms/Download_Excel_Pdf_Btn";
import naeemImg from "../../../images/naeem_logo_1024white.png";
import { status_table_leaves } from "../../../Atoms/status_table_leaves";

const headers = [
  "Userid",
  "Name",
  "Leave Type",
  "Applied on",
  "Start Date",
  "End Date",
  "Total Days",
  "Leave Reason",
  "Status",
  // "Action",
];
const Table = ({
  pages,
  data,
  start,
  end,
  setStart,
  setEnd,
  currentPage,
  setCurrentPage,
  setStatus,
  setLoading,
  isTableAppeared,
  params,
}) => {
  const [showOneEmp, setShowOneEmp] = useState(false);
  const [user, setUser] = useState({});
  const tableRef = useRef(null);
    useEffect(() => {
    if (data.length > 0) {
      setTimeout(()=>{tableRef.current?.scrollIntoView({ behavior: "smooth" });},400)
    }
  }, [data]);
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
  const isArabic = (text) => {
    const arabicChar = /[\u0600-\u06FF]/;
    return arabicChar.test(text);
  };
  const handleDownload = () => {
    const pdf = new jsPDF({ orientation: "landscape" });
    pdf.addFileToVFS("ArabicFont.ttf", Arabicfont);
    pdf.addFont("ArabicFont.ttf", "ArabicFont", "normal");
    pdf.setFont("ArabicFont");
    pdf.setFontSize(10);

    const mappedData = data.map((row) => [
      row.id || "",
      getName(row.name, 3) || "",
      row.status_leave_type, // Format date as needed
      row.applied_on.split("T")[0],
      row.from.split("T")[0] || "", // Handle null values
      row.to.split("T")[0] || "",
      row.num_days,
      row.leave_reason,
      row.status,
    ]);
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
      const time =new Date().toLocaleString();
      pdf.text(time,10,5)
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
        head: [headers],
        body: mappedData,
        startY: startY,
        theme: "grid", // 'striped', 'grid', or 'plain'
        margin: { top: 20 }, // Margin from top
        styles: { fontSize: 10 }, // Font size
        headStyles: { fillColor: [239, 111, 36] }, // Header color
        didParseCell: (data) => {
          const cellText = data.cell.raw;
          if (isArabic(cellText)) {
            data.cell.styles.font = "ArabicFont";
            data.cell.styles.halign = "right";
          } else {
            data.cell.styles.halign = "left";
          }
        },
      });
      pdf.save("emp-leave-requests-report.pdf");
    };
  };
  const handleExportExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Map the data into a 2D array format required by XLSX
    const worksheetData = [
      headers.slice(0, headers.length - 1), // Add headers as the first row
      ...data.map((row) => [
        row.user_id,
        row.name,
        row.status_leave_type,
        row.applied_on.split("T")[0],
        row.from.split("T")[0],
        row.to.split("T")[0],
        row.num_days,
        row.leave_reason,
        row.status,
      ]),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 15 },
      { wch: 40 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 40 },
      { wch: 20 },
    ];
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "emp-leave-requests-report.xlsx");
  };
  const getStatus = (status) => {
    if (status == "Approved") {
      return " bg-green-100  text-green-500 border-1 border-green-500";
    } else if (status == "Rejected") {
      return " bg-red-100 text-red-500 border-1 border-red-500";
    } else if (status == "Pending") {
      return " bg-yellow-100 text-yellow-500 border-1 border-yellow-500";
    }
  };
  const viewEmp = (emp) => {
    const user = data.find((oneEmp) => emp.id === oneEmp.id);
    setUser(user);
    setShowOneEmp(true);
  };

  return (
    <>
      <ShowOneEmp
        showOneEmp={showOneEmp}
        setShowOneEmp={setShowOneEmp}
        employee={user}
        setLoading={setLoading}
        setStatus={setStatus}
      />
      <div
        className={`${
          isTableAppeared
            ? "scale-100 visible opacity-100 "
            : "invisible scale-0 opacity-0 h-0 w-0"
        } duration-500  overflow-auto`}
      >
        <div className="">
          <div
            ref={tableRef}
            className="flex items-center pt-4 pb-2 justify-between px-3 py-1"
          >
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
                Leaves Details
              </span>
              <div>
                <span className="OriginalColor italic font-medium text-lg">
                  {currentPage}
                  <span className="text-lg italic"> / {pages}</span>
                </span>
              </div>
            </div>
            <div>
              <Download_Excel_Pdf_Btn
                handleExcel={handleExportExcel}
                handlePdf={handleDownload}
              />
            </div>
          </div>
          <div>
            <table
              id="table-attendance-hr"
              className="min-w-full bg-white my-2 px-4 border"
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
                {data?.slice(start, end).map((oneData) => (
                  <tr
                    onClick={() => viewEmp(oneData)}
                    className="cursor-pointer border-b hover:bg-gray-100 duration-150"
                    key={oneData.id}
                  >
                    <td className=" py-2 border-r text-center">
                      {oneData.user_id}
                    </td>
                    <td className=" py-2 border-r text-center">
                      {getName(oneData.name, 3)}
                    </td>
                    <td className=" py-2 border-r  text-center">
                      {oneData.status_leave_type}
                    </td>
                    <td className=" py-2 border-r text-center">
                      {oneData.applied_on.split("T")[0]}
                    </td>
                    <td className=" py-2 border-r text-center">
                      {oneData.from.split("T")[0]}
                    </td>
                    <td className=" py-2 border-r text-center">
                      {oneData.to.split("T")[0]}
                    </td>
                    <td className=" py-2 border-r text-center">
                      {oneData.num_days}
                    </td>
                    <td className=" py-2 relative w-32 border-r text-center">
                      {oneData.leave_reason}
                    </td>
                    <td
                      style={{ width: "5.5rem" }}
                      className={`py-2 border-r text-center `}
                    >
                      <div
                        style={{ fontSize: "15px" }}
                        className={`${status_table_leaves(
                          oneData.status
                        )} text-white rounded-lg border-1 mx-1 px-2 pb-1 font-semibold`}
                      >
                        {oneData.status}
                      </div>
                    </td>
                    {/* <td className="py-2 text-xl  border-r text-center">
                      <div
                        onClick={() => viewEmp(oneData)}
                        className="w-fit p-1 m-auto text-white borderBackgroundHover cursor-pointer rounded-full"
                      >
                        <MdOutlineRemoveRedEye />
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Table);
const token = localStorage.getItem("token");
const ShowOneEmp = ({
  employee,
  showOneEmp,
  setShowOneEmp,
  setLoading,
  setStatus,
}) => {
  const [openFile, setOpenFile] = useState("");
  const showFrame = async (file) => {
    axios
      .get(`${file}`, {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div
      className={`${
        showOneEmp
          ? "scale-100 visible opacity-1"
          : "scale-0 opacity-0 invisible"
      }  fixed top-0 left-0 bg-zinc-200 bg-opacity-40 z-30 flex items-center justify-center w-screen h-screen duration-300`}
    >
      {
        <div
          className={`${
            openFile !== "" ? "flex" : "hidden"
          } fixed z-50 w-full h-full bg-gray-300`}
        >
          <iframe
            title="PDF Viewer"
            src={`${employee.fileSick}`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      }
      <div className="rounded-lg  w-1/2  my-4 bg-white shadow-animation border p-4">
        <div className="flex items-center my-2 justify-between">
          <h3 className="w-full OriginalColor ">Employee Leave Request</h3>
          <span
            onClick={() => setShowOneEmp(false)}
            className="text-3xl cursor-pointer text-red-500 hover:text-red-700"
          >
            <IoCloseCircleOutline />
          </span>
        </div>
        <div className="overflow-x-auto  px-3">
          <table className="min-w-full !rounded-lg bg-white border border-gray-200">
            <tbody>
              {heads.map(
                (key, index) =>
                  employee[keys[index]] && (
                    <tr key={index} className="border-b ">
                      <th
                        className="px-4 py-2 text-left text-gray-600 font-medium bg-gray-50 border-r"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {key}
                      </th>
                      <td
                        onClick={() => showFrame(employee.fileSick)}
                        className={`px-4 py-2 text-gray-700 `}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <span
                          className={`${
                            keys[index] === "fileSick" && "cursor-pointer"
                          }`}
                        >
                          {employee[keys[index]] &&
                          (keys[index] === "applied_on" ||
                            keys[index] === "from" ||
                            keys[index] === "to")
                            ? employee[keys[index]].split("T")[0]
                            : employee[keys[index]]}
                        </span>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const heads = [
  "UserId",
  "Name",
  "Leave Type",
  "Applied on",
  "Start Date",
  "End Date",
  "Total Days",
  "Leave Reason",
  "File Sick",
  "Status",
];

const keys = [
  "user_id",
  "name",
  "status_leave_type",
  "applied_on",
  "from",
  "to",
  "num_days",
  "leave_reason",
  "fileSick",
  "status",
];
