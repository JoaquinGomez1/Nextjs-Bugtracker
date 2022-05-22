import { Box } from "@material-ui/core";

import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import { CSSProperties, PropsWithChildren } from "react";

interface Props {
  success?: boolean;
}

export default function Alert({
  success,
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const backgroundColor = success ? green[600] : pink[600];

  const boxStyle: CSSProperties = {
    position: "absolute",
    maxWidth: "30rem",
    width: "90vw",
    zIndex: 99,
    top: 100,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    padding: "20px 30px",
    borderRadius: "5px",
    boxShadow: "4px 6px 4px rgba(0,0,0,.2)",
    backgroundColor,
    color: "#fff",
  };

  return (
    <Box {...rest} style={boxStyle}>
      {children}
    </Box>
  );
}
