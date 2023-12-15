import { Box, IconButton, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { IT, US } from "./flags";
export default function LocalizationComponent(props) {
  const { i18n, theme, localeSelection } = props;
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localeSelection.switchLocale();
  };
  return (
    <Box display="flex" flexDirection={"column"} padding={1}>
      <IconButton
        disableRipple
        sx={{
          ml: 1,
          ":hover": {
            backgroundColor: "transparent",
            textDecoration: "none",
          },
        }}
        onClick={() => changeLanguage(i18n.language === "it" ? "en" : "it")}
        color="inherit"
      >
        <img src={i18n.language === "it" ? IT : US} />
        <Typography
          ml={1}
          variant="body2"
          color={theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"}
        >
          {i18n.language === "it" ? "IT" : "US"}
        </Typography>
      </IconButton>
    </Box>
  );
}
