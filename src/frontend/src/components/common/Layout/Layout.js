import { Box } from "@mui/system";
import { useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import GlobalSnackBar from "../Alert/GlobalSnackBar";
import HeaderAppbar from "../NavigationBar/SimpleNavBar";
import AuthContext from "../../../services/contexts/AuthContext";
import Footer from "../Footer/Footer";
import { ADMIN_URLs, AUTH_URLS, COOK_URLS, WAITER_URLS } from "../../../utilities/constants/ConstantURLs";
import { ROLES } from "../../../utilities/constants/ConstantRoles";
const Layout = () => {
  const { employee } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAccordingToRole = useMemo(() => {
    let redirect;
    switch (employee?.role?.employeeRole) {
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
        redirect = AUTH_URLS.LOGIN_PAGE;
        break;
    }
    return redirect;
  }, [employee]);
  useEffect(() => {
    if (loading && (!employee || employee == null)) {
      navigate(AUTH_URLS.LOGIN_PAGE);
    }
    setLoading(true);
  }, [employee, loading, navigate]);
  return (
    <>
      <Box
        width="100%"
        minHeight="100vh"
        display={"flex"}
        flexDirection={"column"}
      >
        {employee && <HeaderAppbar />}

        <Box width="100%">
          {location.pathname !== "/" ? (
            <Outlet />
          ) : (
            <Navigate to={redirectAccordingToRole} />
          )}

          <GlobalSnackBar />
        </Box>
        {employee && (
          <Box
            marginTop={"auto"}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            flexWrap="wrap"
            bottom="0px"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              display: {
                sm:
                  window.location.pathname === WAITER_URLS.ORDERS_PAGE
                    ? "none"
                    : "flex",
                md: "flex",
              },
            }}
          >
            <Footer />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Layout;
