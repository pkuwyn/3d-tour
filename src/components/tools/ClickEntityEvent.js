//https://www.jianshu.com/p/966562a18b1c
import React from "react";

import {
  Viewer,
  Entity,
  ScreenSpaceEventHandler,
  ScreenSpaceEvent,
  useCesium,
  CameraFlyTo,
} from "resium";
import {
  Rectangle,
  Camera,
  ScreenSpaceEventType,
  KeyboardEventModifier,
  Color,
  VerticalOrigin,
  PinBuilder,
  Cartesian3,
  Cartographic,
  Math,
  Cesium3DTileFeature,
} from "cesium";

//utils
import { useFlyTo, useGlobal } from "../../utils";

let positionStore = [];

export function ClickEntityEvent(props) {
  const { viewer, scene, camera } = useCesium();
  const flyTo = useFlyTo();
  const { globalState, dispatch } = useGlobal();

  return (
    <ScreenSpaceEventHandler {...props}>
      {/* 点击entity 打开InfoDrawer */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const feature = scene.pick(click.position);
            if (feature.id) {
              const infoId = feature.id._id;
              console.log(infoId);
              //显示entity内容
              dispatch({
                type: "setInfoId",
                data: infoId,
              });

              //打开详情面板
              if (!globalState.infoDrawerOpen) {
                dispatch({
                  type: "setInfoDrawerOpen",
                  data: true,
                });
              }
            }
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
      />
    </ScreenSpaceEventHandler>
  );
}
