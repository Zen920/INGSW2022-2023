import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { deleteCategory } from "../../../../services/api/CategoriesRequests";
import WebSocketContext from "../../../../hooks/MyWebSocket";
import AutocompleteController from "../../../common/Form/AutocompleteTextField/Autocomplete";

import SnackBarContext from "../../../../services/contexts/SnackBarContext";
export default function DeleteCategoryForm(props) {
  const { t } = useTranslation();
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
    },
    mode: "onChange",
  });
  const removeCategory = async (toDelete) => {
    if (
      await deleteCategory(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        { categoryType: toDelete.category.categoryType },
        t
      )
    ) {
      sendDishesUpdateMessage([
        "delete",
        "category",
        toDelete.category.categoryType,
      ]);
      const array = props.categories.filter(
        (data) => data.idCategory !== toDelete.category.idCategory
      );

      props.setCategories(array, "delete");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        category: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(removeCategory)}>
      <Box
        padding={3}
        display="flex"
        flexDirection={"column"}
        alignContent="center"
        alignItems={"center"}
        justifyContent="center"
      >
        <AutocompleteController
          required={true}
          label={t("main.form.dish.category")}
          customField="categoryType"
          control={control}
          name="category"
          rules={{ required: t("main.form.control.required") }}
          list={props.categories}
        />
        <Box
          padding={2}
          alignItems={"center"}
          alignContent="center"
          justifyContent="center"
        >
          <Button type="submit" variant="colored-submit">
            <Typography variant="h6">{t("main.form.delete")}</Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
}
