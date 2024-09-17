import React, { useContext, useState } from "react";
import { CreateContext } from "../../../../Context/Context";
import "./index.css";
const MailInput = ({
  label,
  value,
  placeholder = "Enter Value Here",
  name,
  isEditable = true,
  handleChange,
  validationType,
  required = false,
  validationValue,
}) => {
  const usecon = useContext(CreateContext);

  return (
    <div className={`inputContainer grid grid-cols-3 gap-2 relative`}>
      <label className="col-span-3" htmlFor={label}>
        {label}
        {required && <span> (*)</span>}
      </label>
      <input
        className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        name={name}
        type="email"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        readOnly={!isEditable}
        maxLength={validationType === "maxLength" && validationValue}
      />
    </div>
  );
};

export default MailInput;
