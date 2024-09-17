import { useContext, useEffect } from "react";
import { useState } from "react";
import { CreateContext } from "../../Context/Context";

const SelectID = ({ data, employee, handleChange , value2 , handleChange2, setEmployee ,isEnabled }) => {
//   const [value2, handleChange2] = useState("");
  useEffect(() => {
    if (employee) {
      handleChange2(employee.emp_no);
    }
  }, [employee]);
  useEffect(() => {
    if (value2 !== "" && value2 !== employee.emp_no) {
      const newEmp= data.find((emp) => emp.emp_no === value2);
      setEmployee(newEmp);
      handleChange(newEmp.emp_eng_name);
    }
  }, [value2]);
  const usecon=useContext(CreateContext)
  return (
    <div className="w-full space-y-1">
      <label htmlFor="Id" className={`${usecon.darkMode&&"text-white"} font-semibold`}>
        Id
      </label>
      <select
          className={`${isEnabled&&"cursor-not-allowed"} ${usecon.darkMode&&"inputDark"} bg-transparent focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-400 placeholder:text-gray-400 border-solid hover:border-black px-2 py-2`}
          name="Id"
        id="Id"
        value={value2}
        disabled={isEnabled}
        onChange={(e) => handleChange2(e.target.value)}
      >
        <option hidden value="">Choose Id</option>
        {data.map((emp,index) => (
          <>
            <option key={`${index}${emp["emp_no"]}`} value={emp["emp_no"]}>{emp["emp_no"]}</option>
          </>
        ))}
        <option value="">None</option>
      </select>
    </div>
  );
};

export default SelectID;
