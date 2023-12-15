import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
export default function AutocompleteMultiCustomController(props) {
  const { field, fieldState, formState } = useController(props);
  const {
    customField,
    list,
    autocomplete,
    name,
    label,
    handleSetVariable,
    variableName,
    required,
  } = props;
  const refAutocomplete = useRef({});

  /*const inTheList = () => {
    if (customField) {
      list.map((item) => {
        if (item[customField] === autocomplete) {
          return true;
        }
      });
    } else {
      return list.includes(autocomplete);
    }
  };*/
  useEffect(() => {
    if (autocomplete && refAutocomplete.current !== autocomplete) {
      field.onChange(autocomplete);
      refAutocomplete.current = autocomplete;
    }
  }, [autocomplete, field, refAutocomplete]);
  return (
    <>
      <Autocomplete
        multiple
        disablePortal
        isOptionEqualToValue={(option, value) =>
          option[customField] === value ||
          value === "" ||
          option[customField] === value[customField] ||
          value === option
        }
        fullWidth
        id={name}
        options={list ? list : []}
        getOptionLabel={(option) => option[customField] || ""}
        value={field.value}
        onChange={(e, value) => {
          if (handleSetVariable) {
            handleSetVariable(value, variableName);
          }
          field.onChange(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={field.value}
            label={
              label.charAt(0).toUpperCase() +
              label.slice(1) +
              (required ? " *" : "")
            }
            fullWidth
            error={fieldState.invalid}
            helperText={
              formState.errors[name] ? formState.errors[name].message : null
            }
          />
        )}
      />
    </>
  );
}
