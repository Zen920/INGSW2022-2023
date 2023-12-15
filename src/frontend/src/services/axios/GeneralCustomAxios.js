import axios from "axios";
import { config } from "../../config/Environments";
import { AUTH_URLS } from "../../utilities/constants/ConstantURLs";
const errorMessage = "error from response of axiosClient ";
const errorMessageRequest = "error from request of axiosClient ";

const axiosClient = axios.create({
  baseURL: config.baseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "X-Content-Type-Options": "nosniff",
  },
});
axiosClient.defaults.withCredentials = true;
axiosClient.interceptors.request.use(undefined, (error) => {
  switch (error.request.status) {
    case 403:
      console.log(errorMessageRequest + error);
      window.location = "/";
      break;
    case 401:
      console.log(errorMessageRequest + error);
      window.location = AUTH_URLS.LOGIN_PAGE;
      break;
    case 400:
      console.log(errorMessageRequest + error);
      break;
    default:
      console.log("Undefined error");
      window.location = "/";
  }
  //window.location = AUTH_URLS.LOGIN_PAGE
  return Promise.reject(error);
});
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.config.url === "auth/refreshtoken") {
      axiosClient.post(AUTH_URLS.POST_LOGOUT);
      window.location = AUTH_URLS.LOGIN_PAGE;
    }

    const ogRequest = error.config;
    if (error.response) {
      switch (error?.response.status) {
        case 403:
          console.log(errorMessage + error);
          window.location = AUTH_URLS.LOGIN_PAGE;
          break;
        case 400:
          if (ogRequest._retry) {
            axiosClient.post(AUTH_URLS.POST_LOGOUT);
            window.location = AUTH_URLS.LOGIN_PAGE;
          }
          break;
        case 401:
          if (!ogRequest._retry) {
            await axiosClient.get("auth/refreshtoken");
            ogRequest._retry = true;
            return axiosClient(ogRequest);
          }
          break;
        case 406:
          console.log("406");
          axiosClient.post(AUTH_URLS.POST_LOGOUT);
          window.location = AUTH_URLS.LOGIN_PAGE;
          break;
        case 408:
          console.log("408");
          break;
        default:
          break;
      }
    } else if (error.code === "ERR_NETWORK") {
      window.location = "/error";
    }
    return Promise.reject(error);
    //window.location = AUTH_URLS.LOGIN_PAGE
    //return Promise.reject("this has been rejected with error: " + error);
  }
);

export default axiosClient;
