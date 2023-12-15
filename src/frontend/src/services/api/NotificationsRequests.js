import { CustomRequest } from "./CustomRequest";
import {
  METHODS,
  NOTIFICATION_STATUS_URLS,
  NOTIFICATION_URLS,
} from "../../utilities/constants/ConstantURLs";

const getNotifications = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    NOTIFICATION_URLS.GET_EMPLOYEE_NOTIFICATIONS,
    undefined,
    "data",
    undefined,
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const hideNotification = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload
) => {
  return CustomRequest(
    METHODS.PUT,
    NOTIFICATION_STATUS_URLS.PUT_HIDE_NOTIFICATION,
    undefined,
    "data",
    false,
    undefined,
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const getNotificationsNumber = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    NOTIFICATION_URLS.GET_NOTIFICATIONS_NUMBER,
    undefined,
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const postNotification = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    NOTIFICATION_URLS.POST_NOTIFICATIONS,
    undefined,
    "data",
    true,
    t("successMessages.notification"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

export {
  getNotifications,
  hideNotification,
  getNotificationsNumber,
  postNotification,
};
