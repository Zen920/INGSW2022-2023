// FormComponent.jsx
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useForm } from "react-hook-form";
import AutocompleteMulti from "../../../common/Form/AutocompleteTextFieldMulti/AutocompleteMulti";
import ControlledRadioButtonsGroup from "../../../common/Form/RadioButtonController";

const EditEmployeeForm = ({
  handleSubmit,
  submitChanges,
  control,
  employees,
  dirtyFields,
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
        <Grid xs={12} sm={4} md={4} sx={{ padding: 3 }}>
          <AutocompleteMulti
            required={true}
            control={control}
            name="username"
            label={"username"}
            list={employees}
            placeholder={t(
              "main.admin.employees.edit.form.selectField.placeholder"
            )}
            rules={{
              required: t("main.form.control.required"),
            }}
          />{" "}
        </Grid>
        <Grid xs={12} sm={4} md={2} sx={{ padding: 3 }}>
          <ControlledRadioButtonsGroup
            required={true}
            list={t("main.admin.employees.edit.form.options", {
              returnObjects: true,
            })}
            name="lockRadio"
            label={t("main.admin.employees.edit.form.title")}
            control={control}
          />{" "}
        </Grid>
        <Grid xs={12} sm={4} md={2} sx={{ padding: 3 }}>
          <Button
            type="submit"
            variant="colored-submit"
            disabled={Object.values(dirtyFields).length > 1 ? false : true}
          >
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditEmployeeForm;
