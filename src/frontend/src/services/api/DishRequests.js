import { CustomRequest } from "./CustomRequest";
import { METHODS, DISH_URLS } from "../../utilities/constants/ConstantURLs";
import { messages } from "../../utilities/constants/ConstantMessages";

const postDish = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    DISH_URLS.GENERIC_DISH,
    undefined,
    "data",
    true,
    t("successMessages.dish"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const getOffDishes = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    DISH_URLS.POST_AUTOCOMPLETE,
    undefined,
    "data",
    false,
    messages.INSERT_DISH_FAILURE,
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const getDishes = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    DISH_URLS.GENERIC_DISH,
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

const deleteDish = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return CustomRequest(
    METHODS.DELETE,
    DISH_URLS.GENERIC_DISH,
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

const putDish = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    DISH_URLS.GENERIC_DISH,
    undefined,
    "data",
    true,
    t("successMessages.dishUpdate"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const putDishesCategory = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    DISH_URLS.PUT_DISHES_CATEGORY,
    undefined,
    "data",
    true,
    t("successMessages.dishesUpdate"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};
export {
  postDish,
  getOffDishes,
  getDishes,
  deleteDish,
  putDish,
  putDishesCategory,
};
