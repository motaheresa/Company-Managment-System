import React, { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Success from "../../../Atoms/alerts/Success";
import axios from "axios";
import apiAuth from "../../../Atoms/apiAuth";
import Filled from "../../../Atoms/alerts/Filled";

const CreatePaySlip = ({ isAppeared, handleAppearance, data, setData }) => {
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState("");
  let [formData, setFormData] = useState({
    userId: "",
    gross_salary: "",
    transportation_allowance: "",
    social_insurance: "",
    bank: "",
    cash: "",
    loans_insurance: "",
    amount_advance: "",
    penalties: "",
    medical_insurance: "",
    premium_card: "",
    mobile: "",
    tax: "",
    other_deductions: "",
    from: "",
    to: "",
    send_mail: "",
  });
  let [params, setParams] = useState({
    skip_early: "",
    skip_late: "",
    skip_absent: "",
  });
  const reset_btn_ref = useRef(null);
  const handleCreate = (e) => {
    e.preventDefault();
    let sentData = {};
    for (let data in formData) {
      if (!formData[data]) {
        continue;
      }
      if (
        data != "userId" &&
        data != "from" &&
        data != "to" &&
        data != "send_mail"
      ) {
        sentData = { ...sentData, [data]: +formData[data] };
      } else {
        sentData = { ...sentData, [data]: formData[data] };
      }
    }
    const getParams = () => {
      let sentparams = "";
      for (const data in params) {
        if (!params[data]) {
          continue;
        }
        sentparams += `${data}=${params[data]}&`;
      }
      return sentparams;
    };
    console.log(getParams());

    axios
      .post(`http://localhost:3005/pay-slip?${getParams()}`, sentData, apiAuth(token))
      .then((response) => {
        if (data) {
          const addedData = response.data.data;
          setData((prev) => [...prev, addedData]);
        }
        setStatus("Success");
        handleAppearance(false);
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        setStatus("Failed");
      });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "send_mail" && e.target.checked) {
      value = true;
    } else if (name === "send_mail" && !e.target.checked) {
      value = "";
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeParams = (e) => {
    let { name, value } = e.target;
    if (e.target.checked) {
      value = true;
    } else {
      value = "";
    }
    setParams({ ...params, [name]: value });
  };

  const handleReset = () => {
    reset_btn_ref.current.click();
    for (const ele in formData) {
      setFormData((prev) => ({ ...prev, [ele]: "" }));
    }
  };
  return (
    <>
      {status === "Success" && (
        <Success setMessage={setStatus} message={`Overtime is created`} />
      )}
      {status === "Failed" && (
        <Filled
          setMessage={setStatus}
          message={`Error, Something went wrong`}
        />
      )}
      <div
        className={`${
          isAppeared
            ? "scale-100 visible opacity-1"
            : "scale-0 opacity-0 invisible"
        }  fixed top-0  z-50 left-0 bg-zinc-200 bg-opacity-40 flex items-center justify-center w-screen h-screen duration-300`}
      >
        <div
          // style={{height:"98%"}}
          className={`rounded-lg w-11/12 h-fit bg-white shadow-animation border`}
        >
          <div className="flex items-center border-b justify-between px-3 py-3">
            <span className="OriginalColor text-lg">Create New Overtime</span>
            <span
              className="text-2xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => {
                handleAppearance(false);
                handleReset();
              }}
            >
              <MdOutlineCancel />
            </span>
          </div>
          <form
            onSubmit={handleCreate}
            className="w-full grid py-14 grid-cols-4 px-4 h-full content-center -translate-y-6 gap-4"
          >
            <Input
              handleChange={handleChange}
              value={formData.userId}
              label={"UserId"}
              name={"userId"}
              type="text"
              required={true}
            />
            <Input
              handleChange={handleChange}
              value={formData.gross_salary}
              label={"Gross Salary"}
              name={"gross_salary"}
              required={true}
            />
            <Input
              handleChange={handleChange}
              value={formData.transportation_allowance}
              label={"Transportation Allowance"}
              name={"transportation_allowance"}
            />
            <Input
              handleChange={handleChange}
              value={formData.social_insurance}
              label={"Social Insurance"}
              name={"social_insurance"}
            />
            <Input
              handleChange={handleChange}
              value={formData.bank}
              label={"Bank"}
              name={"bank"}
            />
            <Input
              handleChange={handleChange}
              value={formData.cash}
              label={"Cash"}
              name={"cash"}
            />
            <Input
              handleChange={handleChange}
              value={formData.loans_insurance}
              label={"Loans Insurance"}
              name={"loans_insurance"}
            />
            <Input
              handleChange={handleChange}
              value={formData.amount_advance}
              label={"Amount Advance"}
              name={"amount_advance"}
            />
            <Input
              handleChange={handleChange}
              value={formData.penalties}
              label={"Penalties"}
              name={"penalties"}
            />
            <Input
              handleChange={handleChange}
              value={formData.medical_insurance}
              label={"Medical Insurance"}
              name={"medical_insurance"}
            />
            <Input
              handleChange={handleChange}
              value={formData.premium_card}
              label={"Premium Card"}
              name={"premium_card"}
            />
            <Input
              handleChange={handleChange}
              value={formData.mobile}
              label={"Mobile"}
              name={"mobile"}
            />
            <Input
              handleChange={handleChange}
              value={formData.tax}
              label={"Tax"}
              name={"tax"}
            />
            <Input
              handleChange={handleChange}
              value={formData.other_deductions}
              label={"Other Deductions"}
              name={"other_deductions"}
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="str">Start Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="from"
                id="str"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
                name="to"
                id="end"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-4 flex items-center gap-8 justify-center">
              <div className="flex items-center gap-2">
                <label htmlFor="send-email">Sent Email</label>
                <input
                  value={formData.send_mail}
                  onChange={handleChange}
                  type="checkbox"
                  name="send_mail"
                  id="send-email"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="skip_early_">Skip Early</label>
                <input
                  value={params.skip_early}
                  onChange={handleChangeParams}
                  type="checkbox"
                  name="skip_early"
                  id="skip_early_"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="skip_late_">Skip Late</label>
                <input
                  value={params.skip_late}
                  onChange={handleChangeParams}
                  type="checkbox"
                  name="skip_late"
                  id="skip_late_"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="skip_absent_">Skip Absent</label>
                <input
                  value={params.skip_absent}
                  onChange={handleChangeParams}
                  type="checkbox"
                  name="skip_absent"
                  id="skip_absent_"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mx-auto gap-3 col-span-4 text-white">
              <button
                className="px-3 py-1.5 rounded-md borderBackgroundHover "
                type="submit"
              >
                Create
              </button>
              <button
                ref={reset_btn_ref}
                hidden
                className="px-3 py-1.5 rounded-md borderBackground "
                type="reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePaySlip;

export const Input = ({
  name,
  value,
  handleChange,
  label,
  required = false,
  type = "number",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className="focus:border-orange-500 focus:!border-2 outline-none border-1 border-zinc-300 placeholder:text-gray-500 border-solid hover:border-black px-2 py-2 rounded"
        name={name}
        id={label}
        placeholder={`Enter ${label} here`}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};
