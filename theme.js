import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      main: "#20fac0",
    },
    primary: {
      main: "#03fc77",
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
