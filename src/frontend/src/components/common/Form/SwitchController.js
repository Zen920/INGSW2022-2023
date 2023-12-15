import { FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
export default function SwitchController(props) {
  const { field } = useController(props);
  const { label, name, autocomplete } = props;
  const [localAuto, steLocalAuto] = useState(autocomplete);
useEffect(() => {
  if(autocomplete !== undefined) {
    field.value = autocomplete
    field.onChange(autocomplete)
  }
}, [autocomplete])
  return (
    <FormControlLabel
      control={
        <Switch
        id={"Switch"+label}
          name={name}
          onChange={(_, value) => {
            field.onChange(value);
          }}
          inputProps={{ "aria-label": "controlled" }}
          checked={field.value}
        />
      }
      label={label.charAt(0).toUpperCase() + label.slice(1)}
    />
  );
}
