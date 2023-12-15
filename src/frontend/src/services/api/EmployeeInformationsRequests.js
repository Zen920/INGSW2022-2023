import { CustomRequest } from "./CustomRequest";
import {
  METHODS,
  AUTH_URLS,
  ADMIN_URLs,
} from "../../utilities/constants/ConstantURLs";

const changePassword = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return await CustomRequest(
    METHODS.PUT,
    AUTH_URLS.PUT_CHANGE_PASSWORD,
    undefined,
    "data",
    true,
    t("successMessages.changePassword"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const putEmployeeAccount = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  parameters,
  t
) => {
  return await CustomRequest(
    METHODS.PUT,
    ADMIN_URLs.PUT_EMPLOYEE_ACCOUNT,
    parameters,
    // params
    "data",
    true,
    t("successMessages.accountUpdate"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const putResetEmployeePassword = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return await CustomRequest(
    METHODS.PUT,
    ADMIN_URLs.PUT_RESET_EMPLOYEE_PASSWORD,
    parameters,
    // params
    "data",
    true,
    t("successMessages.accountUpdate"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const getEveryEmployeeButAdmin = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return await CustomRequest(
    METHODS.GET,
    ADMIN_URLs.GET_EVERYONE_BUT_ADMIN,
    undefined,
    // params
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const getEmployees = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return await CustomRequest(
    METHODS.GET,
    ADMIN_URLs.GET_EMPLOYEES,
    undefined,
    // params
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const postEmployee = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return await CustomRequest(
    METHODS.POST,
    ADMIN_URLs.POST_REGISTRATION,
    undefined,
    "data",
    true,
    t("successMessages.registration"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const getEmployeeProfile = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  t
) => {
  return await CustomRequest(
    METHODS.GET,
    AUTH_URLS.GET_EMPLOYEE_DATA,
    undefined,
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

export {
  changePassword,
  putEmployeeAccount,
  putResetEmployeePassword,
  getEveryEmployeeButAdmin,
  getEmployees,
  postEmployee,
  getEmployeeProfile,
};
