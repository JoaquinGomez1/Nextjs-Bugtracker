import { createMuiTheme } from "@material-ui/core/styles";
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { Palette } from "@material-ui/core/styles/createPalette";

interface IPalette extends Palette {
  subtitles: {
    main: string;
    high: string;
    low: string;
  };
}

interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#181722",
      paper: "#2A2934",
    },
    secondary: {
      main: "#20fac0",
    },
    primary: {
      main: "#4ED172",
    },
    subtitles: {
      main: "rgba(255,255,255,0.5)",
      high: "rgba(255,255,255,0.8)",
      low: "rgba(255,255,255,0.3)",
    },
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
} as IThemeOptions);

// Allows to make use of the extended theme when using the makeStyles function
export interface ITheme extends Theme {
  palette: IPalette;
}

export default theme;
