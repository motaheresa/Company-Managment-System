import React from "react";

const SubmitBtn = ({name="Search"}) => {
  return (
    <div className="col-span-4 mx-auto my-4">
      <button
        className="borderBackgroundHover py-2 px-10 rounded-lg text-white "
        type="submit"
      >
        {name}
      </button>
    </div>
  );
};

export default React.memo(SubmitBtn);
