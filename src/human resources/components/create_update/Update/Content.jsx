import React, { memo, useEffect, useRef, useState } from "react";
import DataPersonal from "./PersonalData";
import JopData from "./JopData";
import axios from "axios";
import apiAuth from "../../../../Atoms/apiAuth";
import CenterCity from "./Center&City";
import BankData from "./BankData";
import CivilData from "./CivilData";
import EmergencyData from "./EmergencyData";
import SkillsData from "./SkillsData";
import Success from "../../../../Atoms/alerts/Success";
import Filled from "../../../../Atoms/alerts/Filled";
import { TbUserEdit } from "react-icons/tb";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { IconButton, Tooltip } from "@mui/material";
import Header from "../atoms/header/Header";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import alterImage from "../../../../images/icons8-test-account-100 (1).png";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Content.css";

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

const Content = ({ emp_data, id, isEditable, setIsEditable, handleExit }) => {
  const [btns, setBtns] = useState(buttons);
  const [updatedValues, setUpdatedValues] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  // const [avater, setAvater] = useState("");
  const [alert, setAlert] = useState("");
  const inputFileRef = useRef(null);

  const [formData, setFormData] = useState({
    // Personal Data
    emp_eng_name: emp_data.emp_eng_name,
    emp_arb_name: emp_data.emp_arb_name,
    emp_eng_fam: emp_data.emp_eng_fam,
    emp_arb_fam: emp_data.emp_arb_fam,
    emp_religion: emp_data.emp_religion,
    emp_marital_stat: emp_data.emp_marital_stat,
    emp_no_child: emp_data.emp_no_child,
    emp_nat: emp_data.emp_nat, // emp_bra_code
    emp_contract_code: emp_data.emp_contract_code,
    emp_date_birth: emp_data.emp_date_birth,
    emp_nat_no: emp_data.emp_nat_no,
    emp_ins_no: emp_data.emp_ins_no,
    emp_ins_off: emp_data.emp_ins_off, // emp_nat
    emp_pass_no: emp_data.emp_pass_no,
    emp_eng_add1: emp_data.emp_eng_add1,
    emp_arb_add1: emp_data.emp_arb_add1,
    emp_arb_add2: emp_data.emp_arb_add2,
    emp_zip_code1: emp_data.emp_zip_code1,
    emp_sex: emp_data.emp_sex,
    emp_pers_mail: emp_data.emp_pers_mail,
    MilitaryStatus: emp_data.MilitaryStatus,
    age: emp_data.age,
    emp_picture: null,

    // JopData
    emp_com_code: emp_data.emp_com_code,
    emp_no: emp_data.emp_no,
    emp_apl_no: emp_data.emp_apl_no,
    emp_id_no: emp_data.emp_id_no,
    emp_decision_no: emp_data.emp_decision_no,
    emp_start_dt: emp_data.emp_start_dt,
    JobPost: emp_data.JobPost,
    emp_sup_no: emp_data.emp_sup_no,
    // emp_sup_job_post:emp_data.emp_sup_job_post,
    emp_job_post_dt: emp_data.emp_job_post_dt,
    emp_sal_chang_dt: emp_data.emp_sal_chang_dt,
    emp_trans_dt: emp_data.emp_trans_dt,
    emp_term_dt: emp_data.emp_term_dt,
    emp_fix_value: emp_data.emp_fix_value,
    emp_emp_type: emp_data.emp_emp_type,
    emp_basic_sal: emp_data.emp_basic_sal,
    emp_gross_sal: emp_data.emp_gross_sal,
    emp_site: emp_data.emp_site,
    emp_sector: emp_data.emp_sector,
    emp_job_post: emp_data.emp_job_post,
    emp_sup_job_post: emp_data.emp_sup_job_post,
    emp_bra_sup: emp_data.emp_bra_sup,
    emp_prf_mail: emp_data.emp_prf_mail,
    emp_leav_bal: emp_data.emp_leav_bal,
    emp_mach_emp_no: emp_data.emp_mach_emp_no,
    emp_term_flag: emp_data.emp_term_flag,
    yearsOfService: emp_data.yearsOfService,

    // Skills Data
    emp_skill_obt_date: emp_data.emp_skill_obt_date,
    emp_skill_type: emp_data.emp_skill_type,

    //  Center & City
    emp_id_cty: emp_data.emp_id_cty,
    emp_id_center: emp_data.emp_id_center,
    emp_add_country: emp_data.emp_add_country,
    emp_add_city: emp_data.emp_add_city,
    emp_cty_birth: emp_data.emp_cty_birth,
    emp_pass_cty: emp_data.emp_pass_cty,
    emp_pass_center: emp_data.emp_pass_center,
    emp_center_birth: emp_data.emp_center_birth,
    District: emp_data.District,
    dept_code: emp_data.dept_code,

    // Bank Data
    emp_acc_no: emp_data.emp_acc_no,
    emp_bank: emp_data.emp_bank,
    Email: emp_data.Email,
    emp_payment_date: emp_data.emp_payment_date,
    emp_pay_type: emp_data.emp_pay_type,

    // Civil Data
    emp_military_stat: emp_data.emp_military_stat,
    emp_ml_crt_no: emp_data.emp_ml_crt_no,
    emp_ml_crt_issue_dt: emp_data.emp_ml_crt_issue_dt,
    emp_ml_expired_dt: emp_data.emp_ml_expired_dt,
    emp_med_no: emp_data.emp_med_no,
    emp_med_issue_dt: emp_data.emp_med_issue_dt,
    emp_med_expired_dt: emp_data.emp_med_expired_dt,
    emp_cost_center: emp_data.emp_cost_center,
    emp_id_issue_date: emp_data.emp_id_issue_date,
    emp_add_district: emp_data.emp_add_district,

    // Emergency Data
    emp_tel1: emp_data.emp_tel1,
    emp_eng_add2: emp_data.emp_eng_add2,
    emp_zip_code2: emp_data.emp_zip_code2,
    emp_tel2: emp_data.emp_tel2,
    emp_other_mail1: emp_data.emp_other_mail1,
    emp_other_mail2: emp_data.emp_other_mail2,

    // Dependant Values
    emp_bra_code: emp_data.emp_bra_code,
    avatar: emp_data.emp_picture,
  });
  console.log(updatedValues);
  const handleChange = (event) => {
    let { name } = event.target;
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }

    if (name === "avatar") {
      setFormData((data) => ({ ...data, [name]: event.target.files[0] }));
      setUpdatedValues((data) => ({ ...data, [name]: event.target.files[0] }));
      return;
    }
  };
  const handleActiveFunc = (selectedBtn) => {
    setBtns(
      btns.map((el) =>
        el.content === selectedBtn.content
          ? { ...el, isActive: true }
          : { ...el, isActive: false }
      )
    );
  };
  const handleUpdate = async () => {
    if (updatedValues.avatar) {
      let avatar = updatedValues.avatar;
      handelUpdateAvater(avatar);
      delete updatedValues.avatar;
    }
    console.log("updatedValues= ", updatedValues);
    await axios
      .patch(
        `http://localhost:3005/user/${emp_data.emp_no}`,
        updatedValues,
        apiAuth(token)
      )
      .then((res) => {
        setIsEditable(false);
        setAlert("Success");
      })
      .catch((err) => {
        console.log(err);
        setAlert("Fail");
      });
  };
  // image
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/${emp_data.emp_picture}`
        );
        if (!response.ok) {
          setAlert("Fail");
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        setAlert("Fail");
        console.log(error);
      }
    };
    if (emp_data.emp_picture) {
      handleFetch();
    }
  }, [emp_data.emp_picture]);
  const handelUpdateAvater = async (avatar) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    await axios
      .patch(
        `http://localhost:3005/user/update-avatar/${emp_data.emp_no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => console.log("Picture updated successfully", res.data))
      .catch((err) => {
        console.log("Error While Updating Picture", err);
        setAlert("Fail");
      });
  };
  const handleSave = async () => {
    Object.keys(updatedValues).map((data) => {
      if (updatedValues[data] == "") {
        updatedValues[data] = null;
      }
    });
    handleUpdate();
  };

  const handleTerminate = () => {
    const date = new Date().toISOString().split("T")[0];
    axios
      .patch(
        `http://localhost:3005/user/terminate-user/${id}`,
        { emp_term_dt: date },
        apiAuth(token)
      )
      .then((res) => setAlert("Successfully Terminated"))
      .catch((err) => setAlert("Error,Something went wrong"));
  };
  const handleDelete = () => {
    let alert = window.confirm("Are you sure you want to delete user ?");
      if (alert) {
        const date = new Date().toISOString().split("T")[0];
        axios
          .delete(`http://localhost:3005/user/${id}`, apiAuth(token))
          .then((res) => setAlert("Successfully Deleted"))
          .catch((err) => setAlert("Error,Something went wrong"));
      }

  };
  const handleEdit = () => {
    setIsEditable(true);
  };
  if (alert) {
    const deleteAlert = () => {
      const timer2 = setTimeout(() => {
        setAlert("");
      }, 5000);
      return () => clearTimeout(timer2);
    };
    deleteAlert();
  }
  const activeData = btns.find((btn) => btn.isActive && btn);
  const token = localStorage.getItem("token");
  const handleChangePhoto = () => {
    isEditable && inputFileRef.current.click();
  };
  return (
    <>
      {alert === "Success" && <Success message="User Updated Seccessfuly" />}
      {alert === "Fail" && <Filled message="Error,Something went wrong" />}
      {alert === "Success Terminte" && (
        <Success message="User Is Terminted Seccessfuly" />
      )}
      {alert === "Fail Terminte" && (
        <Filled message="Error,Filled To Terminte!" />
      )}
      <header className="flex relative">
        <Header handleActiveFunc={handleActiveFunc} btns={btns} />
      </header>
      <div className="flex items-center mt-2 justify-center gap-2">
        <div
          onClick={handleChangePhoto}
          className={`${
            isEditable && "isEditable"
          } w-10 h-10 rounded-full image-container`}
        >
          <img
            src={imageSrc || alterImage}
            alt=""
            // disa={isEditable}
            className={` rounded-full ${
              isEditable ? "cursor-pointer" : "cursor-not-allowed"
            } w-full h-full `}
          />
        </div>
        <input
          name="avatar"
          onChange={handleChange}
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputFileRef}
        />
        {/* <div className="profile-image rounded-full cursor-pointer hover:bg-black w-10 h-10"></div> */}
        <Tooltip
          title="Edit"
          onClick={handleEdit}
          className=" OriginalColor hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
        >
          <IconButton>
            <TbUserEdit />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Save"
          onClick={handleSave}
          className={` OriginalColor  hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border`}
        >
          <IconButton disabled={!isEditable}>
            <IoSaveOutline />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Terminate"
          onClick={handleTerminate}
          className=" OriginalColor hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
        >
          <IconButton>
            <MdOutlineIndeterminateCheckBox />
          </IconButton>
        </Tooltip>
        <Tooltip
        style={{color:"red"}}
          onClick={handleDelete}
          className=" text-red-500 hover:border-none relative text-lg rounded-full px-1.5 py-1.5 border"
          title="Delete"
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Exit"
          onClick={() =>
            handleExit("Are you sure you want to reset the values?")
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
          <DataPersonal
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            updatedValues={updatedValues}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 2 && (
          <CenterCity
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 3 && (
          <JopData
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 5 && (
          <BankData
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 6 && (
          <CivilData
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 4 && (
          <EmergencyData
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            formData={formData}
            setFormData={setFormData}
            setUpdatedValues={setUpdatedValues}
          />
        )}
        {activeData.id === 7 && (
          <SkillsData
            emp_data={emp_data}
            handleSave={handleSave}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
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
