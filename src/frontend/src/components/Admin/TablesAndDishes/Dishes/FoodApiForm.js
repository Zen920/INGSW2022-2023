import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postDish } from "../../../../services/api/DishRequests";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";
import NewTextField from "../../../common/Form/NewTextField";
import SwitchController from "../../../common/Form/SwitchController";
import NumericTextField from "../../../common/Form/NumericTextField";
import LoadingScreen from "../../../common/Loading/LoadingScreen";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import SearchApiForm from "./SearchApiForm";
import WebSocketContext from "../../../../hooks/MyWebSocket";

export default function NewFoodApiForm(props) {
  const { t } = useTranslation();
  const { dishes, handleSetDishes } = props;

  const [dishName, setDishName] = useState();
  const [dishDescription, setDishDescription] = useState();
  const [allergens, setAllergens] = useState();
  const [loading, setLoading] = useState(true);
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
      onSale: true,
      price: "",
      category: "",
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
      sendDishesUpdateMessage(["add", "dish", data.dishName]);
    }
  };

  const handleSetVariable = useCallback((value, variableName) => {
    switch (variableName) {
      case "dishName":
        setDishName(value);
        break;
      case "dishDescription":
        setDishDescription(value);
        break;
      case "allergens":
        setAllergens(value);
        break;
      default:
        break;
    }
  }, []);

  const resetVariables = () => {
    setDishName("");
    setDishDescription("");
    setAllergens("");
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        dishName: "",
        dishDescription: "",
        allergens: "",
        index: "",
        onSale: true,
        price: "",
        category: "",
      });
      resetVariables();
    }
  }, [isSubmitSuccessful, reset]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Grid container xs={12}>
      <Grid sm={12} md={8} sx={{ padding: 1 }}>
        <SearchApiForm
          handleSetVariable={handleSetVariable}
          handleSetOpenSnack={handleSetOpenSnack}
          handleMessageInfo={handleMessageInfo}
          handleSetSeverity={handleSetSeverity}
        />
      </Grid>
      <Grid
        container
        xs={12}
        md={4}
        sx={{ padding: 3 }}
        mt={7.5}
        alignContent="left"
        justifyItems="left"
        justifyContent="left"
        spacing={2}
      >
        <Box width="100%">
          <form onSubmit={handleSubmit(submitData)}>
            <Grid container rowSpacing={2}>
              <Grid xs={12}>
                <NewTextField
                  required={true}
                  control={control}
                  name="dishName"
                  autocomplete={dishName}
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
              <Grid xs={12}>
                <NewTextField
                  required={true}
                  control={control}
                  autocomplete={dishDescription}
                  name="dishDescription"
                  label={t("main.form.dish.description")}
                  rules={{
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
              <Grid xs={12}>
                <NewTextField
                  control={control}
                  label={t("main.form.dish.allergens")}
                  name="allergens"
                  autocomplete={allergens}
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
              <Grid xs={12}>
                <NumericTextField
                  required={true}
                  t={t}
                  control={control}
                  name="price"
                  label={t("main.form.dish.price")}
                  rules={{
                    required: t("main.form.control.required"),
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <AutocompleteController
                  required={true}
                  label={t("main.form.dish.category")}
                  list={props.categories}
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
        </Box>
      </Grid>
    </Grid>
  );
}
