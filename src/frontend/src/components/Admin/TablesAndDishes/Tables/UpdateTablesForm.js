import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  putBatchTableUsability,
  putTableUsability,
} from "../../../../services/api/TableRequests";
import AutocompleteMulti from "../../../common/Form/AutocompleteTextFieldMulti/AutocompleteMulti";
import ControlledRadioButtonsGroup from "../../../common/Form/RadioButtonController";
import SnackBarContext from "../../../../services/contexts/SnackBarContext";

export default function UpdateTableForm(props) {
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(false);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      index: [],
      availabilityRadio: "",
    },
    mode: "onChange",
  });
  const updateUsability = async (data) => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
    let resultLock;
    if (data.availabilityRadio === "") {
      resultLock = undefined;
    } else {
      resultLock =
        data.availabilityRadio ===
        t("main.admin.tables.form.radio.options", { returnObjects: true })[0]
          ? true
          : false;
    }
    data.result = resultLock;
    if (data.index.length > 1) {
      await putBatchTableUsability(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        data,
        t
      );
    } else {
      await putTableUsability(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          id: data.index[0],
          result: data.result,
        },
        t
      );
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        index: [],
        availabilityRadio: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(updateUsability)}>
      <Grid
        container
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Grid xs={12} sm={8} md={8} sx={{ padding: 3 }}>
          <AutocompleteMulti
            required={true}
            control={control}
            name="index"
            list={props.tables}
            label={t("main.admin.tables.form.selectField.placeholder")}
            placeholder={t("main.admin.tables.form.selectField.placeholder")}
            rules={{
              required: t("main.form.control.required"),
            }}
          />
        </Grid>
        <Grid xs={12} sm={4} md={2} sx={{ padding: 3 }}>
          <ControlledRadioButtonsGroup
            required={true}
            list={t("main.admin.tables.form.radio.options", {
              returnObjects: true,
            })}
            name="availabilityRadio"
            label={t("main.admin.tables.form.radio.title")}
            rules={{
              required: t("main.form.control.required"),
            }}
            errorMessage={t("main.form.control.required")}
            control={control}
          />
        </Grid>
        <Grid>
          <Box
            padding={2}
            alignItems={"center"}
            alignContent="center"
            justifyContent="center"
          >
            <Button disabled={disabled} type="submit" variant="colored-submit">
              <Typography variant="h6">{t("main.form.submit")}</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
