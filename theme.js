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
      light: "#BF2319",
    },
    white: {
      main: "white",
    },
    black: {
      main: "black",
    },
    subtitles: {
      main: "rgba(255,255,255,0.5)",
      high: "rgba(255,255,255,0.8)",
      low: "rgba(255,255,255,0.3)",
    },
  },
});

export default theme;
