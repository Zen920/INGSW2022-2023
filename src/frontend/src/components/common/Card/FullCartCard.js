import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  completeTransaction,
  getSingleTransaction,
  verifyTransaction,
} from "../../../services/api/OrderTransactionRequests";
import SnackBarContext from "../../../services/contexts/SnackBarContext";
import { WAITER_URLS } from "../../../utilities/constants/ConstantURLs";
import WebSocketContext from "../../../hooks/MyWebSocket";
import { misc } from "../../../utilities/constants/ConstantMessages";
function SimpleDialog(props) {
  const { onClose, open, handleCompleteOrder, state, t, result } = props;
  const { sendOrdersMessage } = useContext(WebSocketContext);

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogActions variant="colored">
        <DialogTitle>
          {" "}
          {result
            ? t("main.dialog.warning")
            : t("main.dialog.completeOrder.title")}
        </DialogTitle>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>{" "}
      </DialogActions>

      <DialogContent>
        <DialogContentText>
          {result
            ? t("main.dialog.content.unarrived")
            : t("main.dialog.completeOrder.description")}
          <br />
        </DialogContentText>
        <DialogActions>
          <Button
            variant="colored-submit"
            onClick={() => {
              handleCompleteOrder(state);
              sendOrdersMessage(misc.FETCH);
              handleClose();
            }}
          >
            {t("main.dialog.buttons.confirm")}
          </Button>
          <Button variant="colored-submit" onClick={handleClose}>
            {" "}
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
export default function FullCartCard(props) {
  const { cart, t } = props;
  const { state } = useLocation();
  const [result, setResult] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState(undefined);
  const navigation = useNavigate();
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const completeOrder = async (state) => {
    if (
      await completeTransaction(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        {
          abortUnarrivedOrders: result,
        },
        transaction,
        t
      )
    ) {
      navigation(WAITER_URLS.HOME);
    }
  };

  const handleResult = () => {
    handleClickOpen();
  };

  useEffect(() => {
    const fetchVerifyTransaction = async () => {
      setResult(
        await verifyTransaction(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          state,
          t
        )
      );
    };
    const fetchTransaction = async () => {
      setTransaction(
        await getSingleTransaction(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          state
        )
      );
    };
    fetchTransaction();
    fetchVerifyTransaction();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity, state, t]);

  const myCart = (
    <Card elevation={9} key="mainCard">
      <CardContent>
        <List
          sx={{
            width: "100%",
            position: "relative",
            maxHeight: "350px",
            overflow: "auto",
            minHeight: 150,
            "& ul": { padding: 0 },
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {!cart && (
            <ListItemText
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
              disableTypography
              primary={t("main.waiter.cart.empty")}
            />
          )}
          {cart && transaction && (
            <>
              <Typography variant="h4">
                {t("main.waiter.cart.transaction") +
                  "#" +
                  transaction.idTransaction}
              </Typography>
              {cart.map((element, index) => (
                <Fragment key={"Blocker" + index}>
                  <ListItemText
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    disableTypography
                    primary={element.dishName}
                    key={`${element.dishName}`}
                  />
                  <ListItemText
                    disableTypography
                    primary={element.fullQuantity}
                    key={`Quantity#${index}`}
                  />
                  <ListItemText
                    disableTypography
                    primary={element.additionalNotes}
                    key={`notes#${index}`}
                  />
                  <ListItemText
                    disableTypography
                    primary={(Math.round(element.price * 100) / 100).toFixed(2) + " €"}
                    key={`Price#${index}`}
                  />
                  <Divider />
                </Fragment>
              ))}
            </>
          )}
        </List>
        {cart && (
          <Button variant="colored-submit" onClick={handleResult}>
            {t("main.form.submit")}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box
        padding={3}
        sx={{
          width: { xs: "90vw", md: "50vw" },
        }}
        display={"flex"}
        flexDirection="column"
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
      >
        {myCart}
        <SimpleDialog
          handleCompleteOrder={completeOrder}
          result={result}
          state={state}
          open={open}
          onClose={handleClose}
          t={t}
        />
      </Box>
    </>
  );
}
