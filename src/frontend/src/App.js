import { useRoutes } from "react-router-dom";
import "./App.css";
import DishComponent from "./components/Admin/TablesAndDishes/AdminDishComponent";
import AdminEmployeeManagement from "./components/Admin/EmployeeManagement/AdminEmployeeManagementComponents";
import NotificaitonComponent from "./components/Admin/Notifications/AdminNotificationPage";
import StatisticsComponent from "./components/Admin/Statistics/AdminStatisticsPage";
import { AuthContextProvider } from "./services/contexts/AuthContext";
import { ColorModeContextProvider } from "./services/contexts/ColorModeContext";
import Layout from "./components/common/Layout/Layout";
import { SnackBarContextProvider } from "./services/contexts/SnackBarContext";
import CompleteOrder from "./components/Waiter/CompleteOrder";
import WaiterOrderCompoent from "./containers/WaiterCreateOrderContainer";
import {MyWebSocket} from "./hooks/MyWebSocket";
import "./i18n";
import AdminPage from "./components/pages/AdminPage"
import ChangePasswordPage from "./components/pages/ChangePasswordPage";
import CookPage from "./components/pages/CookPage";
import ErrorPage from "./components/pages/ErrorPage";
import LoginPage from "./components/pages/LoginPage";
import NotificationsPage from "./components/pages/NotificationPage";
import WaiterPage from "./components/pages/WaiterPage";
import AdminRoute from "./routes/AdminRoute";
import ChangePswRoute from "./routes/ChangePswRoute";
import CookRoute from "./routes/CookRoute";
import LoginRoute from "./routes/LoginRoute";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SupervisorRoute from "./routes/SupervisorRoute";
import WaiterRoute from "./routes/WaiterRoute";
import WaiterRoute2 from "./routes/WaterRoute2";
import { ADMIN_URLs, AUTH_URLS, COOK_URLS, NOTIFICATION_URLS, WAITER_URLS } from "./utilities/constants/ConstantURLs";
import { ROLES } from "./utilities/constants/ConstantRoles";
export function App() {
  let routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <SupervisorRoute />,
          children: [
            {
              path: ADMIN_URLs.HOME,
              element: <AdminPage />,
              children: [
                { path: ADMIN_URLs.EDIT_PAGE, element: <DishComponent /> },
                {
                  path: ADMIN_URLs.NOTIFICATION_PAGE,
                  element: <NotificaitonComponent />,
                },

                {
                  element: <AdminRoute />,
                  children: [
                    {
                      path: ADMIN_URLs.EMPLOYEES_PAGE,
                      element: <AdminEmployeeManagement />,
                      children: [],
                    },
                    {
                      path: ADMIN_URLs.STATISTICS_PAGE,
                      element: <StatisticsComponent />,
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          element: <CookRoute />,
          children: [
            { path: COOK_URLS.HOME, element: <CookPage role={ROLES.COOK} /> },
          ],
        },
        {
          element: <WaiterRoute2 />,
          children: [
            { path: WAITER_URLS.HOME, element: <WaiterPage /> },
            {
              element: <WaiterRoute />,
              children: [
                { path: WAITER_URLS.ORDERS_PAGE, element: <WaiterOrderCompoent /> },
                { path: WAITER_URLS.COMPLETE_PAGE, element: <CompleteOrder /> },
              ],
            },
          ],
        },
        {
          element: <LoginRoute />,
          children: [{ path: AUTH_URLS.LOGIN_PAGE, element: <LoginPage /> }],
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: NOTIFICATION_URLS.NOTIFICATION_PAGE,
              element: <NotificationsPage />,
            },
          ],
        },
        {
          element: <ChangePswRoute />,
          children: [
            {
              path: AUTH_URLS.CHANGE_PASSWORD_PAGE,
              element: <ChangePasswordPage />,
            },
          ],
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ];
  let element = useRoutes(routes);
  return (
    <AuthContextProvider>
      <MyWebSocket>
        <ColorModeContextProvider>
          <SnackBarContextProvider>{element}</SnackBarContextProvider>
        </ColorModeContextProvider>
      </MyWebSocket>
    </AuthContextProvider>
  );
}

export default App;
