import React from "react";

//mui
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

//style
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//icons
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// utils

// local
import HideEntitiesSwitch from "./HideEntitiesSwitch";
import { useGlobal } from "../../utils";
import { imgRootUri } from "../../config";

//box import for high priority
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    top: 8,
    left: 8,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  drawer: {
    position: "fixed",
    width: 400,
    flexShrink: 0,

    [theme.breakpoints.down("sm")]: {
      width: 300,
    },

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100vh",
    },
  },
  drawerPaper: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "space-between",
  },
  infoImage: {
    width: "100%",
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  infoText: {
    textIndent: "2rem",
  },
}));

export default function ControlDrawer(props) {
  const classes = useStyles();
  const { globalState, dispatch } = useGlobal();
  const { data, infoDrawerOpen, currentInfoId } = globalState;

  let entityData = currentInfoId
    ? data.find(({ id }) => id === currentInfoId)
    : null;

  const openDrawer = () => {
    dispatch({
      type: "setInfoDrawerOpen",
      data: true,
    });
  };

  const closeDrawer = () => {
    dispatch({
      type: "setInfoDrawerOpen",
      data: false,
    });
  };
  const theme = useTheme();
  const matchXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box zIndex={2000} position="fixed">
      {!infoDrawerOpen ? (
        <IconButton
          onClick={openDrawer}
          color="primary"
          className={classes.iconButton}
        >
          {matchXsDown ? (
            <KeyboardArrowDownIcon titleAccess="打开知识面板"></KeyboardArrowDownIcon>
          ) : (
            <KeyboardArrowRightIcon titleAccess="打开知识面板"></KeyboardArrowRightIcon>
          )}
        </IconButton>
      ) : null}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor={matchXsDown ? "top" : "left"}
        open={infoDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeDrawer}>
            {matchXsDown ? (
              <KeyboardArrowUpIcon titleAccess="关闭知识面板"></KeyboardArrowUpIcon>
            ) : (
              <KeyboardArrowLeftIcon titleAccess="关闭知识面板"></KeyboardArrowLeftIcon>
            )}
          </IconButton>
          <HideEntitiesSwitch></HideEntitiesSwitch>
        </div>
        <Divider />

        {entityData && (
          <>
            <Typography
              variant="h6"
              color="initial"
              align="center"
              className={classes.infoTitle}
              gutterBottom
            >
              {entityData.labelName}
            </Typography>

            {entityData.content.map((contentPiece, index) => {
              if (contentPiece.type === "img") {
                return (
                  <img
                    src={`${imgRootUri}${contentPiece.img}`}
                    alt={entityData.labelName}
                    className={classes.infoImage}
                    key={index}
                  />
                );
              }
              if (contentPiece.type === "p") {
                return (
                  <Typography
                    variant="body1"
                    color="initial"
                    paragraph
                    key={index}
                    className={classes.infoText}
                  >
                    {contentPiece.text}
                  </Typography>
                );
              }
            })}

            <Button
              variant="text"
              color="primary"
              onClick={closeDrawer}
              fullWidth
            >
              关闭
            </Button>
          </>
        )}
      </Drawer>
    </Box>
  );
}
