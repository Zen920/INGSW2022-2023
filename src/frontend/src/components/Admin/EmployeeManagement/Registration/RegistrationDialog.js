// RegistrationDialog.js
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function RegistrationDialog({ open, onClose, onConfirm, t }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
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
              onConfirm(true);
              onClose();
            }}
          >
            {t("main.dialog.buttons.confirm")}
          </Button>
          <Button
            variant="colored-submit"
            onClick={() => {
              onConfirm(false);
              onClose();
            }}
          >
            {" "}
            {t("main.dialog.buttons.deny")}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationDialog;
