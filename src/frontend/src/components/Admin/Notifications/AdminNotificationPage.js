import { Box, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WebSocketContext from "../../../hooks/MyWebSocket";
import { postNotification } from "../../../services/api/NotificationsRequests";
import SnackBarContext from "../../../services/contexts/SnackBarContext";
import AdminNotificationForm from "./AdminNotificationForm";
export default function NotificaitonComponent() {
  const { t } = useTranslation();
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const { sendNotificationMessage, connected, notificationConnected } =
    useContext(WebSocketContext);
  const sendNotification = async (data) => {
    if (
      await postNotification(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        data,
        t
      )
    ) {
      sendNotificationMessage();
    }
  };

  useEffect(() => {}, [connected, notificationConnected]);

  return (
    <Box
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
      sx={{
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
        <Box alignItems={"center"}>
          <Typography
            variant="h4"
            sx={{
              ml: 2,
            }}
          >
            {t("main.admin.notifications.title")}
          </Typography>
          <AdminNotificationForm
            submitChanges={sendNotification}
            t={t}
          />
        </Box>
      </Paper>
    </Box>
  );
}

/*
3. Un amministratore (o un supervisore) può personalizzare il menù dell’attività di ristorazione. In
particolare, l’utente può creare e/o eliminare elementi dal menù. Ciascun elemento è
caratterizzato da un nome, un costo, una descrizione, e un elenco di allergeni comuni. Inoltre,
è possibile organizzare gli elementi del menù in categorie personalizzabili (e.g.: primi, dessert,
primi di pesce, bibite, etc.), e definire l’ordine con cui gli elementi compaiono nel menù. In fase
di inserimento, è richiesto l’autocompletamento di alcuni prodotti (e.g.: bibite opreconfezionati)
utilizzando open data come quelli disponibili in https://it.openfoodfacts.org/data.

13. Un supervisore o un amministratore può inserire nel sistema degli avvisi, che vengono
visualizzati da tutti i dipendenti. Ciascun dipendente può marcare un avviso come “visualizzato”
e nasconderlo.

16. Un amministratore può visualizzare statistiche dettagliate sulla produttività del personale
addetto alla cucina. In particolare, in un lasso di tempo personalizzabile, deve essere possibile
visualizzare almeno quanti ordini ciascun addetto alla cucina ha evaso. È apprezzata la presenza
di grafici interattivi.

*/
