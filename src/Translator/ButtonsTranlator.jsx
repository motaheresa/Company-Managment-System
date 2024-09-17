import React, { useState } from "react";
import { MdOutlineGTranslate } from "react-icons/md";

const ButtonsTranlator = () => {
  !localStorage.getItem("i18nextLng") &&
    localStorage.setItem("i18nextLng", "en");
  return (
    <div>
      <button
        className={`${localStorage.getItem("i18nextLng") == "ar" && "hidden"}`}
        onClick={() => {
          localStorage.setItem("i18nextLng", "ar");
          window.location.reload();
        }}
      >
        <MdOutlineGTranslate />
      </button>
      <button
        className={`${
          (localStorage.getItem("i18nextLng") == "en-US" ||
            localStorage.getItem("i18nextLng") == "en") &&
          "hidden"
        }`}
        onClick={() => {
          localStorage.setItem("i18nextLng", "en");
          window.location.reload();
        }}
      >
        <MdOutlineGTranslate />
      </button>
    </div>
  );
};

export default ButtonsTranlator;
