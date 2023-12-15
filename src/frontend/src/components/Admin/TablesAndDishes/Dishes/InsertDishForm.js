import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postDish } from "../../../../services/api/DishRequests";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";
import NewTextField from "../../../common/Form/NewTextField";
import SwitchController from "../../../common/Form/SwitchController";
import NumericTextField from "../../../common/Form/NumericTextField";
import LoadingScreen from "../../../common/Loading/LoadingScreen";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import WebSocketContext from "../../../../hooks/MyWebSocket";

export default function NewGenericForm(props) {
  const { t } = useTranslation();
  const { dishes, handleSetDishes } = props;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { sendDishesUpdateMessage } = useContext(WebSocketContext);

  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      dishName: "",
      dishDescription: "",
      allergens: "",
      index: "",
      price: "",
      category: "",
      onSale: true,
    },
    mode: "onChange",
  });
  const submitData = async (data) => {
    data.category = data.category.categoryType;
    let result = await postDish(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      data,
      t
    );
    if (result) {
      handleSetDishes([...dishes, result]);
      setSuccess(true);
      sendDishesUpdateMessage(["add", "dish", data.dishName]);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isSubmitSuccessful && success) {
      setSuccess(false);
      reset({
        dishName: "",
        dishDescription: "",
        allergens: "",
        index: "",
        price: "",
        category: "",
        onSale: true,
      });
    }
  }, [isSubmitSuccessful, reset, success]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <Grid
        container
        alignContent="center"
        justifyItems="center"
        justifyContent="left"
        sx={{
          justifyContent: { xs: "center", md: "left" },
        }}
        padding={1}
        spacing={2}
      >
        <Grid xs={12} md={6}>
          <NewTextField
            required={true}
            control={control}
            name="dishName"
            label={t("main.form.dish.name")}
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
        <Grid xs={12} md={6}>
          <NewTextField
            required={true}
            control={control}
            label={t("main.form.dish.description")}
            name="dishDescription"
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
        <Grid xs={12} md={6}>
          <NewTextField
            control={control}
            name="allergens"
            label={t("main.form.dish.allergens")}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <NumericTextField
            t={t}
            control={control}
            label={t("main.form.dish.index")}
            name="index"
            allowDecimals={false}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <NumericTextField
            t={t}
            control={control}
            required={true}
            label={t("main.form.dish.price")}
            name="price"
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <AutocompleteController
            required={true}
            list={props.categories}
            label={t("main.form.dish.category")}
            control={control}
            name="category"
            customField="categoryType"
            keyValue="idCategory"
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SwitchController
            label={t("main.form.dish.onSale")}
            control={control}
            name="onSale"
            keyValue="idBoolean"
          />
        </Grid>
        <Grid
          display={"flex"}
          xs={12}
          alignContent="center"
          justifyItems="center"
          justifyContent="center"
        >
          <Button type="submit" variant="colored-submit">
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
