import React from "react";

const Status = ({ value, handleChange }) => {
  return (
    <div className="space-y-2 ">
      <label className="w-full" htmlFor="status">
        Status
      </label>
      <select
        className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
        id={"status"}
        placeholder={`Enter Status Here`}
        value={value}
        name="status"
        onChange={handleChange}
      >
        <option hidden value="Choose">
          Choose
        </option>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default Status;
