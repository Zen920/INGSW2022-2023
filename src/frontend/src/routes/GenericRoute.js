import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { AUTH_URLS } from "../utilities/constants/ConstantURLs";
const GenericRoute = ({ redirectPath = AUTH_URLS.CHANGE_PASSWORD_PAGE, role }) => {
  const { employee, loaded } = useContext(AuthContext);
  if (loaded) {
    if (employee) {
      if (employee.passwordResetted) {
        return employee.role.employeeRole !== role ? (
          <Outlet />
        ) : (
          <Navigate to={redirectPath} />
        );
      }
    }
    return <Navigate to={AUTH_URLS.LOGIN_PAGE} />;
  }
  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default GenericRoute;
