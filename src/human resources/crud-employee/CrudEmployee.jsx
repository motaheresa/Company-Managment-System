import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import apiAuth from "../../Atoms/apiAuth";
import Select from "./Select";
import axios from "axios";
import { CreateContext } from "../../Context/Context";
import CreateComponent from "../components/create_update/Create/CreateComponent";
import CreateUpdate from "../components/create_update/Update/UpdateComponent";
import TopHeadbar from "../TopHeadbar/TopHeadbar";
import Loading from "../../Atoms/alerts/Loading";

const CrudEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [site, setSite] = useState("");
  const [sector, setSector] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [company, setCompany] = useState("");
  const [id, setId] = useState("");
  const [isShowenUpdate, setIsShowenUpdate] = useState(false);
  const [isShowenCreate, setIsShowenCreate] = useState(false);
  const [isTerminated, setIsTerminated] = useState("");
  //       Start CREATE_UPDATA
  let [emp_data, setEmpData] = useState({});
  //       End CREATE_UPDATA

  const [data, setData] = useState({
    sites: [],
    branches: [],
    companies: [],
    sectors: [],
    employees: [],
  });
  const token = localStorage.getItem("token");
  // company
  useEffect(() => {
    const fetchData = async () => {
      const companiesResponse = await axios.get(
        "http://localhost:1813/lookUp/company",
        apiAuth(token)
      );
      const companiesData = await companiesResponse.data.data;
      setData((prev) => ({
        ...prev,
        companies: [...companiesData],
      }));
    };
    fetchData();
  }, []);
  // branch
  useEffect(() => {
    const fetchData = async () => {
      const branchesResponse = await axios.get(
        `http://localhost:1813/lookUp/branch?company_code=${company}`,
        apiAuth(token)
      );
      const branchesData = await branchesResponse.data.data;
      setData((prev) => ({
        ...prev,
        branches: [...branchesData],
      }));
    };
    if (company !== "") {
      fetchData();
    }
  }, [company]);
  // employees
  useEffect(() => {
    const fetchData = async () => {
      const companyValidate = company !== "" ? `company=${company}&&` : "";
      const branchValidate = branch !== "" ? `branch=${branch}&&` : "";
      const siteValidate = site !== "" ? `site=${site}&&` : "";
      const sectorValidate = sector !== "" ? `sector=${sector}&&` : "";
      const isTerminatedValidate =
        isTerminated === "Terminated"
          ? "terminated=true"
          : isTerminated === "NonTerminated"
          ? "terminated=false"
          : "none";
      const users = await axios.get(
        `http://localhost:1813/user?${companyValidate && companyValidate}${
          branchValidate && branchValidate
        }${siteValidate && siteValidate}${sectorValidate && sectorValidate}${
          isTerminatedValidate !== "none" ? isTerminatedValidate : ""
        }`,
        apiAuth(token)
      );
      const usersData = await users.data.data;
      setData((prev) => ({
        ...prev,
        employees: [...usersData],
      }));
    };
    if (company !== "" && branch !== "") {
      fetchData();
    }
  }, [company, branch, site, sector, isTerminated]);

  // sector & site
  useEffect(() => {
    const fetchData = async () => {
      const companyValidate = company !== "" ? `company_code=${company}&&` : "";
      const branchValidate = branch !== "" ? `branch_code=${branch}` : "";
      const [sites, sectors] = await Promise.all([
        axios.get(
          `http://localhost:1813/lookUp/site?${
            companyValidate && companyValidate
          }${branchValidate && branchValidate}`,
          apiAuth(token)
        ),
        axios.get(
          `http://localhost:1813/lookUp/sector?${
            companyValidate && companyValidate
          }${branchValidate && branchValidate}`,
          apiAuth(token)
        ),
      ]);
      const sitesData = await sites.data.data;
      const sectorsData = await sectors.data.data;
      setData((prev) => ({
        ...prev,
        sectors: [...sectorsData],
        sites: [...sitesData],
      }));
    };
    if (company !== "" && branch !== "") {
      fetchData();
    }
  }, [company, branch, site, sector]);
  //                                     Search Function

  const handle_Submit_Form = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (name !== "") {
      await axios
        .get(`http://localhost:1813/user/${id}`, apiAuth(token))
        .then((response) => {
          setEmpData(response.data.data);
          setIsShowenUpdate(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleIsAppearanceUpdate = () => {
    return Object.keys(emp_data).length > 0 &&
      branch &&
      company &&
      isShowenUpdate
      ? true
      : false;
  };
  const optionsGroups = (data) => {
    const SortedData= data.sort((a, b) => {
      if (a.emp_eng_name < b.emp_eng_name) return -1;
      if (a.emp_eng_name > b.emp_eng_name) return 1;
      return 0;
  });
  return SortedData
    
  };
  
  const usecon = useContext(CreateContext);
  return (
    <div className="relative mx-4">
      {loading && <Loading  />}
      <div className="w-full">
        <div className="w-full items-start">
          <TopHeadbar />
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center"> */}
        <form  onSubmit={handle_Submit_Form} className="w-full bg-white px-4 py-6 rounded-lg">
          <div className="grid grid-cols-3 gap-4 px-4 w-full">
            <Select
              data={data.companies}
              property="com_code"
              option="com_eng_label"
              label="Company"
              value={company}
              handleChange={setCompany}
            />
            <Select
              data={data.branches}
              property="bra_code"
              option="bra_eng_label"
              label="Branch"
              value={branch}
              handleChange={setBranch}
              isEnabled={company === "" ? true : false}
            />
            <Select
              data={data.sites}
              property="site_code"
              option="site_eng_label"
              label="Site"
              value={site}
              handleChange={setSite}
              isEnabled={company === "" || branch === "" ? true : false}
            />

            <Select
              data={data.sectors}
              property="sector_code"
              option="sector_eng_label"
              label="Sector"
              value={sector}
              handleChange={setSector}
              isEnabled={company === "" || branch === "" ? true : false}
            />

            <Select
              data={optionsGroups(data.employees)}
              property="emp_eng_name"
              option="emp_eng_name"
              label="Name"
              value={name}
              handleChange={setName}
              value2={id}
              handleChange2={setId}
              required={true}
              isEnabled={company === "" || branch === "" ? true : false}
            />
            {/* <Select data={data.employees} property="emp_no" label="Id" /> */}
            <div className="w-full space-y-1">
              <label
                htmlFor="display"
                className={`${usecon.darkMode && "text-white"} font-semibold`}
              >
                Display
              </label>
              <select
                className={`${
                  usecon.darkMode && "inputDark"
                } bg-transparent focus:border-orange-500 w-full col-span-3 focus:!border-b-2 outline-none border-b border-zinc-400 placeholder:text-gray-400 border-solid hover:border-black px-2 py-2`}
                name="display"
                id="display"
                value={isTerminated}
                isdabled={company === "" || branch === ""}
                onChange={(e) => setIsTerminated(e.target.value)}
              >
                <option hidden value="">
                  Choose
                </option>
                <option value={"Terminated"}>Terminted</option>
                <option value={"NonTerminated"}>Non-Terminted</option>
                <option value="">None</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 my-8 justify-center">
            <button type="submit" className="!px-10 style_btn1">
              Search
            </button>
            <button
              onClick={() => setIsShowenCreate(true)}
              type="button"
              className="!px-10 style_btn1"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div
        className={`fixed ${
          handleIsAppearanceUpdate()
            ? "visible opacity-100 scale-100"
            : " invisible opacity-0 scale-50"
        } left-0  right-0 top-0 duration-300 bottom-0 bg-slate-600 bg-opacity-70 `}
      >
        <CreateUpdate
          emp_data={emp_data}
          handleShow={setIsShowenUpdate}
          id={id}
          handleIsAppearanceUpdate={handleIsAppearanceUpdate}
        />
      </div>
      <div
        className={`fixed ${
          isShowenCreate
            ? "visible opacity-100 scale-100"
            : " invisible opacity-0 scale-50"
        } left-0  right-0 top-0 duration-300 bottom-0 bg-slate-600 bg-opacity-70 `}
      >
        <CreateComponent handleShow={setIsShowenCreate} id={id} />
      </div>
    </div>
  );
};

export default CrudEmployee;
