import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { putDishesCategory } from "../../../../services/api/DishRequests";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";
import AutocompleteMultiCustomController from "../../../common/Form/AutocompleteTextFieldMulti/AutocompleteMultiCustom";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
export default function DishesCategoryForm(props) {
  const { t } = useTranslation();
  const { dishes, handleSetDishes } = props;
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
      dishes: [],
      category: "",
    },
    mode: "onChange",
  });
  const updateDishesCategory = async (data) => {
    if (
      await putDishesCategory(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        data,
        t
      )
    ) {
      let result = data.dishes.map((a) => a.idDish);
      let dishesNames = "";
      let set = new Set(result);
      let updatedArray = [];
      dishes.map((dish) => {
        if (set.has(dish.idDish)) {
          dish.categoryType = data.category.categoryType;
          dishesNames = dishesNames + " " + dish.dishName;
        }
        updatedArray.push(dish);
      });
      handleSetDishes(updatedArray);
      sendDishesUpdateMessage(["update", "dish", dishesNames]);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        dishes: [],
        category: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(updateDishesCategory)}>
      <Grid
        container
        padding={3}
        rowSpacing={3}
        columnSpacing={2}
        display="flex"
        alignContent="center"
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid xs={12} md={8}>
          <AutocompleteMultiCustomController
            required={true}
            control={control}
            name="dishes"
            customField={"dishName"}
            label={t("main.dishesCategory.form.multiSelectField.label")}
            list={dishes}
            placeholder={t("main.dishesCategory.form.selectField.placeholder")}
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AutocompleteController
            required={true}
            label={t("main.form.dish.category")}
            customField="categoryType"
            control={control}
            name="category"
            rules={{ required: t("main.form.control.required") }}
            list={props.categories}
          />
        </Grid>
        <Grid>
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
      </Grid>
    </form>
  );
}
