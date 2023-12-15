import { CustomRequest } from "./CustomRequest";
import {
  METHODS,
  TRANSACTION_URLS,
} from "../../utilities/constants/ConstantURLs";

const completeTransaction = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    TRANSACTION_URLS.PUT_COMPLETE_TRANSACTION,
    parameters,
    "data",
    true,
    t("successMessages.completeTransaction"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const openTransactions = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    TRANSACTION_URLS.GET_OPEN_TRANSACTIONS,
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

const openTransactions2 = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return CustomRequest(
    METHODS.GET,
    TRANSACTION_URLS.GET_TABLES,
    parameters,
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const verifyTransaction = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    TRANSACTION_URLS.GET_VERIFY_TRANSACTION,
    undefined,
    "data",
    false,
    undefined,
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const getSingleTransaction = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload
) => {
  return CustomRequest(
    METHODS.POST,
    TRANSACTION_URLS.GET_SINGLE_TRANSACTION,
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

export {
  completeTransaction,
  verifyTransaction,
  getSingleTransaction,
  openTransactions,
  openTransactions2,
};
