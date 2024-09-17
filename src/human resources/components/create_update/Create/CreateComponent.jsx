import React, { useContext, useState } from "react";
import Content from "./Content";
import { IoClose } from "react-icons/io5";
import { CreateContext } from "../../../../Context/Context";
import "./index.css"

const CreateComponent = ({ handleShow, id }) => {
  let [updatedValues, setUpdatedValues] = useState({});
  const handleExit = (text,formData,setFormData) => {
    Object.keys(updatedValues).map((ele)=>{
      if(updatedValues[ele]===""){
        delete updatedValues[ele];
      }
    })
    if (Object.keys(updatedValues).length > 0) {
      let alert = window.confirm(
        text
          ? text
          : "You have unsaved changes. Are you sure you want to leave this page without saving?"
      );
      if (alert) {
        Object.keys(formData).map((data) => {
          // if(formData[data] == ""){
            setFormData((prev)=>({...prev,[data]:""}))
          // }
        });
        
        setUpdatedValues({})
        handleShow(false);
      } else {
        handleShow(true);
      }
      return;
    }
    // Object.keys(formData).map((data) => {
    //   if(formData[data] == ""){
    //     delete formData[data];
    //   }
    // });
    // if (Object.keys(formData).length > 0) {
    //   let alert = window.confirm(
    //     text
    //       ? text
    //       : "You have unsaved changes. Are you sure you want to leave this page without saving?"
    //   );
    //   if (alert) {
    //     handleShow(false);
    //   } else {
    //     handleShow(true);
    //   }
    //   return;
    // }
    // setFormData({})
    setUpdatedValues({})
    handleShow(false);
  };
  const usecon = useContext(CreateContext);
  return (
    <section
      className={`${
        usecon.darkMode ? "darkHidingContainer" : "bg-white"
      } absolute shadow pb-2 mb-1 border z-50 left-16 right-16 max-h-screen overflow-y-auto scrollable-section bottom-4 top-4 rounded `}
    >
      <button
        className="absolute right-0 top-0 mb-1 duration-200 bg-red-500 rounded-full hover:bg-red-800 text-white text-2xl"
        onClick={handleExit}
      >
        <IoClose />
      </button>
      {
        <Content
          updatedValues={updatedValues}
          handleExit={handleExit}
          setUpdatedValues={setUpdatedValues}
          id={id}
        />
      }
    </section>
  );
};

export default CreateComponent;
