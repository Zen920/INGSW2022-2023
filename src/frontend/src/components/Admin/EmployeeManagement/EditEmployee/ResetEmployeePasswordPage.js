import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import { putResetEmployeePassword } from "../../../../services/api/EmployeeInformationsRequests";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import ResetEmployeePasswordFormComponent from "./ResetEmployeePasswordForm";
export default function ResetEmployeePasswordPage(props) {
  const { t } = useTranslation();
  const { employees } = props;
  const [password, setPassword] = useState("");
  const { sendEmployeeProfileUpdate, doLogout } = useContext(WebSocketContext);

  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitChanges = async (data) => {
    setPassword(
      await putResetEmployeePassword(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          username: data.username,
        },
        t
      )
    );
    sendEmployeeProfileUpdate(data.username);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
          minWidth: { xs: "100%" },
          minHeight: "100%",
        }}
      >
        <Box alignItems={"center"} padding={1.5}>
          <Typography mb={2} variant="h4">
            {t("main.admin.employees.reset.title")}
          </Typography>
          <ResetEmployeePasswordFormComponent
                      handleSubmit={handleSubmit}
                      submitChanges={submitChanges}
                      control={control}
                      employees={employees}
                      password={password}
                      t={t}
                      />
          {//form 
          }
        </Box>
      </Paper>
    </Box>
  );
}
