import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { putDish } from "../../../../services/api/DishRequests";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";
import NewTextField from "../../../common/Form/NewTextField";
import NumericTextField from "../../../common/Form/NumericTextField";
import SwitchController from "../../../common/Form/SwitchController";
import LoadingScreen from "../../../common/Loading/LoadingScreen";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
import { Box } from "@mui/material";

export default function EditExistingDish(props) {
  const { dishes, handleSetDishes } = props;
  const { t } = useTranslation();
  const [selectedDish, setSelectedDish] = useState();
  const { sendDishesUpdateMessage } = useContext(WebSocketContext);

  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const [loading, setLoading] = useState(true);

  const updateDishesOnSubmit = (updatedDish) => {
    let array = dishes.filter((data) => data.idDish !== updatedDish.idDish);
    if (array === undefined) {
      handleSetDishes(updatedDish);
    } else {
      handleSetDishes([...array, ...[updatedDish]]);
    }
  };

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      searchDish: "",
      dishName: "",
      dishDescription: "",
      allergens: "",
      index: "",
      onSale: true,
      price: "",
      categoryType: "",
      idDish: "",
    },
    mode: "onChange",
  });
  const submitData = async (data) => {
    data.categoryType = data.categoryType.categoryType;
    delete data.searchDish;
    if (
      await putDish(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        data,
        t
      )
    ) {
      updateDishesOnSubmit(data);
      sendDishesUpdateMessage(["update", "dish", data.dishName]);
    }
  };

  const getCategoryObject = (categoryType) => {
    return props.categories.find((data) => data.categoryType === categoryType);
  };
  const handleSetVariable = useCallback((value, variableName) => {
    switch (variableName) {
      case "selectedDish":
        setSelectedDish(value);
        break;
      default:
        break;
    }
  }, []);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        searchDish: "",
        dishName: "",
        dishDescription: "",
        allergens: "",
        index: "",
        price: "",
        onSale: true,
        categoryType: "",
        idDish: "",
      });
      setSelectedDish();
    }
  }, [isSubmitSuccessful, reset]);
  useEffect(() => {}, [dishes]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Grid container width="100%" spacing={3}>
        <form onSubmit={handleSubmit(selectedDish ? submitData : null)}>
          <Grid xs={12} md={6}  padding={2}>
            <AutocompleteController
              required={true}
              label={t("main.form.search")}
              control={control}
              name="searchDish"
              variableName={"selectedDish"}
              customField="dishName"
              list={dishes}
              handleSetVariable={handleSetVariable}
            />
          </Grid>

          {selectedDish && (
            <>
            <Box width="100%" >
              <Grid container disabled={selectedDish ? false : true}  padding={2} spacing={2}>
                <Grid xs={12} md={6}>
                  <NewTextField
                    label={t("main.form.dish.id")}
                    control={control}
                    name="idDish"
                    disabled={true}
                    autocomplete={selectedDish.idDish}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <NewTextField
                    required={true}
                    control={control}
                    name="dishName"
                    label={t("main.form.dish.name")}
                    autocomplete={selectedDish.dishName}
                    rules={{
                      required: t("main.form.control.required"),
                      minLength: {
                        value: 3,
                        message: t("main.form.control.minLength", { count: 3 }),
                      },
                      maxLength: {
                        value: 80,
                        message: t("main.form.control.maxLength", {
                          count: 80,
                        }),
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <NewTextField
                    required={true}
                    control={control}
                    label={t("main.form.dish.description")}
                    autocomplete={selectedDish.dishDescription}
                    name="dishDescription"
                    rules={{
                      minLength: {
                        value: 5,
                        message: t("main.form.control.minLength", { count: 5 }),
                      },
                      maxLength: {
                        value: 255,
                        message: t("main.form.control.maxLength", {
                          count: 255,
                        }),
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <NewTextField
                    control={control}
                    label={t("main.form.dish.allergens")}
                    name="allergens"
                    autocomplete={selectedDish.allergens}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <NumericTextField
                    required={true}
                    t={t}
                    control={control}
                    name="index"
                    label={t("main.form.dish.index")}
                    autocomplete={selectedDish.index}
                    rules={{
                      required: t("main.form.control.required"),
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <NumericTextField
                    t={t}
                    control={control}
                    label={t("main.form.dish.price")}
                    autocomplete={selectedDish.price}
                    required={true}
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
                    autocomplete={getCategoryObject(selectedDish.categoryType)}
                    name="categoryType"
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
                    autocomplete={selectedDish.onSale}
                    name="onSale"
                    keyValue="idBoolean"
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Button
                    disabled={selectedDish ? false : true}
                    type="submit"
                    variant="colored-submit"
                  >
                    <Typography variant="h6">
                      {t("main.form.submit")}
                    </Typography>
                  </Button>
                </Grid>
                {/*<Grid xs={12} md={6}>
                  <Button
                    disabled={selectedDish ? false : true}
                    onClick={deleteSelected}
                    variant="colored-submit"
                  >
                    <Typography variant="h6">
                      {t("main.form.delete")}
                    </Typography>
                  </Button>
                  </Grid>*/}
              </Grid>
              </Box>
            </>
          )}
        </form>
    </Grid>
  );
}
