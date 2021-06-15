import { useEffect } from "react";
import { useCesium } from "resium";
import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
  Cartesian2,
} from "cesium";

export function useTest() {
  let { viewer } = useCesium();
  const { scene, camera, canvas } = viewer;
  const htmlOverlay = document.getElementById("htmlOverlay");
  const scratch = new Cartesian2();
  scene.preRender.addEventListener(() => {
    const position = Cartesian3.fromDegrees(116.29274, 40.00902, 34.1);
    const canvasPosition = scene.cartesianToCanvasCoordinates(
      position,
      scratch
    );
    htmlOverlay.style.top = canvasPosition.y + "px";
    htmlOverlay.style.left = canvasPosition.x + "px";
  });
}
