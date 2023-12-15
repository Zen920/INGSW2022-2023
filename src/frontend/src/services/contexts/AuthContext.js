import { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../axios/GeneralCustomAxios";
import loginAxiosClient from "../axios/LoginCustomAxios";
import { getNotificationsNumber } from "../api/NotificationsRequests";
import {
  ADMIN_URLs,
  AUTH_URLS,
  COOK_URLS,
  WAITER_URLS,
} from "../../utilities/constants/ConstantURLs";
import { ROLES } from "../../utilities/constants/ConstantRoles";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [employee, setEmployee] = useState();
  const [loaded, setLoaded] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const getValue = async () => {
    if (employee) {
      setNotificationNumber(await getNotificationsNumber());
    }
  };
  const handleNotificationNumber = useCallback((operation, value) => {
    if (operation === "sent") {
      setNotificationNumber((n) => n + 1);
    } else {
      setNotificationNumber((n) => n - 1);
    }
  }, []);
  // Needed to go back in the history stack
  const location = useLocation();
  const navigate = useNavigate();
  const login = async (payload) => {
    payload.username = payload.username.toLowerCase();
    try {
      await loginAxiosClient.post(AUTH_URLS.POST_LOGIN, payload);
    } catch (error) {
      return error;
    }
      axiosClient.get(AUTH_URLS.GET_EMPLOYEE_DATA).then((response) => {
        setEmployee(response.data);
        if (!response.data.passwordResetted) {
          navigate(AUTH_URLS.CHANGE_PASSWORD_PAGE);
        }
        switch (response.data.role?.employeeRole) {
          case ROLES.ADMIN:
            navigate(ADMIN_URLs.EDIT_PAGE);
            break;
          case ROLES.SUPERVISOR:
            navigate(ADMIN_URLs.EDIT_PAGE);
            break;
          case ROLES.COOK:
            navigate(COOK_URLS.HOME);
            break;
          case ROLES.WAITER:
            navigate(WAITER_URLS.HOME);
            break;
          default:
            break;
        }
      });
  };

  const logout = async () => {
    await axiosClient.post(AUTH_URLS.POST_LOGOUT);
    setEmployee(null);
    navigate(AUTH_URLS.LOGIN_PAGE);
  };

  const refreshEmployee = async function () {
      await axiosClient.get(AUTH_URLS.GET_EMPLOYEE_DATA).then((response) => {
        setEmployee(response.data);
      });
  };
  useEffect(() => {
    if (location.pathname !== "/error") {
       var result = axiosClient.get(AUTH_URLS.GET_EMPLOYEE_DATA).then((response) => {
          setEmployee(response.data);
        });
        result.catch(() => {
          logout()
        })
      setLoaded(true);
      getValue();
    }
    //setEmployee((await axiosClient.get(AUTH_URLS.GET_EMPLOYEE_DATA)).data);
  }, []);
  useEffect(() => {
    getValue();
  }, [employee]);
  return (
    <>
      <AuthContext.Provider
        value={{
          employee,
          login,
          logout,
          refreshEmployee,
          notificationNumber,
          handleNotificationNumber,
          loaded,
        }}
      >
        {employee !== undefined ? children : null}
      </AuthContext.Provider>
    </>
  );
};
export default AuthContext;
