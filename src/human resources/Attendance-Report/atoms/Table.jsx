import React, { memo, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "jspdf/dist/polyfills.es.js";
import * as XLSX from "xlsx";
import Download_Excel_Pdf_Btn from "../../atoms/Download_Excel_Pdf_Btn";
import naeemImg from "../../../images/naeem_logo_1024white.png";

const headers = [
  "Id",
  "Name",
  "Shift Start",
  "Shift End",
  "Company",
  "Branch",
  "Sector",
  "Site",
  "Job Position",
  "Study Leave",
  "Sick Leave",
  "Early out Permission",
  "Mission Leave",
  "Work From Home",
  "Public Holiday",
  "Late Permission",
  "Unpaid Leave",
  "Maternity Leave",
  "Marriage Leave",
  "Annual Leave",
  "Casual Leave",
  "Present",
  "Absent",
  "Weekend",
  "Public Holiday Present",
  "Week End Present",
  "Total Work Hours",
  "Total Short Hours",
];
const DATA_KEYS = [
  "emp_no",
  "emp_eng_name",
  "shift_start",
  "shift_end",
  "Branch",
  "Sector",
  "Site",
  "Company",
  "JobPost",
  "study_leave",
  "sick_leave",
  "early_out_permission",
  "mission_leave",
  "work_from_home",
  "public_holiday",
  "late_permission",
  "unpaid_leave",
  "maternity_leave",
  "marriage_leave",
  "annual_leave",
  "casual_leave",
  "present",
  "absent",
  "weekend",
  "public_holiday_present",
  "week_end_present",
  "total_work_hours",
  "total_short_hours",
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
  isTableAppeared,
  params,
}) => {
  const tableRef = useRef(null);
  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
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

  const handleDownload = () => {
    const img = new Image();
    img.src = naeemImg;
    img.crossOrigin = "anonymous"; // Avoid CORS issues for external images

    img.onload = () => {
      // First PDF
      const pdf1 = new jsPDF({ orientation: "landscape" });
      pdf1.setFontSize(10);
      for (let i = 0; i < 1; i++) {
        const mappedData1 = data.slice(0, headers.length / 2).map((row) =>
          DATA_KEYS.map((key) => {
            return typeof row[key] !== "object"
              ? row[key]
              : row[key] && row[key][getKeyObjData(row[key])];
          })
        );

        let x = 235;
        let y = 10;
        let startY = 50;

        // Add the image to the first PDF
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imgData = canvas.toDataURL("image/jpeg");

        pdf1.addImage(imgData, "JPEG", 10, 10, 20, 20);
        const time = new Date().toLocaleString();
        pdf1.text(time, 10, 5);

        params.split("&").forEach((ele, index) => {
          if (params[index]) {
            pdf1.text(`${ele}`, x, y);
            y += 6;
          }
        });

        // Generate the table for the first PDF
        pdf1.autoTable({
          head: [headers.slice(0, headers.length / 2)],
          body: mappedData1,
          startY: startY,
          theme: "grid",
          margin: { top: 20 },
          styles: { fontSize: 10 },
          headStyles: { fillColor: [239, 111, 36] },
        });
      }

      // Save the first PDF
      pdf1.save(`attendance-report-${new Date().toLocaleString()}-1.pdf`);

      // Second PDF
      const pdf2 = new jsPDF({ orientation: "landscape" });
      pdf2.setFontSize(10);
      for (let i = 0; i < 1; i++) {
        const mappedData2 = data.map((row) =>
          DATA_KEYS.slice(headers.length / 2, headers.length).map((key) => {
            return typeof row[key] !== "object"
              ? row[key]
              : row[key] && row[key][getKeyObjData(row[key])];
          })
        );

        let x = 235;
        let y = 10;
        let startY = 50;

        // Add the image to the second PDF
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imgData = canvas.toDataURL("image/jpeg");
        pdf2.addImage(imgData, "JPEG", 10, 10, 20, 20);
        const time = new Date().toLocaleString();
        pdf2.text(time, 10, 5);

        params.split("&").forEach((ele, index) => {
          if (params[index]) {
            pdf2.text(`${ele}`, x, y);
            y += 6;
          }
        });
        // Generate the table for the second PDF
        pdf2.autoTable({
          head: [headers.slice(headers.length / 2, headers.length)],
          body: mappedData2,
          startY: startY,
          theme: "grid",
          margin: { top: 20 },
          styles: { fontSize: 10 },
          headStyles: { fillColor: [239, 111, 36] },
        });
      }

      // Save the second PDF
      pdf2.save(`attendance-report-${new Date().toLocaleString()}-2.pdf`);
    };

    img.onerror = (err) => {
      console.error("Error loading image: ", err);
    };
  };

  const handleExportExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Map the data into a 2D array format required by XLSX
    const worksheetData = [
      headers.slice(0, headers.length), // Add headers as the first row
      ...data.map((row) =>
        DATA_KEYS.map((key) => {
          return typeof row[key] !== "object"
            ? row[key]
            : row[key] && row[key][getKeyObjData(row[key])];
        })
      ),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "emp-leave-requests-report.xlsx");
  };
  const getKeyObjData = (obj) => {
    return Object.keys(obj).find((key) => /eng_label$/.test(key));
  };
  return (
    <>
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
          {/* <div className=""> */}
          <table
            id="table-attendance-hr"
            className="min-w-full overflow-x-auto bg-white my-2 px-4 border"
          >
            <thead className="border-b border-gray-200  text-gray-600">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={` text-center !sticky top-0 z-20 bg-opacity-10 py-2 border-r bg-gray-400 text-gray-500`}
                >
                  {header}
                </th>
              ))}
            </thead>
            <tbody className="text-gray-500">
              {data?.slice(start, end).map((oneData) => (
                <tr className="border-b duration-150" key={oneData.id}>
                  {DATA_KEYS.map((key) => (
                    <td className=" py-2 border-r text-center">
                      <div className="w-36">
                        {typeof oneData[key] !== "object" && oneData[key]}
                        {typeof oneData[key] === "object" &&
                          oneData[key] &&
                          oneData[key][getKeyObjData(oneData[key])]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default memo(Table);
