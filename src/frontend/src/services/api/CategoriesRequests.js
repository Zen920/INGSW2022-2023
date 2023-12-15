import { CustomRequest } from "./CustomRequest";
import { METHODS, CATEGORY_URLS } from "../../utilities/constants/ConstantURLs";

const getCategories = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return await CustomRequest(
    METHODS.GET,
    CATEGORY_URLS.GET_FULL_MENU,
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

const deleteCategory = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return await CustomRequest(
    METHODS.DELETE,
    CATEGORY_URLS.GENERIC_CATEGORY,
    parameters,
    "data",
    true,
    t("successMessages.deleteCategory"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const postCategory = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return await CustomRequest(
    METHODS.POST,
    CATEGORY_URLS.GENERIC_CATEGORY,
    parameters,
    "data",
    true,
    t("successMessages.category"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};
const putCategory = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  parameters,
  t
) => {
  return await CustomRequest(
    METHODS.PUT,
    CATEGORY_URLS.GENERIC_CATEGORY,
    parameters,
    "data",
    true,
    t("successMessages.categoryUpdate"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};
const getAllCategories = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return await CustomRequest(
    METHODS.GET,
    CATEGORY_URLS.GET_ALL_CATEGORIES,
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
  getCategories,
  deleteCategory,
  postCategory,
  getAllCategories,
  putCategory,
};
