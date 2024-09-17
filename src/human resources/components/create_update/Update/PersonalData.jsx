import React, { memo, useEffect, useState } from "react";
import Input from "../atoms/Input";
import InputDate from "../atoms/InputDate";
import Selection from "../atoms/Selection";
import { formatToISO8601 } from "../../../../Atoms/FormatToISO8601";
import { convertToDateInputFormat } from "../../../../Atoms/convertToDateInputFormat";
import FileInput from "../atoms/FileInput";
import MailInput from "../atoms/MailInput";
import axios from "axios";
import apiAuth from "../../../../Atoms/apiAuth";

const token = localStorage.getItem("token");
const DataPersonal = ({
  emp_data,
  isEditable,
  formData,
  setFormData,
  setUpdatedValues,
  updatedValues,
  setAvater,
}) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
    // if (name === "avatar") {
    //   setFormData((data) => ({ ...data, [name]: event.target.files[0] }));
    //   setUpdatedValues((data) => ({ ...data, [name]: event.target.files[0] }));
    //   return;
    // } else {
    setFormData((data) => ({ ...data, [name]: value }));
    if (name === "emp_no_child" && value) {
      value = +value;
    } else if (name === "emp_date_birth") {
      value = formatToISO8601(event);
    }
    setUpdatedValues((prev) => ({ ...prev, [name]: value }));
    // }
  };

  return (
    <>
      <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
        <Input
          label="Eng Name"
          name="emp_eng_name"
          isEditable={isEditable}
          value={formData.emp_eng_name}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={50}
        />
        <Input
          label="Arb Name"
          name="emp_arb_name"
          isEditable={isEditable}
          value={formData.emp_arb_name}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={50}
        />
        <Input
          label="Eng Fam"
          name="emp_eng_fam"
          isEditable={isEditable}
          value={formData.emp_eng_fam}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={200}
        />

        {/* ******************************************** */}

        <Input
          label="Arb Fam"
          name="emp_arb_fam"
          isEditable={isEditable}
          value={formData.emp_arb_fam}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={200}
        />
        <Input
          label="Eng Address1"
          name="emp_eng_add1"
          isEditable={isEditable}
          value={formData.emp_eng_add1}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={100}
        />
        <Input
          label="Arb Address1"
          name="emp_arb_add1"
          isEditable={isEditable}
          value={formData.emp_arb_add1}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={100}
        />
        {/* ******************************************* */}
        <Selection
          accurateLabel={"Emp Sex"}
          label="emp sex"
          name="emp_sex"
          value={formData.emp_sex}
          emp_data={emp_data}
          isEditable={isEditable}
          handleChange={handleChange}
        />
        <Selection
          accurateLabel={"Marital Status"}
          label="marital stataus"
          name="Marital_status"
          emp_data={emp_data}
          isEditable={isEditable}
          value={formData.emp_marital_stat}
          handleChange={handleChange}
        />

        {/* ******************************************* */}

        <Input
          label="No Of Child"
          name="emp_no_child"
          isEditable={isEditable}
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
          isEditable={isEditable}
          value={formData.emp_nat}
          handleChange={handleChange}
        />
        <InputDate
          label="Date Birth"
          name="emp_date_birth"
          isEditable={isEditable}
          value={convertToDateInputFormat(formData.emp_date_birth)}
          handleChange={handleChange}
        />
        <Input
          label="age"
          name="age"
          isEditable={false}
          placeholder=""
          value={formData.age}
          handleChange={handleChange}
        />

        {/* *********************************************** */}

        <Input
          label="Natioanl Id"
          name="emp_nat_no"
          isEditable={isEditable}
          value={formData.emp_nat_no}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={15}
        />
        <Input
          label="Insuarnce No"
          name="emp_ins_no"
          isEditable={isEditable}
          value={formData.emp_ins_no}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={15}
        />

        {/* *********************************************** */}

        <Input
          label="Passport No"
          name="emp_pass_no"
          isEditable={isEditable}
          value={formData.emp_pass_no}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={10}
        />

        {/* *********************************************** */}

        <Input
          label="Zip Code1"
          name="emp_zip_code1"
          isEditable={isEditable}
          value={formData.emp_zip_code1}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={7}
        />
        <MailInput
          label="Personal Mail"
          name="emp_pers_mail"
          isEditable={isEditable}
          value={formData.emp_pers_mail}
          handleChange={handleChange}
          validationType={"maxLength"}
          validationValue={50}
        />

        {/* *********************************************** */}

        <Selection
          accurateLabel={"Insurance Office"}
          label="Insurance Office"
          name="InsOffice"
          emp_data={emp_data}
          isEditable={isEditable}
          value={formData.emp_ins_off}
          handleChange={handleChange}
        />
        <Selection
          accurateLabel={"Religion"}
          label="Religion"
          name="Religion"
          emp_data={emp_data}
          isEditable={isEditable}
          value={formData.emp_religion}
          handleChange={handleChange}
        />

        {/* *********************************************** */}

        <Selection
          accurateLabel={"Military Status"}
          label="MilitaryStatus"
          name="MilitaryStatus"
          emp_data={emp_data}
          isEditable={isEditable}
          value={formData.emp_military_stat}
          handleChange={handleChange}
        />

        {/* *********************************************** */}
      </div>
    </>
  );
};

export default memo(DataPersonal);
