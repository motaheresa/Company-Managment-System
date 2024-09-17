import React from "react";
import Input from "../atoms/Input";
import DoubleSelection from "../atoms/DoubleSelection";
import Selection from "../atoms/Selection";

const CreateCenterCity = ({
  emp_data,
  isEditable,
  formData,
  setFormData,
  setUpdatedValues,
}) => {
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
    setUpdatedValues((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      <DoubleSelection
        label="City"
        label2="Center"
        name="City"
        name2="Center"
        formData={formData}
        emp_data={emp_data}
        prop2={`${
          formData?.emp_id_cty && `center?city_code=${formData?.emp_id_cty}`
        }`}
        isEditable={isEditable}
        value={formData.emp_id_cty}
        value2={formData.emp_id_center}
        handleChange={handleChange}
        type={"create"}
      />
      <DoubleSelection
        label="CityOfBirth"
        label2="CenterOfBirth"
        name="CityOfBirth"
        name2="CenterOfBirth"
        formData={formData}
        emp_data={emp_data}
        prop2={`${
          formData?.emp_cty_birth &&
          `center?city_code=${formData?.emp_cty_birth}`
        }`}
        isEditable={isEditable}
        value={formData.emp_cty_birth}
        value2={formData.emp_center_birth}
        handleChange={handleChange}
        type={"create"}
      />
      {/* <Input
        label="Address Country"
        name="emp_add_country"
        emp_data={emp_data}
        validationType={"maxLength"}
        validationValue={2}
        value={formData.emp_add_country}
        handleChange={handleChange}
        type={"create"}
      />
      <Input
        label="Address City"
        name="emp_add_city"
        emp_data={emp_data}
        validationType={"maxLength"}
        validationValue={3}
        value={formData.emp_add_city}
        handleChange={handleChange}
        type={"create"}
      /> */}
      <DoubleSelection
      actualLabel1="Passport City"
      actualLabel2="Passport Center"
        label="Pass City"
        label2="Pass Center"
        name="PassCity" // emp_pass_center
        name2="PassCenter"
        formData={formData}
        emp_data={emp_data}
        prop2={`${
          formData?.emp_pass_cty && `center?city_code=${formData?.emp_pass_cty}`
        }`}
        isEditable={isEditable}
        value={formData.emp_pass_cty}
        value2={formData.emp_pass_center}
        handleChange={handleChange}
        type={"create"}
      />
    <Selection
      accurateLabel={"District"}
        label="District"
        name="District"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_add_district}
        handleChange={handleChange}
        type={"create"}
        />
      {/* <Selection
      accurateLabel={"Distract"}
        label="District"
        name="District"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.District}
        handleChange={handleChange}
      /> */}

      {/* *********************************************** */}
    </div>
  );
};

export default CreateCenterCity;
