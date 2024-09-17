import React, { useContext } from "react";
import "./Header.css"
import { CreateContext } from "../../../../../Context/Context";
const Header = ({handleActiveFunc,btns}) => {
  const usecon = useContext(CreateContext);
  
  return (
    <div className="grid grid-cols-7 w-full shadow-sm bg-transparent border-y">
      {btns.map((btn, index) => (
        <button
          key={index}
          onClick={() => handleActiveFunc(btn)}
          className={`outline-none !py-2.5 w-full font-semibold tracking-wider ${
            !usecon.darkMode &&
            (btn.isActive ? "style_btn1_hr_fixed" : "style_btn2_hr")
          } ${
            usecon.darkMode &&
            `text-white ${btn.isActive ? "style_btn2_hr_fixed" : "style_btn1_hr"}`
          }`}
        >
          {btn.content}
        </button>
      ))}
    </div>
  );
};

export default Header;
