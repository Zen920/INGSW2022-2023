import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styled, useTheme } from "@mui/material/styles";
import { useState, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../services/contexts/AuthContext";
import { Toolbar, Typography } from "@mui/material";
import { ROLES } from "../../../utilities/constants/ConstantRoles";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminMiniDrawer(props) {
  const { employee } = useContext(AuthContext);
  const { adminPages, adminRefs, supervisorPages, supervisorRefs } = props;
  const navigation = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerClick = () => {
    setOpen(!open);
  };
  function redirectTo(ref) {
    navigation(ref);
  }
  return (
    <Box sx={{ display: "flex" }} bgcolor="transparent">
      <Drawer
        variant="permanent"
        open={open}
        sx={{ border: "1 1 0 0 solid", borderColor: "white" }}
      >
        <Toolbar width="10%" sx={{ bgcolor: "transparent" }} />
        <Divider sx={{
        }}/>
        <DrawerHeader
          sx={{ borderColor: "white", border: "0px", bgcolor: "transparent" }}
        >
          <Divider />
          <IconButton onClick={handleDrawerClick}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {employee.role.employeeRole === ROLES.ADMIN && (
            <>
              {adminPages.map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => redirectTo(adminRefs[index])}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <BarChartIcon /> : <PersonIcon />}
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={<Typography variant="body2">{text}</Typography>}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}

          {supervisorPages.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => redirectTo(supervisorRefs[index])}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <MenuBookIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="body2">{text}</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
