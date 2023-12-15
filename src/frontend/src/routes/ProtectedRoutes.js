import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
import { AUTH_URLS } from "../utilities/constants/ConstantURLs";
const ProtectedRoutes = ({ redirectPath = AUTH_URLS.LOGIN_PAGE }) => {
  const { employee, loaded } = useContext(AuthContext);

  if (loaded) {
    if (employee) {
      return employee.passwordResetted ? (
        <Outlet />
      ) : (
        <Navigate to={"change-password"} />
      );
    }
    return <Navigate to={redirectPath} />;
  }
  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default ProtectedRoutes;
