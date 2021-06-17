import React from "react";
import { useCesium } from "resium";
import { Cartesian3 } from "cesium";

//mui
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
//style
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useGlobal, useFlyTo } from "../../utils";
// utils

// icon
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// local
//box import for high priority
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 24,
    right: "50vw",
    transform: "translateX(50%)",
    zIndex: 1100,
  },

  disabled: {
    backgroundColor: `${theme.palette.grey[500]} !important`,
    color: "white !important",
  },
}));

export default function PlayFab({ minFlyDuration }) {
  const classes = useStyles();
  const { entityCollection } = useCesium();
  const { globalState, dispatch } = useGlobal();
  const flyTo = useFlyTo();
  const [order, setOrder] = React.useState(1);
  const [disabled, setDisabled] = React.useState(false);

  const handleClick = () => {
    //按钮禁止点击时间
    let setTimeoutDuration = minFlyDuration;

    //完成学习后重置学习顺序
    if (order > globalState.data.filter(({ order }) => order).length) {
      setOrder(1);
    } else {
      //获取当前知识点数据
      const data = globalState.data.find(
        ({ order: dataOrder }) => dataOrder === order
      );

      // const currentEntity = entityCollection.getById(data.id);
      dispatch({
        type: "setInfoId",
        data: data.id,
      });

      // dev
      // console.log(data.id);
      // console.log(globalState);
      // console.log(currentEntity);

      //存在预设相机位置，飞行至相机位置
      if (data.camera) {
        flyTo({
          cameraPosition: data.camera,
        });
      } else if (data.x) {
        //没有预设相机位置，飞行至相机位置
        const position = new Cartesian3(data.x, data.y, data.z);
        flyTo({
          targetPosition: position,
        });
      } else {
        //无飞行动作，按钮不禁用
        setTimeoutDuration = 0;
      }

      setOrder((state) => state + 1);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
        //打开详情面板
        if (!globalState.infoDrawerOpen) {
          dispatch({
            type: "setInfoDrawerOpen",
            data: true,
          });
        }
      }, setTimeoutDuration);
    }
  };
  return (
    // <Button
    //   variant="contained"
    //   color="primary"
    //   onClick={handleClick}
    //   disabled={
    //     order > globalState.data.filter(({ order }) => order).length
    //   }
    // >
    //   Play
    // </Button>

    <Fab
      aria-label="播放"
      variant="extended"
      className={classes.fab}
      color={
        order > globalState.data.filter(({ order }) => order).length
          ? "default"
          : "primary"
      }
      onClick={handleClick}
      disabled={disabled}
    >
      <PlayArrowIcon></PlayArrowIcon>
      {order > globalState.data.filter(({ order }) => order).length
        ? "重新学习"
        : `查看知识点${order}`}
    </Fab>
  );
}
