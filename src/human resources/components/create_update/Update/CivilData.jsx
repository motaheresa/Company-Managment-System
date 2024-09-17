import React from "react";
import Input from "../atoms/Input";
import InputDate from "../atoms/InputDate";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";

const CivilData = ({ isEditable, formData, setFormData,setUpdatedValues }) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (
      name === "emp_ml_crt_issue_dt" ||
      name === "emp_ml_expired_dt" ||
      name === "emp_med_issue_dt" ||
      name === "emp_med_expired_dt" ||
      name === "emp_id_issue_date"
    ) {
      value = formatToISO8601(event);
    }
    setFormData((data) => ({ ...data, [name]: value }));
    setUpdatedValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <Input
        label="Ml Crt No"
        name="emp_ml_crt_no"
        isEditable={isEditable}
        value={formData.emp_ml_crt_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={20}
      />
      <InputDate
        label="Ml Crt Issue Date"
        name="emp_ml_crt_issue_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_ml_crt_issue_dt)}
        handleChange={handleChange}
      />
      <InputDate
        label="Ml Expired Date"
        name="emp_ml_expired_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_ml_expired_dt)}
        handleChange={handleChange}
      />
      <Input
        label="Med No"
        name="emp_med_no"
        isEditable={isEditable}
        value={formData.emp_med_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
      />
      <InputDate
        label="Med Issue Date"
        name="emp_med_issue_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_med_issue_dt)}
        handleChange={handleChange}
      />
      <InputDate
        label="Med Expired Date"
        name="emp_med_expired_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_med_expired_dt)}
        handleChange={handleChange}
      />
      <Input
        label="Cost Center"
        name="emp_cost_center"
        isEditable={isEditable}
        value={formData.emp_cost_center}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={6}
      />
      <InputDate
        label="Id Issue Date"
        name="emp_id_issue_date"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_id_issue_date)}
        handleChange={handleChange}
      />
    </div>
  );
};

export default CivilData;
