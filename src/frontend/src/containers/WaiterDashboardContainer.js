import { Box } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useEffect, useState } from "react";
import { getTables} from "../services/api/TableRequests"
import WebSocketContext from "../hooks/MyWebSocket";
import SnackBarContext from "../services/contexts/SnackBarContext";
import TableDashboard from "../components/Waiter/DashboardTables";
import { useTranslation } from "react-i18next";
export default function WaiterDashboard() {
  const { t } = useTranslation();
  const { tables2 } = useContext(WebSocketContext);
  const [tables, setTables] = useState([]);
  const { handleMessageInfo, handleSetOpenSnack, handleSetSeverity } =
    useContext(SnackBarContext);
  // return focus to the button when we transitioned from !open -> open

  useEffect(() => {
    const fetchTables = async () => {
      setTables(
        await getTables(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity
        )
      );
    };
    fetchTables();
  }, [tables2, handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  return (
    <Box display={"flex"} m={2} alignItems="center" justifyContent="center">
      <Box
        display={"flex"}
        sx={{
          wdith: { xs: "100%", md: "60%" },
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid container spacing={1} alignItems="center" display="flex">
          {tables &&
            tables.map((table) => (
              <TableDashboard
                table={table}
                t={t}
                key={"key#" + table.idTable + "number#" + table.tableNumber}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
