import React, { useContext, useState } from "react";
import { CreateContext } from "../Context/Context";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import "./InputsField.css";

const PasswordInput = (values) => {
  const usecon = useContext(CreateContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${values.value.classDiv}`}>
      <label
        className={`LabelLogin ${usecon.darkMode && "text-white"}`}
        htmlFor="password"
      >
        {values.value.label}
      </label>
      <div className="password-input-container ">
        
        <input
          type={showPassword ? "text" : "password"}
          className={`${
            usecon.darkMode && "inputDark "
          } py-1.5 px-2 border rounded-lg w-full`}
          id="password"
          value={values.value.password}
          required
          placeholder={values.value.placeholder}
          onChange={(e) => values.value.setPassword(e.target.value)}
        />
        {values.value.password!="" && (
        <div
          className={`${usecon.darkMode&&"text-white"} eye-icon text-xl ${showPassword ? "hidden" : "visible"}`}
          onClick={togglePasswordVisibility}
        >
          <IoEyeOutline />
        </div>
        )}
        {values.value.password!="" && (
          <div
            className={`${usecon.darkMode&&"text-white"}  eye-icon text-xl ${
              showPassword ? "visible" : "hidden"
            }`}
            onClick={togglePasswordVisibility}
          >
            <FaRegEyeSlash />
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
