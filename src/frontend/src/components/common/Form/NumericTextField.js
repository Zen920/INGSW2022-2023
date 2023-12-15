import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";
export default function NumericTextField(props) {

  const { field, fieldState, formState } = useController(props);
  const { label, autocomplete, name, required } = props;
  const refAutocomplete = useRef({});
  useEffect(() => {
    if (autocomplete && refAutocomplete.current !== autocomplete) {
      field.onChange(autocomplete);
      refAutocomplete.current = autocomplete;
    }
  }, [autocomplete, field, refAutocomplete]);
  return (
    <NumericFormat
      type="number"
      label={
        label.charAt(0).toUpperCase() + label.slice(1) + (required ? " *" : "")
      }
      id={name}
      {...field}
      ref={null}
      fullWidth
      name={props.name}
      customInput={TextField}
      decimalScale={props.name === "index" ? 0 : 2}
      allowNegative={false}
      value={field.value}
      error={fieldState.invalid}
      helperText={
        formState.errors[name] ? formState.errors[name].message : null
      }
    />
  );
}
