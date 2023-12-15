import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import { putEmployeeAccount } from "../../../../services/api/EmployeeInformationsRequests";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import EditEmployeeForm from "./EditEmployeeForm";
export default function EditEmployeePage(props) {
  const { sendEmployeeProfileUpdate } = useContext(WebSocketContext);
  const { t } = useTranslation();
  const { employees } = props;
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful, dirtyFields },
  } = useForm({
    defaultValues: {
      username: [],
      lockRadio: "",
    },
    mode: "onChange",
  });

  const submitChanges = async (data) => {
    let resultLock;
    if (data.lockRadio === "") {
      resultLock = undefined;
    } else {
      resultLock =
        data.lockRadio ===
        t("main.admin.employees.edit.form.options", { returnObjects: true })[0]
          ? false
          : true;
    }
    sendEmployeeProfileUpdate(data.username);

    await putEmployeeAccount(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      data.username,
      {
        lockRadio: resultLock,
      },
      t
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: [],
        lockRadio: "",
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
            {t("main.admin.employees.edit.title")}
          </Typography>
          <EditEmployeeForm
            handleSubmit={handleSubmit}
            submitChanges={submitChanges}
            control={control}
            dirtyFields={dirtyFields}
            employees={employees}
            t={t}
          />
        </Box>
      </Paper>
    </Box>
  );
}
