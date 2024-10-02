import React, { memo, useContext, useEffect, useState } from "react";
import { CreateContext } from "../Context/Context";
import axios from "axios";
import { useTranslation } from "react-i18next";
import apiAuth from "../Atoms/apiAuth";
import Filled from "../Atoms/alerts/Filled";
import Loading from "../Atoms/alerts/Loading";
import Success from "../Atoms/alerts/Success";
import { convertToDateInputFormat } from "../Atoms/convertToDateInputFormat";
const initialFormData = {
  leaveType: "",
  from: "",
  to: "",
  leaveReason: "",
  numDays: "",
  fileLeave: "",
};
const AddLeave = ({
  handleApplied,
  APP_PERMISSION,
  isOpenFormApplyLeave,
  SickLeave_Pen_App,
  setIsOpenFormApplyLeave,
  StudyLeave_Pen_App,
}) => {
  const usecon = useContext(CreateContext);
  let [formData, setFormData] = useState(initialFormData);
  const [statusApply, setStatusAplly] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [t] = useTranslation();
  const cleanFormData = () => {
    let forms = {};
    Object.keys(formData).forEach((ele) => {
      if (ele !== "numDays" && ele !== "leaveReason") {
        forms[ele] = formData[ele];
      }
    });
    if (!formData.leaveReason) {
      delete formData.leaveReason;
    } else {
      forms.leaveReason = formData.leaveReason;
    }
    return forms;
  };
  const sendLeaveRequest = () => {
    setLoading(true);
    delete formData.fileLeave;
    formData = cleanFormData();

    axios
      .post("http://localhost:1813/me/apply-leave", formData, apiAuth(token))
      .then((res) => {
        setStatusAplly("Success");
        handleApplied(
          res,
          res.data.data.status_leave_type,
          res.data.data.num_days
        );
        setIsOpenFormApplyLeave(false);
        setFormData(initialFormData);
      })
      .catch((error) => {
        if (
          formData.leaveType === "Maternity Leave" ||
          formData.leaveType === "Marriage Leave" ||
          formData.leaveType === "Annual Leave" ||
          formData.leaveType === "Casual Leave" ||
          formData.leaveType === "Late Permission" ||
          formData.leaveType === "Early Leave" 
        )
          setStatusAplly(error?.response?.data?.sta?.split(".")?.[0]);
        else setStatusAplly("Error,Something went wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkApplyLeave = async (e) => {
    e.preventDefault();
    let flag = true;
    if (formData.numDays <= 0) {
      setStatusAplly("Number of days must be greater than 0 ");
      flag = false;
    } else if (
      formData.leaveType == "Marriage Leave" &&
      formData.numDays !== 7
    ) {
      setStatusAplly(`Error: You can only take 7 days of marriage leave.`);
      flag = false;
    } else if (
      formData.leaveType == "Maternity Leave" &&
      formData.numDays > 90
    ) {
      setStatusAplly(`Limit Exceeded, Max Days= [90]`);
      flag = false;
    }
    else if (
      formData.leaveType == "Sick Leave" ||
      formData.leaveType == "Study Leave"
    ) {
      console.log(StudyLeave_Pen_App);

      if (
        formData.leaveType == "Study Leave" &&
        formData.numDays + StudyLeave_Pen_App > 5
      ) {
        setStatusAplly("You can only take 5 days of study leave.");
        return;
      }
      setLoading(true);
      const fileLeave = formData.fileLeave;
      const leaveType = formData.leaveType;
      const leaveReason = formData.leaveReason;
      const from = formData.from;
      const to = formData.to;
      const numDays = formData.numDays;

      const formData2 = new FormData(); //alert
      formData2.append(
        formData.leaveType == "Sick Leave" ? "image" : "file",
        fileLeave
      );
      formData2.append("leaveType", leaveType);
      leaveReason && formData2.append("leaveReason", leaveReason);
      formData2.append("from", from);
      formData2.append("to", to);
      formData.leaveType == "Sick Leave" &&
        formData2.append("numDays", numDays);
      try {
        // /dashboard/applyLeave
        const response = await fetch(
          `http://localhost:1813/${formData.leaveType == "Sick Leave"
            ? "dashboard/addLeaveSick"
            : "me/apply-leave"
          }`,
          {
            method: "POST",
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
            body: formData2,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setStatusAplly("Success");
        const data = await response.json();
        if (formData.leaveType == "Sick Leave") {
          handleApplied(
            data.event,
            data.event.status_leave_type,
            data.event.num_days,
            "sick"
          );
        } else if (formData.leaveType == "Study Leave") {
          handleApplied(
            data.data,
            data.data.status_leave_type,
            data.data.num_days,
            "study"
          );
        }
        setFormData(initialFormData);
        setIsOpenFormApplyLeave(false);
        flag = false;
      } catch (error) {
        console.error("Error:", error);
        setStatusAplly("Error,Something went wrong");
        flag = false;
      } finally {
        setLoading(false);
      }
    } else if (
      (formData.leaveType == "Early Leave" ||
        formData.leaveType == "Late Permission") &&
      formData.numDays + APP_PERMISSION > 4
    ) {
      setStatusAplly(`Limit Exceeded, Remaining [${4 - APP_PERMISSION}]`);
      flag = false;
    }

    flag && sendLeaveRequest();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      // setFileChange(file);
      setFormData({ ...formData, fileLeave: file });
    } else {
      alert("Please select a valid PDF or image file.");
      event.target.value = null;
    }
  };

  useEffect(() => {
    if (formData.leaveType === "Maternity Leave") {
      if (formData.from) {
        let startDate = new Date(new Date(formData.from));
        let endDate = new Date(startDate);
        let days = 0;
        while (days !== 90) {
          if (!(startDate.getDay() === 5 || startDate.getDay() === 6)) {
            days++;
          }
          endDate.setDate(startDate.getDate() + 1);
          startDate.setDate(startDate.getDate() + 1);
        }
        endDate.setDate(startDate.getDate() - 1); //because final day
        setFormData((prev) => ({
          ...prev,
          numDays: days,
          to: convertToDateInputFormat(endDate),
        }));
      }
    }
    if (formData.leaveType === "Marriage Leave") {
      if (formData.from) {
        let startDate = new Date(new Date(formData.from));
        let endDate = new Date(startDate);
        let days = 0;
        while (days !== 7) {
          if (!(startDate.getDay() === 5 || startDate.getDay() === 6)) {
            days++;
          }
          endDate.setDate(startDate.getDate() + 1);
          startDate.setDate(startDate.getDate() + 1);
        }
        endDate.setDate(startDate.getDate() - 1); //because final day
        setFormData((prev) => ({
          ...prev,
          numDays: days,
          to: convertToDateInputFormat(endDate),
        }));
      }
    }
  }, [formData.leaveType, formData.from]);
  const calculate_numDays = (name, value) => {
    const miiliseconds =
      new Date(name === "to" ? value : formData.to).getTime() -
      new Date(name === "from" ? value : formData.from).getTime();
    if (
      formData.leaveType === "Casual Leave" ||
      formData.leaveType === "Late Permission" ||
      formData.leaveType === "Early Leave" ||
      formData.leaveType === "Mission Leave"
    ) {
      setFormData((prev) => ({ ...prev, to: prev.from, numDays: 1 }));
    } else if (formData.to || name === "to") {
      let days = miiliseconds / 1000 / 60 / 60 / 24;
      let current = new Date(new Date(name === "from" ? value : formData.from));
      let end = new Date(name === "to" ? value : formData.to);
      // Friday And Saturday
      while (end >= current) {
        if (current.getDay() === 5 || current.getDay() === 6) {
          days--;
        }
        current.setDate(current.getDate() + 1);
      }
      // Final Day
      days++;
      setFormData((prev) => ({ ...prev, numDays: days }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "leaveType" && formData[name])
      setFormData((prev) => ({ ...prev, ...initialFormData }));
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "from" || name === "to") calculate_numDays(name, value);
  };

  return (
    <>
      {statusApply && statusApply !== "Success" && (
        <Filled message={statusApply} setMessage={setStatusAplly} />
      )}
      {statusApply === "Success" && (
        <Success
          message={"Request Completed Successfully"}
          setMessage={setStatusAplly}
        />
      )}
      {loading && <Loading />}

      <div className="text-center my-3">
        <div
          className={`flex items-center justify-center PublicPropertiesTableLeavesEye ${isOpenFormApplyLeave ? "ShowApplyLeaveForm" : "HideApplyLeaveForm"
            }`}
        >
          <div
            className={`py-10 px-16 WidthFormLeaves rounded-xl  ${usecon.darkMode ? "darkHidingContainer" : "LightThemeContainer"
              } shadow`}
          >
            <form
              onSubmit={(e) => checkApplyLeave(e)}
              className="z-60 flex text-start w-full items-center justify-center flex-col "
            >
              <div className="w-full">
                <label
                  htmlFor="select"
                  className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                    } mb-2 text-left w-full font-semibold`}
                >
                  {t("leavetype")}
                </label>
                {/* <LeaveType
                  value={formData.leaveType}
                  handleChange={handleChange}
                  t={t}
                  required={true}
                /> */}
                <select
                  value={formData.leaveType}
                  name="leaveType"
                  onChange={handleChange}
                  className={` ${usecon.darkMode && "inputDark"
                    } border py-2 px-2 rounded mb-3 w-full`}
                  id="select"
                  required
                >
                  <option selected className="hidden">
                    {t("chooseleavetype")}
                  </option>
                  <option value="Annual Leave">{t("annualleaveApp")}</option>
                  <option value="Casual Leave">{t("casualleaveApp")}</option>
                  <option value="Mission Leave">{t("missionleaveApp")}</option>
                  <option value="Late Permission">{t("lateinApp")}</option>
                  <option value="Early Leave">{t("earlyoutApp")}</option>
                  <option value="Work From Home">{t("Work From Home")}</option>
                  <option value="Sick Leave">{t("sickApp")}</option>
                  <option value="Unpaid Leave">{t("unpaidApp")}</option>
                  <option value="Marriage Leave">{t("marriageApp")}</option>
                  <option value="Maternity Leave">{t("maternityApp")}</option>
                  <option value="Study Leave">{t("Study Leave")}</option>
                </select>
              </div>

              {((formData.numDays > 2 && formData.leaveType == "Sick Leave") ||
                (formData.leaveType == "Sick Leave" &&
                  SickLeave_Pen_App + formData.numDays > 10) ||
                formData.leaveType == "Study Leave") && (
                  <div className="w-full">
                    <label
                      className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                        } mb-2 text-left w-full font-semibold`}
                    >
                      {t("fileinput") + " "}
                    </label>
                    <input
                      type="file"
                      accept="application/pdf, image/*"
                      // value={fileLeave}
                      onChange={(e) => handleFileChange(e)}
                      required
                      className={`${usecon.darkMode && "inputDark"
                        } border py-2 px-2 rounded mb-3 w-full  `}
                    />
                  </div>
                )}
              <div className="w-full">
                <label
                  className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                    } mb-2 text-left w-full font-semibold`}
                >
                  {t("from")}
                </label>
                <input
                  value={formData.from}
                  onChange={handleChange}
                  disabled={!formData.leaveType}
                  name="from"
                  required
                  type="date"
                  className={`${usecon.darkMode && "inputDark"
                    } border py-2 px-2 rounded mb-3 w-full  `}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
              {formData.leaveType != "Casual Leave" &&
                formData.leaveType != "Late Permission" &&
                formData.leaveType != "Early Leave" &&
                formData.leaveType != "Mission Leave" && (
                  <div className="w-full">
                    <label
                      className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                        } mb-2 text-left w-full font-semibold`}
                    >
                      {t("tofilter") + " "}
                    </label>
                    <input
                      value={formData.to}
                      onChange={handleChange}
                      required
                      disabled={
                        !formData.from ||
                        formData.leaveType === "Maternity Leave" ||
                        formData.leaveType === "Marriage Leave"
                      }
                      name="to"
                      type="date"
                      className={`${usecon.darkMode && "inputDark"
                        } border py-2 px-2 rounded mb-3 w-full  `}
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>
                )}

              <div className="w-full">
                <label
                  className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                    } mb-2 text-left w-full font-semibold`}
                >
                  {t("numdays") + " "}
                </label>
                <input
                  value={formData.numDays || 0}
                  required
                  as="input"
                  type="text"
                  // disabled
                  className={`${usecon.darkMode && "inputDark"
                    } border py-2 px-2 rounded mb-3 w-full  `}
                />
              </div>

              <div className="w-full">
                <label
                  className={`${usecon.darkMode ? "text-white" : "OriginalColor"
                    } mb-2 text-left w-full font-semibold`}
                >
                  {t("leavereason") + " "}
                </label>
                <textarea
                  required={
                    formData.leaveType == "Unpaid Leave" ||
                      formData.leaveType == "Work From Home" ||
                      formData.leaveType == "Mission Leave"
                      ? true
                      : false
                  }
                  value={formData.leaveReason}
                  name="leaveReason"
                  onChange={handleChange}
                  className={`${usecon.darkMode && "inputDark"
                    } border py-2 px-2 rounded mb-3 w-full  `}
                  rows={2}
                  placeholder="Some Text here......"
                />
              </div>
              <div className="flex items-center  justify-center  gap-2">
                <button type="submit" className="btn btn-primary px-4 py-2 NoOutlines ColorDark ">
                  {t("submit")}
                </button>
                {/* <AddLeaveButton t={t} checkApplyLeave={checkApplyLeave} /> */}
                <div
                  onClick={() => setIsOpenFormApplyLeave(false)}
                  className="btn btn-primary  px-4 py-2 NoOutlines hoverColorDark "
                >
                  {t("close")}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AddLeave);
