import React from "react";
import Selection from "../atoms/Selection";
import Input from "../atoms/Input";
import InputDate from "../atoms/InputDate";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";

const BankData = ({
  emp_data,
  isEditable,
  formData,
  setFormData,
  setUpdatedValues,
}) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
     if (
      name === "emp_payment_date"
    ) {
      value = formatToISO8601(event);
    }
    setFormData((data) => ({ ...data, [name]: value }));
    setUpdatedValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <Selection
      accurateLabel={"Bank"}
        label="bank"
        name="Bank"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_bank}
        handleChange={handleChange}
      />
      <Input
        label="Account No"
        name="emp_acc_no"
        emp_data={emp_data}
        isEditable={isEditable}
        validationType={"maxLength"}
        validationValue={20}
        value={formData.emp_acc_no}
        handleChange={handleChange}
      />
      <InputDate
        label="Payment Date"
        name="emp_payment_date"
        emp_data={emp_data}
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_payment_date)}
        handleChange={handleChange}
      />
      <Selection
      accurateLabel={"Payment Type"}
        label="pay type"
        name="PayType"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_pay_type}
        handleChange={handleChange}
      />

      {/* <Selection
        label="bank branch"
        name="Bankbranch"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.Bankbranch}
        handleChange={handleChange}
      /> */}
      {/* Bankbranch */}
    </div>
  );
};

export default BankData;
