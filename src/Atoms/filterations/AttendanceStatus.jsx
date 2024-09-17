import React from 'react'
import { useTranslation } from 'react-i18next'

const AttendanceStatus = () => {
  const [t]=useTranslation()
  return (
    <>
              <option value="" selected className="hidden">
                      {t("choosestatus")}
                    </option>
                    <option value="Present">{t("present")}</option>
                    <option value="Absent">{t("absent")}</option>
                    <option value="Weekend">{t("weekend")}</option>
                    <option value="Public Holiday">
                      {t("Public Holiday")}
                    </option>
                    <option value="Annual Leave">{t("annualleaveApp")}</option>
                    <option value="Casual Leave">{t("casualleaveApp")}</option>
                    <option value="Mission Leave">
                      {t("missionleaveApp")}
                    </option>
                    <option value="Late Permission">{t("lateinApp")}</option>
                    <option value="Early Leave">{t("earlyoutApp")}</option>
                    <option value="Work From Home">
                      {t("Work From Home")}
                    </option>
                    <option value="Sick Leave">{t("sickApp")}</option>
                    <option value="Unpaid Leave">{t("unpaidApp")}</option>
                    <option value="Marriage Leave">{t("marriageApp")}</option>
                    <option value="Maternity Leave">{t("maternityApp")}</option>
                    <option value="Study Leave">{t("Study Leave")}</option>
                    <option value="None">None</option>
                    </>
  )
}

export default React.memo(AttendanceStatus)