import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getTimeFromDate } from "../../../../Atoms/getTimeFromDate";
import { CreateContext } from "../../../../Context/Context";
const Selection = ({
  label,
  value,
  name,
  placeholder = "Select Value Here",
  isEditable = true,
  handleChange,
  required = false,
  emp_data,
  type,
  accurateLabel,
  dep_prop1,
  dep_prop2,
}) => {
  const [data, setData] = useState([]);

  let property = "";
  let optionValue = "";
  let optionContent = "";
  let updatingName = "";
  if (label === "Nationality") {
    updatingName = "emp_nat";
    property = "nationality";
    optionValue = "nat_code";
    optionContent = "nat_eng_label";
  }
  else if (label === "emp sex") {
    updatingName = "emp_sex";
  }
  else if (label === "marital stataus") {
    updatingName = "emp_marital_stat";
    property = "martial-status";
    optionValue = "mrts_code";
    optionContent = "mrts_eng_label";
  }
  else if (label === "Insurance Office") {
    updatingName = "emp_ins_off";
    property = "insoffice";
    optionValue = "ins_code";
    optionContent = "ins_eng_label";
  }
  else if (label === "Religion") {
    updatingName = "emp_religion";
    property = "religion";
    optionValue = "rlg_code";
    optionContent = "rlg_eng_label";
  }
  else if (label === "MilitaryStatus") {
    updatingName = "emp_military_stat";
    property = "military";
    optionValue = "mls_code";
    optionContent = "mls_eng_label";
  }
  else if (label === "com code") {
    updatingName = "emp_com_code";
    property = "company";
    optionValue = "com_code";
    optionContent = "com_eng_label";
  }
  else if (label === "contract type") {
    updatingName = "emp_contract_code";
    property = "contract";
    optionValue = "cont_code";
    optionContent = "cont_eng_label";
  }
  else if (label === "Shift") {
    updatingName = "shift_id";
    property = "shifts";
    optionValue = "shift_id";
    optionContent = "shift_start&shift_end";
  }
  else if (label === "job postion") {
    updatingName = "emp_job_post";
    property = `job-post?company_code=${
      dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
    }&branch_code=${dep_prop2 ? dep_prop2 : emp_data?.emp_bra_code}`;
    optionValue = "job_code";
    optionContent = "job_eng_label";
  }
  // else if(label==="Sup job postion"){
  //   updatingName = "emp_sup_job_post";
  //   property = `job-post?company_code=${
  //     dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
  //   }&branch_code=${dep_prop2 ? dep_prop2 : emp_data?.emp_bra_code}`;
  //   optionValue = "job_code";
  //   optionContent = "job_eng_label";
  // }
  else if (label === "type") {
    updatingName = "emp_emp_type";
    property = "emp-type";
    optionValue = "emp_type_code";
    optionContent = "emp_type_eng_label";
  }
  else if (label === "Site") {
    updatingName = "emp_site";
    property = `site?company_code=${
      dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
    }&branch_code=${dep_prop2 ? dep_prop2 : emp_data?.emp_bra_code}`;
    optionValue = "site_code";
    optionContent = "site_eng_label";
  }
  else if (label === "sector") {
    updatingName = "emp_sector";
    property = `sector?company_code=${
      dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
    }&branch_code=${dep_prop2 ? dep_prop2 : emp_data?.emp_bra_code}`;
    optionValue = "sector_code";
    optionContent = "sector_eng_label";
  }
  else if (label === "Manager title") {
    updatingName = "emp_sup_job_post";
    property = `job-post?company_code=${
      dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
    }&branch_code=${dep_prop2 ? dep_prop2 : emp_data?.emp_bra_code}`;
    optionValue = "job_code";
    optionContent = "job_eng_label";
  }
  else if (label === "branch manger") {
    updatingName = "emp_bra_code";
    property = `branch?company_code=${
      dep_prop1 ? dep_prop1 : emp_data?.emp_com_code
    }`;
    optionValue = "bra_code";
    optionContent = "bra_eng_label";
  }
  else if (label === "TermFlag") {
    updatingName = "emp_term_flag";
    property = "term-code";
    optionValue = "term_flag";
    optionContent = "term_eng_label";
  }

  // Bank Details
  else if (label === "bank") {
    updatingName = "emp_bank";
    property = "bank";
    optionValue = "bnk_code";
    optionContent = "bnk_eng_label";
  }
  else if (label === "pay type") {
    updatingName = "emp_pay_type";
    property = "pay-code";
    optionValue = "pay_code";
    optionContent = "pay_eng_label";
  }

  // Skills Data
  else if (label === "skill type") {
    property = "skill-type";
    optionValue = "skt_code";
    optionContent = "skt_eng_label";
  }
  else if (label === "Skill Type") {
    updatingName = "emp_skill_type";
    property = "skill-type";
    optionValue = "skt_code";
    optionContent = "skt_eng_label";
  }

  // Center & City
  else if (label === "District") {
    updatingName = "emp_add_district";
    property = "District";
    optionValue = "DIST_CODE";
    optionContent = "DIST_ENG_LABEL";
  }
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:1813/lookUp/${property}`)
        .then((res) => {
          setData(res.data.data);
        });
    };
    if(property){
      getData();
    }
  }, [property]);

  let getShiftsForOptions = (oneData) => {
    let prop1 = getTimeFromDate(oneData[optionContent?.split("&")[0]]);
    let prop2 = getTimeFromDate(oneData[optionContent?.split("&")[1]]);
    return [`${prop1} : `, prop2];
  };
  const getShiftsForValue = () => {
    let prop1 = optionContent?.split("&")[0];
    let prop2 = optionContent?.split("&")[1];
    return [
      `${getTimeFromDate(emp_data?.[name]?.[prop1])} : `,
      getTimeFromDate(emp_data?.[name]?.[prop2]),
    ];
  };
  const usecon = useContext(CreateContext);
  return (
    <>
      {label !== "emp sex" ? (
        <div className="inputContainer grid grid-cols-3 gap-2 relative">
          <label className="col-span-3" htmlFor={label}>
            {accurateLabel}
            {required && <span> (*)</span>}
          </label>
          {/* <span className={`label ${isFocused || value ? usecon.darkMode?"label-focused darkMode":"label-focused":usecon.darkMode?"text-gray-200 bg-transparent":"text-gray-500"} `}>{label}</span> */}
          <select
            id={label}
            placeholder={placeholder}
            required
            type="text"
            className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
            name={updatingName}
            onChange={handleChange}
            value={value}
            disabled={!isEditable}
          >
            {/* optionContent = "shift_start&shift_end"; */}
            {type !== "create" ? (
              <option hidden value={emp_data[name]?.[optionValue]}>
                {optionContent === "shift_start&shift_end"
                  ? getShiftsForValue().map((ele) => ele)
                  : emp_data[name]?.[optionContent]}
              </option>
            ) : (
              <option hidden={true} value={null}></option>
            )}
            {data.map((oneData) => (
              <option key={oneData.optionContent} value={oneData[optionValue]}>
                {optionContent === "shift_start&shift_end"
                  ? getShiftsForOptions(oneData)?.map((ele) => ele)
                  : oneData?.[optionContent]}
              </option>
            ))}
            <option value="">None</option>
          </select>
        </div>
      ) : (
        <div className="inputContainer grid grid-cols-3 gap-2 relative">
          <label className="col-span-3" htmlFor={label}>
            {accurateLabel}
            {required && <span> (*)</span>}
          </label>
          {/* <span className={`label ${isFocused || value ? usecon.darkMode?"label-focused darkMode":"label-focused":usecon.darkMode?"text-gray-200 bg-transparent":"text-gray-500"} `}>{label}</span> */}
          <select
            id={label}
            placeholder={placeholder}
            required
            type="text"
            className="focus:border-orange-500 col-span-3 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
            name={updatingName}
            onChange={handleChange}
            value={value}
            disabled={!isEditable}
          >
            {/* optionContent = "shift_start&shift_end"; */}
            {type !== "create" ? (
              <option value={emp_data[name]?.[optionValue]}>
                {emp_data[name]?.[optionContent]}
              </option>
            ) : (
              <option hidden={true} value={null}></option>
            )}
            {/* {data.map((oneData) => (
            <option key={oneData.optionContent} value={oneData[optionValue]}>
              {optionContent === "shift_start&shift_end"
                ? getShiftsForOptions(oneData).map((ele) => ele)
                : oneData[optionContent]}
            </option>
          ))} */}
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="">None</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Selection;
