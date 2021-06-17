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

const transformToCartesian3 = ({ x, y, z }) => new Cartesian3(x, y, z);

export const useFlyTo = () => {
  const { camera } = useCesium();
  const flyTo = ({ targetPosition, cameraPosition }) => {
    //优先飞行至相机位置
    if (cameraPosition) {
      const flyPosition = {
        destination: transformToCartesian3(cameraPosition.destination),
        orientation: {
          direction: transformToCartesian3(
            cameraPosition.orientation.direction
          ),
          up: transformToCartesian3(cameraPosition.orientation.up),
        },
      };
      camera.flyTo(flyPosition);
    }

    if (targetPosition) {
      const flyPosition = {
        destination: calcCameraFlyTo(targetPosition),
        orientation: cameraFlyToOrientation,
      };
      camera.flyTo(flyPosition);
    }
  };

  return flyTo;
};
