import React, { useContext, useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import image from "../images/icons8-test-account-100 (1).png";
import Divs5 from "../Divs5/Divs5";
import { CreateContext } from "../Context/Context";
import getFromToDate from "../Atoms/getFromToDate";
import { useTranslation } from "react-i18next";
import SideBarManager from "../Manager/sidebar/SideBar";
import { Divs5Manager } from "../Manager/Divs5/Divs5";
import { useFetch } from "../network/useFetch";

const Profile = ({ pos = "emp" }) => {
  const usecon = useContext(CreateContext);
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState("");
  const data = useFetch("/dashboard/userDetails");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/${data.data?.user?.profile_picture}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.data?.user?.profile_picture) {
      handleFetch();
    }
  }, [data.data?.user?.profile_picture]);

  const BankDetailsKeys = ["Bank name", "Bank Account", "AccountNo"];
  // const BackendData4 = [
  //   data?.data?.user?.emp_back ? data?.data?.user?.emp_back : "####",
  //   data?.data?.user?.emp_bank_branch
  //     ? data?.data?.user?.emp_bank_branch
  //     : "####",
  //   data?.data?.user?.emp_acc_no ? data?.data?.user?.emp_acc_no : "####",
  // ];
  const SalaryDetailsKeys = ["Gross Salary", "Basic Salary"];
  // const SalaryDetailsData = [
  //   data?.data?.user?.emp_gross_sal
  //     ? data?.data?.user?.emp_gross_sal
  //     :
  //      "#######",
  //   data?.data?.user?.emp_basic_salary
  //     ? data?.data?.user?.emp_basic_salary
  //     : "#######",
  // ];
  const NameData6 = [
    "Company",
    "Branch",
    "JobPosition",
    "Sector",
    "Site",
    "Emp_contract_code",
  ];
  const NameData6a = [
    "Emp_leave_balance",
    "Emp_id_no",
    "EmpMachineId",
    "Manager",
    "ManagerJob",
    "Length Of Service",
  ];
  const BackendData6 = [
    data?.data?.user?.emp_comp ? data?.data?.user?.emp_comp : "###",
    data?.data?.user?.branch ? data?.data?.user?.branch : "N/A",
    data?.data?.user?.jobPost ? data?.data?.user?.jobPost : "###",

    data?.data?.user?.emp_sector ? data?.data?.user?.emp_sector : "###",
    data?.data?.user?.emp_site ? data?.data?.user?.emp_site : "###",
    data?.data?.user?.emp_contract_code
      ? data?.data?.user?.emp_contract_code
      : "###",
  ];
  const BackendData6a = [
    data?.data?.user?.emp_leave_balance
      ? data?.data?.user?.emp_leave_balance
      : "###",
    data?.data?.user?.emp_id_no ? data?.data?.user?.emp_id_no : "###",
    data?.data?.user?.empMachineId ? data?.data?.user?.empMachineId : "###",
    data?.data?.user?.manger ? data?.data?.user?.manger : "###",
    data?.data?.user?.managJop ? data?.data?.user?.managJop : "###",
    data?.data?.user?.yearsOfService ? data?.data?.user?.yearsOfService : "###",
  ];
  const NameData2 = [
    "Name",
    "Date Birth",
    "Mobile Phone",
    "No of child",
    "City",
    "Military Status",
    "Address",
    "CenterCity",
    "Age",
  ];
  const BackendData2 = [
    data?.data?.user?.empName ? data?.data?.user?.empName : "N/A",
    data?.data?.user?.empBirthDate
      ? getFromToDate(data?.data?.user?.empBirthDate)
      : "N/A",
    data?.data?.user?.phone ? data?.data?.user?.phone : "N/A",
    data?.data?.user?.empChild ? data?.data?.user?.empChild : "N/A",

    data?.data?.user?.emp_site ? data?.data?.user?.emp_site : "N/A",
    data?.data?.user?.emp_military_status
      ? data?.data?.user?.emp_military_status
      : "N/A",
    data?.data?.user?.empAddress ? data?.data?.user?.empAddress : "N/A",
    data?.data?.user?.centerCity ? data?.data?.user?.centerCity : "N/A",
    data?.data?.user?.age ? data?.data?.user?.age : "N/A",
  ];
  const NameData2a = [
    "Emp_ins_no",
    "Telephone",
    "Gender",
    "Religion",
    "Nationality",
    "MaritalStat",
    "Emp_nat_no",
    "Emp_ml_crt_no",
  ];
  const BackendData2a = [
    data?.data?.user?.emp_ins_no ? data?.data?.user?.emp_ins_no : "N/A",
    data?.data?.user?.empTelephone ? data?.data?.user?.empTelephone : "N/A",
    data?.data?.user?.gender ? data?.data?.user?.gender : "N/A",
    data?.data?.user?.religion ? data?.data?.user?.religion : "N/A",
    data?.data?.user?.nationality ? data?.data?.user?.nationality : "N/A",
    data?.data?.user?.maritalStat ? data?.data?.user?.maritalStat : "N/A",
    data?.data?.user?.emp_nat_no ? data?.data?.user?.emp_nat_no : "N/A",
    data?.data?.user?.emp_ml_crt_no ? data?.data?.user?.emp_ml_crt_no : "N/A",
  ];
  //   if (loading) {
  //       return <div>Loading...</div>
  //   }
  //   if (error) {
  //     return <div>Error...</div>
  // }

  return (
    <div>
      <div className="flex">
        {pos == "manager" ? (
          <div>
            <SideBarManager />
          </div>
        ):pos==="hr"?(<></>) : (
          <div>
            <SideBar />
          </div>
        )}
        <div className=" w-full">
          {pos == "manager" ? (
            <div>
              <Divs5Manager />
            </div>
          ) : pos == "hr" ? (
            <></>
          ) : (
            <div>
              <Divs5 />
            </div>
          )}
          <div className="w-full  px-3 ">
            <div
              className={`grid rounded-xl relative shadow grid-cols-2 px-3 mx-auto py-3 w-full ${
                usecon.darkMode && "borderDarkContainer"
              } ${usecon.darkMode ? "darkContainer" : "LightThemeContainer"}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={imageSrc || image}
                      className="w-32 h-32 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                      <h5
                        className={`${
                          usecon.darkMode && "darkMainColor"
                        } m-0 p-0 tracking-wider`}
                      >
                        {data?.data?.user?.empName}
                      </h5>
                    </div>
                    <div className="lightgrayColor text-sm font-semibold font-base ">
                      {data?.data?.user?.jobPost}
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={`${
                          usecon.darkMode && "darkMainColor"
                        } font-semibold`}
                      >
                        ID : {data?.data?.user?.userId}
                      </div>
                      <div className="lightgrayColor text-sm font-semibold font-base ">
                        Start Date :{" "}
                        {data?.data?.user?.emp_start_dt &&
                          getFromToDate(data?.data?.user?.emp_start_dt)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-9 gap-4 px-3 py-3">
            <div
              className={`col-span-9 px-3 ${
                usecon.darkMode ? "darkContainer" : "bg-white"
              } ${
                usecon.darkMode && "borderDarkContainer"
              } shadow rounded-xl py-3 w-full`}
            >
              <div className="flex items-center mb-4 justify-between">
                <h5 className={`tracking-wider OriginalColor `}>
                  {t("Personal Informations")}
                </h5>
              </div>
              <div>
                <table>
                  <tbody>
                    <div className="flex items-start justify-start gap-2 w-full">
                      <tr>
                        <div className="flex items-center gap-20">
                          <div className="flex flex-col">
                            {NameData2.map((data) => (
                              <td>
                                <div
                                  className={`font-medium ${
                                    usecon.darkMode && "darkMainColor"
                                  }`}
                                >
                                  {t(data)} :{" "}
                                </div>
                              </td>
                            ))}
                          </div>
                          <div className="flex flex-col">
                            {BackendData2.map((data) => (
                              <td>
                                <div className=" lightgrayColor">{data} </div>
                              </td>
                            ))}
                          </div>
                        </div>
                      </tr>
                      <tr>
                        <div className="flex items-center gap-20">
                          <div className="flex flex-col gap-1">
                            {NameData2a.map((data) => (
                              <td>
                                <div
                                  className={`font-medium ${
                                    usecon.darkMode && "darkMainColor"
                                  }`}
                                >
                                  {t(data)} :{" "}
                                </div>
                              </td>
                            ))}
                          </div>
                          <div className="flex flex-col gap-1">
                            {BackendData2a.map((data) => (
                              <td>
                                <div className=" lightgrayColor">{data} </div>
                              </td>
                            ))}
                          </div>
                        </div>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-9 gap-4 px-3 py-3">
            <div
              className={`col-span-9 px-3 py-3  ${
                usecon.darkMode
                  ? "darkContainer borderDarkContainer"
                  : "bg-white"
              } shadow rounded-xl py-3 w-full`}
            >
              <div className="flex items-center mb-4 justify-between">
                <h5 className="tracking-wider OriginalColor">
                  {t("Company Details")}
                </h5>
              </div>
              <div>
                <table>
                  <tbody>
                    <div className="flex items-start justify-start gap-10 w-full">
                      <tr>
                        <div className="flex items-center gap-28">
                          <div className="flex flex-col gap-1">
                            {NameData6.map((data) => (
                              <td>
                                <div
                                  className={`${
                                    usecon.darkMode && "darkMainColor"
                                  } font-medium`}
                                >
                                  {t(data)} :{" "}
                                </div>
                              </td>
                            ))}
                          </div>
                          <div className="flex flex-col gap-1">
                            {BackendData6.map((data) => (
                              <td>
                                <div className=" lightgrayColor">{data} </div>
                              </td>
                            ))}
                          </div>
                        </div>
                      </tr>
                      <tr>
                        <div className="flex items-center gap-28">
                          <div className="flex flex-col gap-1">
                            {NameData6a.map((data) => (
                              <td>
                                <div
                                  className={`${
                                    usecon.darkMode && "darkMainColor"
                                  } font-medium`}
                                >
                                  {t(data)} :{" "}
                                </div>
                              </td>
                            ))}
                          </div>
                          <div className="flex flex-col gap-1">
                            {BackendData6a.map((data) => (
                              <td>
                                <div className=" lightgrayColor">{data} </div>
                              </td>
                            ))}
                          </div>
                        </div>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 px-3 py-3">
            <div
              className={` px-3  ${
                usecon.darkMode
                  ? "borderDarkContainer darkContainer"
                  : "bg-white"
              } shadow rounded-xl py-3 w-full`}
            >
              <div className="flex items-center mb-4 justify-between">
                <h5 className="tracking-wider OriginalColor">
                  {t("Bank Details")}
                </h5>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <div className="flex items-center gap-28">
                        <div className="flex flex-col gap-1">
                          {BankDetailsKeys.map((data) => (
                            <td>
                              <div
                                className={`${
                                  usecon.darkMode && "darkMainColor"
                                } font-medium`}
                              >
                                {t(data)} :{" "}
                              </div>
                            </td>
                          ))}
                        </div>
                        <div className="flex flex-col gap-1">
                          {SalaryDetailsKeys.map((data) => (
                            <td>
                              <div className=" lightgrayColor">### </div>
                            </td>
                          ))}
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={` px-3 ${
                usecon.darkMode
                  ? "darkContainer borderDarkContainer"
                  : "bg-white"
              } shadow rounded-xl py-3 w-full`}
            >
              <div className="flex items-center mb-4 justify-between">
                <h5 className="tracking-wider OriginalColor">
                  {t("Salary Details")}
                </h5>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <div className="flex items-center gap-28">
                        <div className="flex flex-col gap-1">
                          {SalaryDetailsKeys.map((data) => (
                            <td>
                              <div
                                className={`${
                                  usecon.darkMode && "darkMainColor"
                                } font-medium`}
                              >
                                {t(data)} :{" "}
                              </div>
                            </td>
                          ))}
                        </div>
                        <div className="flex flex-col gap-1">
                          {SalaryDetailsKeys.map((data) => (
                            <td>
                              <div className=" lightgrayColor">### </div>
                            </td>
                          ))}
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
