import React, { memo } from "react";
import Input from "../atoms/Input";
import Selection from "../atoms/Selection";
import InputDate from "../atoms/InputDate";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import MailInput from "../atoms/MailInput";

const CreateJopdata = ({
  emp_data,
  isEditable,
  formData,
  setFormData,
  setUpdatedValues,
  updatedValues,
}) => {
  console.log("updatedValues", updatedValues);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
    if (name === "") {
      return;
    }
    if (
      name === "emp_id_no" ||
      name === "emp_basic_sal" ||
      name === "emp_fix_value" ||
      name === "emp_gross_sal" ||
      name === "shift_id"
    ) {
      value = +value;
    }
    if (
      name === "emp_start_dt" ||
      name === "emp_job_post_dt" ||
      name === "emp_sal_chang_dt" ||
      name === "emp_trans_dt" ||
      name === "emp_term_dt"
    ) {
      value = formatToISO8601(event);
    }

    setUpdatedValues((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-y-2 gap-x-6 w-full mx-auto p-2">
      <Input
        label="Emp Id"
        required
        name="emp_no"
        value={formData.emp_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
        type={"create"}
      />
      <Input
        label="Manager Id"
        required
        name="emp_sup_no"
        value={formData.emp_sup_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
        type={"create"}
      />
      <Selection
        accurateLabel="Manager Title"
        required
        label="Manager title"
        name="SupJobPost"
        emp_data={emp_data}
        value={formData.emp_sup_job_post}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
        type={"create"}
      />
      {/* emp_sup_no */}
      <Selection
        accurateLabel="Company"
        label="com code"
        required
        name="Company"
        emp_data={emp_data}
        value={formData.emp_com_code}
        handleChange={handleChange}
        type={"create"}
      />
      <Selection
        accurateLabel="Branch"
        label="branch manger"
        name="Branch"
        required
        emp_data={emp_data}
        value={formData.emp_bra_code}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        type={"create"}
      />
      <Selection
        accurateLabel="Sector"
        label="sector"
        name="Sector"
        required
        emp_data={emp_data}
        value={formData.emp_sector}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
        type={"create"}
      />
      <Selection
        accurateLabel="Job Position"
        label="job postion"
        name="JobPost"
        required
        emp_data={emp_data}
        value={formData.emp_job_post}
        handleChange={handleChange}
        type={"create"}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
      />
      {/* <Selection
      accurateLabel="Sup Jop Position"
        label="Sup job postion"
        name="emp_sup_job_post"
        required
        emp_data={emp_data}
        value={formData.emp_sup_job_post}
        handleChange={handleChange}
        type={"create"}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
      /> */}
      <Selection
        accurateLabel="Shift"
        label="Shift"
        name="Shift"
        required
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.shift_id}
        handleChange={handleChange}
        type={"create"}
      />
    
      <Selection
        accurateLabel="Site"
        label="Site"
        name="Site"
        emp_data={emp_data}
        value={formData.emp_site}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
        type={"create"}
      />

      <Selection
        accurateLabel="Term Flag"
        label="TermFlag"
        name="TermFlag"
        emp_data={emp_data}
        value={formData.emp_term_flag}
        handleChange={handleChange}
        // dep_prop1={formData.emp_com_code&&formData.emp_com_code}
        // dep_prop2={formData.emp_bra_code&&formData.emp_bra_code}
        type={"create"}
      />

      <Input
        label="Applicant Id"
        name="emp_apl_no"
        value={formData.emp_apl_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={6}
        type={"create"}
      />
      {/* <Input
        label="Notification Email "
        required
        name="Email"
        isEditable={isEditable}
        value={formData.Email}
        handleChange={handleChange}
        type={"create"}
      /> */}
      {/* ******************************************** */}
      <MailInput
        label="Professional Mail"
        required
        name="emp_prf_mail"
        isEditable={isEditable}
        value={formData.emp_prf_mail}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />
      <Input
        label="Decision No"
        name="emp_decision_no"
        value={formData.emp_decision_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
        type={"create"}
      />
      <Input
        label="Leave Balance"
        required
        name="emp_leav_bal"
        isEditable={isEditable}
        value={formData.emp_leav_bal}
        handleChange={handleChange}
        type={"create"}
      />
      <InputDate
        label="Start Date"
        required
        name="emp_start_dt"
        value={convertToDateInputFormat(formData.emp_start_dt)}
        handleChange={handleChange}
        type={"create"}
      />

      {/* ******************************************* */}

      <Selection
        accurateLabel="Contract Type"
        label="contract type"
        name="Contract"
        emp_data={emp_data}
        value={formData.emp_contract_code}
        handleChange={handleChange}
        type={"create"}
      />

      {/* *********************************************** */}

      <InputDate
        label="Job Position Date"
        name="emp_job_post_dt"
        value={convertToDateInputFormat(formData.emp_job_post_dt)}
        type={"create"}
        handleChange={handleChange}
      />
      <InputDate
        label="Salary Change Date"
        name="emp_sal_chang_dt"
        value={convertToDateInputFormat(formData.emp_sal_chang_dt)}
        type={"create"}
        handleChange={handleChange}
      />

      {/* *********************************************** */}

      <InputDate
        label="Transmision Date"
        name="emp_trans_dt"
        value={convertToDateInputFormat(formData.emp_trans_dt)}
        handleChange={handleChange}
        type={"create"}
      />
      <InputDate
        label="Termmiantion Date"
        name="emp_term_dt"
        value={convertToDateInputFormat(formData.emp_term_dt)}
        handleChange={handleChange}
        type={"create"}
      />
      <Input
        label="Fix Value"
        name="emp_fix_value"
        value={formData.emp_fix_value}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
        type={"create"}
      />

      {/* *********************************************** */}

      <Selection
        accurateLabel={"Type"}
        label="type"
        name="Type"
        emp_data={emp_data}
        value={formData.emp_emp_type}
        handleChange={handleChange}
        type={"create"}
      />

      <Input
        label="Basic Salary"
        name="emp_basic_sal"
        value={formData.emp_basic_sal}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
        type={"create"}
      />
      <Input
        label="Gross Salary"
        name="emp_gross_sal"
        value={formData.emp_gross_sal}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
        type={"create"}
      />

      {/* *********************************************** */}

      <Input
        label="Machine Id "
        name="emp_mach_emp_no"
        value={formData.emp_mach_emp_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={20}
      />

      {/* <Input
        label="yearsOfService"
        name="yearsOfService"
        isEditable={false}
        value={formData.yearsOfService}
        handleChange={handleChange}
      /> */}

      {/* *********************************************** */}
    </div>
  );
};

export default memo(CreateJopdata);
