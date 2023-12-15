import {
  Brightness4Outlined,
  Brightness7Outlined,
  DinnerDining
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { cloneElement, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import WebSocketContext from "../../../hooks/MyWebSocket";
import "../../../i18n";
import AccountComponent from "./AccountComponent"
import LocalizationComponent from "./LocalizationComponent";
import AuthContext from "../../../services/contexts/AuthContext";
import ColorModeContext from "../../../services/contexts/ColorModeContext";
import { pageTitles } from "../../../utilities/constants/ConstantMessages";
import { ADMIN_URLs, AUTH_URLS, COOK_URLS, NOTIFICATION_URLS, WAITER_URLS } from "../../../utilities/constants/ConstantURLs";
import { ROLES } from "../../../utilities/constants/ConstantRoles";
const administrationPagesRefs = [ADMIN_URLs.EDIT_PAGE];
const cookPagesRefs = [COOK_URLS.HOME];
const notLoggedPages = ["Sign in"];
const waiterPagesRefs = [WAITER_URLS.HOME];
const settings = ["Notifications", "Change Password", "Logout"];
const settignsRef = [NOTIFICATION_URLS.NOTIFICATION_PAGE, AUTH_URLS.CHANGE_PASSWORD_PAGE, "logout"];
const refs = [AUTH_URLS.LOGIN_PAGE];

const AppbarTypography = (props) => {
  const { redirectTo, redirect, text, display, mode } = props;
  return (
    <Typography
      variant="body2"
      noWrap
      onClick={() => (redirectTo ? redirectTo(redirect) : null)}
      sx={{
        mr: 2,
        display: display,
        textDecoration: "none",
        fontWeight: "bold",
        color: mode === "light" ? "#000000" : "#FFFFFF",
      }}
    >
      {text}
    </Typography>
  );
};

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function HeaderAppbar(props) {
  //const [employee, setemployee] = useState();
  const { t, i18n } = useTranslation();
  const { colorMode, localeSelection, locale } = useContext(ColorModeContext);
  const theme = useTheme();
  const navigation = useNavigate();
  const { notificationNumber, logout, employee } = useContext(AuthContext);
  const { disconnectOnRequest, sendHealthMessage } = useContext(WebSocketContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const MINUTE_MS = 10000;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function redirectTo(ref) {
    navigation(ref);
    handleCloseNavMenu();
  }
  useEffect( () => {
    const interval = setInterval(() => {
      sendHealthMessage();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])
  return (
    <ElevationScroll {...props}>
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(10px)",
          backgroundColor: "transparent",
          borderColor: "green",
        }}
      >
        <Container>
          <Toolbar disableGutters >
            <DinnerDining
              fontSize="large"
              sx={{
                color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
                display: { xs: "none", md: "block" },
              }}
            />
            <AppbarTypography
              text={pageTitles.NAVBAR_TITLE.toUpperCase()}
              redirectTo={redirectTo}
              redirect={"/"}
              display={{
                xs: "none",
                md: "flex",
              }}
              mode={theme.palette.mode}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon
                  sx={{
                    color:
                      theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
                  }}
                />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {!employee &&
                  notLoggedPages.map((page, index) => (
                    <MenuItem
                      key={page}
                      onClick={() => redirectTo(refs[index])}
                      onClose={handleCloseNavMenu}
                      sx={{ my: 2, display: "block" }}
                    >
                      <AppbarTypography text={page} mode={theme.palette.mode} />
                      {page}
                    </MenuItem>
                  ))}
                {employee &&
                  (employee.role.employeeRole === ROLES.ADMIN ||
                    employee.role.employeeRole === ROLES.SUPERVISOR) &&
                  t("main.navbar.pages.admin", { returnObjects: true }).map(
                    (page, index) =>
                      employee && (
                        <MenuItem
                          key={page}
                          onClick={() =>
                            redirectTo(administrationPagesRefs[index])
                          }
                          sx={{ display: "block" }}
                        >
                          <AppbarTypography
                            text={page}
                            mode={theme.palette.mode}
                          />
                        </MenuItem>
                      )
                  )}
                {employee &&
                  employee.role.employeeRole === ROLES.COOK &&
                  t("main.navbar.pages.cook", { returnObjects: true }).map(
                    (page, index) =>
                      employee && (
                        <MenuItem
                          key={page}
                          onClick={() => redirectTo(cookPagesRefs[index])}
                          sx={{ display: "block" }}
                        >
                          <AppbarTypography
                            text={page}
                            mode={theme.palette.mode}
                          />
                        </MenuItem>
                      )
                  )}

                {employee &&
                  employee.role.employeeRole !== ROLES.COOK &&
                  t("main.navbar.pages.waiter", { returnObjects: true }).map(
                    (page, index) =>
                      employee && (
                        <MenuItem
                          key={page}
                          onClick={() => redirectTo(waiterPagesRefs[index])}
                          sx={{ display: "block" }}
                        >
                          <AppbarTypography
                            text={page}
                            mode={theme.palette.mode}
                          />
                        </MenuItem>
                      )
                  )}
              </Menu>
            </Box>
            <AppbarTypography
              text={pageTitles.NAVBAR_TITLE.toUpperCase()}
              redirectTo={redirectTo}
              redirect={"/"}
              display={{
                xs: "flex",
                md: "none",
              }}
              mode={theme.palette.mode}
            />
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              justifyContent={"right"}
            >
              {!employee &&
                notLoggedPages.map((page, index) => (
                  <Button
                    variant="navbar-button"
                    key={page}
                    onClick={() => redirectTo(refs[index])}
                    sx={{ my: 2, display: "block" }}
                  >
                    <AppbarTypography text={page} mode={theme.palette.mode} />
                  </Button>
                ))}
              {employee &&
                (employee.role.employeeRole === ROLES.ADMIN ||
                  employee.role.employeeRole === ROLES.SUPERVISOR) &&
                t("main.navbar.pages.admin", { returnObjects: true }).map(
                  (page, index) =>
                    employee && (
                      <Button
                        variant="navbar-button"
                        key={page}
                        onClick={() =>
                          redirectTo(administrationPagesRefs[index])
                        }
                        sx={{ my: 2, display: "block" }}
                      >
                        <AppbarTypography
                          text={page}
                          mode={theme.palette.mode}
                        />
                      </Button>
                    )
                )}
              {employee &&
                employee.role.employeeRole === ROLES.COOK &&
                t("main.navbar.pages.cook", { returnObjects: true }).map(
                  (page, index) =>
                    employee && (
                      <Button
                        variant="navbar-button"
                        key={page}
                        onClick={() => redirectTo(cookPagesRefs[index])}
                        sx={{ my: 2, display: "block" }}
                      >
                        <AppbarTypography
                          text={page}
                          mode={theme.palette.mode}
                        />
                      </Button>
                    )
                )}

              {employee &&
                employee.role.employeeRole !== ROLES.COOK &&
                t("main.navbar.pages.waiter", { returnObjects: true }).map(
                  (page, index) =>
                    employee && (
                      <Button
                        variant="navbar-button"
                        key={page}
                        onClick={() => redirectTo(waiterPagesRefs[index])}
                        sx={{ my: 2, display: "block" }}
                      >
                        <AppbarTypography
                          text={page}
                          mode={theme.palette.mode}
                        />
                      </Button>
                    )
                )}
            </Box>

            {employee && (
              <>
                <IconButton
                  disableRipple
                  sx={{
                    ml: 1,

                    ":hover": {
                      backgroundColor: "transparent",
                      textDecoration: "none",
                    },
                  }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "light" ? (
                    <Brightness7Outlined sx={{ color: "#000000" }} />
                  ) : (
                    <Brightness4Outlined sx={{ color: "#FFFFFF" }} />
                  )}
                </IconButton>
                <LocalizationComponent
                  locale={locale}
                  localeSelection={localeSelection}
                  theme={theme}
                  i18n={i18n}
                />

                <AccountComponent
                  settings={settings}
                  settingsRef={settignsRef}
                  notificationNumber={notificationNumber}
                  user={employee.username}
                  navigation={navigation}
                  disconnectOnRequest={disconnectOnRequest}
                  logout={logout}
                  t={t}
                />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
