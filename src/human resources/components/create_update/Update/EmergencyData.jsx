import React from "react";
import Input from "../atoms/Input";
import MailInput from "../atoms/MailInput";

const EmergencyData = ({ isEditable, formData, setFormData,setUpdatedValues }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
    if (name === "") {
      return;
    }
    setUpdatedValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <Input
        label="Telephone1"
        name="emp_tel1"
        isEditable={isEditable}
        value={formData.emp_tel1}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
      />
      <Input
        label="Telephone2"
        name="emp_tel2"
        isEditable={isEditable}
        value={formData.emp_tel2}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
      />
      <Input
        label="Eng Address2"
        name="emp_eng_add2"
        isEditable={isEditable}
        value={formData.emp_eng_add2}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={100}
      />
      <Input
        label="Arb Address2"
        name="emp_arb_add2"
        isEditable={isEditable}
        value={formData.emp_arb_add2}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={100}
        type={"create"}
      />
      <Input
        label="Zip Code2"
        name="emp_zip_code2"
        isEditable={isEditable}
        value={formData.emp_zip_code2}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={7}
      />
      <MailInput
        label="Other Mail1"
        name="emp_other_mail1"
        isEditable={isEditable}
        value={formData.emp_other_mail1}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />
      <MailInput
        label="Other Mail2"
        name="emp_other_mail2"
        isEditable={isEditable}
        value={formData.emp_other_mail2}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />
    </div>
  );
};

export default EmergencyData;
