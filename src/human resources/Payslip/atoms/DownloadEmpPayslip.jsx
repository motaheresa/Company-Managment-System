import React, { useRef } from "react";
import logo from "../../../images/naeem_logo_1024white.png";
import getName from "../../../Atoms/getName";
import { useReactToPrint } from "react-to-print";
import {  MdOutlineLocalPrintshop } from "react-icons/md";

const DownloadEmpPayslip = () => {
  const ref = useRef(null);
  const emp=JSON.parse(localStorage.getItem("emp_pay"))
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    pageStyle: `@media print {
            @page {
              size: 350mm 350mm;
              margin: 0;
            }
          }`,
  });
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div
          onClick={() => handlePrint()}
          className="absolute top-3 cursor-pointer text-2xl borderBackgroundHover rounded-full px-1 py-1 text-white"
        >
          <MdOutlineLocalPrintshop />
        </div>
        {/* <div
          onClick={() => navigate(-1)}
          className=" cursor-pointer text-2xl borderBackground rounded-full px-1 py-1 "
        >
          <FaRegHandPointRight />
        </div> */}
      <div
        ref={ref}
        style={{ width: "98%" }}
        className=" bg-white rounded-lg relative flex flex-col p-4 items-center"
      >
        <div className="absolute top-2 left-2 m-1">
          Naeem Borkerage &emsp; {new Date().toLocaleString()}
        </div>
        <div className=" w-full flex items-center relative justify-between py-6  ">
          <h4 className="tracking-wider OriginalColor">Payslip</h4>
          <div className="">
            <img className="w-20" src={logo} alt="" />
          </div>
        </div>
        <table border={1} className="border-1 border-gray-400 w-full">
          <tbody className="py-4 px-1">
            <tr className=" grid grid-cols-9">
              <td className="col-span-1 pl-2">Name</td>
              <td className="col-span-3 ml-auto">{getName(emp.name, 3)}</td>
              <td className="col-span-1 border-x "></td>
              <td className="col-span-3 pl-2">Month</td>
              <td className="col-span-1">
                {new Date().getMonth() + 1} - {new Date().getFullYear()}
              </td>
            </tr>
            <tr className=" grid grid-cols-9">
              <td className="col-span-3 pl-2">Title</td>
              <td className="col-span-1">#N/A</td>
              <td className="col-span-1 border-x "></td>
              <td className="col-span-3  pl-2">Bank</td>
              <td className="col-span-1">{emp.bank}</td>
            </tr>
            <tr className=" grid grid-cols-9">
              <td className="col-span-3 pl-2">Location</td>
              <td className="col-span-1 mb-2">BDC</td>
              <td className="col-span-1 border-x "></td>
              <td className="col-span-3 pl-2">Currency</td>
              <td className="col-span-1">EGP</td>
            </tr>
            <tr className=" grid grid-cols-9 bg-gray-200 ">
              <th className="col-span-3 pl-2">Income</th>
              <th className="col-span-1">Amount</th>
              <th className="col-span-1 border-x "></th>
              <th className="col-span-3 pl-2">Deductions</th>
              <th className="col-span-1">Amount</th>
            </tr>
            <tr className=" grid grid-cols-9 grid-rows-3">
              <td className="col-span-3 pl-2 row-span-3 items-center flex">
                Basic Salary
              </td>
              <td className="col-span-1 row-span-3 items-center flex">#N/A</td>
              <td className="col-span-1 border-x row-span-3"></td>
              <td className="col-span-3 pl-2 row-span-1">Refunded Amounts</td>
              <td className="col-span-1 row-span-1">#N/A</td>
              <td className="col-span-3 pl-2 row-span-1">Social Insurance</td>
              <td className="col-span-1 row-span-1 ">
                {emp.social_insurance}
              </td>
            </tr>
            <tr className=" grid grid-cols-9">
              <td className="col-span-3 py-1.5 pl-2 items-center flex">
                Transportation Allowance
              </td>
              <td className="col-span-1 py-1.5 items-center flex">
                {emp.transportation_allowance}
              </td>
              <td className="col-span-1 py-1.5 border-x "></td>
              <td className="col-span-3 py-1.5  pl-2">Loans/S.Insurance</td>
              <td className="col-span-1 py-1.5 ">{emp.loans_insurance}</td>
            </tr>
            <tr
              style={{ gridTemplateRows: " repeat(9,1fr)" }}
              className=" grid grid-cols-9 "
            >
              <td className="col-span-3 row-span-full pl-2 items-center flex mt-1.5">
                Gross Income
              </td>
              <td className="col-span-1 row-span-full  items-center flex">
                Amount
              </td>
              <td className="col-span-1 border-x row-span-full"></td>

              <td className="col-span-3  pl-2 row-span-1">Medical Insurance</td>
              <td className="col-span-1  row-span-1">
                {emp.medical_insurance}
              </td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Amount In Advance</td>
              <td className="col-span-1 row-span-1">{emp.amount_advance}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Lateness</td>
              <td className="col-span-1 row-span-1">{emp.late_amount}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Absence</td>
              <td className="col-span-1 row-span-1">{emp.absent_amount}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Penalities</td>
              <td className="col-span-1 row-span-1">{emp.penalties}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Premium Card</td>
              <td className="col-span-1 row-span-1">{emp.premium_card}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">
                صندوق تكريم شهداء و ضحايا العمليات الارهابيه
              </td>
              <td className="col-span-1 row-span-1">{emp.martyrs_fund}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Total Deducations</td>
              <td className="col-span-1 row-span-1">{emp.total_deduction}</td>
              {/*  */}
              <td className="col-span-3  pl-2 row-span-1">Net Pay</td>
              <td className="col-span-1 row-span-1">{emp.net_pay}</td>
              {/*  */}
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadEmpPayslip;
