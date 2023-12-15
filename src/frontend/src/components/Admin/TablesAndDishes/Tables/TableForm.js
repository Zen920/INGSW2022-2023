import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postBatchTables, postTable } from "../../../../services/api/TableRequests";
import NumericTextField from "../../../common/Form/NumericTextField"
import SnackBarContext from "../../../../services/contexts/SnackBarContext";
export default function TableForm(props) {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      index: 1,
    },
    mode: "onChange",
  });

  const addTable = async (data) => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
    if (data.index > 1) {
      let tables = await postBatchTables(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          toAdd: data.index,
        },
        t
      );
      let number = [];
      tables.map((table) => number.push(table.tableNumber.toString()));
      props.setTables([...props.tables, ...number]);
    } else if (data.index === 1) {
      let number = (
        await postTable(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          t
        )
      ).tableNumber.toString();
      props.setTables([...props.tables, number]);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        index: 1,
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(addTable)}>
      <Box
        padding={3}
        spacing={2}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
      >
        <NumericTextField
          required={true}
          t={t}
          control={control}
          label={t("main.form.table.toAdd")}
          name="index"
          rules={{
            required: t("main.form.control.required"),
          }}
        />
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="colored-submit"
          disabled={disabled}
        >
          <Typography variant="h6">{t("main.form.submit")}</Typography>
        </Button>
      </Box>
    </form>
  );
}
