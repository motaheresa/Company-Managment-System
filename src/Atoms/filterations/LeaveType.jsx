import React, { useContext } from "react";
import { CreateContext } from "../../Context/Context";

const LeaveType = ({ value,name="leaveType", handleChange,t,required=false }) => {
  const usecon=useContext(CreateContext)
  return (
    <div className="space-y-2 ">
      <label className="w-full" htmlFor="Day Type">
        {t?`${t("leavetype")}`:"Leave Type"}
      </label>
      <select
        className={`focus:border-orange-500 ${
          usecon.darkMode && "inputDark"
        } w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 `}
        id={"Day Type"}
        placeholder={`Enter Day Type Here`}
        value={value}
        name={name}
        onChange={handleChange}
        required={required}
      >
        <option hidden value="Choose">
          {t?`${t("Choose")}`:"Choose"}
        </option>
        <option value="Annual Leave">{t?`${t("annualleaveApp")}`:"Annual Leave"}</option>
        <option value="Casual Leave">{t?`${t("casualleaveApp")}`:"Casual Leave"}</option>
        <option value="Mission Leave">{t?`${t("missionleaveApp")}`:"Mission Leave"}</option>
        <option value="work from home">{t?`${t("Work From Home")}`:"Work From Home"}</option>
        <option value="Late Permission">{t?`${t("lateinApp")}`:"Late Permission"}</option>
        <option value="Early Leave">{t?`${t("earlyoutApp")}`:"Early Leave"}</option>
        <option value="Sick Leave">{t?`${t("sickApp")}`:"Sick Leave"}</option>
        <option value="Unpaid Leave">{t?`${t("unpaidApp")}`:"Unpaid Leave"}</option>
        <option value="Marriage Leave">{t?`${t("marriageApp")}`:"Marriage Leave"}</option>
        <option value="Maternity Leave">{t?`${t("maternityApp")}`:"Maternity Leave"}</option>
        <option value="Study Leave">{t?`${t("Study Leave")}`:"Study Leave"}</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default React.memo(LeaveType);
