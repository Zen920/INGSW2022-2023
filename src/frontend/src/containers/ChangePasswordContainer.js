import { Paper, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/api/EmployeeInformationsRequests";
import NewPasswordField from "../components/common/Form/NewPasswordField";
import AuthContext from "../services/contexts/AuthContext";
import SnackBarContext from "../services/contexts/SnackBarContext";
export default function ChangePassword() {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const { refreshEmployee, logout } = useContext(AuthContext);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    mode: "onChange",
  });

  const changePswClickFunction = async (data) => {
    let payload = {
      currentpw: data.currentPassword,
      newpw: data.newPassword,
    };

    if (data.newPassword === data.newPassword2) {
      if (
        await changePassword(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          payload,
          t
        )
      ) {
        await delay(3000);
        logout();
      }
    }
  };
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
      //flexDirection="column"
      flexWrap="wrap"
    >
      <Box
        flexWrap="wrap"
        display="flex"
        alignContent="center"
        justifyContent="center"
        sx={{
          m: { xs: 0, md: 0 },
          width: { xs: "80%" },
        }}
      >
        <Paper
          sx={{
            borderRadius: { xs: "0", sm: "3%" },
            //m: { xs: 0, md: 0 },
            mt: { xs: 0, md: 1 },
            width: { xs: "100%", sm: "580px" },
          }}
          component={Stack}
          elevation={2}
        >
          <Typography
            variant="h2"
            sx={{
              ml: 2,
            }}
          >
            {t("main.changePassword.title")}
          </Typography>
          <form onSubmit={handleSubmit(changePswClickFunction)}>
            <Grid
              container
              sx={{ maxWidth: "600px" }}
              alignContent="center"
              justifyItems="center"
              justifyContent="center"
            >
              <Grid xs={12} m={2}>
                <NewPasswordField
                  label={t("main.changePassword.form.password")}
                  required={true}
                  control={control}
                  name="currentPassword"
                  rules={{
                    required: t("main.form.control.required"),
                  }}
                />
              </Grid>
              <Grid xs={12} m={2}>
                <NewPasswordField
                  required={true}
                  label={t("main.changePassword.form.newPassword")}
                  control={control}
                  name="newPassword"
                  rules={{
                    required: t("main.form.control.required"),
                    minLength: {
                      value: 7,
                      message: t("main.form.control.passwordPattern"),
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} m={2}>
                <NewPasswordField
                  control={control}
                  required={true}
                  label={t("main.changePassword.form.newPasswordAgain")}
                  name="newPassword2"
                  rules={{
                    required: t("main.form.control.required"),
                    minLength: {
                      value: 7,
                      message: t("main.form.control.passwordPattern"),
                    },
                  }}
                />
              </Grid>
              <Button
                type="submit"
                sx={{
                  maxWidth: "500px",
                  m: 5,
                  textTransform: "none",
                  px: 5,
                }}
                variant="colored-submit"
              >
                <Typography variant="h6">{t("main.form.submit")}</Typography>
              </Button>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
