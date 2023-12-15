import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/contexts/AuthContext";
const ChangePswRoute = ({ redirectPath = "/" }) => {
  const { employee, loaded } = useContext(AuthContext);
  if (loaded) {
    if (employee) {
      return <Outlet />;
    }
    return <Navigate to={redirectPath} />;
  }

  // -> Everything that is inside the "ProtectedRoutes" call in the Parent will be accessibile through Outlet, otherwise go to Login
};

export default ChangePswRoute;
