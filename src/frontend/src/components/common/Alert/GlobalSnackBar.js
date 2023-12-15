import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useContext } from "react";
import SnackBarContext from "../../../services/contexts/SnackBarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function GlobalSnackBar() {
  const {
    openSnack,
    messageInfo,
    handleSetOpenSnack,
    handleMessageInfo,
    severity,
  } = useContext(SnackBarContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleSetOpenSnack(false);
  };

  const handleExited = () => {
    handleMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={"Key"}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        sx={{
          alignContent: "right",
          textAlign: "right",
        }}
      >
        <Alert severity={severity} sx={{ color: "white" }}>
          {severity === "error" && (
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5, textAlign: "right" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Typography
            variant="body2"
            mr={"5px"}
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {messageInfo}
            {severity === "success" && (
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5, textAlign: "right" }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
