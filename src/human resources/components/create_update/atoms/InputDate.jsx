import React, { useContext, useState } from "react";
import { CreateContext } from "../../../../Context/Context";
import "./index.css"
const InputDate = ({ name, value, handleChange, label, isEditable=true }) => {
  const usecon=useContext(CreateContext)
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <div className="inputContainer grid grid-cols-3 gap-2 relative">
      {/* <span className={`label-date ${isFocused || value ? usecon.darkMode?"label-focused darkMode":"label-focused bg-white":usecon.darkMode?"text-gray-200 non-focused-calendar-dark":"text-gray-500 bg-white"} `}>{label}</span> */}
      {/* <label className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded" htmlFor={label}>{label}</label> */}
      <label className="col-span-3" htmlFor={label}>{label}</label>
      <input
        type="date"
        name={name}
        id={label}
        onChange={handleChange}
        readOnly={!isEditable}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"

      />
    </div>
  );
};

export default InputDate;
