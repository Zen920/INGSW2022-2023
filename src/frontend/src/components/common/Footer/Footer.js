import { Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { AppBar, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function Footer() {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container>
        <CssBaseline />
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                mr: 2,
                textDecoration: "none",
                fontWeight: "bold",
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
              }}
            >
              {"Copyright © 2023 Ratatouille."}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
