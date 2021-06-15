import { useEffect } from "react";
import { useCesium } from "resium";
import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
} from "cesium";

//https://sandcastle.cesium.com/?src=Camera%20Tutorial.html&label=Tutorials
export function useFPV() {
  let { viewer } = useCesium();
  const { scene, camera, canvas } = viewer;
  // disable the default event handlers
  scene.screenSpaceCameraController.enableRotate = false;
  scene.screenSpaceCameraController.enableTranslate = false;
  scene.screenSpaceCameraController.enableZoom = false;
  scene.screenSpaceCameraController.enableTilt = false;
  scene.screenSpaceCameraController.enableLook = false;

  let startMousePosition;
  let mousePosition;
  let flags = {
    looking: false,
    moveForward: false,
    moveBackward: false,
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
  };
  const handler = new ScreenSpaceEventHandler(canvas);

  handler.setInputAction(function (movement) {
    flags.looking = true;
    mousePosition = startMousePosition = Cartesian3.clone(movement.position);
  }, ScreenSpaceEventType.LEFT_DOWN);

  handler.setInputAction(function (movement) {
    mousePosition = movement.endPosition;
  }, ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (position) {
    flags.looking = false;
  }, ScreenSpaceEventType.LEFT_UP);

  function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
      case "W".charCodeAt(0):
        return "moveForward";
      case "S".charCodeAt(0):
        return "moveBackward";
      case "Q".charCodeAt(0):
        return "moveUp";
      case "E".charCodeAt(0):
        return "moveDown";
      case "D".charCodeAt(0):
        return "moveRight";
      case "A".charCodeAt(0):
        return "moveLeft";
      default:
        return undefined;
    }
  }
  document.addEventListener(
    "keydown",
    function (e) {
      let flagName = getFlagForKeyCode(e.keyCode);
      console.log(e.code, e.keyCode);
      if (typeof flagName !== "undefined") {
        flags[flagName] = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    function (e) {
      let flagName = getFlagForKeyCode(e.keyCode);
      if (typeof flagName !== "undefined") {
        flags[flagName] = false;
      }
    },
    false
  );

  viewer.clock.onTick.addEventListener((clock) => {
    if (flags.looking) {
      let width = canvas.clientWidth;
      let height = canvas.clientHeight;

      // Coordinate (0.0, 0.0) will be where the mouse was clicked.
      let x = (mousePosition.x - startMousePosition.x) / width;
      let y = -(mousePosition.y - startMousePosition.y) / height;

      let lookFactor = 0.05;
      camera.lookRight(x * lookFactor);
      camera.lookUp(y * lookFactor);
    }

    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
    let cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(
      camera.position
    ).height;
    let moveRate = cameraHeight / 100.0;

    if (flags.moveForward) {
      camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
      camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
      camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
      camera.moveDown(moveRate);
    }
    if (flags.moveLeft) {
      camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
      camera.moveRight(moveRate);
    }
  });
}
