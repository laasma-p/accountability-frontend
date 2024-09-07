import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c9dabf",
    },
    secondary: {
      main: "#9ca986",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#232323",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#808d7c",
    },
    secondary: {
      main: "#9ca986",
    },
    background: {
      default: "#232323",
    },
    text: {
      primary: "#f5f5f5",
    },
  },
});

export { lightTheme, darkTheme };
