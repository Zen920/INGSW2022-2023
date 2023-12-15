import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";

export default function AutocompleteController2(props) {
  const { field, fieldState, formState } = useController(props);
  const { list, name, autocomplete, label, required, placeholder } = props;
  const refAutocomplete = useRef({});

  useEffect(() => {}, [list]);
  useEffect(() => {
    if (autocomplete && refAutocomplete.current !== autocomplete) {
      field.onChange(autocomplete);
      refAutocomplete.current = autocomplete;
    }
  }, [autocomplete, field, refAutocomplete]);
  return (
    <Autocomplete
      disablePortal
      fullWidth
      loading
      isOptionEqualToValue={(option, value) => option === value || value === ""}
      id={name}
      value={field.value}
      options={list ? list.map((option) => option) : []}
      onChange={(e, value) => {
        field.onChange(value);
      }}
      handleHomeEndKeys
      clearOnBlur
      selectOnFocus
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...params}
          error={fieldState.invalid}
          fullWidth
          helperText={
            formState.errors[name] ? formState.errors[name].message : null
          }
          label={label.charAt(0).toUpperCase() + label.slice(1)}
        />
      )}
      label={
        label.charAt(0).toUpperCase() + label.slice(1) + (required ? " *" : "")
      }
    />
  );
}
