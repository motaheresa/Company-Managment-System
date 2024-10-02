import axios from "axios";
import { useState } from "react";
import apiAuth from "../../../Atoms/apiAuth";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { clearData } from "../../../Atoms/clearData";
import { style_tail } from "../../../Atoms/style_tail";
import { getPostiveKeys } from "../../../Atoms/getPostiveKeys";

export const EditUser = ({
  Id_For_Edited,
  set_Id_For_Edited,
  setStatus,
  Edit_Data_After_EditCompleted,
}) => {
  const token = localStorage.getItem("token");
  const [paramsData, setParamsData] = useState({
    skip_early: false,
    skip_late: false,
    skip_absent: false,
  });
  const [formData, setFormData] = useState({
    late: "",
    early: "",
    absent: "",
  });
  const handleEdit = (e) => {
    e.preventDefault();
    const params = () => {
      let params = ``;
      Object.keys(paramsData).forEach((ele) => {
        if (paramsData[ele]) {
          params += `${ele}=${paramsData[ele]}`;
        }
      });
      return params;
    };
    const getData = () => {
      getPostiveKeys(formData);
      axios
        .patch(
          `http://localhost:1813/pay-slip/${Id_For_Edited}?${params()}`,
          formData,
          apiAuth(token)
        )
        .then((res) => {
          setStatus("Success");
          Edit_Data_After_EditCompleted(Id_For_Edited, res.data.data);
          handleExit(formData);
        })
        .catch((err) => {
          setStatus("Failed");
        });
    };
    if (Id_For_Edited) {
      getData();
    }
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleExit = () => {
    set_Id_For_Edited("");
    clearData(formData);
    clearData(paramsData);
  };
  return (
    <div
      className={`${
        Id_For_Edited
          ? "scale-100 visible opacity-1"
          : "scale-0 opacity-0 invisible"
      }  fixed top-0 left-0 bg-zinc-200 bg-opacity-40 z-30 flex items-center justify-center w-screen h-screen duration-300`}
    >
      <div
        className={`rounded-lg  w-3/5 my-4 bg-white shadow-animation border`}
      >
        <div className="flex items-center px-3 py-4 justify-between">
          <h4 className="OriginalColor ">Edit Payslip</h4>
          <span
            onClick={handleExit}
            className="text-3xl cursor-pointer text-red-500 hover:text-red-700"
          >
            <IoCloseCircleOutline />
          </span>
        </div>
        <div className="overflow-x-auto py-4 px-5">
          <form onSubmit={handleEdit}>
                      <div className="flex items-center gap-4 justify-center">
            <div className="space-y-1">
              <label htmlFor="early">Early</label>
              <input
                onChange={handleChangeData}
                name="early"
                value={formData.early}
                type="number"
                required
                className={`${style_tail("input", "edit")}`}
                placeholder="Enter Early here..."
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="late">Late</label>
              <input
                onChange={handleChangeData}
                name="late"
                type="number"
                required
                value={formData.late}
                className={`${style_tail("input", "edit")}`}
                placeholder="Enter Late here..."
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="absent">Absent</label>
              <input
                onChange={handleChangeData}
                name="absent"
                value={formData.absent}
                type="number"
                required
                className={`${style_tail("input", "edit")}`}
                placeholder="Enter Absent here..."
              />
            </div>
          </div>
            <button className="cursor-pointer borderBackgroundHover gap-2 rounded-lg w-fit flex items-center justify-center mx-auto my-3 py-2 px-4 text-white">
              Edit <FaEdit />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
