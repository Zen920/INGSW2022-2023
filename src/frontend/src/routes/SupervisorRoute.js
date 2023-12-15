import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { ROLES } from "../utilities/constants/ConstantRoles";
import { ADMIN_URLs, AUTH_URLS } from "../utilities/constants/ConstantURLs";
const SupervisorRoute = ({ redirectPath = AUTH_URLS.CHANGE_PASSWORD_PAGE }) => {
  const { employee, loaded } = useContext(AuthContext);
  const location = useLocation();
  if (loaded) {
    if (
      employee &&
      (employee.role.employeeRole === ROLES.ADMIN ||
        employee.role.employeeRole === ROLES.SUPERVISOR)
    ) {
      return employee.passwordResetted ? (
        location.pathname === ADMIN_URLs.HOME ? (
          <Navigate to={ADMIN_URLs.EDIT_PAGE} />
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to={redirectPath} />
      );
    }
    return <Navigate to={AUTH_URLS.LOGIN_PAGE} />;
  }

  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default SupervisorRoute;
