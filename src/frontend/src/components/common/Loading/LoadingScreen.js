import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen(props) {
  return (
    <Box
      sx={{ display: "flex" }}
      flexDirection={"column"}
      justifyContent="center"
      alignContent={"center"}
      alignItems="center"
      justifyItems={"center"}
    >
      <CircularProgress size={"400px"} />
    </Box>
  );
}
