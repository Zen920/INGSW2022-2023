import axios from "axios";
import { config } from "../../config/Environments";
import { AUTH_URLS } from "../../utilities/constants/ConstantURLs";

const loginErrorMessage = "error from response in loginAxiosClient";
const loginErrorMessageRequest = "error from request in loginAxiosClient";

const loginAxiosClient = axios.create({
  baseURL: config.baseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Access-Control-Allow-Credentials": true,
    //"Access-Control-Allow-Credentials": true,
  },
});

loginAxiosClient.defaults.withCredentials = true;
loginAxiosClient.interceptors.request.use(undefined, (error) => {
  switch (error.request.status) {
    case 403:
      console.log(loginErrorMessageRequest + error);
      window.location = AUTH_URLS.LOGIN_PAGE;
      break;
    case 400:
      console.log(loginErrorMessageRequest + error);
      break;
    default:
      console.log(loginErrorMessageRequest + error);
      window.location = AUTH_URLS.LOGIN_PAGE;
      break;
  }
  //window.location = AUTH_URLS.LOGIN_PAGE
  return Promise.reject(error);
});
loginAxiosClient.interceptors.response.use(
  function (response) {},
  async function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.log(loginErrorMessage + error);
          window.location = AUTH_URLS.LOGIN_PAGE;
          break;
        case 400:
          console.log(loginErrorMessage + error);
          break;
        default:
          break;
      }
    }
    //window.location = AUTH_URLS.LOGIN_PAGE
    return Promise.reject(error);
  }
);

export default loginAxiosClient;
