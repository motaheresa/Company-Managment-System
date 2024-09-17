import React from "react";

const StartDate = ({name="from", value, handleChange,className="" }) => {
  return (
    <div className="space-y-2 ">
      <label className="w-full" htmlFor="From">
        From
      </label>
      <input
        required
        type="date"
        className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 "
        id={"From"}
        placeholder={`Enter Start Date Here`}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(StartDate);
