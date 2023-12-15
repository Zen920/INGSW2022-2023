import axiosClient from "../axios/GeneralCustomAxios";
import { METHODS } from "../../utilities/constants/ConstantURLs";
const CustomRequest = async (
  method,
  url,
  parameters,
  returnData,
  showSnack,
  message,
  payload,
  handleSetOpenSnack,
  handleMessageInfo,
  handleSetSeverity,
  t
) => {
  try {
    /*console.log("Method =>", method);
    console.log("URL =>", url);
    console.log("Payload =>", payload ? payload : undefined);
    console.log("Parameters =>", parameters ? parameters : undefined);*/
    let result;
    if (!payload && parameters) {
      if (method === METHODS.DELETE || method === METHODS.GET) {
        result = (
          await axiosClient[method](url, {
            params: parameters,
          })
        )[returnData];
      } else {
        result = (
          await axiosClient[method](url, payload, {
            params: parameters,
          })
        )[returnData];
      }
    } else {
      if (method === METHODS.DELETE && payload) {
        result = (await axiosClient[method](url, payload))[returnData];
      } else {
        result = (
          await axiosClient[method](url, payload ? payload : undefined, {
            params: parameters ? parameters : undefined,
          })
        )[returnData];
      }
    }

    if (showSnack) {
      handleSetOpenSnack(true);
      handleSetSeverity("success");
      handleMessageInfo(message ? message : "Success");
    }
    return result;
  } catch (error) {
    console.log("Error =>", error);
    const errors = error.response.data.split(" ");
    const localizedErrors = [];
    errors.map((error) => {
      let splittedError = error.split("{");
      if (splittedError.length > 1) {
        localizedErrors.push(
          t(splittedError[0], {
            n1: splittedError[1].replace("}", ""),
            n2: splittedError[2].replace("}", ""),
          }).concat("\n")
        );
      } else {
        localizedErrors.push(t(error).concat("\n"));
      }
      return localizedErrors;
    });
    if (handleSetOpenSnack && handleSetSeverity && handleMessageInfo) {
      handleSetOpenSnack(true);
      handleSetSeverity("error");
      handleMessageInfo(error.response && t ? localizedErrors : error.message);
    }
    //handleMessageInfo(error.message);
  }
};
export { CustomRequest };
