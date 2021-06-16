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
import { useGlobal } from "../utils";

import { calcCameraFlyTo, cameraFlyToOrientation } from "../config";

export const useFlyTo = () => {
  const { camera } = useCesium();
  const flyTo = (position) => {
    camera.flyTo({
      destination: calcCameraFlyTo(position),
      orientation: cameraFlyToOrientation,
    });
  };

  return flyTo;
};
