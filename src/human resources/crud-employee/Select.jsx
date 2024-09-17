import { useContext, useState } from "react";
import SelectID from "./SelectID";
import { useEffect } from "react";
import { CreateContext } from "../../Context/Context";

const Select = ({
  data,
  label,
  property,
  option,
  value,
  handleChange,
  value2 = "",
  handleChange2 = "",
  required = false,
  isEnabled,
}) => {
  let [employee, setEmployee] = useState("");
  useEffect(() => {
    if (label === "Name" && value) {
      setEmployee(data.find((emp) => emp[property] === value));
    }
  }, [value]);

  const usecon = useContext(CreateContext);
  return (
    <>
      <div className="w-full space-y-1">
        <label
          htmlFor={label}
          className={`font-semibold ${usecon.darkMode && "text-white"} `}
        >
          {label}
        </label>
        <select
          className={`${isEnabled && "cursor-not-allowed"} ${
            usecon.darkMode && "inputDark"
          } bg-transparent focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-400 placeholder:text-gray-400 border-solid hover:border-black px-2 py-2`}
          name={label}
          id={label}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required && required}
          disabled={isEnabled}
        >
          <option hidden value="">
            Choose {label}
          </option>
          {data.map((site, index) => (
            <>
              <option key={`${index}${site[option]}`} value={site[property]}>
                {site[option]}
              </option>
            </>
          ))}
          <option value="">None</option>
        </select>
      </div>
      {label === "Name" && (
        <SelectID
          data={data}
          employee={employee}
          value2={value2}
          handleChange={handleChange}
          handleChange2={handleChange2}
          setEmployee={setEmployee}
          isEnabled={isEnabled}
        />
      )}
    </>
  );
};

export default Select;
