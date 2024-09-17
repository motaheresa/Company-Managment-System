import React, { memo, useState } from "react";
import Input from "../atoms/Input";
import Selection from "../atoms/Selection";
import InputDate from "../atoms/InputDate";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import FileInput from "../atoms/FileInput";
import MailInput from "../atoms/MailInput";

const CreatePersonal = ({
  emp_data,
  formData,
  setFormData,
  setUpdatedValues,
  updatedValues,
}) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "avatar") {
      setFormData((data) => ({ ...data, [name]: event.target.files[0] }));
      setUpdatedValues((data) => ({ ...data, [name]: event.target.files[0] }));
      return;
    } else {
      if (name === "emp_no_child" && value) {
        value = +value;
      } else if (name === "emp_date_birth") {
        value = formatToISO8601(event);
      }
      setFormData((data) => ({ ...data, [name]: value }));
      setUpdatedValues((data) => ({ ...data, [name]: value }));
    }
  };

  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <Input
        label="Eng Name"
        required
        name="emp_eng_name"
        value={formData.emp_eng_name}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />
      <Input
        label="Arb Name"
        required
        name="emp_arb_name"
        value={formData.emp_arb_name}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
      />
      <MailInput
        label="Personal mail"
        name="emp_pers_mail"
        required
        value={formData.emp_pers_mail}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={50}
        type={"create"}
      />
      <Input
        label="Eng Fam"
        name="emp_eng_fam"
        value={formData.emp_eng_fam}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={200}
      />

      {/* ******************************************** */}

      <Input
        label="Arb Fam"
        name="emp_arb_fam"
        value={formData.emp_arb_fam}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={200}
      />
      <Input
        label="Eng Address1"
        name="emp_eng_add1"
        value={formData.emp_eng_add1}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={100}
        type={"create"}
      />
      <Input
        label="Arb Address1"
        name="emp_arb_add1"
        value={formData.emp_arb_add1}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={100}
        type={"create"}
      />
      {/* ******************************************** */}
      <FileInput
        label="Picture"
        name="avatar"
        value={updatedValues.avatar && updatedValues.avatar}
        type={"create"}
        handleChange={handleChange}
      />
      <Selection
      accurateLabel={"Marital Status"}
        label="marital stataus"
        name="Marital_status"
        emp_data={emp_data}
        value={formData.emp_marital_stat}
        handleChange={handleChange}
        type={"create"}
      />

      {/* ******************************************* */}

      <Input
        label="No of child"
        name="emp_no_child"
        value={formData.emp_no_child}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={2}
      />
      <Selection
      accurateLabel={"Nationality"}
        label="Nationality"
        name="Nationality"
        emp_data={emp_data}
        value={formData.emp_nat}
        handleChange={handleChange}
        type={"create"}
      />
      <InputDate
        label="Date Birth"
        name="emp_date_birth"
        value={convertToDateInputFormat(formData.emp_date_birth)}
        handleChange={handleChange}
      />

      {/* *********************************************** */}

      <Input
        label="Natioanl Id"
        name="emp_nat_no"
        value={formData.emp_nat_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={15}
        type={"create"}
      />
      <Input
        label="Insuarnce No"
        name="emp_ins_no"
        value={formData.emp_ins_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={15}
        type={"create"}
      />

      {/* *********************************************** */}

      <Input
        label="Passport No"
        name="emp_pass_no"
        value={formData.emp_pass_no}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={10}
        type={"create"}
      />

      {/* *********************************************** */}

      <Input
        label="Zip Code1"
        name="emp_zip_code1"
        value={formData.emp_zip_code1}
        handleChange={handleChange}
        validationType={"maxLength"}
        validationValue={7}
        type={"create"}
      />
      <Selection
        accurateLabel={"Emp Sex"}
        label="emp sex"
        name="emp_sex"
        value={formData.emp_sex}
        handleChange={handleChange}
        type={"create"}
      />

      {/* *********************************************** */}

      <Selection
      accurateLabel="Insurance Office"
        label="Insurance Office"
        name="InsOffice"
        emp_data={emp_data}
        value={formData.emp_ins_off}
        handleChange={handleChange}
        type={"create"}
      />
      <Selection
      accurateLabel={"Religion"}
        label="Religion"
        name="Religion"
        emp_data={emp_data}
        value={formData.emp_religion}
        handleChange={handleChange}
        type={"create"}
      />

      {/* *********************************************** */}

      <Selection
      accurateLabel={"Military Status"}
        label="MilitaryStatus"
        name="MilitaryStatus"
        emp_data={emp_data}
        value={formData.emp_military_stat}
        handleChange={handleChange}
        type={"create"}
      />
      {/* <Input
        label="age"
        name="age"
        isEditable={false}
        value={formData.age}
        handleChange={handleChange}
        type={"create"}
      /> */}

      {/* *********************************************** */}
    </div>
  );
};

export default memo(CreatePersonal);
