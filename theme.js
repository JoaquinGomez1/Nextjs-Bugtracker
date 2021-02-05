import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      main: "#BE7C4D",
      dark: "#B07145",
      light: "#C48354",
    },
    primary: {
      main: "#92140C",
      dark: "#8F120A",
      light: "#99150C",
    },
    white: {
      main: "white",
    },
    black: {
      main: "black",
    },
  },
});

export default theme;
