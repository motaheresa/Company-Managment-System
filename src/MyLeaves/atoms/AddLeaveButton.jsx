import React from "react";

const AddLeaveButton = ({t,checkApplyLeave}) => {
  return (
    <button onClick={checkApplyLeave} type="submit" className="btn btn-primary px-4 py-2 NoOutlines ColorDark ">
      {t("submit")}
    </button>
  );
};

export default AddLeaveButton;
