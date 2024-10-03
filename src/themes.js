import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C9DABF",
      contrastText: "#232323",
    },
    secondary: {
      main: "#9CA986",
      contrastText: "#F5F5F5",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
      highlightedDate: "#C9DABF",
    },
    text: {
      primary: "#5F6F65",
      secondary: "#808D7C",
      disabled: "#9E9E9E",
    },
    action: {
      active: "#9CA986",
      hover: "#C9DABF",
      disabled: {
        past: "#E0E0E0",
        previousMonth: "#F0F0F0",
        nextMonth: "#F0F0F0",
      },
    },
    divider: "#E0E0E0",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#808D7C",
      contrastText: "#F5F5F5",
    },
    secondary: {
      main: "#9CA986",
      contrastText: "#232323",
    },
    background: {
      default: "#232323",
      paper: "#303030",
      highlightedDate: "#808D7C",
    },
    text: {
      primary: "#C9DABF",
      secondary: "#9CA986",
      disabled: "#9E9E9E",
    },
    action: {
      active: "#9CA986",
      hover: "#808D7C",
      disabled: {
        past: "#616161",
        previousMonth: "#424242",
        nextMonth: "#424242",
      },
    },
    divider: "#424242",
  },
});

export { lightTheme, darkTheme };
