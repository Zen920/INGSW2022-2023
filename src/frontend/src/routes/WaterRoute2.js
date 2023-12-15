import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { ROLES } from "../utilities/constants/ConstantRoles";
import { AUTH_URLS } from "../utilities/constants/ConstantURLs";
const WaiterRoute2 = ({
  redirectPath1 = "/",
  redirectPath2 = AUTH_URLS.CHANGE_PASSWORD_PAGE,
}) => {
  const { employee, loaded } = useContext(AuthContext);
  if (loaded) {
    if (!employee) {
      return <Navigate to={AUTH_URLS.LOGIN_PAGE} />;
    }
    if (employee && !employee?.passwordResetted) {
      return <Navigate to={redirectPath2} />;
    }
    if (employee && employee.role.employeeRole === ROLES.COOK) {
      return <Navigate to={redirectPath1} />;
    }
    return <Outlet />;
  }
  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default WaiterRoute2;
