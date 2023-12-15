import { GlobalStyles, useMediaQuery } from "@mui/material";
import * as locales from "@mui/material/locale";

import * as dateLocales from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Retrieve employee profile as JSON if it already exists
export const ColorModeContextProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [locale, setLocale] = useState("itIT");
  const [mode, setMode] = useState(
    prefersDarkMode &&
      (localStorage.getItem("theme") === null ||
        localStorage.getItem("theme") === "dark")
      ? "dark"
      : "light"
  );
  const localeSelection = useMemo(
    () => ({
      switchLocale: () => {
        setLocale((current) => (current === "enUS" ? "itIT" : "enUS"));
      },
    }),
    []
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("theme", mode === "light" ? "dark" : "light");
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      mode === "dark"
        ? createTheme(
            {
              typography: {
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                fontSize: 14,
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500,
              },

              palette: {
                background: {
                  default: "#1f3638",
                },
                text: {
                  default: "#FFFFFF",
                  fontWeight: "bold",
                },
                mode,
                primary: { main: "#3f8767" },
                complementary: { main: "#673F40" },
                analogous: {
                  main: "#3f6753",
                },
                analogousSecondary: {
                  main: "#3f5467",
                },
                triadic: {
                  main: "#3f4067",
                },
                triadicSecondary: {
                  main: "#663f67",
                },
              },
              //rounded: { border: "solid  #3f6753", borderRadius: 1 },
              components: {
                MuiTypography: {
                  styleOverrides: {
                    root: {
                      wordWrap: "break-word",
                    },
                  },
                },
                MuiDialogActions: {
                  variants: [
                    {
                      props: { variant: "colored" },
                      style: {
                        backgroundColor: "#1f3838",
                      },
                    },
                  ],
                  styleOverrides: {
                    root: {},
                  },
                },
                MuiDialogTitle: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#1f3838",
                    },
                  },
                },
                MuiListSubheader: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#3a5050",
                    },
                  },
                },
                MuiTableHead: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#3f6767",
                    },
                  },
                },
                MuiPaper: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#1f3838",
                      color: "#FFFFFF",
                    },
                  },
                  variants: [
                    {
                      props: { variant: "colored" },
                      style: {
                        border: "solid",
                        backgroundColor: mode,
                        borderColor: "#3f6753",
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 10,
                      },
                    },
                    {
                      props: { variant: "account" },
                      style: {
                        border: "solid",
                        color: "#FFFFFF",
                        borderColor: "#FFFFFF",
                        borderRadius: 35,
                      },
                    },
                    {
                      props: { variant: "releaseButton" },
                      style: {
                        border: "solid",
                        borderColor: "#f44336",
                        bgcolor: "transparent",
                        borderRadius: 35,
                      },
                    },
                    {
                      props: { variant: "acceptButton" },
                      style: {
                        border: "solid",
                        borderColor: "#66bb6a",
                        bgcolor: "transparent",
                        borderRadius: 35,
                      },
                    },
                  ],
                },
                MuiButton: {
                  styleOverrides: {
                    root: {
                      fontWeight: "bolder",
                      textTransform: "none",
                    },
                  },
                  variants: [
                    {
                      props: { variant: "colored-submit" },
                      style: {
                        borderColor: "#53b7bd",
                        backgroundColor: "#3f9767",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#3fB767",
                        },
                      },
                    },
                    {
                      props: { variant: "navbar-button" },
                      style: {
                        color: "#FFFFFF",
                      },
                    },
                  ],
                },
                MuiListItemButton: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#3f6767",
                      },
                    },
                  },
                },
                MuiMenuItem: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#3f6767",
                      },
                    },
                  },
                },
                MuiListItem: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      //color: "white",
                      color: "transparent",
                    },
                  },
                },
                MuiList: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      color: "white",
                      backgroundColor: "transparent",
                    },
                  },
                },
                MuiTab: {
                  styleOverrides: {
                    root: {
                      fontSize: "0.7rem",
                    },
                  },
                },
              },
            },
            dateLocales[locale], // x-date-pickers translations,
            locales[locale]
          )
        : createTheme(
            {
              typography: {
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                fontSize: 14,
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500,
              },

              palette: {
                background: {
                  default: "#FFFFFF",
                },
                text: {
                  default: "#000000",
                  fontWeight: "bold",
                },
                mode,
                primary: { main: "#3f6767" },
                secondary: { main: "#673f3f" },
                complementary: { main: "#673F40" },
                analogous: {
                  main: "#3f6753",
                },
                analogousSecondary: {
                  main: "#3f5467",
                },
                triadic: {
                  main: "#3f4067",
                },
                triadicSecondary: {
                  main: "#663f67",
                },
              },
              //rounded: { border: "solid  #3f6753", borderRadius: 1 },
              components: {
                MuiTypography: {
                  styleOverrides: {
                    root: {
                      wordWrap: "break-word",
                    },
                  },
                },
                MuiAppBar: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#FFFFFF",
                    },
                  },
                },
                MuiTableHead: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "#3f6767",
                    },
                  },
                },

                MuiPaper: {
                  styleOverrides: {
                    root: {
                      backgroundColor: "white",
                      color: "#000000",
                    },
                  },
                  variants: [
                    {
                      props: { variant: "colored" },
                      style: {
                        border: "solid",
                        backgroundColor: mode,
                        borderColor: "#3f6753",
                        borderRadius: 10,
                        padding: 10,
                        marginTop: 10,
                      },
                    },
                    {
                      props: { variant: "account" },
                      style: {
                        outline: "solid",
                        outlineColor: "#3f6767",
                        borderColor: "#3f6767",
                        borderRadius: 35,
                      },
                    },
                    {
                      props: { variant: "releaseButton" },
                      style: {
                        border: "solid",
                        borderColor: "#f44336",
                        bgcolor: "transparent",
                        borderRadius: 35,
                      },
                    },
                    {
                      props: { variant: "acceptButton" },
                      style: {
                        border: "solid",
                        borderColor: "#66bb6a",
                        bgcolor: "transparent",
                        borderRadius: 35,
                      },
                    },
                  ],
                },
                MuiListItemButton: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      color: "#000000",
                    },
                  },
                },
                MuiButton: {
                  styleOverrides: {
                    root: {
                      fontWeight: "bolder",
                      textTransform: "none",
                    },
                  },
                  variants: [
                    {
                      props: { variant: "colored-submit" },
                      style: {
                        borderColor: "#3f6767",
                        backgroundColor: "#3f6767",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#3f8767",
                        },
                      },
                    },
                    {
                      props: { variant: "navbar-button" },
                      style: {
                        color: "#000000",
                      },
                    },
                  ],
                },
                MuiMenuItem: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      "&:hover": {
                        //backgroundColor: "#3f4067",
                      },
                    },
                  },
                },
                MuiListItem: {
                  styleOverrides: {
                    root: {
                      textTransform: "none",
                      "&:hover": {
                        //backgroundColor: "#3f4067",
                      },
                    },
                  },
                },

                MuiTab: {
                  styleOverrides: {
                    root: {
                      fontSize: "0.7rem",
                    },
                  },
                },
              },
            },
            locales[locale]
          ),
    [mode, locale]
  );

  return (
    <ColorModeContext.Provider
      value={{ colorMode, mode, localeSelection, locale }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ form: { width: "100%" } }} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default ColorModeContext;
