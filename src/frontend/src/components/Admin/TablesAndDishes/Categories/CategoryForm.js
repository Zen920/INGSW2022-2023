import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postCategory } from "../../../../services/api/CategoriesRequests";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import NewTextField from "../../../common/Form/NewTextField";
import NumericTextField from "../../../common/Form/NumericTextField";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
export default function CategoryForm(props) {
  const { t } = useTranslation();
  const { sendDishesUpdateMessage, updates } = useContext(WebSocketContext);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      category: "",
      index: "",
    },
    mode: "onChange",
  });
  const addCategory = async (data) => {
    let newCategory = await postCategory(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      {
        categoryType: data.category,
        index: data.index,
      },
      t
    );
    if (newCategory) {
      sendDishesUpdateMessage(["add", "category", data.category]);
      props.setCategories([...props.categories, newCategory]);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        category: "",
        index: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(addCategory)}>
        <Grid
          container
          width="100%"
          spacing={3}
          padding={3}
          display="flex"
          flexDirection={"column"}
          alignContent="center"
          alignItems={"center"}
          justifyContent="center"
        >
          <Grid xs={12}>
            <NewTextField
              control={control}
              required={true}
              label={t("main.form.dish.category")}
              name="category"
              rules={{
                required: t("main.form.control.required"),
                minLength: {
                  value: 3,
                  message: t("main.form.control.minLength", { count: 3 }),
                },
                maxLength: {
                  value: 80,
                  message: t("main.form.control.maxLength", { count: 80 }),
                },
              }}
            />
          </Grid>
          <Grid xs={12}>
            <NumericTextField
              t={t}
              control={control}
              label={t("main.form.dish.index")}
              name="index"
            />
          </Grid>
          <Grid>
            <Box
              padding={2}
              alignItems={"center"}
              alignContent="center"
              justifyContent="center"
            >
              {" "}
              <Button type="submit" variant="colored-submit">
                <Typography variant="h6">{t("main.form.submit")}</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
