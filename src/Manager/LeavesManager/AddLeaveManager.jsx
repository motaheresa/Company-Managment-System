import React, { useContext, useEffect, useRef, useState } from "react";
import { CreateContext } from "../../Context/Context";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { CiWarning } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
const AddLeaveManager = (Funcs) => {
  const usecon = useContext(CreateContext);
  const [leaveType, setleaveType] = useState("");
  const [from, setfrom] = useState(0);
  const [to, setto] = useState(0);
  const [leaveReason, setleaveReason] = useState("");
  const [numDays, setnumDays] = useState("");
  const [checkMarriageLeave, setCheckMarriageLeave] = useState(false);
  const [checkMaternityLeave, setCheckMaternityLeave] = useState(false);
  const [checkNumDays, setCheckNumDays] = useState("");
  const [Accept, setAccept] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [fileLeave, setFileChange] = useState("");
  let [Casual_Anuual_Pen_App, set_Casual_Anuual_Pen_App] = useState(0);
  const [err, setErr] = useState("");
  const [DATA_USER, SET_DATA_USER] = useState("");
  const token = localStorage.getItem("token");
  const [flag, setFlag] = useState(true);
  const [t, i18n] = useTranslation();
  //                  Approved Leaves
  const [APP_CASUAL, SET_APP_CASUAL] = useState(0);
  const [APP_MARIAGE, SET_APP_MARRIAGE] = useState(0);
  const [APP_PERMISSION, SET_APP_PERMISSION] = useState(0);
  async function aa() {
    const js = (res) => {
      console.log(res);
      usecon.setAllLeaves(res.data.leaves);
      res.data.leaves.map((onedata) => {
        //                  Approved or Pending
        if (
          onedata.status_leave_type == "Casual Leave" &&
          (onedata.status == "Approved" || onedata.status == "Pending")
        ) {
          SET_APP_CASUAL((prev) => prev + onedata.num_days);
        }
        if (
          (onedata.status_leave_type == "Casual Leave" ||
            onedata.status_leave_type == "Annual Leave") &&
          (onedata.status == "Approved" || onedata.status == "Pending")
        ) {
          set_Casual_Anuual_Pen_App((prev) => prev + onedata.num_days);
        }
        if (
          onedata.status_leave_type == "Marriage Leave" &&
          (onedata.status == "Approved" || onedata.status == "Pending")
        ) {
          SET_APP_MARRIAGE((prev) => prev + onedata.num_days);
        }
        if (
          onedata.status_leave_type == "Late Permission" &&
          (onedata.status == "Approved" || onedata.status == "Pending")
        ) {
          SET_APP_PERMISSION((prev) => prev + onedata.num_days);
        }
        if (
          onedata.status_leave_type == "Early Leave" &&
          (onedata.status == "Approved" || onedata.status == "Pending")
        ) {
          SET_APP_PERMISSION((prev) => prev + onedata.num_days);
        }
      });
    };

    //                  شهري
    await fetch("http://localhost:1813/me/my-leaves", {
      headers: {
        Accept: "Application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json().then((data) => js(data)))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    aa();
    axios
      .get("http://localhost:1813/dashboard/userDetails", {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => SET_DATA_USER(res.data.user));
  }, []);

  useEffect(() => {
    if (
      leaveType == "Casual Leave" ||
      leaveType == "Late Permission" ||
      leaveType == "Early Leave" ||
      leaveType == "Mission Leave"
    ) {
      setto(from);
      // setnumDays(1);
    }
  }, [leaveType, from]);
  useEffect(() => {
    const seconds = new Date(to).getTime() - new Date(from).getTime();
    const days = Math.floor(seconds / (3600 * 24) / 1000);

    if (days > 0) {
      setnumDays(days+1);
    } else if (
      from == to &&
      new Date(to).getFullYear() != 1970 &&
      new Date(from).getFullYear() != 1970
    ) {
      setnumDays(1);
    } else {
      setnumDays(0);
    }
    for (let i = new Date(from).getDate(); i < new Date(to).getDate(); i++) {
      if (
        new Date(new Date(from).getFullYear(), new Date(from).getMonth(), i)
          .toDateString()
          .split(" ")[0] == "Fri" ||
        new Date(new Date(from).getFullYear(), new Date(from).getMonth(), i)
          .toDateString()
          .split(" ")[0] == "Sat"
      ) {
        setnumDays((prev) => prev - 1);
      }
    }
  }, [from, to]);
  const applyLeaveHandle = async (e) => {
    const CurrMonth = new Date().getMonth() + 1;
    const FromMonth = new Date(from).getMonth() + 1;
    const ToMonth = new Date(to).getMonth() + 1;
    if (FromMonth > CurrMonth || ToMonth > CurrMonth) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    const tr = () => {
      CloseApplyLeave();
      setCheckMarriageLeave("");
      axios
        .post(
          "http://localhost:1813/dashboard/applyLeave",
          {
            leaveType,
            from: from,
            to: to,
            leaveReason,
            numDays,
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => window.location.reload())
        .catch((err) => {
          console.log(err);
          if (err.response.data.msg) {
            setErr(err.response.data.msg);
            setTimeout(() => {
              setErr("");
            }, 7000);
          }
        });
      Funcs.funcs.closeFunc();
    };
    e.preventDefault();
    setCheckError(true);
    if (leaveType == "Marriage Leave") {
      if (numDays > 7 || numDays + APP_MARIAGE > 7) {
        setAccept(false);
        setCheckMarriageLeave(
          // "The leave type must correspond to the number of days"
          `Limit Exceeded, Remaining [${7 - numDays + APP_MARIAGE}]`
        );
        setTimeout(() => {
          setCheckMarriageLeave("");
        }, 7000);
      } else {
        tr();
      }
    } else if (leaveType == "Maternity Leave") {
      if (numDays > 90) {
        setCheckMaternityLeave(
          // "The leave type must correspond to the number of days"
          `Limit Exceeded, Max Days= [90]`
        );
        setAccept(false);
        setTimeout(() => {
          setCheckMaternityLeave("");
        }, 7000);
      } else {
        tr();
      }
    } else if (leaveType == "Casual Leave") {
      if (numDays > 7 || numDays + APP_CASUAL > 7) {
        console.log("error");
        setCheckMaternityLeave(
          `Limit Exceeded, Remaining [${7 - APP_CASUAL}]`
        );
        setAccept(false);
        setTimeout(() => {
          setCheckMaternityLeave("");
        }, 7000);
      } else {
        tr();
      }
    } else if (leaveType == "Casual Leave" || leaveType == "Annual Leave") {
      if (numDays + Casual_Anuual_Pen_App > DATA_USER.emp_leave_balance) {
        setCheckMaternityLeave(
          `Limit Exceeded, Remaining [${
            DATA_USER.emp_leave_balance - Casual_Anuual_Pen_App
          }]`
        );
        setAccept(false);
        setTimeout(() => {
          setCheckMaternityLeave("");
        }, 7000);
      } else {
        tr();
      }
    } else if (numDays < 0) {
      setAccept(false);
      setCheckNumDays("Number of days must be more than 0");
      setTimeout(() => {
        setCheckNumDays("");
      }, 7000);
    } else if (numDays > 2 && leaveType == "Sick Leave") {
      CloseApplyLeave();
      setCheckMarriageLeave("");
      const formData = new FormData();
      formData.append("image", fileLeave);
      formData.append("leaveType", leaveType);
      formData.append("leaveReason", leaveReason);
      formData.append("from", from);
      formData.append("to", to);
      formData.append("numDays", numDays);
    try{
      const response=await fetch(
        "http://localhost:1813/dashboard/addLeaveSick",
        {
          method:'POST',
          headers: {
            Accept: "Application/json",
            Authorization: "Bearer " + token,
          },
          body:formData
        });
    
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
      Funcs.funcs.closeFunc();
    } else if (leaveType == "Early Leave" || leaveType == "Late Permission") {
      if (numDays + APP_PERMISSION > 4) {
        setAccept(false);
        setErr(`Limit Exceeded, Remaining [${4 - APP_PERMISSION}]`);
        setTimeout(() => {
          setErr("");
        }, 7000);
      } else {
        tr();
      }
    } else {
      tr();
    }
  };
  const CloseApplyLeave = () => {
    setfrom("");
    setto("");
    setleaveReason("");
    setnumDays("");
    setleaveType("");
    setFileChange();
    setCheckError(false);
    Funcs.funcs.closeFunc();
  };

  const CloseError = () => {
    setCheckMarriageLeave("");
    setCheckMaternityLeave("");
    setCheckNumDays("");
    setErr("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setFileChange(file);
    } else {
      alert("Please select a valid PDF or image file.");
      event.target.value = null;
    }
  };

  return (
    <div>
      <div className="text-center my-3">
        <div
          className={`flex items-center justify-center PublicPropertiesTableLeavesEye ${
            Funcs.funcs.ApplyLeave ? "ShowApplyLeaveForm" : "HideApplyLeaveForm"
          }`}
        >
          <div
            className={`py-10 px-16 WidthFormLeaves rounded-xl  ${
              usecon.darkMode ? "darkHidingContainer" : "LightThemeContainer"
            } shadow`}
          >
            <div className="flex pb-1 mb-6 pt-2 border-b items-center justify-between w-full">
              <h5
                className={`tracking-wider ${
                  usecon.darkMode ? "text-white" : "OriginalColor"
                }`}
              >
                {t("createnewleaves")}
              </h5>
              <div
                onClick={() => CloseApplyLeave()}
                className={`${
                  usecon.darkMode ? "xmarkBorder" : "borderBackground"
                } px-1 py-1  cursor-pointer rounded-md`}
              >
                <HiXMark />
              </div>
            </div>
            <form
              onSubmit={(e) => applyLeaveHandle(e)}
              className="z-60 flex text-start w-full items-center justify-center flex-col "
            >
              <div className="w-full">
                <label
                  htmlFor="select"
                  className={`${
                    usecon.darkMode ? "text-white" : "OriginalColor"
                  } mb-2 text-left w-full font-semibold`}
                >
                  {t("leavetype") + " "}
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setleaveType(e.target.value)}
                  className={` ${
                    usecon.darkMode && "inputDark"
                  } border py-2 px-2 rounded mb-3 w-full`}
                  id="select"
                  required
                >
                  <option selected className="hidden">
                    {t("chooseleavetype")}
                  </option>
                  <option value="Annual Leave" className="py-10">
                    {t("annualleaveApp")}
                  </option>
                  <option value="Casual Leave">{t("casualleaveApp")}</option>
                  <option value="Mission Leave" className="py-10">
                    {t("missionleaveApp")}
                  </option>
                  <option value="Late Permission" className="py-10">
                    {t("lateinApp")}
                  </option>
                  <option value="Early Leave" className="py-10">
                    {t("earlyoutApp")}
                  </option>
                  <option value="Sick Leave" className="py-10">
                    {t("sickApp")}
                  </option>
                  <option value="Unpaid Leave" className="py-10">
                    {t("unpaidApp")}
                  </option>
                  <option value="Marriage Leave" className="py-10">
                    {t("marriageApp")}
                  </option>
                  <option value="Maternity Leave" className="py-10">
                    {t("maternityApp")}
                  </option>
                </select>
              </div>

              {checkMarriageLeave != "" ? (
                <div
                  className={` text-white z_inde fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
                >
                  <div className="flex items-center gap-1">
                    <div className="text-2xl cursor-pointer">
                      <CiWarning />
                    </div>
                    <div>{checkMarriageLeave}</div>
                  </div>
                  <div onClick={CloseError} className="text-2xl cursor-pointer">
                    <IoIosCloseCircleOutline />
                  </div>
                </div>
              ) : (
                ""
              )}
              {checkMaternityLeave != "" ? (
                <div
                  className={` text-white fixed z_inde duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
                >
                  <div className="flex items-center gap-1">
                    <div className="text-2xl cursor-pointer">
                      <CiWarning />
                    </div>
                    <div>{checkMaternityLeave}</div>
                  </div>
                  <div onClick={CloseError} className="text-2xl cursor-pointer">
                    <IoIosCloseCircleOutline />
                  </div>
                </div>
              ) : (
                ""
              )}
              {numDays > 2 && leaveType == "Sick Leave" ? (
                <div className="w-full">
                  <label
                    className={`${
                      usecon.darkMode ? "text-white" : "OriginalColor"
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
                    className={`${
                      usecon.darkMode && "inputDark"
                    } border py-2 px-2 rounded mb-3 w-full  `}
                  />
                  {checkError && fileLeave == "" ? (
                    <div className="text-red-500 tracking-wider">
                      {t("pleaseenterfile")}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="w-full">
                <label
                  className={`${
                    usecon.darkMode ? "text-white" : "OriginalColor"
                  } mb-2 text-left w-full font-semibold`}
                >
                  {t("from") + " "}
                </label>
                <input
                  value={from}
                  onChange={(e) => setfrom(e.target.value)}
                  required
                  type="date"
                  className={`${
                    usecon.darkMode && "inputDark"
                  } border py-2 px-2 rounded mb-3 w-full  `}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
              {leaveType != "Casual Leave" &&
                leaveType != "Late Permission" &&
                leaveType != "Early Leave" &&
                leaveType != "Mission Leave" && (
                  <div className="w-full">
                    <label
                      className={`${
                        usecon.darkMode ? "text-white" : "OriginalColor"
                      } mb-2 text-left w-full font-semibold`}
                    >
                      {t("tofilter") + " "}
                    </label>
                    <input
                      value={to}
                      onChange={(e) => setto(e.target.value)}
                      required
                      type="date"
                      className={`${
                        usecon.darkMode && "inputDark"
                      } border py-2 px-2 rounded mb-3 w-full  `}
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>
                )}

              <div className="w-full">
                <label
                  className={`${
                    usecon.darkMode ? "text-white" : "OriginalColor"
                  } mb-2 text-left w-full font-semibold`}
                >
                  {t("numdays") + " "}
                </label>
                <input
                  value={numDays}
                  required
                  as="input"
                  type="number"
                  className={`${
                    usecon.darkMode && "inputDark"
                  } border py-2 px-2 rounded mb-3 w-full  `}
                />
                {checkNumDays ? (
                  <div
                    className={` text-white fixed duration-200 -translate-x-1/2 bg-red-400 px-3 w-2/5 flex items-center justify-between text-lg py-3 rounded-lg top-0 left-2/4 tracking-wider mt-1`}
                  >
                    <div className="flex items-center gap-1">
                      <div className="text-2xl cursor-pointer">
                        <CiWarning />
                      </div>
                      <div>{checkNumDays}</div>
                    </div>
                    <div
                      onClick={CloseError}
                      className="text-2xl cursor-pointer"
                    >
                      <IoIosCloseCircleOutline />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full">
                <label
                  className={`${
                    usecon.darkMode ? "text-white" : "OriginalColor"
                  } mb-2 text-left w-full font-semibold`}
                >
                  {t("leavereason") + " "}
                </label>
                <textarea
                  required={leaveType == "Unpaid Leave" ? true : false}
                  value={leaveReason}
                  onChange={(e) => setleaveReason(e.target.value)}
                  className={`${
                    usecon.darkMode && "inputDark"
                  } border py-2 px-2 rounded mb-3 w-full  `}
                  rows={2}
                  placeholder="Some Text here......"
                />
              </div>
              <div className="flex items-center  justify-center  gap-2">
                <button className="btn btn-primary px-4 py-2 NoOutlines ColorDark ">
                  {t("submit")}
                </button>
                <div
                  onClick={() => Funcs.funcs.closeFunc()}
                  className="btn btn-primary  px-4 py-2 NoOutlines hoverColorDark "
                >
                  {t("close")}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveManager;