import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { IconButton, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WAITER_URLS } from "../../utilities/constants/ConstantURLs";
export default function TableDashboard(props) {
  const navigation = useNavigate();
  const { table, t } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function redirectTo(table, path) {
    navigation(path, { state: table });
  }
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      padding={3}
      xs={6}
      sm={6}
      md={4}
      lg={4}
      key={"table" + table.idTable}
    >
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color={table.occupied ? "primary" : "gray"}
      >
        <Stack>
          <Typography variant="h5">{table.tableNumber}</Typography>
          <TableRestaurantIcon fontSize="medium" />
        </Stack>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    disabled={!table.usable}
                    onClick={() => redirectTo(table, WAITER_URLS.ORDERS_PAGE)}
                  >
                    {table.occupied
                      ? t("main.waiter.tableMenu.continue")
                      : t("main.waiter.tableMenu.new")}
                  </MenuItem>
                  <MenuItem
                    disabled={!table.occupied}
                    onClick={() => redirectTo(table, WAITER_URLS.COMPLETE_PAGE)}
                  >
                    {t("main.waiter.tableMenu.complete")}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}
