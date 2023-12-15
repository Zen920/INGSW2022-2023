import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { ROLES } from "../utilities/constants/ConstantRoles";
import { ADMIN_URLs, AUTH_URLS, COOK_URLS, WAITER_URLS } from "../utilities/constants/ConstantURLs";
const LoginRoute = ({ changePassword = AUTH_URLS.CHANGE_PASSWORD_PAGE }) => {
  const { employee, loaded } = useContext(AuthContext);
  const redirectAccordingToRole = () => {
    let redirect;
    switch (employee.role.employeeRole) {
      case ROLES.ADMIN:
        redirect = ADMIN_URLs.EDIT_PAGE;
        break;
      case ROLES.SUPERVISOR:
        redirect = ADMIN_URLs.EDIT_PAGE;
        break;
      case ROLES.WAITER:
        redirect = WAITER_URLS.HOME;
        break;
      case ROLES.COOK:
        redirect = COOK_URLS.HOME;
        break;
      default:
        break;
    }
    return redirect;
  };
  if (loaded) {
    if (employee) {
      return employee.passwordResetted ? (
        <Navigate to={redirectAccordingToRole()} />
      ) : (
        <Navigate to={changePassword} />
      );
    }

    return <Outlet />;
  }
  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default LoginRoute;
