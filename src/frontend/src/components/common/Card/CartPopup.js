import { Box, useTheme } from "@mui/system";
import * as React from "react";

import { Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postNewOrder } from "../../../services/api/ClientOrdersRequests";
import { getSingleTransaction } from "../../../services/api/OrderTransactionRequests";
import WebSocketContext from "../../../hooks/MyWebSocket";
import CartComponent from "./CartChildren/CartComponent";
import { misc } from "../../../utilities/constants/ConstantMessages";
export default function CartPopup(props) {
  const {
    handleSetTransaction,
    transaction,
    table,
    cart,
    removeItem,
    cleanCart,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    handleNumberInCart,
    t,
  } = props;
  const [openCart, setOpenCart] = useState(false);
  const { sendOrdersMessage } = useContext(WebSocketContext);
  const theme = useTheme();
  const handleSetCart = () => {
    cleanCart(cart);
  };

  const sendData = async () => {
    var transaction = await postNewOrder(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      {
        list: cart,
        clientTable: table,
      },
      t
    )
    if (transaction !== undefined) {
      handleSetCart();
      handleSetTransaction(transaction);
      sendOrdersMessage(misc.NO_FETCH);
    }
  };
  const handleClose = () => {
    setOpenCart(!openCart);
  };

  return (
    <>
      {openCart && (
        <Box
          width="100%"
          sx={{
            backdropFilter: "blur(5px)",
          }}
          height="100vh"
          display={"flex"}
          flexDirection={"column"}
          justifySelf={"right"}
          alignContent="right"
          justifyItems="right"
          justifyContent="right"
          top={0}
          position="sticky"
        >
          <Card elevation={9}>
            <CardContent>
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon
                      sx={{
                        color:
                          theme.palette.mode === "light"
                            ? "#000000"
                            : "#FFFFFF",
                      }}
                    />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <CartComponent
                cart={cart}
                getNumberInCart={handleNumberInCart}
                state={table}
                t={t}
                removeItem={removeItem}
                transaction={transaction}
                sendData2={sendData}
              />
            </CardContent>
          </Card>
        </Box>
      )}

      {!openCart && (
        <Box
          justifyContent={"center"}
          sx={{
            width: { xs: "100%" },
            bottom: { xs: 0 },
            display: { sm: "block", md: "none" },
          }}
        >
          <Button
            onClick={setOpenCart}
            fullWidth
            variant="colored-submit"
            sx={{
              position: { xs: "fixed" },
              bottom: { xs: 0 },
              borderRadius: 0,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            {t("main.waiter.cart.title")}
          </Button>
        </Box>
      )}
    </>
  );
}
