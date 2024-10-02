import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import getName from "../../../Atoms/getName";
import axios from "axios";
import * as XLSX from "xlsx";
import Download_Excel_Pdf_Btn from "../../atoms/Download_Excel_Pdf_Btn";
import naeemImg from "../../../images/naeem_logo_1024white.png";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline, MdFileDownload } from "react-icons/md";
import apiAuth from "../../../Atoms/apiAuth";
import { EditUser } from "./EditUserPayslip";

const Table = ({
  pages,
  data,
  start,
  end,
  setStart,
  setEnd,
  setStatus,
  setLoading,
  setData,
  currentPage,
  setCurrentPage,
  isTableAppeared,
  params,
}) => {
  const [Id_For_Edited, set_Id_For_Edited] = useState(false);
  const token = localStorage.getItem("token");
  const tableRef = useRef(null);
  useEffect(() => {
    if (isTableAppeared) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [isTableAppeared]);
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
        const mappedData1 = data.map((row) => [
          row.userId || "",
          getName(row.name, 3) || "",
          row.gross_salary, // Format date as needed
          row.transportation_allowance,
          row.account_number || "", // Handle null values
          row.bank || "",
          row.cash,
          row.loans_insurance,
          row.social_insurance,
          row.amount_advance,
          row.penalties,
          row.medical_insurance,
          row.premium_card,
        ]);
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
      pdf1.save(`payslip-${new Date().toLocaleString()}-1.pdf`);

      // Second PDF
      const pdf2 = new jsPDF({ orientation: "landscape" });
      pdf2.setFontSize(10);
      for (let i = 0; i < 1; i++) {
        const mappedData2 = data.map((row) => [
          row.mobile,
          row.tax,
          row.other_deductions,
          row.late_days,
          row.early_days,
          row.absent_days,
          row.late_amount,
          row.early_amount,
          row.absent_amount,
          row.total_deduction,
          row.net_pay,
          row.from.split("T")[0],
          row.to.split("T")[0],
          row.createdAt.split("T")[0],
        ]);

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
      pdf2.save(`payslip-${new Date().toLocaleString()}-2.pdf`);
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
      headers.slice(0, headers.length - 1), // Add headers as the first row
      ...data.map((row) => [
        row.userId,
        getName(row.name, 3),
        row.gross_salary,
        row.transportation_allowance,
        row.account_number,
        row.bank,
        row.cash,
        row.loans_insurance,
        row.social_insurance,
        row.amount_advance,
        row.penalties,
        row.medical_insurance,
        row.premium_card,
        row.mobile,
        row.tax,
        row.other_deductions,
        row.late_days,
        row.early_days,
        row.absent_days,
        row.late_amount,
        row.early_amount,
        row.absent_amount,
        row.total_deduction,
        row.net_pay,
        row.from.split("T")[0],
        row.to.split("T")[0],
        row.createdAt.split("T")[0],
      ]),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 15 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
    ];
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "emp-leave-requests-report.xlsx");
  };
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    setLoading(true);
    axios
      .delete(`http://localhost:1813/pay-slip/${id}`, apiAuth(token))
      .then((res) => {
        setStatus("Success");
        setData(() => data.filter((ele) => ele.id !== id));
      })
      .catch((err) => {
        setStatus("Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const Edit_Data_After_EditCompleted = (id, edited_data) => {
    const newData = data.map((ele) => {
      if (ele.id === id) {
        Object.keys(edited_data).forEach((oneData) => {
          ele[oneData] = edited_data[oneData];
        });
      }
      return ele;
    });
    setData(() => newData);
  };
  return (
    <>
      <EditUser
        Id_For_Edited={Id_For_Edited}
        set_Id_For_Edited={set_Id_For_Edited}
        setStatus={setStatus}
        Edit_Data_After_EditCompleted={Edit_Data_After_EditCompleted}
      />
      <Suspense fallback={<h1>Loading...</h1>}>
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
                  Payslip Details
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
                className=": min-w-full bg-white my-2 px-4 border"
              >
                <thead className="border-b border-gray-200 text-gray-600">
                  {headers.map((header, index) => (
                    // <div className="">
                    <th
                      key={index}
                      className={` px-2 text-center relative bg-opacity-10 py-2 border-r bg-gray-400 text-gray-500`}
                    >
                      <div className={`w-28 ${header == "Name" && "w-44"}`}>
                        {header}
                      </div>
                    </th>
                    // </div>
                  ))}
                  <th
                    className={` px-2 text-center relative bg-opacity-10 py-2 border-r bg-gray-400 text-gray-500`}
                  >
                    <div className="w-28">Action</div>
                  </th>
                </thead>
                <tbody className="text-gray-500">
                  {data?.slice(start, end).map((oneData) => (
                    <tr
                      className=" min-w-full border-b  duration-200"
                      key={oneData.id}
                    >
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.userId}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        <div className="w-44">{getName(oneData.name, 3)}</div>
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.gross_salary}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.transportation_allowance}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.account_number}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.bank}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.cash}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.loans_insurance}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.social_insurance}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.amount_advance}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.penalties}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.medical_insurance}
                      </td>

                      <td className=" py-3 border-r text-center px-2">
                        {oneData.premium_card}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.mobile}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.tax}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.other_deductions}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.late_days}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.early_days}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.absent_days}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.late_amount}
                      </td>

                      <td className=" py-3 border-r text-center px-2">
                        {oneData.early_amount}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.absent_amount}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.total_deduction}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.net_pay}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.from.split("T")[0]}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.to.split("T")[0]}
                      </td>
                      <td className=" py-3 border-r text-center px-2">
                        {oneData.createdAt.split("T")[0]}
                      </td>
                      <td>
                        <div className="flex items-center gap-1 justify-center">
                          <span
                            style={{
                              backgroundColor: "#007BFF",
                              border: "1px solid #007BFF",
                            }}
                            onClick={() => {
                              localStorage.setItem(
                                "emp_pay",
                                JSON.stringify(oneData)
                              );
                              window.open("/hr/download-emp-payslip", "_blank");
                            }}
                            className=" text-white cursor-pointer hover:!text-blue-600 hover:!bg-transparent duration-300 rounded-full text-lg p-1.5"
                          >
                            <MdFileDownload />
                          </span>
                          <span
                            onClick={() => set_Id_For_Edited(oneData.id)}
                            style={{
                              backgroundColor: "#28A745",
                              border: "1px solid #28A745",
                            }}
                            className=" text-white cursor-pointer hover:!text-green-600 hover:!bg-transparent duration-300 rounded-full text-lg p-1.5"
                          >
                            <FaEdit />
                          </span>
                          <span
                            onClick={() => handleDelete(oneData.id)}
                            style={{
                              backgroundColor: "#DC3545",
                              border: "1px solid #DC3545",
                            }}
                            className=" text-white z-50 cursor-pointer hover:!text-red-600 hover:!bg-transparent duration-300 rounded-full text-lg p-1.5"
                          >
                            <MdDeleteOutline />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default memo(Table);

const headers = [
  "UserId",
  "Name",
  "Gross Salary",
  "Transportation Allowance",
  "Account Number",
  "Bank",
  "Cash",
  "Loans Insurance",
  "Social Insurance",
  "Amount Advance",
  "Penalties",
  "Medical Insurance",
  "Premium Card",
  "Mobile",
  "Tax",
  "Other Deductions",
  "Late Days",
  "Early Days",
  "Absent Days",
  "Late_Amount",
  "Early_Amount",
  "Absent Amount",
  "Total Deduction",
  "NetPay",
  "From",
  "To",
  "CreatedAt",
];
