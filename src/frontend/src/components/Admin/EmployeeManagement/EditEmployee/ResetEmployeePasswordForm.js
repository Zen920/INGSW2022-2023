/*import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AutocompleteController2 from "../common/Form/AutocompleteStandard"
import SnackBarContext from "../../services/contexts/SnackBarContext";
import { putResetEmployeePassword } from "../../services/api/EmployeeInformationsRequests";
import NewPasswordField from "../common/Form/NewPasswordField";
import { Box } from "@mui/system";
import { useState } from "react";
import WebSocketContext from "../../hooks/MyWebSocket";
export default function ResetEmployeePasswordForm(props) {
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
          <form onSubmit={handleSubmit(submitChanges)}>
            <Grid
              container
              alignContent="center"
              justifyItems="center"
              justifyContent="center"
            >
              <Grid xs={12} sm={8} md={5} sx={{ padding: 3 }}>
                <AutocompleteController2
                  required={true}
                  control={control}
                  name="username"
                  label={"username"}
                  list={employees}
                  placeholder={t(
                    "main.admin.employees.reset.form.selectField.placeholder"
                  )}
                  rules={{
                    required: t("main.form.control.required"),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={4} md={2} sx={{ padding: 3 }}>
                <Button type="submit" variant="colored-submit">
                  <Typography variant="h6">{t("main.form.submit")}</Typography>
                </Button>
              </Grid>

              <Grid xs={12} sm={12} md={5} sx={{ padding: 3 }}>
                <NewPasswordField
                  label={"password"}
                  control={control}
                  disabled={true}
                  autocomplete={password}
                  name="password"
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}*/

import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AutocompleteController2 from "../../../common/Form/AutocompleteStandard";
import NewPasswordField from "../../../common/Form/NewPasswordField";

const ResetEmployeePasswordFormComponent = ({
  handleSubmit,
  submitChanges,
  control,
  employees,
  password,
  t,
}) => {
  const { reset } = useForm({
    defaultValues: {
      username: [],
      lockRadio: "",
    },
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(submitChanges)}>
      <Grid
        container
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Grid xs={12} sm={8} md={5} sx={{ padding: 3 }}>
          <AutocompleteController2
            required={true}
            control={control}
            name="username"
            label={"username"}
            list={employees}
            placeholder={t(
              "main.admin.employees.reset.form.selectField.placeholder"
            )}
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>

        <Grid xs={12} sm={4} md={2} sx={{ padding: 3 }}>
          <Button type="submit" variant="colored-submit">
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Grid>

        <Grid xs={12} sm={12} md={5} sx={{ padding: 3 }}>
          <NewPasswordField
            label={"password"}
            control={control}
            disabled={true}
            autocomplete={password}
            name="password"
          />
        </Grid>
      </Grid>
    </form>
  );
};
export default ResetEmployeePasswordFormComponent;
