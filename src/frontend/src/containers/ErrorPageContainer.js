import { Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import * as React from "react";
export default function ErrorPageComponent() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Paper
        sx={{
          borderRadius: { xs: "0", sm: "3%" },
          //m: { xs: 0, md: 0 },
          mt: { xs: 0, md: 1 },
          width: { sm: "580px" },
        }}
        component={Stack}
        elevation={2}
      >
        <Typography
          variant="h2"
          sx={{
            ml: 2,
          }}
        >
          Ratatouille
          <br />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            ml: 2,
          }}
        >
          404. That's an error.
          <br />
          You're trying to access a page that does not exist.
          <br />
        </Typography>
      </Paper>
    </Grid>
  );
}
