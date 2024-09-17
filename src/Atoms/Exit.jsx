import React from "react";
import { IoClose } from "react-icons/io5";

const Exit = ({ handleExit }) => {
  return (
    <button
      className="absolute right-0 top-0 mb-1 duration-200 bg-red-500 rounded-full hover:bg-red-800 text-white text-2xl"
      onClick={handleExit}
    >
      <IoClose />
    </button>
  );
};

export default Exit;
