import { Box, Button, Grid, Typography } from "@mui/material";
import NewPasswordField from "../common/Form/NewPasswordField";
import NewTextField from "../common/Form/NewTextField";

const LoginForm = ({ submitChanges, handleSubmit, control, t, theme }) => {
  return (
    <form sx={{ height: "inherit" }} onSubmit={handleSubmit(submitChanges)}>
      <Grid
        item
        height="100%"
        container
        padding={5}
        display="flex"
        xs={12}
        md={12}
        rowSpacing={5}
        alignContent="center"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="body3"
            color={theme.palette.mode === "light" ? "black" : "white"}
          >
            {t("main.login.description.part1")}
          </Typography>
          <Typography color="primary" variant="h4">
            {t("main.login.description.part2")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NewTextField
            required={true}
            control={control}
            label={"Username"}
            name="username"
            rules={{
              required: t("main.form.control.required"),
              minLength: {
                value: 3,
                message: "Input must have at least 3 chars",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <NewPasswordField
            required={true}
            label={"Password"}
            control={control}
            name="password"
            disabled={false}
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>

        <Box
          display="flex"
          padding={2}
          alignItems="center"
          alignContent="center"
          justifyContent="center"
        >
          {" "}
          <Button type="submit" variant="colored-submit">
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Box>
      </Grid>
    </form>
  );
};
export default LoginForm;
