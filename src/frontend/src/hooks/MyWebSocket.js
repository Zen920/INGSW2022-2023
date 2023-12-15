import { Client } from "@stomp/stompjs";
import { config } from "../config/Environments";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../services/contexts/AuthContext";
const WebSocketContext = createContext();

const SOCKET_URL = config.socketURL;
export const MyWebSocket = ({ children }) => {
  const { employee, handleNotificationNumber, notificationNumber, logout } =
    useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState();
  const [updates, setUpdates] = useState({
    setter: "",
    operation: "",
    modified: "",
    updated: "",
    result: false,
  });
  const [orders, setOrders] = useState({
    setter: "",
    result: false,
    refetch: "",
  });

  const [doLogout, setDoLogout] = useState();
  //const [orders, setOrders] = useState("");
  const [tables2, setTables2] = useState(false);
  const client = useMemo(
    () =>
      new Client({
        brokerURL: SOCKET_URL,
        debug: function (str) {
          console.log("STOMP: " + str);
        },
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        onConnect: (frame) => {
          let subs = [
            client.subscribe(
              "/orders/getAll",
              (message) => {
                setOrders({
                  setter: message.body,
                  result: !updates.result,
                });
              },
              { id: "topic-orders" }
            ),
            client.subscribe(
              "/notifications/getAll",
              () => {
                handleNotificationNumber("sent", notificationNumber);
              },
              { id: "topic-notifications" }
            ),
            client.subscribe(
              "/dishes/getAll",
              (message) => {
                //        setUpdates(true);
                let response = JSON.parse(message.body);
                setUpdates({
                  setter: response[0],
                  operation: response[1],
                  modified: response[2],
                  updated: response[3],
                  result: !updates.result,
                });
              },
              { id: "topic-dishesUpdate" }
            ),
            client.subscribe(
              "/user/queue/logout",
              (message) => {
                logout();
              },
              { id: "topic-forceLogout" }
            ),
          ];

          setSubscriptions([...subs]);
        },
        onDisconnect: (frame) => {
          console.log("Disconnecting");
          if (subscriptions) {
            subscriptions.map((sub) => sub.unsubscribe());
          }
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
        },
        onWebSocketClose: (frame) => {
          console.log("Websocket has been closed unexpectdly.");
        },
      }),
    []
  );

  const disconnectOnRequest = () => {
    client.deactivate();
  };
  const sendOrdersMessage = async (msg) => {
    //stompClient.send("/ratatouille/myOrders", {});
    client.publish({ destination: "/ratatouille/myOrders", body: msg });
    // Send a message in order to refresh the orders to all the clients
  };
  const sendTableMessage = async () => {
    client.publish({ destination: "/ratatouille/tables" });
    setTables2(!tables2);
    // Send a message in order to refresh the orders to all the clients
  };

  const sendNotificationMessage = async () => {
    client.publish({ destination: "/ratatouille/myNotifications" });

    // Send a message in order to refresh the orders to all the clients
  };

  const sendDishesUpdateMessage = async (value) => {
    client.publish({
      destination: "/ratatouille/updateDishes",
      body: JSON.stringify(value),
    });
    //setUpdates(false);

    // Send a message in order to refresh the orders to all the clients
  };
  const sendHealthMessage = async () => {
    client.publish({
      destination: "/ratatouille/userHealth",
    });
  };
  const sendEmployeeProfileUpdate = async (value) => {
    client.publish({ destination: "/ratatouille/forceLogout", body: value });

    // Send a message to force an employee to log out
  };
  useEffect(() => {
    if (employee) {
      client.activate();
    }
  }, [employee]);
  return (
    <>
      <WebSocketContext.Provider
        value={{
          orders,
          sendHealthMessage,
          sendTableMessage,
          sendOrdersMessage,
          sendNotificationMessage,
          sendDishesUpdateMessage,
          disconnectOnRequest,
          sendEmployeeProfileUpdate,
          updates,
          doLogout,
        }}
      >
        {children}
      </WebSocketContext.Provider>
    </>
  );
};

export default WebSocketContext;
