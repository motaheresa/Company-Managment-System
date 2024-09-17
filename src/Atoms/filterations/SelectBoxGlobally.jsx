import React from "react";

 const SelectBox = ({
    label,
    value,
    name,
    handleChange,
    data = [],
    keeey,
  }) => {
    return (
      <div className="space-y-2 ">
        <label className="w-full" htmlFor={label}>
          {label}
        </label>
        <select
          className="focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2"
          name={name}
          id={label}
          placeholder={`Enter ${label} Here`}
          value={value}
          onChange={handleChange}
        >
          <option hidden value="Choose">
            Choose
          </option>
          {data.map((opt, index) => (
            <option
              key={opt?.[`${keeey}_code`] + index}
              value={opt?.[`${keeey}_code`]}
            >
              {opt?.[`${keeey}_eng_label`]}
            </option>
          ))}
          <option value="None">None</option>
        </select>
      </div>
    );
  };

export default React.memo(SelectBox)