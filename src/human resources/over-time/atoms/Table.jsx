import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Download_Excel_Pdf_Btn from "../../atoms/Download_Excel_Pdf_Btn";
import naeemImg from "../../../images/naeem_logo_1024white.png";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const headers = ["Userid", "Name", "CreatedAt", "From", "To", "Amount"];
const Table = ({
  pages,
  data,
  start,
  end,
  setStart,
  setEnd,
  setData,
  currentPage,
  setStatus,
  setLoading,
  params,
  setCurrentPage,
  isTableAppeared,
}) => {
  const tableRef = useRef(null);
  const pdfRef = useRef(null);
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
  const handleDownload = () => {
    const pdf = new jsPDF({ orientation: "landscape" });
    pdf.setFontSize(10);
    const mappedData = data.map((row) => [
      row.userId,
      row.name,
      row.createdAt.split("T")[0],
      row.from.split("T")[0],
      row.to.split("T")[0],
      row.amount,
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
      const time = new Date().toLocaleString();
      pdf.text(time, 10, 5);
      params.split("&").forEach((ele, index) => {
        if (params[index]) {
          pdf.text(`${ele}`, x, y);
          y += 10;
        }
      });
      if (y >= startY) {
        startY += 13;
      }
      pdf.autoTable({
        head: [headers],
        body: mappedData,
        startY: startY,
        theme: "grid", // 'striped', 'grid', or 'plain'
        margin: { top: 20 }, // Margin from top
        styles: { fontSize: 10 }, // Font size
        headStyles: { fillColor: [239, 111, 36] }, // Header color
      });
      pdf.save("over-time.pdf");
    };
  };
  const handleExportExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Map the data into a 2D array format required by XLSX
    const worksheetData = [
      headers, // Add headers as the first row
      ...data.map((row) => [
        row.userId,
        row.name,
        row.createdAt.split("T")[0],
        row.from.split("T")[0],
        row.to.split("T")[0],
        row.amount,
      ]),
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["!cols"] = [
      { wch: 15 }, // Width of column A
      { wch: 40 }, // Width of column B
      { wch: 25 }, // Width of column C
      { wch: 25 }, // Width of column D
      { wch: 25 }, // Width of column D
    ];
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "over-time.xlsx");
  };
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .patch(`http://localhost:3005/over-time/${id}`)
      .then((res) => {
        const newData=data.filter((one) => one.id != id);
        setData(() => newData);
        setStatus("Success");
      })
      .catch((err) => {
        setStatus("Failed");
      })
      .finally(() => {
        setLoading(false);
      });
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
              Overtime Report
            </span>
            <div>
              <span className="OriginalColor italic font-medium text-lg">
                {currentPage}
              </span>
              <span className="text-lg italic"> / {pages}</span>
            </div>
          </div>
          <div>
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
              <th
                className={` text-center relative bg-opacity-10 py-2 border-r bg-gray-400 text-gray-500`}
              >
                Action
              </th>
            </thead>
            <tbody className="text-gray-500">
              {data?.slice(start, end).map((oneData, index) => (
                <tr className="border-b" key={`${oneData.id}${index}`}>
                  <td className=" py-2 border-r text-center">
                    {oneData.userId}
                  </td>
                  <td className=" py-2 border-r text-center">{oneData.name}</td>
                  <td className=" py-2 border-r text-center">
                    {oneData.createdAt.split("T")[0]}
                  </td>
                  <td className=" py-2 border-r text-center">
                    {oneData.from.split("T")[0]}
                  </td>
                  <td className=" py-2 border-r text-center">
                    {oneData.to.split("T")[0]}
                  </td>
                  <td className=" py-2 border-r text-center">
                    {oneData.amount}
                  </td>
                  <td className=" py-2 text-xl border-r  text-center">
                    <div
                      onClick={() => handleDelete(oneData.id)}
                      className="mx-auto text-white p-2 cursor-pointer w-fit borderBackgroundHover rounded-full"
                    >
                      <MdDeleteOutline className="" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
