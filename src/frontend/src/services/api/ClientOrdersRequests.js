import {
  COOK_URLS,
  METHODS,
  TRANSACTION_URLS,
  WAITER_URLS,
} from "../../utilities/constants/ConstantURLs";
import { CustomRequest } from "./CustomRequest";

const getPendingOrders = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    COOK_URLS.GET_PENDING_ORDERS,
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

const getAcceptedOrders = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  params
) => {
  return CustomRequest(
    METHODS.GET,
    COOK_URLS.GET_COOK_ORDERS,
    params,
    "data",
    false,
    undefined,
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity
  );
};

const getFullCart = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload
) => {
  return CustomRequest(
    METHODS.POST,
    TRANSACTION_URLS.POST_FULL_CART,
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

const postNewOrder = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  payload,
  t
) => {
  return CustomRequest(
    METHODS.POST,
    WAITER_URLS.POST_NEW_ORDER,
    undefined,
    "data",
    true,
    t("successMessages.order"),
    payload,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

const updateOrderStatus = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    COOK_URLS.PUT_UPDATE_ORDER_STATUS,
    parameters,
    "data",
    true,
    parameters.status === "IN_PROGRESS" ? t("successMessages.acceptOrder") : t("successMessages.completeOrder"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};
const releaseOrder = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters,
  t
) => {
  return CustomRequest(
    METHODS.PUT,
    COOK_URLS.PUT_RELEASE_ORDER,
    parameters,
    "data",
    true,
    t("successMessages.releaseOrder"),
    undefined,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t
  );
};

export {
  releaseOrder,
  getPendingOrders,
  getAcceptedOrders,
  getFullCart,
  postNewOrder,
  updateOrderStatus,
};
