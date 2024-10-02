import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CreateContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";

const FilterForm = ({ setError }) => {
  const [t] = useTranslation();
  const usecon = useContext(CreateContext);
  const token = localStorage.getItem("token");

  const searchLeaves = (event) => {
    event.preventDefault();
    const from = new Date(usecon.fromLeaveFilter).getTime();
    const to = new Date(usecon.toLeaveFilter).getTime();
    usecon.FilterLeaveByStatus == "None" && (usecon.FilterLeaveByStatus = "");
    usecon.FilterLeaveByType == "None" && (usecon.FilterLeaveByType = "");

    if (to < from) {
      setError("Incorrect Data");
    } else {
      const params = new URLSearchParams();
      if (usecon.fromLeaveFilter !== "") {
        params.append("startDate", usecon.fromLeaveFilter);
      }
      if (usecon.toLeaveFilter !== "") {
        params.append("endDate", usecon.toLeaveFilter);
      }
      if (usecon.FilterLeaveByType) {
        params.append("leaveType", usecon.FilterLeaveByType);
      }
      if (usecon.FilterLeaveByStatus) {
        params.append("status", usecon.FilterLeaveByStatus);
      }
      axios
        .get("http://localhost:1813/me/my-leaves", {
          params: params,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          usecon.setAllLeaves(res.data.data.leaves);
          // console.log(usecon.allLeaves)
        })
        .catch((error) => {
          console.log(error);

          throw Error("error in search", error);
        });
    }
  };
  return (
    <Form className="flex w-full items-center">
      <div
        className=" mx-2 mb-3 w-full"
        controlId="exampleForm.ControlTextarea1"
      >
        <label
          htmlFor=""
          className={`${
            usecon.darkMode ? "text-white" : "text-black"
          } font-semibold mb-2`}
        >
          {t("leavetype")}:
        </label>
        <select
          className={` ${
            usecon.darkMode && "inputDark"
          } border py-1.5 px-2  rounded w-full`}
          name=""
          value={usecon.FilterLeaveByType}
          onChange={(e) => usecon.setFilterLeaveByType(e.target.value)}
          id=""
        >
          <option selected className="hidden">
            {t("chooseleavetype")}
          </option>
          <option value="Annual Leave">{t("annualleaveApp")}</option>
          <option value="Casual Leave">{t("casualleaveApp")}</option>
          <option value="Mission Leave">{t("missionleaveApp")}</option>
          <option value="work from home">{t("Work From Home")}</option>
          <option value="Late Permission">{t("lateinApp")}</option>
          <option value="Early Leave">{t("earlyoutApp")}</option>
          <option value="Sick Leave">{t("sickApp")}</option>
          <option value="Unpaid Leave">{t("unpaidApp")}</option>
          <option value="Marriage Leave">{t("marriageApp")}</option>
          <option value="Maternity Leave">{t("maternityApp")}</option>
          <option value="Study Leave">
            {t("Study Leave")}
          </option>
          <option value="None">None</option>
        </select>
      </div>

      <div
        className=" mx-2 mb-3 w-full"
        controlId="exampleForm.ControlTextarea1"
      >
        <label
          htmlFor=""
          className={`mb-2 font-semibold ${usecon.darkMode && "text-white"}`}
        >
          {t("status")}:
        </label>
        <select
          className={` ${
            usecon.darkMode && "inputDark"
          } border py-1.5 px-2 rounded w-full`}
          name=""
          value={usecon.FilterLeaveByStatus}
          onChange={(e) => usecon.setFilterLeaveByStatus(e.target.value)}
          id=""
        >
          <option selected className="hidden">
            {t("chooseleavestatus")}
          </option>
          <option value="Approved">{t("approved")}</option>
          <option value="Pending">{t("pending")}</option>
          <option value="Rejected">{t("rejected")}</option>
          <option value="None">None</option>
        </select>
      </div>
      <Form.Group
        className="mb-3 mx-2 w-full"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label
          className={`${
            usecon.darkMode ? "text-white" : "text-black"
          } font-semibold`}
        >
          {t("from")}:{" "}
        </Form.Label>
        <Form.Control
          value={usecon.fromLeaveFilter}
          onChange={(e) => usecon.setFromLeaveFilter(e.target.value)}
          as="input"
          placeholder=""
          className={`${usecon.darkMode && "inputDark"}`}
          type="date"
          style={{ textTransform: "uppercase" }}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 mr-3 w-full"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label
          className={`${
            usecon.darkMode ? "text-white" : "text-black"
          } font-semibold`}
        >
          {t("tofilter")}:{" "}
        </Form.Label>
        <Form.Control
          value={usecon.toLeaveFilter}
          onChange={(e) => usecon.setToLeaveFilter(e.target.value)}
          as="input"
          type="date"
          className={`${usecon.darkMode && "inputDark"}`}
          style={{ textTransform: "uppercase" }}
        />
      </Form.Group>
      <Form.Group>
        <button
          onClick={searchLeaves}
          className="px-5 mt-3 hover:opacity-50 py-2 OriginalBackground btn btn-primary NoOutlines"
        >
          {t("search")}
        </button>
      </Form.Group>
    </Form>
  );
};

export default FilterForm;
