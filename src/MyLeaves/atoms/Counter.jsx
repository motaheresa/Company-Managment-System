import React, { useContext } from "react";
import AddLeave from "../AddLeave";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import { TbUserDown } from "react-icons/tb";

const Counter = ({
  // APP_CASUAL,
  APP_PERMISSION,
  // Casual_Anuual_Pen_App,
  handleApplied,
  counterLeaves = {},
  isOpenFormApplyLeave,
  setIsOpenFormApplyLeave,
  // APPENDING_CASUAL_ANNUAL,
  SickLeave_Pen_App,
  StudyLeave_Pen_App,
  pos,
}) => {
  const usecon = useContext(CreateContext);

  const [t] = useTranslation();
  return (
    <>
    {pos == "att"||pos=="manager" ? (
      <>
      <div className="">
        <button
                onClick={() => setIsOpenFormApplyLeave(true)}
                className="border px-1 py-1 rounded-md my-2 flex items-center gap-2"
              >
                <span className={`${usecon.darkMode && "text-white"}`}>
                  {t("applyleave")}
                </span>
                <span className={`OriginalColor text-xl`}>
                  <TbUserDown />
                </span>
              </button> 
      </div>
      <AddLeave
          counterLeaves={counterLeaves}
          // APPENDING_CASUAL_ANNUAL={APPENDING_CASUAL_ANNUAL}
          // APP_CASUAL={APP_CASUAL}
          handleApplied={handleApplied}
          APP_PERMISSION={APP_PERMISSION}
          isOpenFormApplyLeave={isOpenFormApplyLeave}
          setIsOpenFormApplyLeave={setIsOpenFormApplyLeave}
          SickLeave_Pen_App={SickLeave_Pen_App}
          StudyLeave_Pen_App={StudyLeave_Pen_App}
        />
        </>
    )
    : (
    <div className="grid py-6 px-2">
       
        <div
          className={` w-3/5 py-4 mx-auto shadow rounded-xl  ${
            usecon.darkMode ? "borderDarkContainer" : "borderLightContainer"
          }  ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"}`}
        >
          <div className="flex items-center justify-center gap-2 px-1 py-8">
            <Item
              name="leavebalance"
              data={counterLeaves?.leaveBalance}
              usecon={usecon}
              t={t}
            />
            <Item
              name="remainingbalance"
              data={counterLeaves?.remaining_balance}
              usecon={usecon}
              t={t}
            />
            <Item
              name="usedbalance"
              data={counterLeaves?.used_balance}
              usecon={usecon}
              t={t}
            />
            <Item
              name="Carry Over Balance"
              data={counterLeaves?.carry_over}
              usecon={usecon}
              t={t}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsOpenFormApplyLeave(true)}
              className="hover:opacity-50  btn btn-primary BackgroundOriginal px-5 OriginalBackground NoOutlines hover:opacity-600 py-2"
            >
              {t("applyleave")}
            </button>
          </div>
          <AddLeave
            counterLeaves={counterLeaves}
            // APPENDING_CASUAL_ANNUAL={APPENDING_CASUAL_ANNUAL}
            // APP_CASUAL={APP_CASUAL}
            handleApplied={handleApplied}
            APP_PERMISSION={APP_PERMISSION}
            isOpenFormApplyLeave={isOpenFormApplyLeave}
            setIsOpenFormApplyLeave={setIsOpenFormApplyLeave}
            SickLeave_Pen_App={SickLeave_Pen_App}
            StudyLeave_Pen_App={StudyLeave_Pen_App}
          />
          </div>
        </div>
    )}
  </>
)};

export default Counter;

export const Item = ({ name, data, usecon, t }) => {
  return (
    <div className="border-r px-4 text-center">
      <div className="flex text-2xl justify-center OriginalColor gap-2 items-center">
        <div className="text-4xl font-semibold">{data}</div>
      </div>
      <h2
        className={`${
          usecon.darkMode ? "text-white" : "text-zinc-600"
        } text-2xl tracking-wider`}
      >
        {t(name)}
      </h2>
    </div>
  );
};
