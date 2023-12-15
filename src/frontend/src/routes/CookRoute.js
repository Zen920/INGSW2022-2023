import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { ROLES } from "../utilities/constants/ConstantRoles";
import { AUTH_URLS } from "../utilities/constants/ConstantURLs";
const CookRoute = ({ redirectPath = AUTH_URLS.CHANGE_PASSWORD_PAGE, role }) => {
  const { employee, loaded } = useContext(AuthContext);
  /*if (loaded) {
    if (employee && employee.role.employeeRole === role) {
      return employee.passwordResetted ? (
        <Outlet />
      ) : (
        <Navigate to={redirectPath} />
      );
    }
    return <Navigate to={AUTH_URLS.LOGIN_PAGE} />;
  }*/
  if (loaded) {
    if (!employee) {
      return <Navigate to={AUTH_URLS.LOGIN_PAGE} />;
    }

    if (!employee.passwordResetted) {
      return <Navigate to={redirectPath} />;
    }

    if (employee.role.employeeRole !== ROLES.COOK) {
      return <Navigate to={"/"} />;
    }

    return <Outlet />;
  }
  /*
  if (!employee) {
    return <Navigate to={"/login"} />;
  } else if (!employee.passwordResetted) {
    return <Navigate to={redirectPath} />;
  } else if (employee.role.employeeRole !== role) {
    return <Outlet />;
  }*/

  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default CookRoute;
