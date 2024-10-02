import axios from "axios";
import React, { useEffect, useState } from "react";

const DoubleSelection = ({
  label,
  value,
  name,
  actualLabel1,
  actualLabel2,
  placeholder = "Select Value Here",
  isEditable = true,
  handleChange,
  emp_data,
  required = false,
  label2 = "",
  value2 = "",
  prop2,
  name2 = "",
  type,
}) => {
  let prop = prop2;

  const [property2, setProperty2] = useState(prop);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  let propertyOrig = "";
  let optionValue = "";
  let optionContent = "";
  let optionValue2 = "";
  let optionContent2 = "";
  let updatingName = "";
  let updatingName2 = "";
  if (name2 === "PassCenter") {
    updatingName = "emp_pass_cty";
    updatingName2 = "emp_pass_center";
    propertyOrig = "city";
    optionValue = "cty_code";
    optionContent = "cty_eng_label";
    optionValue2 = "center_code";
    optionContent2 = "center_eng_label";
  } else if (name2 === "CenterOfBirth") {
    updatingName = "emp_cty_birth";
    updatingName2 = "emp_center_birth";
    propertyOrig = "city";
    optionValue = "cty_code";
    optionContent = "cty_eng_label";
    optionValue2 = "center_code";
    optionContent2 = "center_eng_label";
  } else if (name2 === "Center") {
    updatingName = "emp_id_cty";
    updatingName2 = "emp_id_center";
    propertyOrig = "city";
    optionValue = "cty_code";
    optionContent = "cty_eng_label";
    optionValue2 = "center_code";
    optionContent2 = "center_eng_label";
  } else if (name2 === "Branch") {
    updatingName = "emp_com_code";
    updatingName2 = "emp_bra_code";
    propertyOrig = "company";
    optionValue = "com_code";
    optionContent = "com_eng_label";
    optionValue2 = "bra_code";
    optionContent2 = "bra_eng_label";
  }
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:1813/lookUp/${propertyOrig}`)
        .then((res) => {
          setData(res.data.data);
        });
    };
    if (propertyOrig) {
      getData();
    }
  }, []);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:1813/lookUp/${property2}`)
        .then((res) => setData2(res.data.data))
        .catch((err) => console.log(err));
    };
    if (property2!="null"&&property2) {
      getData();
    }
  }, [property2]);
  useEffect(() => {
    if (value && name2 !== "Branch") {
      setProperty2((prev) => `center?city_code=${value}`);
    } else if (value && name2 === "Branch") {
      setProperty2((prev) => `branch?company_code=${value}`);
    }
  }, [value]);
  return (
    <>
      <div className="inputContainer grid grid-cols-3 gap-2 relative">
        <label className="col-span-3" htmlFor={label}>
          {actualLabel1 || label}
          {required && <span> (*)</span>} ~(1)
        </label>
        {/* <label htmlFor={label} className={`${usecon.darkMode&&"text-white"} min-w-fit w-full`}>
          {label}
        </label> */}
        {/* <span className={`label ${isFocused || value ? usecon.darkMode?"label-focused darkMode":"label-focused":usecon.darkMode?"text-gray-200 bg-transparent":"text-gray-500"} `}>{label}</span> */}
        <select
          id={label}
          type="text"
          className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
          placeholder={placeholder}
          name={updatingName}
          onChange={handleChange}
          value={value}
          disabled={!isEditable}
        >
          {type !== "create" ? (
            <option value={emp_data[name]?.[optionValue]}>
              {emp_data[name]?.[optionContent]}
            </option>
          ) : (
            <option hidden={true} value={null}></option>
          )}
          {data.map((oneData) => (
            <option key={oneData.optionContent} value={oneData[optionValue]}>
              {oneData[optionContent]}
            </option>
          ))}
          <option value="">None</option>
        </select>
      </div>
      <div className="inputContainer grid grid-cols-3 gap-2 relative">
        <label className="col-span-3" htmlFor={label2}>
          {actualLabel2 || label2}
          {required && <span> (*)</span>} ~(2)
        </label>
        <select
          id={label2}
          type="text"
          className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
          placeholder={placeholder}
          name={updatingName2}
          onChange={handleChange}
          value={value2}
          disabled={!isEditable}
        >
          {type !== "create" ? (
            emp_data[name2] == value2 && (
              <option hidden value={emp_data[name2]?.[optionValue2]}>
                {emp_data[name2]?.[optionContent2]}
              </option>
            )
          ) : (
            <option hidden={true} value={null}></option>
          )}
          {data2.map((oneData) => (
            <option key={oneData.optionContent2} value={oneData[optionValue2]}>
              {oneData[optionContent2]}
            </option>
          ))}
          <option value="">None</option>
        </select>
      </div>
    </>
  );
};

export default DoubleSelection;
