import React, { memo, useState } from "react";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import apiAuth from "../../../../Atoms/apiAuth";
import Success from "../../../../Atoms/alerts/Success";
import Filled from "../../../../Atoms/alerts/Filled";
import CreatePersonal from "./CreatePersonal";
import CreateCenterCity from "./CreateCenterCity";
import CreateCivil from "./CreateCivil";
import CreateJopdata from "./CreateJopdata";
import CreateEmergency from "./CreateEmergency";
import CreateBank from "./CreateBank";
import CreateSkills from "./CreateSkills";
import "./index.css";
import Header from "../atoms/header/Header";
import { BiReset } from "react-icons/bi";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const buttons = [
  {
    id: 1,
    content: "Personal",
    isActive: true,
  },
  {
    id: 2,
    content: "Center | City | District",
    isActive: false,
  },
  {
    id: 4,
    content: "Emergency",
    isActive: false,
  },
  {
    id: 3,
    content: "Job",
    isActive: false,
  },

  {
    id: 5,
    content: "Bank",
    isActive: false,
  },
  {
    id: 6,
    content: "Civil",
    isActive: false,
  },
  {
    id: 7,
    content: "Skills",
    isActive: false,
  },
];

const Content = ({ updatedValues, setUpdatedValues, handleExit }) => {
  const [btns, setBtns] = useState(buttons);
  const [alert, setAlert] = useState("");

  const [formData, setFormData] = useState({
    // Personal Data
    emp_eng_name: null,
    emp_arb_name: null,
    emp_eng_fam: null,
    emp_arb_fam: null,
    emp_religion: null,
    emp_marital_stat: null,
    emp_no_child: null,
    emp_nat: null,
    emp_contract_code: null,
    emp_date_birth: null,
    emp_nat_no: null,
    emp_ins_no: null,
    emp_ins_off: null,
    emp_pass_no: null,
    emp_eng_add1: null,
    emp_arb_add1: null,
    emp_zip_code1: null,
    emp_sex: null,
    emp_pers_mail: null,
    MilitaryStatus: null,
    age: null,
    // JopData
    emp_com_code: null,
    emp_no: null,
    emp_sup_no:null,
    // emp_sup_job_post:null,
    emp_apl_no: null,
    emp_id_no: null,
    emp_decision_no: null,
    emp_start_dt: null,
    JobPost: null,
    emp_job_post_dt: null,
    emp_sal_chang_dt: null,
    emp_trans_dt: null,
    emp_term_dt: null,
    emp_fix_value: null,
    emp_emp_type: null, // emp_bra_code
    emp_basic_sal: null,
    emp_gross_sal: null,
    emp_site: null,
    shift_id: null,
    emp_sector: null,
    emp_job_post: null,
    emp_sup_job_post: null,
    emp_bra_sup: null,
    emp_prf_mail: null,
    emp_mach_emp_no: null,
    emp_term_flag: null,
    yearsOfService: null,
    // Skills Data
    emp_skill_obt_date: null,
    emp_skill_type: null,
    //  Center & City
    emp_id_cty: null,
    emp_id_center: null,
    emp_leav_bal: null,
    emp_add_country: null,
    emp_add_city: null,
    emp_cty_birth: null,
    emp_pass_cty: null,
    emp_pass_center: null,
    emp_center_birth: null,
    // District: null,
    emp_add_district:null,

    // Bank Data
    emp_acc_no: null,
    Email:null,
    emp_bank: null,
    emp_payment_date: null,
    emp_pay_type: null,

    // Civil Data
    emp_military_stat: null,
    emp_ml_crt_no: null,
    emp_ml_crt_issue_dt: null,
    emp_ml_expired_dt: null,
    emp_med_no: null,
    emp_med_issue_dt: null,
    emp_med_expired_dt: null,
    emp_cost_center: null,
    emp_id_issue_date: null,

    // Emergency Data
    emp_tel1: null,
    emp_arb_add2:null,
    emp_eng_add2: null,
    emp_zip_code2: null,
    emp_tel2: null,
    emp_other_mail1: null,
    emp_other_mail2: null,

    // Dependant Values
    emp_bra_code: null,
    avatar: null,
  });
  const handleActiveFunc = (selectedBtn) => {
    setBtns(
      btns.map((el) =>
        el.content === selectedBtn.content
          ? { ...el, isActive: true }
          : { ...el, isActive: false }
      )
    );
  };
  const getUpdated = async () => {
    let avatar = "";
    let id = updatedValues.emp_no || null;
    if (updatedValues.avatar) {
      avatar = updatedValues.avatar;
      delete updatedValues.avatar;
    }
    await axios
      .post(`http://localhost:1813/user/`, updatedValues, apiAuth(token))
      .then((res) => {
        setAlert("Success");
        for (const index in formData) {
          formData[index] = "";
        }
      })
      .then(() => {
        if (avatar && id) {
          handelUpdateAvater(avatar, id);
        }
    console.log("Yes")
        setUpdatedValues({});
      })
      .catch((err) => {
        console.log(err);
    console.log("No")
    console.log(updatedValues);
        setAlert("Fail");
      });
  };
  const handelUpdateAvater = async (avatar, id) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    await axios
      .patch(`http://localhost:1813/user/update-avatar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => console.log("Picture updated successfully", res.data))
      .catch((err) => console.log("Error While Updating Picture", err));
  };
  const handleSave = async () => {
    let flag=true;
    for (const ele in formData) {
      if (!formData[ele]) {
        if (
          ele == "emp_com_code" ||
          ele == "emp_bra_code" ||
          ele == "emp_no" ||
          ele == "emp_eng_name" ||
          ele == "emp_job_post" ||
          ele == "emp_sector" ||
          ele == "emp_prf_mail" ||
          ele == "shift_id" ||
          ele == "emp_arb_name" ||
          ele == "emp_pers_mail" ||
          ele == "SupJobPost"||
          ele == "JobPost"||
          ele == "Shift"||
          ele == "emp_prf_mail"||
          ele == "emp_leav_bal"||
          ele == "emp_start_dt"||
          ele == "emp_start_dt"
          
        ) {
          flag=false;
          break;
        }
      }
    }
    if(flag){
      for (const ele in updatedValues) {
          if(!updatedValues[ele]){
            updatedValues[ele]=null;
          }
      }
      
      getUpdated();
    }else{
      window.alert("All fields marked with an asterisk (*) are required. Please complete them before submitting.");
    }
  };
  const handleReset = () => {
    if (Object.keys(updatedValues).length > 0) {
      let alert = window.confirm("Are you sure you want to reset the values?");
      if (alert) {
        for (const ele in formData) {
          formData[ele] = "";
        }
        setUpdatedValues({});
      }
    }
  };
  const activeData = btns.find((btn) => btn.isActive && btn);
  const token = localStorage.getItem("token");
  return (
    <>
      {alert === "Success" && (
        <Success message="User Created Seccessfuly" setMessage={setAlert} />
      )}
      {alert === "Fail" && (
        <Filled message="Error,Something went wrong" setMessage={setAlert} />
      )}
      {alert === "Success Terminte" && (
        <Success message="User Is Terminted Seccessfuly" />
      )}
      {alert === "Fail Terminte" && (
        <Filled message="Error,Failed To Terminte!" />
      )}
      <header className="flex  relative ">
        <Header handleActiveFunc={handleActiveFunc} btns={btns} />
      </header>
      <div className="flex items-center mt-2 justify-center gap-2">
        <Tooltip
          title="Create"
          onClick={handleSave}
          className=" OriginalColor hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
        >
          <IconButton>
            <IoCreateOutline />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Reset"
          onClick={handleReset}
          className=" OriginalColor hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
        >
          <IconButton>
            <BiReset />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Exit"
          onClick={() =>
            handleExit("Are you sure you want to reset the values?",formData,setFormData)
          }
          className=" OriginalColor hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
        >
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </div>
      <main className="mx-2">
        {activeData.id === 1 && (
          <CreatePersonal
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
            updatedValues={updatedValues}
          />
        )}
        {activeData.id === 2 && (
          <CreateCenterCity
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 6 && (
          <CreateCivil
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 3 && (
          <CreateJopdata
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
            updatedValues={updatedValues}
          />
        )}
        {activeData.id === 4 && (
          <CreateEmergency
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 5 && (
          <CreateBank
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 7 && (
          <CreateSkills
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
      </main>
    </>
  );
};

export default memo(Content);
