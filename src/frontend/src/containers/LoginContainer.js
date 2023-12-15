import { Brightness4Outlined, Brightness7Outlined } from "@mui/icons-material";
import { IconButton, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import * as React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "../i18n";
import bgImage from "../images/brick-wall-g20a6c53f3_1920.jpg";
import NewPasswordField from "../components/common/Form/NewPasswordField";
import NewTextField from "../components/common/Form/NewTextField";
import LocalizationComponent from "../components/common/NavigationBar/LocalizationComponent";
import AuthContext from "../services/contexts/AuthContext";
import ColorModeContext from "../services/contexts/ColorModeContext";
import { pageTitles } from "../utilities/constants/ConstantMessages";
import SnackBarContext from "../services/contexts/SnackBarContext";
import LoginForm from "../components/Login/LoginForm";

export default function NewLoginComponent() {
  const theme = useTheme();
  const { colorMode } = useContext(ColorModeContext);
  const { t, i18n } = useTranslation();
  const { login } = useContext(AuthContext);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const loginClickFunction = async (payload) => {
    let error = await login(payload);
    if (error !== undefined) {
      handleSetOpenSnack(true);
      handleSetSeverity("error");
      handleMessageInfo(t(error.response.data));
    }
  };
  return (
    <Grid container width="100%" minHeight="100vh">
      <Grid
        item
        md={7}
        lg={8}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Box width="100%">
          <Grid
          item
            container
            padding={5}
            mt={2}
            xs={12}
            display="flex"
            flexDirection={"wrap"}
            alignItems="center"
            height="10%"
          >
            <Grid item xs={9}>
              <Typography
                fontSize={"2.8rem"}
                color={theme.palette.mode === "light" ? "#000000" : "#FFFFFF"}
              >
                {" "}
                {pageTitles.NAVBAR_TITLE}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              alignItems="center"
              display={"flex"}
              justifyContent="center"
            >
              <IconButton
                disableRipple
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                    textDecoration: "none",
                  },
                }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "light" ? (
                  <Brightness7Outlined sx={{ color: "#000000" }} />
                ) : (
                  <Brightness4Outlined sx={{ color: "#FFFFFF" }} />
                )}
              </IconButton>
              <LocalizationComponent theme={theme} i18n={i18n} />
            </Grid>
          </Grid>
        </Box>
        <Box
          display={"flex"}
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          height="90%"
          width="100%"
        >
          <LoginForm
            control={control}
            t={t}
            submitChanges={loginClickFunction}
            handleSubmit={handleSubmit}
            theme={theme}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
