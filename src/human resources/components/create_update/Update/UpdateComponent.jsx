import React, { useContext, useState } from "react";
import Content from "./Content";
import { IoClose } from "react-icons/io5";
import { CreateContext } from "../../../../Context/Context";
import Exit from "../../../../Atoms/Exit";

const CreateUpdate = ({
  handleShow,
  emp_data,
  id,
  handleIsAppearanceUpdate,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const handleExit = () => {
    if (isEditable) {
      let alert = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page without saving?"
      );
      if (alert) {
        setIsEditable(false);
        handleShow(false);
      }
    } else {
      setIsEditable(false);
      handleShow(false);
    }
  };
  const usecon = useContext(CreateContext);
  return (
    <>
      <section
        className={`${
          usecon.darkMode ? "darkHidingContainer" : "bg-white"
        } absolute  shadow pb-2 mb-1 border z-50 left-16 right-16 max-h-screen overflow-y-auto top-4 bottom-4 rounded `}
      >
        <Exit handleExit={handleExit} />
        {handleIsAppearanceUpdate() && (
          <Content
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            emp_data={emp_data}
            id={id}
            handleExit={handleExit}
          />
        )}
      </section>
    </>
  );
};

export default CreateUpdate;
