import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
export default function AccountComponent(props) {
  const {
    settings,
    settingsRef,
    notificationNumber,
    user,
    navigation,
    disconnectOnRequest,
    logout,
    t,
  } = props;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleCloseUserMenuBasic = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMenu = (setting) => {
    if (setting !== "logout") {
      navigation(setting);
    } else {
      disconnectOnRequest();
      logout();
    }
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Paper variant="account">
        <IconButton
          aria-label="Change theme"
          onClick={handleOpenUserMenu}
          sx={{
            ":hover": {
              textDecoration: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          <Badge
            sx={{
              marginTop: "0.18rem",
              marginRight: "0.18rem",
            }}
            color={"primary"}
            badgeContent={notificationNumber}
          >
            <AccountCircle fontSize="small" />
          </Badge>
          <Typography
            variant="body2"
            sx={{
              display: { xs: "none", small: "none", md: "block" },
              fontWeight: "bold",
            }}
          >
            {user}
          </Typography>
        </IconButton>
      </Paper>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenuBasic}
      >
        {t("main.navbar.pages.settings", { returnObjects: true }).map(
          (setting, index) => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(settingsRef[index])}
            >
              <Typography
                textAlign={"center"}
                variant="body2"
                noWrap
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {setting}
              </Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
}
