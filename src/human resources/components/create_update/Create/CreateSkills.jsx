import React from 'react'
import Selection from '../atoms/Selection';
import InputDate from '../atoms/InputDate';
import { convertToDateInputFormat } from '../../../../Atoms/convertToDateInputFormat';
import { formatToISO8601 } from '../../../../Atoms/FormatToISO8601';

const CreateSkills = ({ emp_data,isEditable,formData,setFormData,setUpdatedValues}) => {
    const handleChange = (event) => {
        let { name, value } = event.target;
        if(name==="emp_skill_obt_date"){
          value = formatToISO8601(event);
        }
        setFormData((data) => ({ ...data, [name]: value }));
        setUpdatedValues((data) => ({ ...data, [name]: value }));
      };
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-6 w-full mx-auto p-4">
      
      <Selection
      accurateLabel={"Skill Type"}
        label="Skill Type"
        name="SkillType"
        emp_data={emp_data}
        isEditable={isEditable}
        value={formData.emp_skill_type}
        handleChange={handleChange}
        type={"create"}
      />
      <InputDate
         label="Skill Obt Date"
        name="emp_skill_obt_date"
        emp_data={emp_data}
        isEditable={isEditable}
        value={convertToDateInputFormat(formData.emp_skill_obt_date)}
        handleChange={handleChange}
        type={"create"}
      />
    </div>
  )
}

export default CreateSkills