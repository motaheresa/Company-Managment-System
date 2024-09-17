import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const EyePassword = ({ IsPasswordAppeared, setIsPasswordAppeared }) => {
  return (
    <span
      onClick={() => setIsPasswordAppeared(!IsPasswordAppeared)}
      className="cursor-pointer absolute text-gray-500 top-2/4 right-2 -translate-y-2/4"
    >
      {IsPasswordAppeared ? <FaEye /> : <FaEyeSlash />}
    </span>
  );
};

export default EyePassword;
