import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNotifications } from "../services/api/NotificationsRequests"; 
import BasicAccordion from "../components/common/Accordion/BasicAccordion"
import SnackBarContext from "../services/contexts/SnackBarContext";
export default function EmployeeNotifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const handleSetNotificationStatus = useCallback((value) => {
    setNotifications(value);
  }, []);

  const NoNotifications = () => {
    return (
      <Paper>
        <Typography variant="body1" padding={2}>
          {t("main.employeeNotifications.empty")}
        </Typography>
      </Paper>
    );
  };
  useEffect(() => {
    const fetchEmployeeNotifications = async () => {
      setNotifications(
        await getNotifications(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity
        )
      );
    };
    fetchEmployeeNotifications();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  return (
    <Box padding={3}>
      {notifications?.length > 0 ? (
        <BasicAccordion
          items={notifications}
          SetNotificationStatus={handleSetNotificationStatus}
          handleSetOpenSnack={handleSetOpenSnack}
          handleMessageInfo={handleMessageInfo}
          handleSetSeverity={handleSetSeverity}
          t={t}
        />
      ) : (
        <NoNotifications />
      )}
    </Box>
  );
}
