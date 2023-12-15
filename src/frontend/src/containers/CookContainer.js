import { Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { openTransactions2 } from "../services/api/OrderTransactionRequests";
import WebSocketContext from "../hooks/MyWebSocket";
import AuthContext from "../services/contexts/AuthContext";
import SnackBarContext from "../services/contexts/SnackBarContext";
import EnhancedCollapsibleTable2 from "../components/Cook/EnhancedCollapsibleTableRework";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function CookComponent() {
  const { orders, sendOrdersMessage } = useContext(WebSocketContext);
  const { t } = useTranslation();
  const { employee } = useContext(AuthContext);
  const [mode, setMode] = useState("pending");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [refetchTransaction, setRefetchTransaction] = useState(true);
  const [value, setValue] = useState(0);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);

  const handleTabClick = (value) => {
    setMode(value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRefetchTransaction = useCallback(() => {
    setRefetchTransaction(true);
  }, []);
  const handlePendingOrders = useCallback((array) => {
    setPendingOrders(array);
  }, []);

  const handleAcceptedOrders = useCallback((array) => {
    setAcceptedOrders(array);
  }, []);

  const handleCompletedOrders = useCallback((array) => {
    setCompletedOrders(array);
  }, []);
  const fetchEmployeeOrders = async (status) => {
    switch (status) {
      case "PENDING":
        setPendingOrders(
          await openTransactions2(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              statusEnum: "WAITING",
            }
          )
        );
        break;
      case "IN_PROGRESS":
        setAcceptedOrders(
          await openTransactions2(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              statusEnum: "IN_PROGRESS",
            }
          )
        );
        break;
      case "READY":
        setCompletedOrders(
          await openTransactions2(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              statusEnum: "READY",
            }
          )
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (refetchTransaction) {
      fetchEmployeeOrders("READY");
      setRefetchTransaction(false);
    }
    if (orders.setter === "refetch") {
      fetchEmployeeOrders("IN_PROGRESS");
    }
    fetchEmployeeOrders("PENDING");
  }, [orders, handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  return (
    <>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        padding={0}
        sx={{
          color: "primary.main",
          width: { xs: "100%" },
          height: { xs: "100%" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Orders tab"
          variant="scrollable"
        >
          <Tab
            label={t("main.cook.tabs.pending")}
            {...a11yProps(0)}
            onClick={() => handleTabClick("pending")}
          />
          <Tab
            label={t("main.cook.tabs.accepted")}
            {...a11yProps(1)}
            onClick={() => handleTabClick("accepted")}
          />
          <Tab
            label={t("main.cook.tabs.completed")}
            {...a11yProps(2)}
            onClick={() => handleTabClick("completed")}
          />
        </Tabs>

        <Outlet />
        {mode === "pending" && (
          <EnhancedCollapsibleTable2
            handleRefetchTransaction={handleRefetchTransaction}
            transaction={pendingOrders ? pendingOrders : []}
            sendOrdersMessage={sendOrdersMessage}
            mode={mode}
            setPending={handlePendingOrders}
            setAccepted={handleAcceptedOrders}
            accepted={acceptedOrders}
            pending={pendingOrders}
            handleSetOpenSnack={handleSetOpenSnack}
            handleMessageInfo={handleMessageInfo}
            handleSetSeverity={handleSetSeverity}
            t={t}
            key={"PendingTable"}
          />
        )}

        {mode === "accepted" && (
          <EnhancedCollapsibleTable2
            handleRefetchTransaction={handleRefetchTransaction}
            transaction={acceptedOrders ? acceptedOrders : []}
            sendOrdersMessage={sendOrdersMessage}
            mode={mode}
            setPending={handlePendingOrders}
            setAccepted={handleAcceptedOrders}
            setCompleted={handleCompletedOrders}
            accepted={acceptedOrders}
            pending={pendingOrders}
            completed={completedOrders}
            handleSetOpenSnack={handleSetOpenSnack}
            handleMessageInfo={handleMessageInfo}
            handleSetSeverity={handleSetSeverity}
            t={t}
            key={"AcceptedTable"}
          />
        )}

        {mode === "completed" && (
          <EnhancedCollapsibleTable2
            transaction={completedOrders ? completedOrders : []}
            sendOrdersMessage={sendOrdersMessage}
            mode={mode}
            handleSetOpenSnack={handleSetOpenSnack}
            handleMessageInfo={handleMessageInfo}
            handleSetSeverity={handleSetSeverity}
            t={t}
            key={"CompletedTable"}
          />
        )}
      </Box>
    </>
  );
}
