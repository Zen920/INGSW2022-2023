import { Grid, Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import MultilineTextField from "../../common/Form/MultilineTextField";
import NewTextField from "../../common/Form/NewTextField";
import { useEffect } from "react";
const AdminNotificationForm = ({
  submitChanges,
  t,
}) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        body: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(submitChanges)}>
      <Grid
        container
        sx={{ maxWidth: "600px" }}
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Grid xs={12} m={2}>
          <NewTextField
            control={control}
            name="title"
            label={t("main.admin.notifications.form.title")}
            rules={{
              required: t("main.form.control.required"),
              minLength: {
                value: 5,
                message: t("main.form.control.minLength", { count: 5 }),
              },
              maxLength: {
                value: 40,
                message: t("main.form.control.maxLength", { count: 40 }),
              },
            }}
          />
        </Grid>
        <Grid xs={12} m={2}>
          <MultilineTextField
            control={control}
            rows={10}
            name="body"
            label={t("main.admin.notifications.form.body")}
            rules={{
              required: t("main.form.control.required"),
              minLength: {
                value: 5,
                message: t("main.form.control.minLength", { count: 5 }),
              },
              maxLength: {
                value: 255,
                message: t("main.form.control.maxLength", { count: 255 }),
              },
            }}
          />
        </Grid>
        <Box
          padding={2}
          alignItems={"center"}
          alignContent="center"
          justifyContent="center"
        >
          <Button type="submit" variant="colored-submit">
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Box>
      </Grid>
    </form>
  );
};
export default AdminNotificationForm;
