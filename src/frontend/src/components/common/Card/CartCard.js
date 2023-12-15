import { Box } from "@mui/system";
import * as React from "react";

import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postNewOrder } from "../../../services/api/ClientOrdersRequests";
import { getSingleTransaction } from "../../../services/api/OrderTransactionRequests";
import WebSocketContext from "../../../hooks/MyWebSocket";
import CartComponent from "./CartChildren/CartComponent";
import { misc } from "../../../utilities/constants/ConstantMessages";
export default function CartCard(props) {
  const {
    handleSetTransaction,
    transaction,
    table,
    cart,
    removeItem,
    cleanCart,
    handleCartUpdate,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t,
  } = props;
  const { sendOrdersMessage } = useContext(WebSocketContext);
  const handleSetCart = () => {
    cleanCart(cart);
  };

  const sendData = async () => {
    console.log("Cart =>", cart)
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
  const getNumberInCart = () => {
    let number = 0;
    cart.map((item) => (number += item.quantity));
    return number;
  };
  return (
    <>
      <Box
        width="100%"
        display={"flex"}
        flexDirection={"column"}
        justifySelf={"right"}
        alignContent="right"
        justifyItems="right"
        justifyContent="right"
        top={65}
        right={0}
        position="sticky"
      >
        <CartComponent
          cart={cart}
          getNumberInCart={getNumberInCart}
          state={table}
          t={t}
          removeItem={removeItem}
          transaction={transaction}
          sendData2={sendData}
        />
      </Box>
    </>
  );
}
