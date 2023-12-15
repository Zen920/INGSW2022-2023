import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useController } from "react-hook-form";
export default function ControlledRadioButtonsGroup(props) {
  const { field, fieldState } = useController(props);
  const { label, name, list, required } = props;

  return (
    <FormControl error={fieldState.invalid}>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {fieldState.invalid
          ? props.errorMessage
          : label.charAt(0).toUpperCase() +
            label.slice(1) +
            (required ? " *" : "")}
      </FormLabel>
      <RadioGroup
        label={
          label.charAt(0).toUpperCase() +
          label.slice(1) +
          (required ? " *" : "")
        }
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        id={name}
        value={field.value}
        onChange={(_, value) => {
          field.onChange(value);
        }}
      >
        {list.map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            onClick={(event, _) => {
              if (event.target.value === field.value) {
                field.onChange("");
              }
            }}
            control={<Radio />}
            label={item.charAt(0).toUpperCase() + item.slice(1)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
