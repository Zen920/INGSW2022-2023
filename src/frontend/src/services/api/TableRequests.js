import { CustomRequest } from "./CustomRequest";
import { METHODS, TABLE_URLS } from "../../utilities/constants/ConstantURLs";

const getTables = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    TABLE_URLS.GENERIC_TABLE,
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
const getTableByID = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return CustomRequest(
    METHODS.GET,
    TABLE_URLS.GET_TABLE_BY_ID,
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
const putTableUsability = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    TABLE_URLS.GENERIC_TABLE,
    parameters,
    "data",
    true,
    t("successMessages.tableUpdate"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const putBatchTableUsability = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    TABLE_URLS.BATCH_TABLE,
    undefined,
    "data",
    true,
    t("successMessages.tablesUpdate"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const postTable = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    TABLE_URLS.GENERIC_TABLE,
    undefined,
    "data",
    true,
    t("successMessages.table"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const postBatchTables = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    TABLE_URLS.BATCH_TABLE,
    parameters,
    "data",
    true,
    t("successMessages.batchTables"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};
const getTableNumbers = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    TABLE_URLS.GET_TABLES_INDEXES,
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

export {
  getTables,
  putTableUsability,
  postTable,
  getTableNumbers,
  postBatchTables,
  putBatchTableUsability,
  getTableByID
};
