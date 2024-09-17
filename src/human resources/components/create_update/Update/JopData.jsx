import React, { memo } from "react";
import Input from "../atoms/Input";
import InputDate from "../atoms/InputDate";
import Selection from "../atoms/Selection";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import MailInput from "../atoms/MailInput";

const JopData = ({
  emp_data,
  isEditable,
  formData,
  setFormData,
  setUpdatedValues,
}) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "emp_com_code") {
      setFormData((data) => ({
        ...data,
        [name]: value,
        emp_bra_code: "",
        emp_sector: "",
        emp_site: "",
        emp_job_post: "",
      }));
    } else if (name === "emp_bra_code") {
      setFormData((data) => ({
        ...data,
        [name]: value,
        emp_sector: "",
        emp_site: "",
        emp_job_post: "",
      }));
    } else {
      setFormData((data) => ({ ...data, [name]: value }));
    }
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

    if (name === "emp_com_code") {
      setUpdatedValues((prev) => ({
        ...prev,
        [name]: value,
        emp_bra_code: null,
        emp_sector: null,
        emp_site: null,
        emp_job_post: null,
      }));
    } else if (name === "emp_bra_code") {
      setUpdatedValues((prev) => ({
        ...prev,
        [name]: value,
        emp_sector: null,
        emp_site: null,
        emp_job_post: null,
      }));
    } else {
      setUpdatedValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <Input
        label="Emp Id"
        name="emp_no"
        isEditable={isEditable}
        value={formData.emp_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
      />
      <Input
        label="Manager Id"
        name="emp_sup_no"
        isEditable={isEditable}
        value={formData.emp_sup_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
      />
      <Selection
        accurateLabel={"Manager Title"}
        label="Manager title"
        name="SupJobPost"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_sup_job_post}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code}
        dep_prop2={formData.emp_bra_code}
      />
      <Selection
        accurateLabel={"Company"}
        label="com code"
        name="Company"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_com_code}
        handleChange={handleChange}
      />
      <Selection
        accurateLabel={"Branch"}
        label="branch manger"
        name="Branch"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_bra_code}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code}
      />
      <Selection
        accurateLabel={"Sector"}
        label="sector"
        name="Sector"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_sector}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code}
        dep_prop2={formData.emp_bra_code}
      />
      <Selection
        accurateLabel={"Site"}
        label="Site"
        name="Site"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_site}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code}
        dep_prop2={formData.emp_bra_code}
      />
      <Selection
        accurateLabel={"Shift"}
        label="Shift"
        name="Shift"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.shift_id}
        handleChange={handleChange}
      />
      <Selection
        accurateLabel={"Contract Type"}
        label="contract type"
        name="Contract"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_contract_code}
        handleChange={handleChange}
      />

      <Input
        label="Applicant Id"
        name="emp_apl_no"
        isEditable={isEditable}
        value={formData.emp_apl_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={6}
      />
      <Input
        label="Notification Email "
        name="Email"
        isEditable={isEditable}
        value={formData.Email}
        handleChange={handleChange}
      />
            <MailInput
        label="Professional Mail"
        name="emp_prf_mail"
        isEditable={isEditable}
        value={formData.emp_prf_mail}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />

      {/* ******************************************** */}
      
      <Input
        label="Decision No"
        name="emp_decision_no"
        isEditable={isEditable}
        value={formData.emp_decision_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}

      />
            <Input
        label="Leave Balance"
        name="emp_leav_bal"
        isEditable={isEditable}
        value={formData.emp_leav_bal}
        handleChange={handleChange}
      />
      <InputDate
        label="Start Date"
        name="emp_start_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_start_dt)}
        handleChange={handleChange}
      />
      <Input
        label="years Of Service"
        name="yearsOfService"
        placeholder=""
        isEditable={false}
        value={formData.yearsOfService}
        handleChange={handleChange}
      />

      {/* ******************************************* */}

      {/* <Selection
        label="Shift End"
        name="Shift"
        emp_data={emp_data}
        value={formData.shift_id}
        isEditable={isEditable}
        handleChange={handleChange}
      /> */}
      <Selection
        accurateLabel={"Job Position"}
        label="job postion"
        name="JobPost"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_job_post}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code}
        dep_prop2={formData.emp_bra_code}
      />

      {/* <Selection
        accurateLabel="Sup Job Position"
        label="Sup job postion"
        name="emp_sup_job_post"
        isEditable={isEditable}
        required
        emp_data={emp_data}
        value={formData.emp_sup_job_post}
        handleChange={handleChange}
        dep_prop1={formData.emp_com_code && formData.emp_com_code}
        dep_prop2={formData.emp_bra_code && formData.emp_bra_code}
      /> */}

      {/* *********************************************** */}

      <InputDate
        label="Job Position Date"
        name="emp_job_post_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_job_post_dt)}
        handleChange={handleChange}
      />
      <InputDate
        label="Salary Change Date"
        name="emp_sal_chang_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_sal_chang_dt)}
        handleChange={handleChange}
      />
      

      {/* *********************************************** */}

      <InputDate
        label="Emp Transmision Date"
        name="emp_trans_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_trans_dt)}
        handleChange={handleChange}
      />
      <InputDate
        label="Termmiantion Date"
        name="emp_term_dt"
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_term_dt)}
        handleChange={handleChange}
      />
      <Input
        label="Fix Value"
        name="emp_fix_value"
        isEditable={isEditable}
        value={formData.emp_fix_value}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
      />

      {/* *********************************************** */}

      <Selection
        accurateLabel={"Type"}
        label="type"
        name="Type"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_emp_type}
        handleChange={handleChange}
      />

      <Input
        label="Basic Salary"
        name="emp_basic_sal"
        isEditable={isEditable}
        value={formData.emp_basic_sal}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
      />
      <Input
        label="Gross Salary"
        name="emp_gross_sal"
        isEditable={isEditable}
        value={formData.emp_gross_sal}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={9}
      />


      {/* *********************************************** */}

      <Input
        label="Machine Id"
        name="emp_mach_emp_no"
        isEditable={isEditable}
        value={formData.emp_mach_emp_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={20}
      />
      <Selection
        accurateLabel={"Term Flag"}
        label="TermFlag"
        name="TermFlag"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_term_flag}
        handleChange={handleChange}
      />

      {/* *********************************************** */}
    </div>
  );
};

export default memo(JopData);
