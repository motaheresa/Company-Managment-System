import React, { useContext, useMemo, useRef } from "react";
import { CreateContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { LuBadgeHelp } from "react-icons/lu";
import FilterForm from "./FilterForm";
import { CiWarning } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import getFromToDate from "../../Atoms/getFromToDate";
import { status_table_leaves } from "../../Atoms/status_table_leaves";

const Table = ({
  ShowoneLeaveFunc,
  setId,
  error,
  setError,
  setOpenSnackbar,
}) => {
  const navigate = useNavigate();
  const usecon = useContext(CreateContext);
  const pdfRef = useRef();
  const [t] = useTranslation();
  const TableHeader = useMemo(() => {
    return [
      t("leavetype"),
      t("appliedonData"),
      t("startdateData"),
      t("enddateData"),
      t("totaldaysData"),
      t("leavereasonData"),
      t("status"),
      t("actionData"),
    ];
  }, [t]);

  return (
    <div ref={pdfRef} className="px-2 w-full">
      <div className="flex items-center justify-between gap-2">
        <h5
          className={`tracking-wider pt-2 pb-4 OriginalColor ${
            usecon.darkMode && "text-white"
          }`}
        >
          {t("leavessummary")}
        </h5>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/applyLeave/downloadLeave")}
            className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
          >
            <span className={`${usecon.darkMode && "text-white"}`}>
              {t("download")}
            </span>
            <span className={`OriginalColor text-xl`}>
              <HiOutlineDownload />
            </span>
          </button>
          <button
            onClick={() => usecon.setcontrolShowing(true)}
            className={`border px-1 py-1 rounded-md my-2 flex items-center gap-2`}
          >
            <span className={`OriginalColor text-2xl`}>
              <LuBadgeHelp />
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <FilterForm setError={setError} />
      </div>
      {error != "" && (
        <div
          className={` text-white fixed gap-2
                 duration-200 -translate-x-1/2 bg-red-400 px-20 flex items-center text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
        >
          <div className="text-2xl">
            <CiWarning />
          </div>
          {error}
        </div>
      )}
      <table
        className={`${usecon.darkMode && "table_emp_dark"} table_emp w-full`}
        border={1}
      >
        <thead>
          <tr>
            {TableHeader.map((one,index) => (
              <td key={index}>
                <div>{one}</div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {usecon.allLeaves &&
            usecon.allLeaves.map(data => (
              <tr key={data.id}>
                <td>
                  <div>{data.status_leave_type}</div>
                </td>
                <td>
                  <div>{getFromToDate(data.applied_on)}</div>
                </td>
                <td>
                  <div>{getFromToDate(data.from)}</div>
                </td>
                <td>
                  <div>{getFromToDate(data.to)}</div>
                </td>
                <td>
                  <div>{data["num_days"]}</div>
                </td>
                <td>
                  <div>{data["leave_reason"]}</div>
                </td>
                <td>
                  <div
                    className={`text-white text-center ${status_table_leaves(data.status)} py-1 text-sm font-medium  px-1 w-20 rounded-lg`}
                  >
                    {data.status}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 justify-start">
                    <div
                      onClick={() => ShowoneLeaveFunc(data, data.id)}
                      className={` bg-green-500 cursor-pointer w-fit px-1 py-1 text-lg rounded-lg text-white`}
                    >
                      <MdKeyboardArrowRight />
                    </div>
                    {data.status == "Pending" && (
                      <div
                        onClick={() => {
                          setOpenSnackbar(true);
                          setId(data.id);
                        }}
                        className={` bg-red-500 cursor-pointer w-fit px-1 py-1 text-lg rounded-lg text-white`}
                      >
                        <AiOutlineDelete />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
