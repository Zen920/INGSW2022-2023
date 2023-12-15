import { METHODS, ADMIN_URLs } from "../../utilities/constants/ConstantURLs";
import { CustomRequest } from "./CustomRequest";

const getDishesPrepared = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return CustomRequest(
    METHODS.GET,
    ADMIN_URLs.GET_PREPARED_FROM_TO,
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

const getCategoriesPrepared = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  parameters
) => {
  return CustomRequest(
    METHODS.GET,
    ADMIN_URLs.GET_PREAPRED_CATEGORIES_FROM_TO,
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
export { getDishesPrepared, getCategoriesPrepared };
