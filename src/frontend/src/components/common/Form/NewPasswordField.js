import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import { useController } from "react-hook-form";
export default function NewPasswordField(props) {
  const { field, fieldState, formState } = useController(props);
  const [showPassword, setShowPassword] = useState(false);
  const { label, required } = props;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl fullWidth>
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={fieldState.invalid}
      >
        {label.charAt(0).toUpperCase() +
          label.slice(1) +
          (required ? " *" : "")}
      </InputLabel>
      <OutlinedInput
        {...field}
        disabled={props.disabled ? true : false}
        fullWidth
        label={
          label.charAt(0).toUpperCase() +
          label.slice(1) +
          (required ? " *" : "")
        }
        error={fieldState.invalid}
        value={props.autocomplete ? props.autocomplete : field.value}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        sx={{
          mb: 2,
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={false}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {formState.errors[props.name] && (
        <FormHelperText id="outlined-weight-helper-text" error={true}>
          {formState.errors[props.name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
