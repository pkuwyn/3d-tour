//https://www.jianshu.com/p/966562a18b1c
import React from "react";

import {
  Viewer,
  Entity,
  ScreenSpaceEventHandler,
  ScreenSpaceEvent,
  useCesium,
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
} from "cesium";

//utils
import { useGlobal } from "../utils";
let positionStore = [];

export function ClickPositionEvent(props) {
  const viewer = useCesium();
  const { globalState, dispatch } = useGlobal();

  return (
    <ScreenSpaceEventHandler {...props}>
      <ScreenSpaceEvent
        action={(click) => {
          console.log(click.position);
          //   const position = viewer.camera.getPickRay(click.position);
          const position = viewer.scene.pickPosition(click.position);
          console.log(position);

          //   });

          dispatch({
            type: "add_pin",
            position: new Cartesian3(position.x, position.y, position.z + 0.1),
          });
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
        modifier={KeyboardEventModifier.CTRL}
      />

      <ScreenSpaceEvent
        action={(click) => {
          console.log(click.position);
          //   const position = viewer.camera.getPickRay(click.position);
          const position = viewer.scene.pickPosition(click.position);
          positionStore.push(position);
          if (positionStore.length === 2) {
            const planeDif =
              ((positionStore[0].x - positionStore[1].x) ** 2 +
                (positionStore[0].y - positionStore[1].y) ** 2) **
              0.5;
            const heightDif = positionStore[0].z - positionStore[1].z;
            const output = `水平距离：${planeDif},高差：${heightDif}`;
            console.log(output);
            positionStore = [];
          }
          //   });
        }}
        type={ScreenSpaceEventType.LEFT_CLICK}
        modifier={KeyboardEventModifier.SHIFT}
      />
    </ScreenSpaceEventHandler>
  );
}
