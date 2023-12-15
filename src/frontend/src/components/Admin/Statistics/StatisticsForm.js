import { Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  getCategoriesPrepared,
  getDishesPrepared,
} from "../../../services/api/StatisticsRequests";
import AutocompleteMulti from "../../common/Form/AutocompleteTextFieldMulti/AutocompleteMulti";
import DateProviderController from "../../common/Form/DateProviderController"
import SnackBarContext from "../../../services/contexts/SnackBarContext";

export default function StatisticsForm(props) {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const { setCategoriesPrepared, setDishesPrepared } = props;
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    watch,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
    getValues,
  } = useForm({
    defaultValues: {
      username: [],
      from: dayjs(),
      to: dayjs(),
    },
    mode: "onChange",
  });
  const getGraph = async (data) => {

    if(data.from > data.to){
      return
    }
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
    setDishesPrepared(
      await getDishesPrepared(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          from: data.from.$d.getTime(),
          to: data.to.$d.getTime(),
          username: data.username[0],
        }
      ),
      data.username[1] !== undefined
        ? await getDishesPrepared(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              from: data.from.$d.getTime(),
              to: data.to.$d.getTime(),
              username: data.username[1],
            }
          )
        : undefined,
      data.username[0],
      data.username[1]
    );

    setCategoriesPrepared(
      await getCategoriesPrepared(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          from: data.from.$d.getTime(),
          to: data.to.$d.getTime(),
          username: data.username[0],
        }
      ),
      data.username[1] !== undefined
        ? await getCategoriesPrepared(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              from: data.from.$d.getTime(),
              to: data.to.$d.getTime(),
              username: data.username[1],
            }
          )
        : undefined
    );
  };
  return (
    <form onSubmit={handleSubmit(getGraph)}>
      <Grid
        container
        sx={{ maxWidth: "1500px" }}
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={6} md={3} sx={{ padding: 3 }}>
          <DateProviderController
            required={true}
            control={control}
            name="from"
            label={t("main.admin.statistics.fromField")}
            rules={{
              required: t("main.form.control.required"),
              minLength: {
                value: 2,
                message: t("main.form.control.minLength", { count: 2 }),
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ padding: 3 }}>
          <DateProviderController
            control={control}
            name="to"
            disabled={false}
            required={true}
            past={watch("from")}
            label={t("main.admin.statistics.toField")}
            rules={{
              required: t("main.form.control.required"),
              min: {
                value: watch("from"), 
                message: t("main.form.control.minDate"),
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ padding: 3 }}>
          <AutocompleteMulti
            control={control}
            required={true}
            label={"Username"}
            limit={2}
            name="username"
            list={props.list}
            placeholder={t("main.admin.statistics.selectField.placeholder")}
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ padding: 3 }}>
          <Button type="submit" variant="colored-submit" disabled={disabled}>
            <Typography variant="h6">{t("main.form.submit")}</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
