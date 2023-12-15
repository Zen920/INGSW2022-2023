/*import CloseIcon from "@mui/icons-material/Close";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postEmployee } from "../API/utils/EmployeeInformationsRequests";
import { getRoles } from "../API/utils/RoleRequests";
import AutocompleteController2 from "./formComponents/AutocompleteStandard";
import NewPasswordField from "./formComponents/NewPasswordField";
import NewTextField from "./formComponents/NewTextField";
import SnackBarContext from "./shared/SnackBarContext";
function SimpleDialog(props) {
  const { onClose, open, handleConfirmed, t } = props;
  const handleClose = () => {
    onClose(undefined);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText>
          {t("main.admin.employees.registration.dialog.description")}
          <br />
        </DialogContentText>
        <DialogActions>
          <Button
            variant="colored-submit"
            onClick={() => {
              handleConfirmed(true);
              handleClose();
            }}
          >
            {t("main.dialog.buttons.confirm")}
          </Button>
          <Button
            variant="colored-submit"
            onClick={() => {
              handleConfirmed(false);
              handleClose();
            }}
          >
            {t("main.dialog.buttons.deny")}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function Registration() {
  const { t, i18n } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [employeeData, setEmployeeData] = useState(undefined);
  const [password, setPassword] = useState("");
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const { reset, handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      role: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleClickOpen = (data) => {
    setEmployeeData(data);
    setOpen(true);
  };

  const handleConfirmed = useCallback((value) => {
    setConfirmed(value);
  }, []);
  const handleClose = (value) => {
    setOpen(false);
    setPassword("");
  };

  const resetForm = async () => {
    reset({ username: "", role: "", password: "" });
  };
  useEffect(() => {
    const fetchRoles = async () => {
      setRoles(
        await getRoles(handleSetOpenSnack, handleMessageInfo, handleSetSeverity)
      );
    };
    fetchRoles();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  const registerEmployee = useCallback(
    async (data) => {
      data.username = data.username.toLowerCase();
      setConfirmed(false);
      setPassword(
        await postEmployee(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          data,
          t
        )
      );
    },
    [handleSetOpenSnack, handleMessageInfo, handleSetSeverity, t]
  );

  useEffect(() => {
    if (employeeData && confirmed) {
      registerEmployee(employeeData);
    }
  }, [employeeData, confirmed, registerEmployee]);
  return (
    <Box
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
      sx={{
        color: "primary.main",
        width: { xs: "100%" },
        height: { xs: "100%" },
      }}
      display="inline-flex"
      flexDirection="column"
      flexWrap="wrap"
      padding={3}
    >
      <Paper
        sx={{
          padding: 1,
          maxWidth: { xs: "100%", md: "70%" },
          minHeight: "100%",
        }}
      >
        <Box alignItems={"center"} padding={1.5}>
          <Typography mb={2} variant="h4">
            {t("main.admin.employees.registration.title")}
          </Typography>

          <form onSubmit={handleSubmit(handleClickOpen)}>
            <Grid container sx={{ maxWidth: "600px" }} spacing={3}>
              <Grid xs={12}>
                <NewTextField
                  required={true}
                  control={control}
                  label="username"
                  name="username"
                  rules={{
                    required: t("main.form.control.required"),
                    minLength: {
                      value: 3,
                      message: t("main.form.control.minLength", { count: 3 }),
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <AutocompleteController2
                  required={true}
                  list={roles}
                  label={t("main.employeeForm.role")}
                  control={control}
                  name="role"
                  keyValue="idRole"
                  rules={{
                    required: t("main.form.control.required"),
                  }}
                />
              </Grid>
              <Grid xs={7} md={6}>
                <Button
                  fullWidth={window.innerWidth < 500}
                  variant="colored-submit"
                  type={"submit"}
                >
                  {t("main.form.submit")}
                </Button>
              </Grid>
              <Grid xs={7} md={6}>
                <Button
                  fullWidth={window.innerWidth < 500}
                  variant="colored-submit"
                  onClick={resetForm}
                >
                  {t("main.form.reset")}
                </Button>
              </Grid>
              <Grid xs={8}>
                <NewPasswordField
                  label={"password"}
                  control={control}
                  disabled={true}
                  autocomplete={password}
                  name="password"
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
      <SimpleDialog
        t={t}
        i18n={i18n}
        open={open}
        onClose={handleClose}
        handleConfirmed={handleConfirmed}
      />
    </Box>
  );
}
*/