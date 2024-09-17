import React, { useContext, useState } from "react";
import { CreateContext } from "../../../../Context/Context";
import "./index.css";
const Input = ({
  label,
  value,
  placeholder = "Enter Value Here",
  name,
  required=false,
  isEditable = true,
  handleChange,
  validationType,
  validationValue,
}) => {
  const usecon = useContext(CreateContext);
  const getLabel=()=>{
    return label.split(" ").map((ele)=>{
      ele=ele.charAt(0).toUpperCase()+ele.slice(1)+" "
      return ele
    })
  }

  return (
    <div className={`inputContainer grid grid-cols-3 gap-2 relative`}>

      <label className="col-span-3" htmlFor={label}>{getLabel()}
        {required&&<span>(*)</span>}
      </label>
        <input
          className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
          name={name}
          id={label}
          placeholder={placeholder}
          value={value}
          form={"create_form"}
          onChange={handleChange}
          required={required}
          readOnly={!isEditable}
          maxLength={validationType === "maxLength" && validationValue}
        />
      {/* </div> */}
    </div>
  );
};

export default Input;

export const Input2 = ({ name, value, handleChange, label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};
