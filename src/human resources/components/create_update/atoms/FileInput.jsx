import React, { useContext, useRef, useState } from "react";
import { CreateContext } from "../../../../Context/Context";
import "./index.css";
import { FaFileLines } from "react-icons/fa6";
const FileInput = ({
  label,
  name,
  value = null,
  handleChange,
  isEditable = true,
}) => {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    isEditable && fileInputRef.current.click();
  };
  const usecon = useContext(CreateContext);
  return (
    <div className={`inputContainer grid grid-cols-3 gap-2 relative`}>
        <label className="col-span-3" htmlFor={label}>
          {label}
        </label>
      <input
        type="file"
        accept="image/*"
        name={name}
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {!value && (
        <div
          onClick={handleButtonClick}
          className="focus:border-orange-500 col-span-3 flex items-center justify-between h-fit focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        >
          <span
            className={`${usecon.darkMode ? "text-gray-200" : "text-gray-500"}`}
          >
            Select file here
          </span>
          <span className="OriginalColor text-xl">
            <FaFileLines />
          </span>
        </div>
      )}
      {value && (
        <div
          onClick={handleButtonClick}
          className={`${!isEditable && "cursor-not-allowed"}  ${
            usecon.darkMode && "inputDark "
          }  focus:outline-orange-400 outline-1 focus:border-orange-400  border focus:shadow-orange-400 focus:shadow-md col-span-3 px-3 rounded-md `}
        >
          {value?.name}
        </div>
      )}
    </div>
  );
};
export default FileInput;
