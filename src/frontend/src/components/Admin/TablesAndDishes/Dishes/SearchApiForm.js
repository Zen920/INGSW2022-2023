import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getOffDishes } from "../../../../services/api/DishRequests";
import NewTextField from "../../../common/Form/NewTextField";
import { useTranslation } from "react-i18next";

import EnhancedTableDishes from "../../../Cook/EnhancedTableDishes";
import NumericTextField from "../../../common/Form/NumericTextField";
export default function SearchApiForm(props) {
  const { t } = useTranslation();

  const {
    handleSetVariable,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
  } = props;
  const [disabled, setDisabled] = useState(false);
  const [offDishes, setOffDishes] = useState(undefined);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchOffDish: "",
      maxResults: 1,
    },
    mode: "onChange",
  });
  const autoCompleteDish = async (data) => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
    setOffDishes(
      await getOffDishes(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          value: data.searchOffDish,
          max_results: data.maxResults*2,
        },
        t
      )
    );
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(autoCompleteDish)}>
        <Grid
          container
          sx={{ maxWidth: "700px" }}
          alignContent="center"
          justifyItems="center"
          justifyContent="left"
        >
          <Grid xs={12} md={5} m={2}>
            <NewTextField
              required={true}
              control={control}
              label={t("main.form.search")}
              name="searchOffDish"
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
          <Grid xs={12} md={5} m={2}>
            <NumericTextField
              required={true}
              t={t}
              control={control}
              name="maxResults"
              label={t("main.admin.dishes.off.form.resultsLabel")}
              rules={{
                required: t("main.form.control.required"),
              }}
            />
          </Grid>
          <Grid xs={12} padding={3}>
            <Button type="submit" variant="colored-submit" disabled={disabled}>
              <Typography variant="h6">{t("main.form.search")}</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
      {offDishes && (
        <EnhancedTableDishes rows={offDishes} setVariable={handleSetVariable} />
      )}
    </Box>
  );
}
