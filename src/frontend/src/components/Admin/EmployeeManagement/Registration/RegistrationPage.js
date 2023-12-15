// RegistrationPage.js
import { useCallback, useContext, useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import RegistrationDialog from "./RegistrationDialog";
import { useTranslation } from "react-i18next";
import { getRoles } from "../../../../services/api/RoleRequests";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import { postEmployee } from "../../../../services/api/EmployeeInformationsRequests";

function RegistrationPage(props) {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [employeeData, setEmployeeData] = useState(undefined);
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const handleFormSubmit = (data) => {
    setEmployeeData(data);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = (value) => {
    setConfirmed(value);
    setOpenDialog(false);
  };
  useEffect(() => {
    const fetchRoles = async () => {
      setRoles(
        await getRoles(handleSetOpenSnack, handleMessageInfo, handleSetSeverity)
      );
    };
    fetchRoles();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  const registerEmployee = useCallback(
    async (data) => {
      data.username = data.username.toLowerCase();
      setConfirmed(false);
      setPassword(
        await postEmployee(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          data,
          t
        )
      );
      props.handleEmployeeUsernames(data.username)
    },
    [handleSetOpenSnack, handleMessageInfo, handleSetSeverity, t]
  );

  useEffect(() => {
    if (employeeData && confirmed) {
      registerEmployee(employeeData);
    }
  }, [employeeData, confirmed, registerEmployee]);
  return (
    <Box
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
      sx={{
        color: "primary.main",
        width: { xs: "100%" },
        height: { xs: "100%" },
      }}
      display="inline-flex"
      flexDirection="column"
      flexWrap="wrap"
      padding={3}
    >
      <Paper
        sx={{
          padding: 1,
          maxWidth: { xs: "100%", md: "70%" },
          minHeight: "100%",
        }}
      >
        <Box alignItems={"center"} padding={1.5}>
          <Typography mb={2} variant="h4">
            {t("main.admin.employees.registration.title")}
          </Typography>
          <RegistrationForm
            onSubmit={handleFormSubmit}
            roles={roles}
            password={password}
            t={t}
            onReset={() => {setPassword("")}}
          />
        </Box>
      </Paper>
      <RegistrationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        t={t}
      />
    </Box>
  );
}

export default RegistrationPage;
