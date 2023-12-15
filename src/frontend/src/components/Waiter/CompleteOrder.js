import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getFullCart } from "../../services/api/ClientOrdersRequests";
import FullCartCard from "../common/Card/FullCartCard"
import SnackBarContext from "../../services/contexts/SnackBarContext";
export default function CompleteOrder() {
  const { state } = useLocation();
  const { t } = useTranslation();
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const [cart, setCart] = useState(undefined);

  useEffect(() => {
    const fetchCart = async () => {
      setCart(
        await getFullCart(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          state,
          t
        )
      );
    };
    fetchCart();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity, state, t]);
  return (
    <Box
      display="flex"
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
    >
      <Box alignContent="center" justifyItems="center" justifyContent="center">
        {cart && <FullCartCard cart={cart} t={t} />}
      </Box>
    </Box>
  );
}
