// RegistrationForm.js
import { Button, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import AutocompleteController2 from "../../../common/Form/AutocompleteStandard";
import NewPasswordField from "../../../common/Form/NewPasswordField";
import NewTextField from "../../../common/Form/NewTextField";

function RegistrationForm({ onSubmit, onReset, roles, password, t }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      role: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const handleFormReset = () => {
    reset({ username: "", role: "", password: "" });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container sx={{ maxWidth: "600px" }} padding={2} rowGap={3}>
        <Grid item xs={12}>
          <NewTextField
            required={true}
            control={control}
            label="username"
            name="username"
            rules={{
              required: t("main.form.control.required"),
              minLength: {
                value: 3,
                message: t("main.form.control.minLength", { count: 3 }),
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteController2
            required={true}
            list={roles}
            label={t("main.employeeForm.role")}
            control={control}
            name="role"
            keyValue="idRole"
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid item xs={7} md={3}>
          <Button fullWidth variant="colored-submit" type="submit">
            {t("main.form.submit")}
          </Button>
        </Grid>
        <Grid item xs={0} md={6} sx={{
          display: {xs:"none", md:"block"},
        }}/>
        <Grid item xs={7} md={3}>
          <Button fullWidth variant="colored-submit" onClick={handleFormReset}>
            {t("main.form.reset")}
          </Button>
        </Grid>
        <Grid item xs={8}>
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
}

export default RegistrationForm;
