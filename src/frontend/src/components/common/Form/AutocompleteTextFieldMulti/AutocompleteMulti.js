import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useController } from "react-hook-form";

export default function AutocompleteMulti(props) {
  const { field, fieldState, formState } = useController(props);
  const { list, name, placeholder, limit, label, required } = props;
  useEffect(() => {}, [list]);
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={list ? list : []}
      onChange={(_, value) => {
        if (limit === undefined) {
          field.onChange(value);
        } else if (value.length < limit + 1) {
          field.onChange(value);
        }
      }}
      label={
        label.charAt(0).toUpperCase() + label.slice(1) + (required ? " *" : "")
      }
      value={field.value}
      loading
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          placeholder={placeholder}
          error={fieldState.invalid}
          fullWidth
          helperText={
            formState.errors[name] ? formState.errors[name].message : null
          }
        />
      )}
    />
  );
}
