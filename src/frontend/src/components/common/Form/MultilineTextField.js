import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
export default function MultilineTextField(props) {
  const { field, fieldState, formState } = useController(props);
  const { disabled, label, name, autocomplete, rows, required } = props;
  const refAutocomplete = useRef({});
  useEffect(() => {
    if (autocomplete && refAutocomplete.current !== autocomplete) {
      field.onChange(autocomplete);
      refAutocomplete.current = autocomplete;
    }
  }, [autocomplete, field, refAutocomplete]);
  return (
    <TextField
      fullWidth
      multiline
      rows={rows}
      disabled={disabled}
      variant="outlined"
      {...field}
      name={name}
      value={field.value}
      label={
        label.charAt(0).toUpperCase() + label.slice(1) + (required ? " *" : "")
      }
      error={fieldState.invalid}
      helperText={
        formState.errors[name] ? formState.errors[name].message : null
      }
    />
  );
}
