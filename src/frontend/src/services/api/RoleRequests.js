import { CustomRequest } from "./CustomRequest";
import { METHODS, ROLE_URLS } from "../../utilities/constants/ConstantURLs";

const getRoles = async (
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity
) => {
  return CustomRequest(
    METHODS.GET,
    ROLE_URLS.GET_ROLES,
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

export { getRoles };
