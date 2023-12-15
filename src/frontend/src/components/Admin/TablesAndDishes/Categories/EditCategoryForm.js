import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { putCategory } from "../../../../services/api/CategoriesRequests";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";
import NewTextField from "../../../common/Form/NewTextField";
import NumericTextField from "../../../common/Form/NumericTextField";

import SnackBarContext from "../../../../services/contexts/SnackBarContext";
export default function EditCategoryForm(props) {
  const { t } = useTranslation();
  const [category, setCategory] = useState(undefined);
  const [submittable, setSubmittable] = useState(false);
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
      category: "",
      categoryType: "",
      index: 0,
    },
    mode: "onChange",
  });
  const handleCategory = useCallback((value) => {
    setCategory(value);
  }, []);
  const handleSubmittable = (category, newType, newIndex) => {
    if (category.categoryType === newType && category.index === newIndex) {
      setSubmittable(false);
      return false;
    }
    setSubmittable(true);
    return true;
  };
  const updateCategory = async (data) => {
    if (!handleSubmittable(category, data.categoryType, data.index)) {
      return;
    }
    let updated = await putCategory(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      category,
      {
        newCategoryType:
          category.categoryType !== data.categoryType
            ? data.categoryType
            : undefined,
        index: category.index !== data.index ? data.index : undefined,
      },
      t
    );
    if (updated) {
      const array = props.categories.filter(
        (categories) => categories.idCategory !== data.category.idCategory
      );
      props.setCategories([...array, updated]);
      sendDishesUpdateMessage(["update", "category", category.categoryType]);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && submittable) {
      reset({
        category: "",
        categoryType: "",
        index: 0,
      });
      setCategory();
    }
  }, [isSubmitSuccessful, reset, submittable]);
  return (
    <form onSubmit={handleSubmit(updateCategory)}>
      <Grid
        container
        rowSpacing={3}
        padding={3}
        columnSpacing={2}
        display="flex"
        alignContent="center"
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid xs={12}>
          <AutocompleteController
            required={true}
            label={t("main.form.dish.category")}
            customField="categoryType"
            control={control}
            name="category"
            handleSetVariable={handleCategory}
            rules={{ required: t("main.form.control.required") }}
            list={props.categories}
          />
        </Grid>
        {category && (
          <>
            {" "}
            <Grid xs={12} md={6}>
              <NewTextField
                required={true}
                control={control}
                label={t("main.form.dish.category")}
                name="categoryType"
                autocomplete={category.categoryType}
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
              <NumericTextField
                required={true}
                autocomplete={category.index}
                t={t}
                control={control}
                label={t("main.form.dish.index")}
                name="edit.category.index"
                rules={{
                  required: t("main.form.control.required"),
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
          </>
        )}
      </Grid>
    </form>
  );
}
