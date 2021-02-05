import { useEffect } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import MuiTheme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import ProjectsContext from "../context/projects";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <ProjectsContext>
          <Head>
            <title>Bugtracker</title>
          </Head>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ProjectsContext>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
