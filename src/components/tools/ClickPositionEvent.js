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

export function ClickPositionEvent(props) {
  const { viewer, scene, camera } = useCesium();
  const flyTo = useFlyTo();
  // console.log(viewer);
  const { globalState, dispatch } = useGlobal();

  return (
    <ScreenSpaceEventHandler {...props}>
      {/* SHIFT+CLICK 显示世界坐标 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const position = scene.pickPosition(click.position);
            console.log(JSON.stringify(position).slice(1, -1) + ",");
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
        modifier={KeyboardEventModifier.CTRL}
      />

      {/* SHIFT+LeftClick 测量 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const position = scene.pickPosition(click.position);
            positionStore.push(position);
            if (positionStore.length === 2) {
              const planeDif =
                ((positionStore[0].x - positionStore[1].x) ** 2 +
                  (positionStore[0].y - positionStore[1].y) ** 2) **
                0.5;
              const heightDif = positionStore[0].z - positionStore[1].z;
              const output = `水平距离：${planeDif} 米\n高差：${heightDif} 米`;
              console.log(output);
              positionStore = [];
            }
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
        modifier={KeyboardEventModifier.SHIFT}
      />

      {/* ALT+LeftClick 显示经纬度 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const position = scene.camera.pickEllipsoid(
              click.position,
              scene.globe.ellipsoid
            );
            const cartographic = Cartographic.fromCartesian(position);
            const longitudeString = Math.toDegrees(
              cartographic.longitude
            ).toFixed(8);
            const latitudeString = Math.toDegrees(
              cartographic.latitude
            ).toFixed(8);

            console.log(longitudeString, latitudeString);
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
        modifier={KeyboardEventModifier.ALT}
      />

      {/* 调试相机飞行参数 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const position = scene.pickPosition(click.position);
            let cameraFlyToPosition = new Cartesian3(
              position.x - 2.46,
              position.y + 6.3,
              position.z + 4.5
            );
            // const feature = scene.pick(click.position);
            // console.log(feature);
            // viewer.flyTo(feature.id, {
            //   maximumHeight: 1,
            // });
            // viewer.zoomTo(feature.id);
            let destination = new Cartesian3(
              -2166991.617934109,
              4385975.66897766,
              4078779.659392268
            );
            let direction = new Cartesian3(
              0.3951563557908955,
              -0.75336484149765,
              -0.5256356818874456
            );
            let up = new Cartesian3(
              0.3575604131719229,
              -0.40093786411836985,
              0.8434449478469378
            );

            // console.log(
            //   position.x - destination.x,
            //   position.y - destination.y,
            //   position.z - destination.z
            // );

            camera.flyTo({
              destination: cameraFlyToPosition,
              orientation: { direction, up },
            });
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.RIGHT_CLICK}
        modifier={KeyboardEventModifier.CTRL}
      />

      {/* ALT+右键 双击获取当前相机参数 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            console.log(camera);
            const {
              positionWC: destination,
              upWC: up,
              directionWC: direction,
            } = camera;

            // console.log("up", camera.up);
            // console.log("upWC", camera.upWC);
            // console.log(` new Cartesian3(
            //  ${camera.position.x},
            //  ${camera.position.y},
            //  ${camera.position.z},
            // )`);

            // console.log(` new Cartesian3(
            //  ${camera.direction.x},
            //  ${camera.direction.y},
            //  ${camera.direction.z},
            // )`);
            // console.log(` new Cartesian3(
            //  ${camera.up.x},
            //  ${camera.up.y},
            //  ${camera.up.z},
            // )`);

            const cameraPosition = {
              destination: {
                x: destination.x,
                y: destination.y,
                z: destination.z,
              },
              orientation: {
                direction: {
                  x: direction.x,
                  y: direction.y,
                  z: direction.z,
                },
                up: {
                  x: up.x,
                  y: up.y,
                  z: up.z,
                },
              },
            };
            console.log(JSON.stringify(cameraPosition) + ",");
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.RIGHT_CLICK}
        modifier={KeyboardEventModifier.ALT}
      />

      {/* 左键双击飞行 */}
      <ScreenSpaceEvent
        action={(click) => {
          try {
            const position = scene.pickPosition(click.position);
            flyTo({ targetPosition: position });
          } catch (e) {
            console.log(e);
          }
        }}
        type={ScreenSpaceEventType.LEFT_DOUBLE_CLICK}
      />
    </ScreenSpaceEventHandler>
  );
}
