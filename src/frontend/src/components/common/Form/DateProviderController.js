import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "dayjs/locale/it";
import "dayjs/locale/en";
import { useEffect, useState } from "react";
export default function DateProviderController(props) {
  const { field, formState, fieldState  } = useController(props);
  const { name, label, required, past} = props;
  const [pastDate, setPastDate] = useState(undefined);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setPastDate(past)
  }, [past])
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale={i18n.language}>
      <DatePicker
        format="DD/MM/YYYY"
        disableFuture
        fullWidth
        {...field}
        minDate={past ? pastDate : new Date(0)}
        name={name}
        label={
          label.charAt(0).toUpperCase() +
          label.slice(1) +
          (required ? " *" : "")
        }
        error={pastDate > field.value ? field.error : null}
        onChangeView={(_, value) => {
          field.onChange(value);
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            helperText={
              ((pastDate > field.value ) && formState.errors[name]) ? formState.errors[name].message : null
            }
            fullWidth

          />
        )}
      />
    </LocalizationProvider>
    </>
  );
}
