import React from "react";

//mui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//style
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//icons
// import SchoolIcon from "@material-ui/icons/School";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// utils

// local

//box import for high priority
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({}));

export default function ModuleBlock(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return <Box></Box>;
}
